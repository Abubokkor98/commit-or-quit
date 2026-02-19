import { Progress } from "@/components/ui/8bit/progress";

interface BootProgressProps {
  progress: number;
  isDone: boolean;
}

export function BootProgress({ progress, isDone }: BootProgressProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="retro text-[0.5rem] text-muted-foreground">
          {isDone ? "BOOT COMPLETE" : "INITIALIZING..."}
        </span>
        <span className="retro text-[0.5rem] text-muted-foreground">
          {Math.round(progress)}%
        </span>
      </div>
      <Progress
        value={progress}
        variant="retro"
        className="h-3"
        progressBg="bg-primary"
      />
    </div>
  );
}
