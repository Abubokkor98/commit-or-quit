"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/8bit/tabs";
import type { CommitStatus } from "@/types/repo";

type StatusFilter = CommitStatus | "all";

interface StatusFilterTab {
  value: StatusFilter;
  label: string;
  emoji: string;
}

const STATUS_FILTER_TABS: StatusFilterTab[] = [
  { value: "all", label: "All", emoji: "📋" },
  { value: "in-progress", label: "Active", emoji: "🔄" },
  { value: "success", label: "Success", emoji: "✅" },
  { value: "failed", label: "Failed", emoji: "❌" },
  { value: "reverted", label: "Reverted", emoji: "⏪" },
];

interface CommitFilterTabsProps {
  activeFilter: StatusFilter;
  onFilterChange: (filter: StatusFilter) => void;
}

export type { StatusFilter };

export function CommitFilterTabs({
  activeFilter,
  onFilterChange,
}: CommitFilterTabsProps) {
  return (
    <Tabs
      value={activeFilter}
      onValueChange={(value) => onFilterChange(value as StatusFilter)}
      font="normal"
    >
      <TabsList className="h-8">
        {STATUS_FILTER_TABS.map(({ value, label, emoji }) => (
          <TabsTrigger
            key={value}
            value={value}
            className="text-[10px] px-2 py-1"
          >
            {emoji} {label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
