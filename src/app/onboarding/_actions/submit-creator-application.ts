"use server";

import { call, ORPCError } from "@orpc/server";
import type { input } from "zod";
import { ONBOARDING_STEPS } from "../_lib/onboarding-schema";
import { creatorApplicationInput } from "../_lib/creator-application-input";
import { submitCreatorApplicationProcedure } from "../_lib/submit-creator-application-procedure";

export async function submitCreatorApplication(answers: Record<string, string>) {
  try {
    await call(submitCreatorApplicationProcedure, answers as input<typeof creatorApplicationInput>);
    return { error: "" };
  } catch (error) {
    if (error instanceof ORPCError) {
      if (error.code === "UNAUTHORIZED") {
        return { error: "Sign in with Google again to submit. Leaving this page clears unsaved answers." };
      }
      if (error.code === "CONFLICT") {
        return { error: "A creator profile already exists for this email address." };
      }
      if (error.code === "BAD_REQUEST") {
        const result = creatorApplicationInput.safeParse(answers);
        if (!result.success) {
          const fieldName = result.error.issues[0]?.path[0];
          const stepIndex = ONBOARDING_STEPS.findIndex((step) => step.fields.some((field) => field.name === fieldName));
          const field = ONBOARDING_STEPS[stepIndex]?.fields.find((field) => field.name === fieldName);
          if (field) return { error: `Check the answer for ${field.label}.`, stepIndex };
        }
        return { error: "Check your application answers and try again." };
      }
    }
    return { error: "Your application couldn’t be saved. Please try again." };
  }
}
