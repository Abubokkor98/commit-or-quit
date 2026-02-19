"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  buildContributionData,
  calculateStreak,
  calculateSuccessRate,
  exportRepoAsJson,
  generateCommitId,
  parseImportedJson,
} from "@/lib/repo-utils";
import {
  clearRepo,
  getDefaultRepoState,
  loadRepo,
  saveRepo,
} from "@/lib/storage";
import type {
  Branch,
  Commit,
  CommitCategory,
  CommitMood,
  CommitStatus,
  RepoState,
} from "@/types/repo";

interface CreateCommitInput {
  message: string;
  category: CommitCategory;
  mood?: CommitMood;
  confidence?: number;
}

interface UseLifeRepoReturn {
  // State
  repo: RepoState;
  activeBranch: string;
  branches: Branch[];
  commits: Commit[]; // commits for the active branch only

  // Commit actions
  createCommit: (input: CreateCommitInput) => void;
  updateCommitStatus: (commitId: string, status: CommitStatus) => void;
  revertCommit: (commitId: string) => void;
  deleteCommit: (commitId: string) => void;

  // Branch actions
  createBranch: (name: string) => boolean; // returns false if branch already exists
  switchBranch: (name: string) => void;

  // Repo data operations
  exportRepo: () => void;
  importRepo: (jsonString: string) => boolean; // returns false on parse failure
  resetRepo: () => void;

  // Derived stats
  totalCommits: number;
  successRate: number;
  currentStreak: number;
  totalBranches: number;
}

export function useLifeRepo(): UseLifeRepoReturn {
  // Lazy initializer: read from localStorage immediately on the client.
  // Falls back to default state during SSR (window is unavailable server-side).
  const [repo, setRepo] = useState<RepoState>(() => {
    if (typeof window === "undefined") return getDefaultRepoState();
    return loadRepo();
  });

  // Skip the very first save — the initial state was just loaded from localStorage,
  // so saving it back immediately is redundant. This also prevents the edge case
  // where a hydration re-render could overwrite stored data.
  const isFirstRender = useRef(true);

  // Persist to localStorage on every state change after the initial load
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    saveRepo(repo);
  }, [repo]);

  const activeBranch = repo.activeBranch;
  const branches = repo.branches;

  const commits = useMemo(
    () =>
      repo.commits
        .filter((c) => c.branch === activeBranch)
        .sort((a, b) => b.createdAt - a.createdAt),
    [repo.commits, activeBranch],
  );

  const createCommit = useCallback(
    (input: CreateCommitInput) => {
      const newCommit: Commit = {
        id: generateCommitId(),
        message: input.message,
        branch: activeBranch,
        category: input.category,
        mood: input.mood,
        confidence: input.confidence,
        status: "in-progress",
        createdAt: Date.now(),
      };
      setRepo((prev) => ({ ...prev, commits: [newCommit, ...prev.commits] }));
    },
    [activeBranch],
  );

  const updateCommitStatus = useCallback(
    (commitId: string, status: CommitStatus) => {
      setRepo((prev) => ({
        ...prev,
        commits: prev.commits.map((c) =>
          c.id === commitId ? { ...c, status } : c,
        ),
      }));
    },
    [],
  );

  const revertCommit = useCallback(
    (commitId: string) => {
      const original = repo.commits.find((c) => c.id === commitId);
      if (!original) return;

      const revertCommit: Commit = {
        id: generateCommitId(),
        message: `Revert: ${original.message}`,
        branch: activeBranch,
        category: original.category,
        mood: original.mood,
        confidence: original.confidence,
        status: "in-progress",
        createdAt: Date.now(),
        revertedFrom: original.id,
      };

      setRepo((prev) => ({
        ...prev,
        commits: prev.commits
          .map((c) =>
            c.id === commitId
              ? { ...c, status: "reverted" as CommitStatus }
              : c,
          )
          .concat(revertCommit),
      }));
    },
    [repo.commits, activeBranch],
  );

  const deleteCommit = useCallback((commitId: string) => {
    setRepo((prev) => ({
      ...prev,
      commits: prev.commits.filter((c) => c.id !== commitId),
    }));
  }, []);

  const createBranch = useCallback(
    (name: string): boolean => {
      const trimmed = name.trim();
      if (!trimmed) return false;

      const alreadyExists = repo.branches.some(
        (b) => b.name.toLowerCase() === trimmed.toLowerCase(),
      );
      if (alreadyExists) return false;

      setRepo((prev) => {
        const newBranch: Branch = { name: trimmed, createdAt: Date.now() };
        return {
          ...prev,
          branches: [...prev.branches, newBranch],
          activeBranch: trimmed,
        };
      });

      return true;
    },
    [repo.branches],
  );

  const switchBranch = useCallback((name: string) => {
    setRepo((prev) => ({ ...prev, activeBranch: name }));
  }, []);

  const exportRepo = useCallback(() => {
    exportRepoAsJson(repo);
  }, [repo]);

  const importRepo = useCallback((jsonString: string): boolean => {
    const parsed = parseImportedJson(jsonString);
    if (!parsed) return false;
    setRepo(parsed);
    return true;
  }, []);

  const resetRepo = useCallback(() => {
    clearRepo();
    setRepo(getDefaultRepoState());
  }, []);

  const totalCommits = commits.length;
  const successRate = useMemo(() => calculateSuccessRate(commits), [commits]);
  const currentStreak = useMemo(
    () => calculateStreak(repo.commits),
    [repo.commits],
  );
  const totalBranches = branches.length;

  return {
    repo,
    activeBranch,
    branches,
    commits,
    createCommit,
    updateCommitStatus,
    revertCommit,
    deleteCommit,
    createBranch,
    switchBranch,
    exportRepo,
    importRepo,
    resetRepo,
    totalCommits,
    successRate,
    currentStreak,
    totalBranches,
  };
}

export type { UseLifeRepoReturn, CreateCommitInput };

export { buildContributionData };
