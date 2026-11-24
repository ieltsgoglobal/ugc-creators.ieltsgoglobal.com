import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";
import { CreatorPageHero, CreatorPanel } from "@/components/watermelon/creator-panels";
import { database } from "@/lib/database";
import { formatSubmissionDate } from "../dashboard/_lib/creator-data";
import { approveApplication } from "./approve-application";

export const metadata: Metadata = { title: "Application Admin | IELTS GoGlobal" };

export default function AdminPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 space-y-5 px-4 py-8 sm:px-8">
      <CreatorPageHero title="Creator applications" />
      <Suspense fallback={<p role="status">Loading applications…</p>}>
        <ApplicationQueue />
      </Suspense>
    </main>
  );
}

async function ApplicationQueue() {
  await connection();
  const applications = await database.creatorProfile.findMany({
    orderBy: [{ approvedAt: "asc" }, { submittedAt: "desc" }],
    select: {
      id: true,
      instagramUsername: true,
      country: true,
      niche: true,
      followers: true,
      submittedAt: true,
      approvedAt: true,
    },
  });
  const approvedCount = applications.filter(({ approvedAt }) => approvedAt !== null).length;

  return (
    <CreatorPanel title="Application queue">
      <p className="mb-4 font-mono text-xs text-muted-foreground">
        {applications.length - approvedCount} awaiting approval · {approvedCount} approved
      </p>
      {applications.length === 0 ? (
        <p className="text-sm text-muted-foreground">No applications yet.</p>
      ) : (
        <ul className="divide-y divide-border border-y border-border">
          {applications.map((application) => (
            <li key={application.id} className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="wrap-break-word font-semibold">@{application.instagramUsername.replace(/^@+/, "")}</p>
                <p className="mt-1 wrap-break-word text-sm text-muted-foreground">
                  {application.country}
                  {application.niche && ` · ${application.niche}`}
                  {application.followers !== null && ` · ${application.followers.toLocaleString("en")} reported followers`}
                </p>
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  Submitted {formatSubmissionDate(application.submittedAt)}
                </p>
              </div>
              {application.approvedAt ? (
                <span className="text-sm font-medium text-green-700 dark:text-primary">
                  Approved {formatSubmissionDate(application.approvedAt)}
                </span>
              ) : (
                <form action={approveApplication}>
                  <input type="hidden" name="applicationId" value={application.id} />
                  <button
                    type="submit"
                    aria-label={`Approve application for ${application.instagramUsername}`}
                    className="bg-primary px-4 py-2 font-mono text-xs font-bold text-primary-foreground hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    Approve
                  </button>
                </form>
              )}
            </li>
          ))}
        </ul>
      )}
    </CreatorPanel>
  );
}
