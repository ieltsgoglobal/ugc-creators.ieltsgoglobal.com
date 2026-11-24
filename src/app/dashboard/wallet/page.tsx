import { randomUUID } from "node:crypto";
import type { Metadata } from "next";
import { CreatorPageHero, CreatorPanel } from "@/components/watermelon/creator-panels";
import { database } from "@/lib/database";
import { formatSubmissionDate, getCreatorAccount } from "../_lib/creator-data";
import { WithdrawalForm } from "./withdrawal-form";

export const metadata: Metadata = { title: "Wallet | IELTS GoGlobal" };

const currency = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });
const statuses = { PENDING: "Pending", PAID: "Paid", REJECTED: "Rejected" };
const ledgerLabels = { CREDIT: "Credit", WITHDRAWAL_HOLD: "Withdrawal hold", WITHDRAWAL_RELEASE: "Withdrawal release" };

export default async function WalletPage() {
  const user = await getCreatorAccount();
  const where = { userId: user.id };
  const [balance, transactions, withdrawals] = await database.$transaction([
    database.creatorWalletTransaction.aggregate({ where, _sum: { amountPaise: true } }),
    database.creatorWalletTransaction.findMany({
      where,
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      take: 20,
    }),
    database.creatorWithdrawalRequest.findMany({
      where,
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      take: 20,
    }),
  ]);
  const availableBalancePaise = balance._sum.amountPaise ?? 0;

  return (
    <div className="space-y-5">
      <CreatorPageHero title="Wallet" />
      <div className="grid items-start gap-5 lg:grid-cols-2">
        <CreatorPanel title="Available balance">
          <p className="wrap-break-word font-mono text-3xl font-bold tabular-nums">
            {currency.format(availableBalancePaise / 100)}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">Available to withdraw</p>
        </CreatorPanel>
        <CreatorPanel title="Request a withdrawal">
          <WithdrawalForm requestId={randomUUID()} availableBalancePaise={availableBalancePaise} />
        </CreatorPanel>
      </div>

      <CreatorPanel title="Withdrawal requests">
        {withdrawals.length === 0 ? (
          <p className="text-sm text-muted-foreground">No withdrawal requests yet.</p>
        ) : (
          <ul className="divide-y divide-border">
            {withdrawals.map((withdrawal) => (
              <li key={withdrawal.id} className="flex flex-wrap items-center justify-between gap-2 py-3 first:pt-0 last:pb-0">
                <div>
                  <p className="font-mono text-sm tabular-nums">{currency.format(withdrawal.amountPaise / 100)}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{formatSubmissionDate(withdrawal.createdAt)}</p>
                </div>
                <span className="text-sm text-muted-foreground">{statuses[withdrawal.status]}</span>
              </li>
            ))}
          </ul>
        )}
      </CreatorPanel>

      <CreatorPanel title="Wallet ledger">
        {transactions.length === 0 ? (
          <p className="text-sm text-muted-foreground">No wallet transactions yet.</p>
        ) : (
          <ul className="divide-y divide-border">
            {transactions.map((transaction) => (
              <li key={transaction.id} className="flex flex-wrap justify-between gap-2 py-3 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium">{ledgerLabels[transaction.kind]}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{formatSubmissionDate(transaction.createdAt)}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm tabular-nums">{currency.format(transaction.amountPaise / 100)}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CreatorPanel>
    </div>
  );
}
