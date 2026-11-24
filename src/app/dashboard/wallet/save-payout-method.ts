"use server";

import { revalidatePath } from "next/cache";
import { database } from "@/lib/database";
import { getCreatorAccount } from "../_lib/creator-data";

type SaveResult = { message: string; error?: true };

export async function savePayoutMethod(_previous: SaveResult | null, formData: FormData): Promise<SaveResult> {
  const user = await getCreatorAccount();
  const payoutMethod = formData.get("method");
  const destination = formData.get("destination");
  const payoutDestination = typeof destination === "string" ? destination.trim() : "";

  if (payoutMethod !== "UPI" && payoutMethod !== "PAYPAL") {
    return { error: true, message: "Choose a payout method." };
  }
  if (!payoutDestination || payoutDestination.length > 180) {
    return { error: true, message: "Enter a payout destination up to 180 characters." };
  }
  if (payoutMethod === "UPI" && !/^[^\s@]+@[^\s@]+$/.test(payoutDestination)) {
    return { error: true, message: "Enter a UPI ID such as name@provider." };
  }
  if (payoutMethod === "PAYPAL" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payoutDestination)) {
    return { error: true, message: "Enter a PayPal email address." };
  }

  const details = { payoutMethod, payoutDestination } as const;
  await database.creatorWallet.upsert({
    where: { userId: user.id },
    create: { userId: user.id, ...details },
    update: details,
  });
  revalidatePath("/dashboard/wallet");
  return { message: "Payout method saved." };
}
