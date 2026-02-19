import type { Commit, RepoState } from "@/types/repo";

export interface ContributionDay {
  date: string; // ISO date string "YYYY-MM-DD"
  count: number;
  level: 0 | 1 | 2 | 3 | 4; // intensity: 0 = none, 4 = highest
}

export function generateCommitId(): string {
  // Use crypto.randomUUID() for guaranteed uniqueness.
  // Strip dashes and take 7 chars to mimic a git short hash.
  return crypto.randomUUID().replace(/-/g, "").slice(0, 7);
}

export function formatCommitDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getDateString(timestamp: number): string {
  return new Date(timestamp).toISOString().slice(0, 10);
}

function getDatesForPastWeeks(weeks: number): string[] {
  const dates: string[] = [];
  const today = new Date();
  const totalDays = weeks * 7;

  for (let i = totalDays - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(date.toISOString().slice(0, 10));
  }

  return dates;
}

export function buildContributionData(commits: Commit[]): ContributionDay[] {
  const dates = getDatesForPastWeeks(52);
  const countPerDay = new Map<string, number>();

  for (const commit of commits) {
    const dateStr = getDateString(commit.createdAt);
    countPerDay.set(dateStr, (countPerDay.get(dateStr) ?? 0) + 1);
  }

  const maxCount = Math.max(0, ...countPerDay.values());

  return dates.map((date) => {
    const count = countPerDay.get(date) ?? 0;
    let level: ContributionDay["level"] = 0;
    if (count > 0 && maxCount > 0) {
      const ratio = count / maxCount;
      if (ratio <= 0.25) level = 1;
      else if (ratio <= 0.5) level = 2;
      else if (ratio <= 0.75) level = 3;
      else level = 4;
    }
    return { date, count, level };
  });
}

export function calculateSuccessRate(commits: Commit[]): number {
  const resolved = commits.filter(
    (c) => c.status === "success" || c.status === "failed",
  );
  if (resolved.length === 0) return 0;
  const successes = commits.filter((c) => c.status === "success").length;
  return Math.round((successes / resolved.length) * 100);
}

export function calculateStreak(commits: Commit[]): number {
  if (commits.length === 0) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const uniqueDays = new Set(commits.map((c) => getDateString(c.createdAt)));
  let streak = 0;
  const cursor = new Date(today);

  // Allow streak to count if there's a commit today OR yesterday
  const todayStr = cursor.toISOString().slice(0, 10);
  const yesterday = new Date(cursor);
  yesterday.setDate(cursor.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().slice(0, 10);

  if (!uniqueDays.has(todayStr) && !uniqueDays.has(yesterdayStr)) {
    return 0;
  }

  // If no commit today, start counting from yesterday
  if (!uniqueDays.has(todayStr)) {
    cursor.setDate(cursor.getDate() - 1);
  }

  // Count consecutive days backwards
  while (uniqueDays.has(cursor.toISOString().slice(0, 10))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

export function exportRepoAsJson(state: RepoState): void {
  const json = JSON.stringify(state, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `commit-or-quit-backup-${Date.now()}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function parseImportedJson(raw: string): RepoState | null {
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !Array.isArray((parsed as RepoState).commits) ||
      !Array.isArray((parsed as RepoState).branches) ||
      typeof (parsed as RepoState).activeBranch !== "string"
    ) {
      return null;
    }
    return parsed as RepoState;
  } catch {
    return null;
  }
}
