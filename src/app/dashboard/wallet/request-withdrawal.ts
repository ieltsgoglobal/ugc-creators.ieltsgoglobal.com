"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { Prisma } from "@/generated/prisma/client";
import { database } from "@/lib/database";
import { getCreatorAccount } from "../_lib/creator-data";

type WithdrawalResult =
  | { error: string }
  | { message: string; nextRequestId: string };

class InsufficientBalanceError extends Error {}
class PayoutMethodChangedError extends Error {}

export async function requestWithdrawal(
  _previous: WithdrawalResult | null,
  formData: FormData,
): Promise<WithdrawalResult> {
  const user = await getCreatorAccount();
  const amount = formData.get("amount");
  const requestId = formData.get("requestId");
  const payoutVersion = formData.get("payoutVersion");
  const parts = typeof amount === "string" ? /^(\d{1,8})(?:\.(\d{1,2}))?$/.exec(amount.trim()) : null;

  if (!parts || typeof requestId !== "string" || !/^[a-f0-9-]{36}$/i.test(requestId)) {
    return { error: "Enter an amount in rupees with up to two decimal places." };
  }

  const amountPaise = Number(parts[1]) * 100 + Number((parts[2] ?? "").padEnd(2, "0"));
  if (amountPaise < 1 || amountPaise > 2_147_483_647) {
    return { error: "Enter a valid withdrawal amount." };
  }

  const requestKey = { userId: user.id, requestKey: requestId };

  try {
    await database.$transaction(async (transaction) => {
      // Lock the wallet before reading the balance so concurrent withdrawals queue.
      await transaction.$queryRaw`SELECT "userId" FROM "creator_wallets" WHERE "userId" = ${user.id} FOR UPDATE`;
      const withdrawal = await transaction.creatorWithdrawalRequest.create({
        data: { ...requestKey, amountPaise },
        select: { id: true },
      });
      const payout = await transaction.creatorWallet.findUnique({ where: { userId: user.id } });
      if (!payout || payout.updatedAt.toISOString() !== payoutVersion) throw new PayoutMethodChangedError();
      await transaction.creatorWithdrawalRequest.update({
        where: { id: withdrawal.id },
        data: {
          payoutMethod: payout.payoutMethod,
          payoutDestination: payout.payoutDestination,
        },
      });
      const balance = await transaction.creatorWalletTransaction.aggregate({
        where: { userId: user.id },
        _sum: { amountPaise: true },
      });
      if ((balance._sum.amountPaise ?? 0) < amountPaise) throw new InsufficientBalanceError();

      await transaction.creatorWalletTransaction.create({
        data: {
          userId: user.id,
          withdrawalRequestId: withdrawal.id,
          kind: "WITHDRAWAL_HOLD",
          amountPaise: -amountPaise,
        },
        select: { id: true },
      });
    }, { isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted });
  } catch (error) {
    if (error instanceof PayoutMethodChangedError) {
      revalidatePath("/dashboard/wallet");
      return { error: "Check your saved payout method before requesting a withdrawal." };
    }
    if (error instanceof InsufficientBalanceError) {
      return { error: "Your wallet does not have enough available balance." };
    }
    if (!(error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002")) throw error;
    const duplicate = await database.creatorWithdrawalRequest.findUnique({
      where: { userId_requestKey: requestKey },
      select: { amountPaise: true },
    });
    if (!duplicate) throw error;
    if (duplicate.amountPaise !== amountPaise) {
      return { error: "This withdrawal request was already submitted with a different amount." };
    }
  }

  revalidatePath("/dashboard/wallet");
  return { message: "Withdrawal requested. The amount is reserved while the request is pending.", nextRequestId: randomUUID() };
}
