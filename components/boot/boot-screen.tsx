"use client";

import { useEffect, useState } from "react";

import {
  BLANK_LINE_PAUSE,
  BOOT_SEQUENCE,
  COMMAND_CHAR_DELAY,
  COMMAND_LINE_PAUSE,
  DONE_TRANSITION_DELAY,
  OUTPUT_CHAR_DELAY,
  OUTPUT_LINE_PAUSE,
  PROGRESS_PERCENTAGE_MULTIPLIER,
  type BootLine,
} from "./boot-sequence";
import { BootProgress } from "./boot-progress";
import { BootTerminal } from "./boot-terminal";

interface BootScreenProps {
  onComplete: () => void;
}

export function BootScreen({ onComplete }: BootScreenProps) {
  const [displayedLines, setDisplayedLines] = useState<BootLine[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");

  const isDone = currentLineIndex >= BOOT_SEQUENCE.length;
  const progress =
    (currentLineIndex / BOOT_SEQUENCE.length) * PROGRESS_PERCENTAGE_MULTIPLIER;

  const currentLine =
    currentLineIndex < BOOT_SEQUENCE.length
      ? BOOT_SEQUENCE[currentLineIndex]
      : null;

  useEffect(() => {
    if (isDone) {
      const timeout = setTimeout(onComplete, DONE_TRANSITION_DELAY);
      return () => clearTimeout(timeout);
    }

    const line = BOOT_SEQUENCE[currentLineIndex];

    if (line.type === "blank") {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, line]);
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentText("");
      }, BLANK_LINE_PAUSE);
      return () => clearTimeout(timeout);
    }

    if (currentText.length < line.text.length) {
      const charDelay =
        line.type === "command" ? COMMAND_CHAR_DELAY : OUTPUT_CHAR_DELAY;
      const timeout = setTimeout(() => {
        setCurrentText(line.text.slice(0, currentText.length + 1));
      }, charDelay);
      return () => clearTimeout(timeout);
    }

    const linePause =
      line.type === "command" ? COMMAND_LINE_PAUSE : OUTPUT_LINE_PAUSE;
    const timeout = setTimeout(() => {
      setDisplayedLines((prev) => [...prev, line]);
      setCurrentLineIndex((prev) => prev + 1);
      setCurrentText("");
    }, linePause);
    return () => clearTimeout(timeout);
  }, [currentLineIndex, currentText, isDone, onComplete]);

  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center overflow-hidden p-4 lg:p-8 z-50 h-[100dvh]">
      <div className="w-full max-w-2xl flex flex-col gap-3 lg:gap-6 my-auto">
        {/* Title */}
        <div className="text-center shrink-0">
          <h1 className="retro text-sm md:text-base lg:text-xl text-primary animate-pulse">
            COMMIT OR QUIT
          </h1>
          <p className="retro text-[0.4rem] md:text-[0.5rem] lg:text-[0.625rem] text-muted-foreground mt-1">
            life.git — version control for your decisions
          </p>
        </div>

        <BootTerminal
          displayedLines={displayedLines}
          currentLine={currentLine}
          currentText={currentText}
          isDone={isDone}
        />

        <div className="shrink-0">
          <BootProgress progress={progress} isDone={isDone} />
        </div>

        {/* Skip hint */}
        <button
          onClick={onComplete}
          className="retro text-[0.4rem] md:text-[0.5rem] text-muted-foreground/40 hover:text-muted-foreground transition-colors cursor-pointer text-center shrink-0"
        >
          [ PRESS TO SKIP ]
        </button>
      </div>
    </div>
  );
}
