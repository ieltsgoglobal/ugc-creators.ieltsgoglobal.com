import type { CreatorField } from "./onboarding-types";

export const ONBOARDING_STEPS: { title: string; fields: CreatorField[] }[] = [
  { title: "Personal Details", fields: [
    { name: "fullName", label: "Full name", required: true, autoComplete: "name" },
    { name: "email", label: "Email address", type: "email", required: true, autoComplete: "email" },
    { name: "whatsapp", label: "WhatsApp number", type: "tel", required: true, autoComplete: "tel" },
    { name: "country", label: "Country", required: true, autoComplete: "country-name" },
    { name: "age", label: "I confirm that I am 18 or older", type: "checkbox", required: true },
  ] },
  { title: "Social Media", fields: [
    { name: "instagramUsername", label: "Instagram username", required: true },
    { name: "instagramUrl", label: "Instagram profile URL", type: "url", required: true },
    { name: "followers", label: "Number of followers", type: "number" },
    { name: "platforms", label: "Other platforms (YouTube, TikTok, etc.)" },
    { name: "niche", label: "Content niche (IELTS, study abroad, education, lifestyle, etc.)" },
    { name: "promotionalExperience", label: "Have you created promotional videos before?", type: "radio" },
  ] },
  { title: "Creator Preferences", fields: [
    { name: "language", label: "Preferred content language" },
    { name: "audienceCountry", label: "Country of target audience" },
    { name: "onCamera", label: "Are you comfortable appearing on camera?", type: "radio" },
    { name: "weeklyVideos", label: "How many videos can you create per week?", type: "number" },
    { name: "promotionAccount", label: "Do you already have an Instagram account for promoting IELTS Go Global?", type: "radio" },
  ] },
  { title: "Agreement", fields: [
    { name: "terms", label: "Accept creator program terms", type: "checkbox", required: true },
    { name: "payout", label: "Agree to commission and payout conditions", type: "checkbox", required: true },
    { name: "disclosure", label: "Agree to disclose sponsored or affiliate content", type: "checkbox", required: true },
  ] },
];

const INSTAGRAM_PROFILE = /^https?:\/\/(?:www\.)?instagram\.com\/[\w.]+\/?(?:[?#].*)?$/i;

export function getInstagramProfileError(value: string) {
  return value && !INSTAGRAM_PROFILE.test(value)
    ? "Enter an Instagram profile URL, such as https://www.instagram.com/yourname/."
    : "";
}
