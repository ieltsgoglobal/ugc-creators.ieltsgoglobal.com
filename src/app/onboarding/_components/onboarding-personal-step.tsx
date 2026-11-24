import { ONBOARDING_STEPS } from "../_lib/onboarding-schema";
import type { OnboardingStepProps } from "../_lib/onboarding-types";

export default function OnboardingPersonalStep({ renderField }: OnboardingStepProps) {
  return <>{ONBOARDING_STEPS[0].fields.map(renderField)}</>;
}
