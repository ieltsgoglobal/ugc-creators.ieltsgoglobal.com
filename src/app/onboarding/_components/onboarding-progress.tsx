export default function OnboardingProgress({ step, totalSteps }: { step: number; totalSteps: number }) {
  return (
    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
      <span>Step {step} of {totalSteps}</span>
      <div aria-hidden="true" className="ml-2 flex gap-1">
        {Array.from({ length: totalSteps }, (_, index) => (
          <span key={index} className={`h-4 w-1 rounded-full transition-colors ${index < step ? "bg-[#ff6a32]" : "bg-[#E5E5ED] dark:bg-[#222]"}`} />
        ))}
      </div>
    </div>
  );
}
