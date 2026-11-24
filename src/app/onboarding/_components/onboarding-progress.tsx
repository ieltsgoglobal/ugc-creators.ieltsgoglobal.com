export default function OnboardingProgress({ step, totalSteps }: { step: number; totalSteps: number }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-muted-foreground">
      <span>Step {step} of {totalSteps}</span>
      <div aria-hidden="true" className="flex gap-1.5">
        {Array.from({ length: totalSteps }, (_, index) => (
          <span key={index} className={`h-1 w-8 transition-colors sm:w-12 ${index < step ? "bg-primary" : "bg-foreground/15"}`} />
        ))}
      </div>
    </div>
  );
}
