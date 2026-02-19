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
          <div className="flex gap-1.5">
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
          className="bg-background/50 border border-border/50 p-4 min-h-64 font-mono text-xs md:text-sm leading-6"
          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
        >
          {displayedLines.map((line, index) => (
            <div key={index} className={getLineColor(line.type)}>
              {line.text || "\u00A0"}
            </div>
          ))}

          {!isDone && currentLine && (
            <div className={getLineColor(currentLine.type)}>
              {currentText}
              <span className="animate-pulse text-primary">█</span>
            </div>
          )}

          {isDone && (
            <div className="text-primary mt-1">
              <span className="animate-pulse">█</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
