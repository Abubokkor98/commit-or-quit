"use client";

import { GitBranch, GitCommit, TrendingUp, Zap } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/8bit/card";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  sub?: string;
}

function StatCard({ label, value, icon, color, sub }: StatCardProps) {
  return (
    <Card font="normal">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xs text-muted-foreground uppercase tracking-widest">
            {label}
          </CardTitle>
          <span className={color}>{icon}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p
          className={`text-3xl font-bold ${color}`}
          style={{ fontFamily: "'Press Start 2P', monospace" }}
        >
          {value}
        </p>
        {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
      </CardContent>
    </Card>
  );
}

interface DashboardStatsProps {
  totalCommits: number;
  successRate: number;
  currentStreak: number;
  totalBranches: number;
}

export function DashboardStats({
  totalCommits,
  successRate,
  currentStreak,
  totalBranches,
}: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        label="Total Commits"
        value={totalCommits}
        icon={<GitCommit size={18} />}
        color="text-[oklch(0.72_0.2_142)]"
        sub="this branch"
      />
      <StatCard
        label="Success Rate"
        value={`${successRate}%`}
        icon={<TrendingUp size={18} />}
        color="text-[oklch(0.78_0.18_75)]"
        sub="of resolved"
      />
      <StatCard
        label="Day Streak"
        value={currentStreak}
        icon={<Zap size={18} />}
        color="text-[oklch(0.72_0.15_210)]"
        sub="consecutive days"
      />
      <StatCard
        label="Branches"
        value={totalBranches}
        icon={<GitBranch size={18} />}
        color="text-[oklch(0.75_0.18_265)]"
        sub="life tracks"
      />
    </div>
  );
}
