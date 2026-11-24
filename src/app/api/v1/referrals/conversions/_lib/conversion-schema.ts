import { z } from "zod";

export const conversionSchema = z.object({
  referralCode: z.string().regex(/^[A-Za-z0-9_-]{1,128}$/).describe("Custom referral code from the share URL."),
  externalReference: z.string().regex(/^(dodo|phonepe):[a-zA-Z0-9_-]{1,128}$/)
    .describe("Gateway-prefixed payment ID or merchant order ID."),
  subscribedAt: z.iso.datetime({ offset: true }).describe("Payment confirmation time."),
  paidAmount: z.number().positive().max(21_474_836.47)
    .refine((amount) => /^\d+(\.\d{1,2})?$/.test(amount.toString()), "Use at most two decimal places.")
    .describe("Amount charged in Indian rupees, with up to two decimal places. Send 999.50 for ₹999.50."),
  currency: z.literal("INR"),
});
