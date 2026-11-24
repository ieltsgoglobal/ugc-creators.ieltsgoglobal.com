import type { Metadata } from "next";
import { AtSign, Globe2, ContactRound, Radio, Target } from "lucide-react";
import { CreatorAvatar } from "@/components/watermelon/creator-shell";
import { CreatorFields, CreatorPageHero, CreatorMetrics, CreatorPanel } from "@/components/watermelon/creator-panels";
import { getCreatorAccount, getCreatorProfile } from "../_lib/creator-data";

export const metadata: Metadata = { title: "Creator Profile | IELTS GoGlobal" };

export default async function ProfilePage() {
  const [account, profile] = await Promise.all([getCreatorAccount(), getCreatorProfile()]);
  const name = profile?.fullName || account.name;
  const handle = profile?.instagramUsername ? `@${profile.instagramUsername.replace(/^@+/, "")}` : null;

  return (
    <div className="space-y-5">
      <CreatorPageHero
        title={name}
        avatar={<CreatorAvatar name={name} className="size-20 border-primary/40 bg-primary/10 text-3xl sm:size-24" />}
      >
        {profile && (
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-muted-foreground">
            {handle && <span className="inline-flex min-w-0 items-center gap-1.5 border border-foreground/15 bg-background/70 px-2.5 py-1.5"><AtSign aria-hidden="true" className="size-4 shrink-0 text-green-700 dark:text-primary" /><span className="wrap-break-word">{handle}</span></span>}
            <span className="inline-flex items-center gap-1.5 border border-foreground/15 bg-background/70 px-2.5 py-1.5"><Globe2 aria-hidden="true" className="size-4 shrink-0 text-green-700 dark:text-primary" />{profile.country}</span>
          </div>
        )}
      </CreatorPageHero>

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <CreatorPanel title="Contact details" icon={<ContactRound />}>
          <CreatorFields fields={[
            ["Email", account.email],
            ...(profile ? [["WhatsApp", profile.whatsapp], ["Country", profile.country]] as [string, string][] : []),
          ]} />
        </CreatorPanel>

        {profile && (
          <div className="grid min-w-0 gap-5">
            <CreatorPanel title="Creator channels" icon={<Radio />}>
              <CreatorMetrics followers={profile.followers} weeklyVideos={profile.weeklyVideos} />
              <div className="mt-4 border-t border-border pt-4">
                <CreatorFields fields={[
                  ["Instagram", handle],
                  ["Other platforms", profile.platforms || null],
                ]} />
              </div>
            </CreatorPanel>
            <CreatorPanel title="Content & audience" icon={<Target />}>
              <CreatorFields fields={[
                ["Content niche", profile.niche || null],
                ["Content language", profile.language || null],
                ["Audience country", profile.audienceCountry || null],
              ]} />
            </CreatorPanel>
          </div>
        )}
      </div>
    </div>
  );
}
