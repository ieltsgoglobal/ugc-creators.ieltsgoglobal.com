import { Camera } from "lucide-react";
import { connection } from "next/server";
import { CreatorPanel } from "@/components/watermelon/creator-panels";
import { database } from "@/lib/database";
import { AddInstagramAccountForm, AssignInstagramAccountForm } from "./instagram-account-forms";

export async function InstagramAccounts() {
  await connection();

  const [accounts, creators] = await Promise.all([
    database.instagramAccount.findMany({
      orderBy: [{ assignedToUserId: "asc" }, { username: "asc" }],
      select: {
        id: true,
        username: true,
        assignedToUserId: true,
        assignedToUser: { select: { creatorProfile: { select: { instagramUsername: true } } } },
      },
    }),
    database.creatorProfile.findMany({
      where: {
        approvedAt: { not: null },
        user: { is: { assignedInstagramAccount: null } },
      },
      orderBy: { instagramUsername: "asc" },
      select: { id: true, instagramUsername: true },
    }),
  ]);

  const available = accounts.filter(({ assignedToUserId }) => assignedToUserId === null);

  return (
    <CreatorPanel title="Instagram accounts" icon={<Camera />}>
      <p className="mb-5 font-mono text-xs text-muted-foreground">
        {available.length} available · {accounts.length - available.length} assigned
      </p>
      <div className="space-y-6">
        <section aria-labelledby="add-instagram-account">
          <h3 id="add-instagram-account" className="mb-3 text-sm font-semibold">Add an account</h3>
          <AddInstagramAccountForm />
        </section>
        <section aria-labelledby="assign-instagram-account" className="border-t border-border pt-5">
          <h3 id="assign-instagram-account" className="mb-3 text-sm font-semibold">Assign an account</h3>
          <AssignInstagramAccountForm
            accounts={available.map(({ id, username }) => ({ id, label: `@${username}` }))}
            creators={creators.map(({ id, instagramUsername }) => ({ id, label: `@${instagramUsername.replace(/^@+/, "")}` }))}
          />
        </section>
        {accounts.length > 0 && (
          <ul aria-label="Instagram inventory" className="divide-y divide-border border-y border-border">
            {accounts.map((account) => {
              const creatorHandle = account.assignedToUser?.creatorProfile?.instagramUsername;
              return (
                <li key={account.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm">
                  <span className="font-medium">@{account.username}</span>
                  <span className="text-muted-foreground">
                    {creatorHandle ? `Assigned to @${creatorHandle.replace(/^@+/, "")}` : account.assignedToUserId ? "Assigned" : "Available"}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </CreatorPanel>
  );
}
