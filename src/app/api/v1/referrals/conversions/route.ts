import { Prisma } from "@/generated/prisma/client";
import { database } from "@/lib/database";
import { conversionSchema } from "./_lib/conversion-schema";

export async function POST(request: Request) {
  const result = conversionSchema.safeParse(await request.json().catch(() => null));
  if (!result.success) return Response.json({ error: "Invalid conversion" }, { status: 400 });

  const { referralId, externalReference, paidAmountMinor, currency } = result.data;
  const subscribedAt = new Date(result.data.subscribedAt);
  try {
    await database.subscription.create({
      data: { creatorReferralId: referralId, externalReference, subscribedAt, paidAmountMinor, currency },
    });
    return Response.json({ status: "recorded" }, { status: 201 });
  } catch (error) {
    if (!(error instanceof Prisma.PrismaClientKnownRequestError)) throw error;
    if (error.code === "P2003") {
      return Response.json({ error: "Unknown referral" }, { status: 404 });
    }
    if (error.code !== "P2002") throw error;

    const existing = await database.subscription.findUniqueOrThrow({ where: { externalReference } });
    if (
      existing.creatorReferralId === referralId &&
      existing.subscribedAt.getTime() === subscribedAt.getTime() &&
      existing.paidAmountMinor === paidAmountMinor &&
      existing.currency === currency
    ) {
      return Response.json({ status: "already_recorded" });
    }
    return Response.json({ error: "Payment reference already used" }, { status: 409 });
  }
}
