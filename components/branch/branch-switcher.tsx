"use client";

import { useState } from "react";

import { GitBranch, Plus } from "lucide-react";

import { Button } from "@/components/ui/8bit/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/8bit/dialog";
import { Input } from "@/components/ui/8bit/input";
import { Label } from "@/components/ui/8bit/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/8bit/select";
import type { Branch } from "@/types/repo";

interface BranchSwitcherProps {
  branches: Branch[];
  activeBranch: string;
  onSwitch: (name: string) => void;
  onCreateBranch: (name: string) => boolean;
}

export function BranchSwitcher({
  branches,
  activeBranch,
  onSwitch,
  onCreateBranch,
}: BranchSwitcherProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newBranchName, setNewBranchName] = useState("");
  const [error, setError] = useState("");

  function handleCreate() {
    const trimmed = newBranchName.trim();
    if (!trimmed) {
      setError("Branch name cannot be empty.");
      return;
    }
    const success = onCreateBranch(trimmed);
    if (!success) {
      setError("Branch already exists.");
      return;
    }
    setNewBranchName("");
    setError("");
    setIsDialogOpen(false);
  }

  return (
    <div className="flex items-center gap-2">
      <GitBranch
        size={14}
        className="text-[oklch(0.72_0.2_142)] shrink-0 mt-0.5"
      />
      <Select value={activeBranch} onValueChange={onSwitch}>
        <SelectTrigger className="w-40 text-xs h-8 flex items-center">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {branches.map((branch) => (
            <SelectItem
              key={branch.name}
              value={branch.name}
              className="text-xs"
            >
              {branch.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon" className="h-8 w-8 shrink-0">
            <Plus size={14} />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle
              className="text-sm"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              New Branch
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 pt-2">
            <div className="flex flex-col gap-2">
              <Label className="text-xs">Branch Name</Label>
              <Input
                value={newBranchName}
                onChange={(e) => {
                  setNewBranchName(e.target.value);
                  setError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                placeholder="feature/my-new-habit"
                className="text-xs"
              />
              {error && <p className="text-xs text-destructive">{error}</p>}
            </div>
            <Button onClick={handleCreate} className="w-full text-xs">
              Create Branch
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
