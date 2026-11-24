import { cache } from "react";
import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/lib/auth";
import { database } from "@/lib/database";

export const getCreatorAccount = cache(async () => {
  const user = await getAuthenticatedUser();
  if (!user) redirect("/auth");
  return user;
});

export const getCreatorProfile = cache(async () => {
  const user = await getCreatorAccount();
  return database.creatorProfile.findFirst({
    where: { OR: [{ userId: user.id }, { userId: null, email: user.email }] },
  });
});

export function formatSubmissionDate(date: Date) {
  return new Intl.DateTimeFormat("en", { dateStyle: "long", timeZone: "UTC" }).format(date);
}
