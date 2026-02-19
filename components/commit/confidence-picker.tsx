import { Label } from "@/components/ui/8bit/label";

const CONFIDENCE_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

interface ConfidencePickerProps {
  value: number;
  onChange: (value: number) => void;
}

export function ConfidencePicker({ value, onChange }: ConfidencePickerProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-xs">Confidence: {value}/10</Label>
      <div className="flex gap-1 flex-wrap">
        {CONFIDENCE_OPTIONS.map((n) => (
          <button
            key={n}
            onClick={() => onChange(n)}
            className={`w-8 h-8 text-xs border transition-colors ${
              value === n
                ? "bg-[oklch(0.72_0.2_142)] text-black border-[oklch(0.72_0.2_142)]"
                : "border-border hover:border-[oklch(0.72_0.2_142)] text-muted-foreground"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}
