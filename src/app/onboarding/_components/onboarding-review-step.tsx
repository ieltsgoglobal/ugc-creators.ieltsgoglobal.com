import { ONBOARDING_STEPS } from "../_lib/onboarding-schema";
import type { OnboardingStepProps } from "../_lib/onboarding-types";

export default function OnboardingReviewStep({ renderField }: OnboardingStepProps) {
  return <>{ONBOARDING_STEPS[3].fields.map(renderField)}</>;
}
