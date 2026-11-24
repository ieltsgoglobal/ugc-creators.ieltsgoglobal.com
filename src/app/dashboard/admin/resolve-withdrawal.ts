"use server";

import { revalidatePath } from "next/cache";
import { database } from "@/lib/database";

type WithdrawalResolution = { message: string; error?: true };

export async function resolveWithdrawal(
  _previous: WithdrawalResolution | null,
  formData: FormData,
): Promise<WithdrawalResolution> {
  const id = formData.get("withdrawalId");
  const status = formData.get("status");
  if (typeof id !== "string" || !id || (status !== "PAID" && status !== "REJECTED")) {
    return { error: true, message: "Invalid withdrawal decision." };
  }

  const resolved = await database.$transaction(async (transaction) => {
    const [withdrawal] = await transaction.creatorWithdrawalRequest.updateManyAndReturn({
      where: { id, status: "PENDING" },
      data: { status },
      select: { id: true, userId: true, amountPaise: true },
    });
    if (!withdrawal) return false;

    if (status === "REJECTED") {
      await transaction.creatorWalletTransaction.create({
        data: {
          userId: withdrawal.userId,
          withdrawalRequestId: withdrawal.id,
          kind: "WITHDRAWAL_RELEASE",
          amountPaise: withdrawal.amountPaise,
        },
      });
    }
    return true;
  });

  revalidatePath("/dashboard/admin");
  revalidatePath("/dashboard/wallet");

  if (!resolved) return { error: true, message: "This request is no longer pending." };
  return { message: status === "PAID" ? "Withdrawal marked paid." : "Withdrawal rejected and funds returned." };
}
