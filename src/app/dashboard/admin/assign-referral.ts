"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@/generated/prisma/client";
import { database } from "@/lib/database";

type AssignmentResult = { message: string; error?: true };

export async function assignReferral(_previous: AssignmentResult | null, formData: FormData): Promise<AssignmentResult> {
  const userId = formData.get("userId");
  const input = formData.get("url");
  if (typeof userId !== "string" || !userId) {
    return { error: true, message: "Choose a creator." };
  }

  const url = typeof input === "string" && input.length <= 2048 ? URL.parse(input.trim()) : null;
  if (!url || !["https:", "http:"].includes(url.protocol) || url.username || url.password) {
    return { error: true, message: "Enter a valid HTTP or HTTPS referral link." };
  }

  try {
    await database.creatorReferral.upsert({
      where: { userId },
      create: { userId, url: url.href },
      update: { url: url.href },
    });
  } catch (error) {
    if (!(error instanceof Prisma.PrismaClientKnownRequestError)) throw error;
    if (error.code === "P2002") return { error: true, message: "That link is already assigned to another creator." };
    if (error.code === "P2003") return { error: true, message: "The selected creator is no longer available." };
    throw error;
  }

  revalidatePath("/dashboard/admin");
  revalidatePath("/dashboard/referrals");
  return { message: "Referral link saved." };
}
