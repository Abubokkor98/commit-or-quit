import type { Metadata } from "next";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/8bit/card";
import { Button } from "@/components/ui/8bit/button";
import "@/components/ui/8bit/styles/retro.css";

export const metadata: Metadata = {
  title: "404 - Merge Conflict | Commit or Quit",
};

const TERMINAL_LINES = [
  { text: "$ git checkout this-page", type: "command" },
  {
    text: "error: pathspec 'this-page' did not match any file(s) known to git",
    type: "error",
  },
  { text: "", type: "blank" },
  { text: "$ git status", type: "command" },
  { text: "On branch main", type: "output" },
  { text: "Your branch is lost in the void.", type: "muted" },
  { text: "", type: "blank" },
  { text: "$ git merge reality", type: "command" },
  { text: "CONFLICT (content): Merge conflict in life.", type: "error" },
  {
    text: "Automatic merge failed; fix conflicts and commit.",
    type: "error",
  },
] as const;

type LineType = (typeof TERMINAL_LINES)[number]["type"];

const LINE_COLOR_MAP: Record<LineType, string> = {
  command: "text-yellow-400",
  error: "text-red-400",
  output: "text-foreground",
  muted: "text-muted-foreground",
  blank: "",
};

export default function NotFound() {
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center overflow-hidden p-4 lg:p-8 h-dvh">
      <div className="w-full max-w-2xl flex flex-col gap-3 lg:gap-6 my-auto">
        {/* Title */}
        <div className="text-center shrink-0">
          <h1 className="retro text-sm md:text-base lg:text-xl text-destructive animate-pulse">
            404 — MERGE CONFLICT
          </h1>
          <p className="retro text-[0.4rem] md:text-[0.5rem] lg:text-[0.625rem] text-muted-foreground mt-1">
            the page you&apos;re looking for has been force-pushed into oblivion
          </p>
        </div>

        {/* Terminal Card */}
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
              aria-label="404 error terminal output"
              className="retro bg-background/50 border border-border/50 p-2 md:p-3 lg:p-4 text-[8px] md:text-[10px] lg:text-xs leading-4 md:leading-5"
            >
              {TERMINAL_LINES.map((line, index) => (
                <div key={index} className={LINE_COLOR_MAP[line.type]}>
                  {line.text || "\u00A0"}
                </div>
              ))}
              <div className="text-primary mt-1">
                <span className="cursor-blink">█</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action */}
        <div className="flex justify-center shrink-0">
          <Button asChild>
            <Link href="/" className="retro text-[0.5rem] md:text-xs">
              git checkout home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
