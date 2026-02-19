"use client";

import { GitCommit } from "lucide-react";

import { CommitCard } from "@/components/commit/commit-card";
import type { Commit, CommitStatus } from "@/types/repo";

interface CommitListProps {
  commits: Commit[];
  onUpdateStatus: (id: string, status: CommitStatus) => void;
  onRevert: (id: string) => void;
  onDelete: (id: string) => void;
}

export function CommitList({
  commits,
  onUpdateStatus,
  onRevert,
  onDelete,
}: CommitListProps) {
  if (commits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <GitCommit size={40} className="text-muted-foreground/30 mb-4" />
        <p
          className="text-xs text-muted-foreground mb-2"
          style={{ fontFamily: "'Press Start 2P', monospace" }}
        >
          No commits yet
        </p>
        <p className="text-xs text-muted-foreground/60">
          Start by committing your first life decision above.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {commits.map((commit) => (
        <CommitCard
          key={commit.id}
          commit={commit}
          onUpdateStatus={onUpdateStatus}
          onRevert={onRevert}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
