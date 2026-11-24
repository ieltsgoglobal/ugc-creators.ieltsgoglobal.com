import type { Metadata } from "next";
import { ApplicationStatus, CreatorFields, CreatorPanel, CreatorPageHero } from "@/components/watermelon/creator-panels";
import { formatSubmissionDate, getCreatorProfile } from "../_lib/creator-data";

export const metadata: Metadata = { title: "Creator Application | IELTS GoGlobal" };

function formatAnswer(value: boolean | null) {
  if (value === null) return null;
  return value ? "Yes" : "No";
}

export default async function ApplicationPage() {
  const profile = await getCreatorProfile();

  return (
    <div className="space-y-5">
      <CreatorPageHero title="Application" />
      <ApplicationStatus submittedDate={profile ? formatSubmissionDate(profile.submittedAt) : undefined} approvedDate={profile?.approvedAt ? formatSubmissionDate(profile.approvedAt) : undefined} />
      {profile && (
        <div className="grid items-start gap-5 xl:grid-cols-2">
          <CreatorPanel title="Submitted creator details">
            <CreatorFields fields={[
              ["Name", profile.fullName],
              ["Country", profile.country],
              ["Instagram", profile.instagramUsername],
              ["Content niche", profile.niche || null],
              ["Content language", profile.language || null],
              ["Audience country", profile.audienceCountry || null],
            ]} />
          </CreatorPanel>
          <CreatorPanel title="Promotion & availability">
            <CreatorFields fields={[
              ["Reported followers", profile.followers?.toLocaleString("en")],
              ["Videos per week", profile.weeklyVideos?.toLocaleString("en")],
              ["Promotion experience", formatAnswer(profile.promotionalExperience)],
              ["On-camera availability", formatAnswer(profile.onCamera)],
              ["Separate promotion account", formatAnswer(profile.promotionAccount)],
            ]} />
          </CreatorPanel>
        </div>
      )}
    </div>
  );
}
