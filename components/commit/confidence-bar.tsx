import { Progress } from "@/components/ui/8bit/progress";

const MAX_CONFIDENCE = 10;
const PROGRESS_PERCENTAGE_MULTIPLIER = 100;

interface ConfidenceBarProps {
  confidence: number;
}

export function ConfidenceBar({ confidence }: ConfidenceBarProps) {
  const percentage =
    (confidence / MAX_CONFIDENCE) * PROGRESS_PERCENTAGE_MULTIPLIER;

  return (
    <div className="px-4 pb-4 border-t border-border/50 pt-3">
      <p className="text-[10px] text-muted-foreground mb-2">Confidence level</p>
      <Progress
        value={percentage}
        variant="retro"
        className="h-3"
        progressBg="bg-[oklch(0.72_0.2_142)]"
      />
    </div>
  );
}
