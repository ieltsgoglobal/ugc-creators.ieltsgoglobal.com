"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@/generated/prisma/client";
import { database } from "@/lib/database";

type AssignmentResult = { message: string; error?: true };

export async function assignReferral(_previous: AssignmentResult | null, formData: FormData): Promise<AssignmentResult> {
  const userId = formData.get("userId");
  const code = formData.get("code")?.toString().trim();
  if (!code || !/^[A-Za-z0-9_-]{1,128}$/.test(code)) {
    return { error: true, message: "Enter a referral code using letters, numbers, hyphens, or underscores." };
  }
  if (typeof userId !== "string" || !userId) {
    return { error: true, message: "Choose a creator." };
  }

  const url = new URL("https://ieltsgoglobal.com/");
  url.searchParams.set("ref", code);

  try {
    await database.creatorReferral.upsert({
      where: { userId },
      create: { userId, url: url.href, code },
      update: { url: url.href, code },
    });
  } catch (error) {
    if (!(error instanceof Prisma.PrismaClientKnownRequestError)) throw error;
    if (error.code === "P2002") return { error: true, message: "That referral code is already assigned to another creator." };
    if (error.code === "P2003") return { error: true, message: "The selected creator is no longer available." };
    throw error;
  }

  revalidatePath("/dashboard/admin");
  revalidatePath("/dashboard/referrals");
  return { message: `Referral link saved: ${url.href}` };
}
