"use client";

import { ChevronDown, Undo2, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/8bit/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/8bit/dropdown-menu";
import type { CommitStatus } from "@/types/repo";

const STATUS_OPTIONS: { value: CommitStatus; label: string }[] = [
  { value: "in-progress", label: "🔄 In Progress" },
  { value: "success", label: "✅ Mark Success" },
  { value: "failed", label: "❌ Mark Failed" },
];

interface CommitActionsMenuProps {
  commitId: string;
  currentStatus: CommitStatus;
  onUpdateStatus: (id: string, status: CommitStatus) => void;
  onRevert: (id: string) => void;
  onDelete: (id: string) => void;
}

export function CommitActionsMenu({
  commitId,
  currentStatus,
  onUpdateStatus,
  onRevert,
  onDelete,
}: CommitActionsMenuProps) {
  return (
    <div className="flex items-center gap-1 shrink-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <ChevronDown size={14} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="text-xs">
          {STATUS_OPTIONS.filter((s) => s.value !== currentStatus).map(
            (option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => onUpdateStatus(commitId, option.value)}
                className="text-xs cursor-pointer"
              >
                {option.label}
              </DropdownMenuItem>
            ),
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => onRevert(commitId)}
            className="text-xs cursor-pointer"
            disabled={currentStatus === "reverted"}
          >
            <Undo2 size={12} />
            Revert
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onDelete(commitId)}
            className="text-xs cursor-pointer text-destructive focus:text-destructive"
          >
            <Trash2 size={12} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
