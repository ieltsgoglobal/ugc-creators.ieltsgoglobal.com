import { z } from "zod";

export const conversionSchema = z.object({
  referralId: z.string().min(1).max(128).describe("Creator referral ID from checkout."),
  externalReference: z.string().regex(/^(dodo|phonepe):[a-zA-Z0-9_-]{1,128}$/)
    .describe("Gateway-prefixed payment ID or merchant order ID."),
  subscribedAt: z.iso.datetime({ offset: true }).describe("Payment confirmation time."),
  paidAmountMinor: z.number().int().positive().max(2_147_483_647)
    .describe("Amount charged in the currency's smallest unit."),
  currency: z.string().regex(/^[A-Z]{3}$/).describe("Three-letter uppercase currency code."),
});
