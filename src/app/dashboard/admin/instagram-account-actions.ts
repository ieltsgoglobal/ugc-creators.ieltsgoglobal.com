"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@/generated/prisma/client";
import { database } from "@/lib/database";

type AccountActionResult = { message: string; error?: true };

function isUniqueConstraintError(error: unknown) {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
}

export async function createInstagramAccount(
  _previous: AccountActionResult | null,
  formData: FormData,
): Promise<AccountActionResult> {
  const usernameInput = formData.get("username");
  const password = formData.get("password");
  const username = typeof usernameInput === "string"
    ? usernameInput.trim().replace(/^@/, "").toLowerCase()
    : "";

  if (!/^[a-z0-9_.]{1,30}$/.test(username)) {
    return { error: true, message: "Enter a valid Instagram username." };
  }
  if (typeof password !== "string" || !password.trim() || password.length > 256) {
    return { error: true, message: "Enter an Instagram password up to 256 characters." };
  }

  try {
    await database.instagramAccount.create({ data: { username, password }, select: { id: true } });
  } catch (error) {
    if (!isUniqueConstraintError(error)) throw error;
    return { error: true, message: "That Instagram account already exists." };
  }

  revalidatePath("/dashboard/admin");
  return { message: `@${username} was added and is available to assign.` };
}

export async function assignInstagramAccount(
  _previous: AccountActionResult | null,
  formData: FormData,
): Promise<AccountActionResult> {
  const accountId = formData.get("accountId");
  const creatorId = formData.get("creatorId");

  if (typeof accountId !== "string" || !accountId || typeof creatorId !== "string" || !creatorId) {
    return { error: true, message: "Choose an available account and a creator." };
  }

  const creator = await database.creatorProfile.findFirst({
    where: { id: creatorId, approvedAt: { not: null }, userId: { not: null } },
    select: { userId: true },
  });

  if (!creator?.userId) {
    return { error: true, message: "Choose an approved creator with a linked user account." };
  }

  try {
    const result = await database.instagramAccount.updateMany({
      where: { id: accountId, assignedToUserId: null },
      data: { assignedToUserId: creator.userId },
    });

    if (result.count === 0) {
      return { error: true, message: "That Instagram account is no longer available." };
    }
  } catch (error) {
    if (!isUniqueConstraintError(error)) throw error;
    return { error: true, message: "This creator already has an Instagram account." };
  }

  revalidatePath("/dashboard/admin");
  return { message: "Instagram account assigned." };
}
