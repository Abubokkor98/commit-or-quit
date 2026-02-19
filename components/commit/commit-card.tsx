import { GitBranch } from "lucide-react";

import { Badge } from "@/components/ui/8bit/badge";
import { STATUS_CONFIG, type Commit, type CommitStatus } from "@/types/repo";

import { CommitActionsMenu } from "./commit-actions-menu";
import { CommitMeta } from "./commit-meta";
import { ConfidenceBar } from "./confidence-bar";

const SHORT_HASH_LENGTH = 7;

interface CommitCardProps {
  commit: Commit;
  onUpdateStatus: (id: string, status: CommitStatus) => void;
  onRevert: (id: string) => void;
  onDelete: (id: string) => void;
}

export function CommitCard({
  commit,
  onUpdateStatus,
  onRevert,
  onDelete,
}: CommitCardProps) {
  const statusMeta = STATUS_CONFIG[commit.status];
  const shortId = commit.id.slice(0, SHORT_HASH_LENGTH);

  return (
    <div className="border border-border bg-card hover:border-[oklch(0.72_0.2_142)]/50 transition-colors">
      {/* Header */}
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="text-[10px] text-[oklch(0.72_0.2_142)] font-mono shrink-0 bg-[oklch(0.72_0.2_142)]/10 px-1.5 py-0.5"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              {shortId}
            </span>
            <Badge
              className={`text-[9px] px-1.5 py-0.5 ${statusMeta.color} bg-transparent border-current shrink-0`}
              variant="outline"
            >
              {statusMeta.emoji} {statusMeta.label}
            </Badge>
          </div>

          <CommitActionsMenu
            commitId={commit.id}
            currentStatus={commit.status}
            onUpdateStatus={onUpdateStatus}
            onRevert={onRevert}
            onDelete={onDelete}
          />
        </div>

        <p className="text-sm text-foreground leading-snug wrap-break-word">
          {commit.message}
        </p>
        {commit.revertedFrom && (
          <p className="text-[10px] text-muted-foreground flex items-center gap-1">
            <GitBranch size={10} />
            reverts {commit.revertedFrom.slice(0, SHORT_HASH_LENGTH)}
          </p>
        )}
      </div>

      <CommitMeta
        category={commit.category}
        mood={commit.mood}
        confidence={commit.confidence}
        createdAt={commit.createdAt}
      />

      {commit.confidence != null && (
        <ConfidenceBar confidence={commit.confidence} />
      )}
    </div>
  );
}
