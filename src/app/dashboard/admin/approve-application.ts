"use server";

import { revalidatePath } from "next/cache";
import { database } from "@/lib/database";

export async function approveApplication(formData: FormData) {
  const id = formData.get("applicationId");
  if (typeof id !== "string" || !id) throw new Error("An application ID is required.");

  await database.creatorProfile.updateMany({
    where: { id, approvedAt: null },
    data: { approvedAt: new Date() },
  });

  revalidatePath("/dashboard/admin");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/application");
}
