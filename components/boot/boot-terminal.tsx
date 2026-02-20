import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/8bit/card";

import { getLineColor, type BootLine } from "./boot-sequence";

interface BootTerminalProps {
  displayedLines: BootLine[];
  currentLine: BootLine | null;
  currentText: string;
  isDone: boolean;
}

export function BootTerminal({
  displayedLines,
  currentLine,
  currentText,
  isDone,
}: BootTerminalProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-xs">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
          </div>
          <span className="retro text-[0.5rem] text-muted-foreground ml-1">
            commit-or-quit — bash
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          role="log"
          aria-label="Boot sequence output"
          aria-live="polite"
          className="retro bg-background/50 border border-border/50 p-2 md:p-3 lg:p-4 h-[calc(100dvh-300px)] lg:h-[365px] max-h-[365px] overflow-hidden text-[8px] md:text-[10px] lg:text-xs leading-4 md:leading-5"
        >
          {displayedLines.map((line, index) => (
            <div key={index} className={getLineColor(line.type)}>
              {line.text || "\u00A0"}
            </div>
          ))}

          {!isDone && currentLine && (
            <div className={getLineColor(currentLine.type)}>
              {currentText}
              <span className="cursor-blink text-primary">█</span>
            </div>
          )}

          {isDone && (
            <div className="text-primary mt-1">
              <span className="cursor-blink">█</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
