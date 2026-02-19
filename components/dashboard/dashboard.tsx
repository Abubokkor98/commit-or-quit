"use client";

import { useMemo, useState } from "react";

import { BranchSwitcher } from "@/components/branch/branch-switcher";
import { CommitForm } from "@/components/commit/commit-form";
import {
  CommitFilterTabs,
  type StatusFilter,
} from "@/components/commit/commit-filter-tabs";
import { CommitList } from "@/components/commit/commit-list";
import { ContributionGraph } from "@/components/contribution/contribution-graph";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { RepoActions } from "@/components/repo/repo-actions";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/8bit/card";
import { Separator } from "@/components/ui/8bit/separator";
import { useLifeRepo } from "@/hooks/useLifeRepo";

export function Dashboard() {
  const {
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
  } = useLifeRepo();

  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const filteredCommits = useMemo(() => {
    if (statusFilter === "all") return commits;
    return commits.filter((commit) => commit.status === statusFilter);
  }, [commits, statusFilter]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border px-4 md:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex flex-col gap-0.5">
            <h1
              className="text-sm text-[oklch(0.72_0.2_142)] leading-none"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              COMMIT OR QUIT
            </h1>
            <p className="text-[10px] text-muted-foreground">
              life.git — version control for your decisions
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <BranchSwitcher
              branches={branches}
              activeBranch={activeBranch}
              onSwitch={switchBranch}
              onCreateBranch={createBranch}
            />
            <CommitForm onCreateCommit={createCommit} />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 px-4 md:px-8 py-6">
        <div className="max-w-6xl mx-auto flex flex-col gap-6">
          {/* Stats */}
          <DashboardStats
            totalCommits={totalCommits}
            successRate={successRate}
            currentStreak={currentStreak}
            totalBranches={totalBranches}
          />

          {/* Contribution graph */}
          <Card font="normal">
            <CardHeader className="pb-2">
              <CardTitle
                className="text-[10px] text-muted-foreground tracking-widest"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                ACTIVITY
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ContributionGraph commits={repo.commits} />
            </CardContent>
          </Card>

          {/* Commit log */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2
                  className="text-[10px] text-muted-foreground tracking-widest"
                  style={{ fontFamily: "'Press Start 2P', monospace" }}
                >
                  COMMIT LOG
                </h2>
                <p className="text-xs text-muted-foreground/60 mt-0.5">
                  Branch:{" "}
                  <span className="text-[oklch(0.72_0.2_142)]">
                    {activeBranch}
                  </span>
                  {" · "}
                  {totalCommits} commit{totalCommits !== 1 ? "s" : ""}
                </p>
              </div>
              <RepoActions
                onExport={exportRepo}
                onImport={importRepo}
                onReset={resetRepo}
              />
            </div>

            {/* Filter tabs */}
            <CommitFilterTabs
              activeFilter={statusFilter}
              onFilterChange={setStatusFilter}
            />

            <Separator />

            <CommitList
              commits={filteredCommits}
              onUpdateStatus={updateCommitStatus}
              onRevert={revertCommit}
              onDelete={deleteCommit}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-4 md:px-8 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <p className="text-[9px] text-muted-foreground/50">
            Crafted by{" "}
            <a
              href="https://github.com/Abubokkor98"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary/50 hover:text-primary transition-colors"
            >
              Abu Bokkor
            </a>{" "}
            in{" "}
            <a
              href="https://8bitcn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary/50 hover:text-primary transition-colors"
            >
              8-bit
            </a>{" "}
            mode
          </p>
          <p className="text-[9px] text-muted-foreground/50">
            {repo.commits.length} total commits
          </p>
        </div>
      </footer>
    </div>
  );
}
