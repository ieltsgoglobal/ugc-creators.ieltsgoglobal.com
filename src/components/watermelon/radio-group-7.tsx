"use client";

export default function RadioGroup7({ name, label, value, onChange }: {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium">{label}</legend>
      <div className="flex items-center gap-4">
        {["Yes", "No"].map((option) => (
          <label key={option} className="border-border bg-card flex items-center gap-2 rounded-sm border px-4 py-2 text-sm shadow-sm">
            <input type="radio" name={name} value={option} checked={value === option}
              onChange={() => onChange(option)} className="accent-emerald-600" />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
