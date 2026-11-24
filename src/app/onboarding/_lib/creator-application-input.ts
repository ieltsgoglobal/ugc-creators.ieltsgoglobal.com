import { z } from "zod";
import { getInstagramProfileError } from "./onboarding-schema";

const requiredText = z.string().trim().min(1).max(2048);
const optionalText = z.string().trim().max(2048).optional().transform((value) => value || null);
const optionalChoice = z.enum(["Yes", "No", ""]).optional()
  .transform((value) => value ? value === "Yes" : null);
const optionalCount = z.string().trim().refine((value) =>
  !value || (Number.isInteger(Number(value)) && Number(value) >= 0 && Number(value) <= 2147483647),
).optional().transform((value) => value ? Number(value) : null);
const confirmation = z.literal("yes").transform(() => true);

export const creatorApplicationInput = z.object({
  fullName: requiredText,
  whatsapp: requiredText,
  country: requiredText,
  age: confirmation,
  instagramUsername: requiredText,
  instagramUrl: requiredText.refine((value) => !getInstagramProfileError(value)),
  followers: optionalCount,
  platforms: optionalText,
  niche: optionalText,
  promotionalExperience: optionalChoice,
  language: optionalText,
  audienceCountry: optionalText,
  onCamera: optionalChoice,
  weeklyVideos: optionalCount,
  promotionAccount: optionalChoice,
  terms: confirmation,
  payout: confirmation,
  disclosure: confirmation,
});
