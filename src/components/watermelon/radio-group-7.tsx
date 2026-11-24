"use client";

export default function RadioGroup7({ name, label, value, onChange }: {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="font-mono text-xs text-muted-foreground">{label}</legend>
      <div className="grid max-w-xs grid-cols-2 gap-2">
        {["Yes", "No"].map((option) => (
          <label key={option} className="flex min-h-11 cursor-pointer items-center gap-2 border border-foreground/15 px-3 font-mono text-sm hover:border-primary/50 has-checked:border-primary/50 has-checked:bg-primary/10 focus-within:outline-2 focus-within:outline-ring">
            <input type="radio" name={name} value={option} checked={value === option}
              onChange={() => onChange(option)} className="accent-primary" />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
