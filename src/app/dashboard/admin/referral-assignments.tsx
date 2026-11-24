import { Link2 } from "lucide-react";
import { connection } from "next/server";
import { CreatorPanel } from "@/components/watermelon/creator-panels";
import { database } from "@/lib/database";
import { ReferralAssignmentForm } from "./referral-assignment-form";

export async function ReferralAssignments() {
  await connection();
  const users = await database.user.findMany({
    orderBy: [{ name: "asc" }, { id: "asc" }],
    select: { id: true, name: true, creatorReferral: { select: { url: true, code: true } } },
  });
  const creators = users.map(({ id, name, creatorReferral }) => ({
    id, name, url: creatorReferral?.url ?? null, code: creatorReferral?.code ?? null,
  }));

  return (
    <CreatorPanel title="Referral links" icon={<Link2 />}>
      {creators.length > 0
        ? <ReferralAssignmentForm creators={creators} />
        : <p className="text-sm text-muted-foreground">No creator accounts yet.</p>}
    </CreatorPanel>
  );
}
