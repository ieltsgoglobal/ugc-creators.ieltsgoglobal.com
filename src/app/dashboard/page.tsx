import { Activity } from "lucide-react";
import type { Metadata } from "next";
import { ApplicationStatus, CreatorMetrics, CreatorPanel, CreatorPageHero } from "@/components/watermelon/creator-panels";
import { formatSubmissionDate, getCreatorAccount, getCreatorProfile } from "./_lib/creator-data";

export const metadata: Metadata = { title: "Creator Dashboard | IELTS GoGlobal" };

export default async function DashboardPage() {
  const [account, profile] = await Promise.all([getCreatorAccount(), getCreatorProfile()]);

  return (
    <div className="space-y-5">
      <CreatorPageHero title={`Welcome, ${profile?.fullName || account.name}`} />
      <ApplicationStatus overview submittedDate={profile ? formatSubmissionDate(profile.submittedAt) : undefined} approvedDate={profile?.approvedAt ? formatSubmissionDate(profile.approvedAt) : undefined} />
      {profile && (
        <CreatorPanel title="Creator snapshot" icon={<Activity />}>
          <CreatorMetrics followers={profile.followers} weeklyVideos={profile.weeklyVideos} />
        </CreatorPanel>
      )}
    </div>
  );
}
