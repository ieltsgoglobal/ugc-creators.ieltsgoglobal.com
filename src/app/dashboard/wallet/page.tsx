import { randomUUID } from "node:crypto";
import type { Metadata } from "next";
import { ArrowDownLeft, ArrowUpRight, Wallet } from "lucide-react";
import { CreatorFrameCorners, CreatorPageHero, CreatorPanel } from "@/components/watermelon/creator-panels";
import { database } from "@/lib/database";
import { formatSubmissionDate, getCreatorAccount } from "../_lib/creator-data";
import { PayoutMethodForm } from "./payout-method-form";
import { WithdrawalForm } from "./withdrawal-form";

export const metadata: Metadata = { title: "Wallet | IELTS GoGlobal" };

const currency = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });
const statuses = { PENDING: "Pending", PAID: "Paid", REJECTED: "Rejected" };
const ledgerLabels = { CREDIT: "Credit", WITHDRAWAL_HOLD: "Withdrawal hold", WITHDRAWAL_RELEASE: "Withdrawal release" };

export default async function WalletPage() {
  const user = await getCreatorAccount();
  const where = { userId: user.id };
  const [balance, transactions, withdrawals, payout] = await database.$transaction([
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
    database.creatorWallet.findUnique({ where }),
  ]);
  const availableBalancePaise = balance._sum.amountPaise ?? 0;

  return (
    <div className="space-y-5">
      <CreatorPageHero title="Wallet" />
      <div className="grid items-start gap-5 lg:grid-cols-2">
        <div className="grid min-w-0 gap-5">
          <section className="relative isolate overflow-hidden border border-foreground/10 bg-background p-5 dark:bg-neutral-950 sm:p-6">
            <CreatorFrameCorners />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_100%_0%,color-mix(in_oklab,var(--color-primary)_14%,transparent),transparent_65%)]" />
            <h2 className="flex items-center gap-2 font-mono text-xs font-bold tracking-wide text-muted-foreground uppercase">
              <Wallet aria-hidden="true" className="size-4 text-green-700 dark:text-primary" />
              Available balance
            </h2>
            <p className="mt-4 wrap-break-word font-mono text-4xl font-bold tracking-tight tabular-nums">
              {currency.format(availableBalancePaise / 100)}
            </p>
          </section>
          <CreatorPanel title="Request a withdrawal">
            {payout ? (
              <>
                <div className="mb-4 border-l-2 border-primary/50 bg-primary/5 px-3 py-2">
                  <p className="font-mono text-xs text-muted-foreground">Pay out via {payout.payoutMethod === "PAYPAL" ? "PayPal" : "UPI"}</p>
                  <p className="mt-1 wrap-break-word font-mono text-sm">{payout.payoutDestination}</p>
                </div>
                <WithdrawalForm requestId={randomUUID()} availableBalancePaise={availableBalancePaise} payoutVersion={payout.updatedAt.toISOString()} />
              </>
            ) : <p className="text-sm text-muted-foreground">Save a UPI or PayPal payout method to request a withdrawal.</p>}
          </CreatorPanel>
        </div>
        <CreatorPanel title="Payout method">
          <PayoutMethodForm saved={payout} />
        </CreatorPanel>
      </div>

      <div className="grid items-start gap-5 lg:grid-cols-2">
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
                  <span className="border border-foreground/15 px-2 py-1 font-mono text-xs text-muted-foreground">{statuses[withdrawal.status]}</span>
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
                    <p className="flex items-center gap-2 text-sm font-medium">
                      {transaction.amountPaise > 0
                        ? <ArrowDownLeft aria-hidden="true" className="size-4 text-green-700 dark:text-primary" />
                        : <ArrowUpRight aria-hidden="true" className="size-4 text-muted-foreground" />}
                      {ledgerLabels[transaction.kind]}
                    </p>
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
    </div>
  );
}
