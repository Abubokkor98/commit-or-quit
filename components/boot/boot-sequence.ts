export interface BootLine {
  text: string;
  type: "command" | "output" | "system" | "success" | "welcome" | "blank";
}

export const BOOT_SEQUENCE: BootLine[] = [
  { text: "$ git init life", type: "command" },
  {
    text: "Initialized empty Life repository in /home/you/.life/",
    type: "output",
  },
  { text: "$ git checkout -b main", type: "command" },
  { text: "Switched to a new branch 'main'", type: "output" },
  { text: "$ git remote add origin your-brain", type: "command" },
  { text: "$ git status", type: "command" },
  { text: "On branch main", type: "output" },
  { text: "Your life is ready to commit changes.", type: "output" },
  { text: "", type: "blank" },
  { text: "Loading Commit or Quit v1.0.0...", type: "system" },
  { text: "✓ Storage initialized", type: "success" },
  { text: "✓ Branch manager ready", type: "success" },
  { text: "✓ Contribution tracker online", type: "success" },
  { text: "✓ All systems operational", type: "success" },
  { text: "", type: "blank" },
  { text: "Welcome, Developer. Your life repo is waiting.", type: "welcome" },
];

export const COMMAND_CHAR_DELAY = 45;
export const OUTPUT_CHAR_DELAY = 20;
export const COMMAND_LINE_PAUSE = 300;
export const OUTPUT_LINE_PAUSE = 80;
export const BLANK_LINE_PAUSE = 120;
export const DONE_TRANSITION_DELAY = 1200;
export const PROGRESS_PERCENTAGE_MULTIPLIER = 100;

export function getLineColor(type: BootLine["type"]): string {
  switch (type) {
    case "command":
      return "text-primary";
    case "success":
      return "text-primary/80";
    case "welcome":
      return "text-yellow-400 font-bold";
    case "system":
      return "text-muted-foreground";
    case "output":
      return "text-foreground/60";
    case "blank":
      return "";
  }
}
