import type { ReactNode } from "react";

export type CreatorField = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "url" | "number" | "checkbox" | "radio";
  required?: boolean;
  autoComplete?: string;
};

export type OnboardingStepProps = {
  renderField: (field: CreatorField) => ReactNode;
};
