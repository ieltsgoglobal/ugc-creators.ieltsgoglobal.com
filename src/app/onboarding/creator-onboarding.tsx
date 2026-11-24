"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Checkbox13 from "@/components/watermelon/checkbox-13";
import RadioGroup7 from "@/components/watermelon/radio-group-7";
import { OnboardingFieldError, OnboardingFieldLabel, OnboardingFields, OnboardingSetup, OnboardingSetupInput, OnboardingStepHeading } from "@/components/watermelon/onboarding-setup";

type CreatorField = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "url" | "number" | "checkbox" | "radio";
  required?: boolean;
  autoComplete?: string;
};

const STEPS: { title: string; fields: CreatorField[] }[] = [
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
const APPLICATION_FORM_ID = "creator-application";

export default function CreatorOnboarding() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const hasNavigated = useRef(false);
  useEffect(() => {
    if (hasNavigated.current) headingRef.current?.focus();
  }, [stepIndex, isComplete]);
  const step = STEPS[stepIndex];
  const isLastStep = stepIndex === STEPS.length - 1;

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
        step={stepIndex + 1} totalSteps={STEPS.length}
        imageUrl="https://i.pinimg.com/1200x/9f/36/44/9f36443e8b969ebc7dec9d9ed032cb1f.jpg"
        formId={APPLICATION_FORM_ID}
        action={isComplete ? undefined : isLastStep ? "Submit application" : "Continue"}
        onBack={stepIndex > 0 ? () => setStepIndex(stepIndex - 1) : undefined}>
      <section key={isComplete ? "complete" : step.title}>
        <OnboardingFields>
        <OnboardingStepHeading headingRef={headingRef} title={isComplete ? "Preview complete" : step.title} />
        {isComplete ? <p role="status">Your application hasn’t been sent.</p> : (
          <form id={APPLICATION_FORM_ID} onSubmit={advance}>
            <OnboardingFields>
            {stepIndex === 1 && <p>Use your own Instagram account.</p>}
            {step.fields.map((field) => <OnboardingField key={field.name} field={field}
              value={answers[field.name] ?? ""} onChange={(value) => updateAnswer(field.name, value)} />)}
            </OnboardingFields>
          </form>
        )}
        </OnboardingFields>
      </section>
      </OnboardingSetup>
  );
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
        input.setCustomValidity(field.name === "instagramUrl" && input.value && !INSTAGRAM_PROFILE.test(input.value)
          ? "Enter an Instagram profile URL, such as https://www.instagram.com/yourname/." : "");
        if (error) setError(input.validationMessage);
        onChange(input.value);
      }} />
    {error && <OnboardingFieldError id={field.name + "-error"}>{error}</OnboardingFieldError>}
  </div>;
}
