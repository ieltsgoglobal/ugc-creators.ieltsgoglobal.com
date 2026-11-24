import { ONBOARDING_STEPS } from "../_lib/onboarding-schema";
import type { OnboardingStepProps } from "../_lib/onboarding-types";

export default function OnboardingSocialStep({ renderField }: OnboardingStepProps) {
  return <><p>Use your own Instagram account.</p>{ONBOARDING_STEPS[1].fields.map(renderField)}</>;
}
