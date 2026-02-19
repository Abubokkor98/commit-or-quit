"use client";

import { useMemo } from "react";

import type { ContributionDay } from "@/lib/repo-utils";
import type { Commit } from "@/types/repo";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/8bit/tooltip";
import { buildContributionData } from "@/hooks/useLifeRepo";

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

interface ContributionGraphProps {
  commits: Commit[];
}

const MIN_COLUMN_GAP = 3;

function getMonthPositions(
  days: ContributionDay[],
): { label: string; col: number }[] {
  const positions: { label: string; col: number }[] = [];
  let lastMonth = -1;
  let lastCol = -MIN_COLUMN_GAP;

  days.forEach((day, index) => {
    const col = Math.floor(index / 7);
    const month = new Date(day.date).getMonth();
    if (month !== lastMonth) {
      // Skip labels too close to the previous one to prevent overlap
      if (col - lastCol >= MIN_COLUMN_GAP) {
        positions.push({ label: MONTH_LABELS[month], col });
        lastCol = col;
      }
      lastMonth = month;
    }
  });

  return positions;
}

function TooltipCell({ day }: { day: ContributionDay }) {
  const label = `${day.count} commit${day.count !== 1 ? "s" : ""} on ${new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;

  return (
    <Tooltip>
      <TooltipTrigger>
        <div
          className={`w-3 h-3 rounded-[1px] cursor-default transition-opacity hover:opacity-70 contribution-level-${day.level}`}
        />
      </TooltipTrigger>
      <TooltipContent font="normal" side="top" className="text-xs">
        {label}
      </TooltipContent>
    </Tooltip>
  );
}

export function ContributionGraph({ commits }: ContributionGraphProps) {
  const days = useMemo(() => buildContributionData(commits), [commits]);
  const weeks = useMemo(() => {
    const result: ContributionDay[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      result.push(days.slice(i, i + 7));
    }
    return result;
  }, [days]);

  const monthPositions = useMemo(() => getMonthPositions(days), [days]);

  const totalThisYear = useMemo(
    () => days.reduce((sum, day) => sum + day.count, 0),
    [days],
  );

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-center justify-between mb-3">
        <p
          className="text-[10px] text-muted-foreground"
          style={{ fontFamily: "'Press Start 2P', monospace" }}
        >
          CONTRIBUTIONS
        </p>
        <p className="text-[10px] text-muted-foreground">
          {totalThisYear} commits in the last year
        </p>
      </div>

      <div className="inline-flex flex-col gap-1 min-w-max">
        {/* Month labels */}
        <div className="relative h-4 ml-7">
          {monthPositions.map(({ label, col }, idx) => (
            <span
              key={idx}
              className="text-[9px] text-muted-foreground absolute whitespace-nowrap"
              style={{ left: `${col * 16}px` }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Grid — day rows × week cols */}
        <div className="flex gap-1">
          {/* Day-of-week labels */}
          <div className="flex flex-col gap-1 mr-1">
            {DAY_LABELS.map((label, i) => (
              <div
                key={i}
                className="text-[9px] text-muted-foreground w-6 text-right leading-3 h-3"
              >
                {label}
              </div>
            ))}
          </div>

          {/* Week columns */}
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((day, dayIndex) => (
                <TooltipCell key={dayIndex} day={day} />
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1 mt-2 self-end">
          <span className="text-[9px] text-muted-foreground mr-1">Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`w-3 h-3 rounded-[1px] contribution-level-${level}`}
            />
          ))}
          <span className="text-[9px] text-muted-foreground ml-1">More</span>
        </div>
      </div>
    </div>
  );
}
