"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import OnboardingPersonalStep from "./onboarding-personal-step";
import OnboardingSocialStep from "./onboarding-social-step";
import OnboardingReviewStep from "./onboarding-review-step";
import OnboardingProgress from "./onboarding-progress";
import { getInstagramProfileError, ONBOARDING_STEPS } from "../_lib/onboarding-schema";
import type { CreatorField, OnboardingStepProps } from "../_lib/onboarding-types";
import Checkbox13 from "@/components/watermelon/checkbox-13";
import RadioGroup7 from "@/components/watermelon/radio-group-7";
import { OnboardingFieldError, OnboardingFieldLabel, OnboardingFields, OnboardingSetup, OnboardingSetupInput, OnboardingStepHeading } from "@/components/watermelon/onboarding-setup";

const APPLICATION_FORM_ID = "creator-application";

export default function OnboardingForm({ imageUrl }: { imageUrl: string }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const hasNavigated = useRef(false);
  useEffect(() => {
    if (hasNavigated.current) headingRef.current?.focus();
  }, [stepIndex, isComplete]);
  const step = ONBOARDING_STEPS[stepIndex];
  const isLastStep = stepIndex === ONBOARDING_STEPS.length - 1;
  const ActiveStep = [OnboardingPersonalStep, OnboardingSocialStep, OnboardingPreferencesStep, OnboardingReviewStep][stepIndex];

  function updateAnswer(name: string, value: string) {
    setAnswers((previous) => ({ ...previous, [name]: value }));
  }

  function advance(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    hasNavigated.current = true;
    if (isLastStep) setIsComplete(true);
    else setStepIndex(stepIndex + 1);
  }

  return (
      <OnboardingSetup title="Creator onboarding" subtitle="IELTS Go Global"
        progress={<OnboardingProgress step={stepIndex + 1} totalSteps={ONBOARDING_STEPS.length} />}
        imageUrl={imageUrl}
        formId={APPLICATION_FORM_ID}
        action={isComplete ? undefined : isLastStep ? "Submit application" : "Continue"}
        onBack={stepIndex > 0 ? () => setStepIndex(stepIndex - 1) : undefined}>
      <section key={isComplete ? "complete" : step.title}>
        <OnboardingFields>
        <OnboardingStepHeading headingRef={headingRef} title={isComplete ? "Preview complete" : step.title} />
        {isComplete ? <p role="status">Your application hasn’t been sent.</p> : (
          <form id={APPLICATION_FORM_ID} onSubmit={advance}>
            <OnboardingFields>
              <ActiveStep renderField={(field) => <OnboardingField key={field.name} field={field}
                value={answers[field.name] ?? ""} onChange={(value) => updateAnswer(field.name, value)} />} />
            </OnboardingFields>
          </form>
        )}
        </OnboardingFields>
      </section>
      </OnboardingSetup>
  );
}

function OnboardingPreferencesStep({ renderField }: OnboardingStepProps) {
  return <>{ONBOARDING_STEPS[2].fields.map(renderField)}</>;
}

function OnboardingField({ field, value, onChange }: { field: CreatorField; value: string; onChange: (value: string) => void }) {
  const [error, setError] = useState("");
  const label = field.label + (field.required ? " *" : "");
  if (field.type === "radio") {
    return <RadioGroup7 name={field.name} label={label} value={value} onChange={onChange} />;
  }
  if (field.type === "checkbox") {
    return <div>
        <Checkbox13 id={field.name} name={field.name} label={label} required={field.required} checked={value === "yes"}
          aria-invalid={Boolean(error)} aria-describedby={error ? field.name + "-error" : undefined}
          onInvalid={() => setError("Select this checkbox to continue.")}
          onChange={(event) => { setError(""); onChange(event.currentTarget.checked ? "yes" : ""); }} />
      {error && <OnboardingFieldError id={field.name + "-error"}>{error}</OnboardingFieldError>}
    </div>;
  }
  return <div>
    <OnboardingFieldLabel htmlFor={field.name}>{label}</OnboardingFieldLabel>
    <OnboardingSetupInput id={field.name} name={field.name} type={field.type ?? "text"} required={field.required}
      aria-invalid={Boolean(error)} aria-describedby={error ? field.name + "-error" : undefined}
      onInvalid={(event) => setError(event.currentTarget.validationMessage)}
      autoComplete={field.autoComplete} min={field.type === "number" ? 0 : undefined}
      pattern={field.required && (!field.type || field.type === "tel") ? ".*\\S.*" : undefined}
      value={value} onChange={(event) => {
        const input = event.currentTarget;
        input.setCustomValidity(field.name === "instagramUrl" ? getInstagramProfileError(input.value) : "");
        if (error) setError(input.validationMessage);
        onChange(input.value);
      }} />
    {error && <OnboardingFieldError id={field.name + "-error"}>{error}</OnboardingFieldError>}
  </div>;
}
