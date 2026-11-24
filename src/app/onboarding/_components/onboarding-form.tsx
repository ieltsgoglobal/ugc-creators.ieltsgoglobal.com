"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { submitCreatorApplication } from "../_actions/submit-creator-application";
import OnboardingPersonalStep from "./onboarding-personal-step";
import OnboardingSocialStep from "./onboarding-social-step";
import OnboardingReviewStep from "./onboarding-review-step";
import OnboardingProgress from "./onboarding-progress";
import { getInstagramProfileError, ONBOARDING_STEPS } from "../_lib/onboarding-schema";
import type { CreatorField, OnboardingStepProps } from "../_lib/onboarding-types";
import Checkbox13 from "@/components/watermelon/checkbox-13";
import RadioGroup7 from "@/components/watermelon/radio-group-7";
import { OnboardingFieldError, OnboardingFieldLabel, OnboardingFields, OnboardingApplicationSetup, OnboardingSetupInput, OnboardingStepHeading } from "@/components/watermelon/onboarding-setup";

const APPLICATION_FORM_ID = "creator-application";

export default function OnboardingForm({ fullName, email, hasApplication }: {
  fullName: string;
  email: string;
  hasApplication: boolean;
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({ fullName, email });
  const [isComplete, setIsComplete] = useState(hasApplication);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
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

  async function advance(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;
    setSubmissionError("");
    hasNavigated.current = true;
    if (!isLastStep) {
      setStepIndex(stepIndex + 1);
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await submitCreatorApplication(answers);
      if (result.error) {
        setSubmissionError(result.error);
        if ("stepIndex" in result && typeof result.stepIndex === "number") setStepIndex(result.stepIndex);
      } else setIsComplete(true);
    } catch {
      setSubmissionError("Your application couldn’t be saved. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
      <OnboardingApplicationSetup title="Creator application"
        progress={<OnboardingProgress step={stepIndex + 1} totalSteps={ONBOARDING_STEPS.length} />}
        formId={APPLICATION_FORM_ID}
        action={isComplete ? undefined : isSubmitting ? "Submitting…" : isLastStep ? "Submit application" : "Continue"}
        isSubmitting={isSubmitting}
        onBack={stepIndex > 0 && !isSubmitting ? () => setStepIndex(stepIndex - 1) : undefined}>
      <section key={isComplete ? "complete" : step.title}>
        <OnboardingFields>
        <OnboardingStepHeading headingRef={headingRef} title={isComplete ? "Application submitted" : step.title} />
        {isComplete ? <div className="space-y-4">
          <p role="status" className="text-sm text-muted-foreground">We’ve received your creator application.</p>
          <Link href="/dashboard" className="inline-flex min-h-11 items-center bg-primary px-4 font-mono text-xs font-bold tracking-wide text-primary-foreground uppercase hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">Go to dashboard</Link>
        </div> : (
          <form id={APPLICATION_FORM_ID} onSubmit={advance}>
            <OnboardingFields>
              <ActiveStep renderField={(field) => <OnboardingField key={field.name} field={field}
                value={answers[field.name] ?? ""} onChange={(value) => updateAnswer(field.name, value)} />} />
            </OnboardingFields>
            {submissionError && <OnboardingFieldError>
              {submissionError} {submissionError.startsWith("Sign in") && <Link href="/auth" className="underline">Continue to sign in</Link>}
            </OnboardingFieldError>}
          </form>
        )}
        </OnboardingFields>
      </section>
      </OnboardingApplicationSetup>
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
    <OnboardingSetupInput id={field.name} name={field.name} type={field.type ?? "text"} required={field.required} readOnly={field.name === "email"}
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
