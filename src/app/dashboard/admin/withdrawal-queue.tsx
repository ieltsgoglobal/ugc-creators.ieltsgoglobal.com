import { Wallet } from "lucide-react";
import { connection } from "next/server";
import { CreatorPanel } from "@/components/watermelon/creator-panels";
import { database } from "@/lib/database";
import { formatSubmissionDate } from "../_lib/creator-data";
import { WithdrawalControls } from "./withdrawal-controls";

const currency = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });

export async function WithdrawalQueue() {
  await connection();

  const select = {
    id: true,
    status: true,
    amountPaise: true,
    createdAt: true,
    payoutMethod: true,
    payoutDestination: true,
    user: { select: { name: true } },
  } as const;
  const [pending, recent] = await Promise.all([
    database.creatorWithdrawalRequest.findMany({ where: { status: "PENDING" }, orderBy: { createdAt: "asc" }, select }),
    database.creatorWithdrawalRequest.findMany({ where: { status: { not: "PENDING" } }, orderBy: { createdAt: "desc" }, take: 20, select }),
  ]);

  return (
    <CreatorPanel title="Withdrawal requests" icon={<Wallet />}>
      <p className="mb-4 text-sm text-muted-foreground">
        {pending.length} pending. Send the payout separately before marking a request paid.
      </p>
      {pending.length === 0 && <p className="text-sm font-medium">No pending withdrawals.</p>}
      {pending.length + recent.length > 0 && (
        <ul className="divide-y divide-border border-y border-border">
          {[...pending, ...recent].map((request) => {
            const amount = currency.format(request.amountPaise / 100);
            return (
              <li key={request.id} className="flex flex-wrap items-center justify-between gap-4 py-4">
                <div className="min-w-0">
                  <p className="font-mono text-lg font-semibold">{amount}</p>
                  <p className="wrap-break-word text-sm">{request.user.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Requested {formatSubmissionDate(request.createdAt)}</p>
                  {request.status === "PENDING" && (
                    <p className="mt-2 wrap-break-word border-l-2 border-primary/50 bg-primary/5 px-3 py-2 font-mono text-xs text-muted-foreground">
                      {request.payoutDestination
                        ? `${request.payoutMethod === "PAYPAL" ? "PayPal" : "UPI"} · ${request.payoutDestination}`
                        : "Payout details not recorded"}
                    </p>
                  )}
                </div>
                {request.status === "PENDING" ? (
                  <WithdrawalControls id={request.id} amount={amount} />
                ) : (
                  <span className="border border-border px-2 py-1 font-mono text-xs">
                    {request.status === "PAID" ? "Paid" : "Rejected · Funds returned"}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </CreatorPanel>
  );
}
