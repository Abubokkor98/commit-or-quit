import { parseImportedJson } from "@/lib/repo-utils";
import type { RepoState } from "@/types/repo";
import { DEFAULT_BRANCH_NAME } from "@/types/repo";

const STORAGE_KEY = "commit-or-quit-repo";

export function getDefaultRepoState(): RepoState {
  return {
    commits: [],
    branches: [{ name: DEFAULT_BRANCH_NAME, createdAt: Date.now() }],
    activeBranch: DEFAULT_BRANCH_NAME,
  };
}

export function loadRepo(): RepoState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultRepoState();
    const parsed = parseImportedJson(raw);
    return parsed ?? getDefaultRepoState();
  } catch {
    return getDefaultRepoState();
  }
}

export function saveRepo(state: RepoState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage can be full or unavailable — fail silently
  }
}

export function clearRepo(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // fail silently
  }
}
