"use client";

import { useState } from "react";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/8bit/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/8bit/dialog";
import { Label } from "@/components/ui/8bit/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/8bit/select";
import { Textarea } from "@/components/ui/8bit/textarea";
import type { CreateCommitInput } from "@/hooks/useLifeRepo";
import {
  COMMIT_CATEGORIES,
  COMMIT_MOODS,
  type CommitCategory,
  type CommitMood,
} from "@/types/repo";

import { ConfidencePicker } from "./confidence-picker";

interface CommitFormProps {
  onCreateCommit: (input: CreateCommitInput) => void;
}

const INITIAL_STATE = {
  message: "",
  category: "" as CommitCategory | "",
  mood: "" as CommitMood | "",
  confidence: 5,
};

export function CommitForm({ onCreateCommit }: CommitFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(INITIAL_STATE);
  const [error, setError] = useState("");

  function handleSubmit() {
    if (!form.message.trim()) {
      setError("Commit message is required.");
      return;
    }
    if (!form.category) {
      setError("Please select a category.");
      return;
    }

    onCreateCommit({
      message: form.message.trim(),
      category: form.category,
      mood: form.mood || undefined,
      confidence: form.confidence,
    });

    setForm(INITIAL_STATE);
    setError("");
    setIsOpen(false);
  }

  function handleOpenChange(open: boolean) {
    setIsOpen(open);
    if (!open) {
      setForm(INITIAL_STATE);
      setError("");
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="text-xs gap-2">
          <Loader2 size={14} />
          git commit
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle
            className="text-sm"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            $ git commit -m
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 pt-2">
          {/* Message */}
          <div className="flex flex-col gap-2">
            <Label className="text-xs">Commit Message *</Label>
            <Textarea
              value={form.message}
              onChange={(e) => {
                setForm((prev) => ({ ...prev, message: e.target.value }));
                setError("");
              }}
              placeholder="feat: started going to the gym"
              rows={3}
              className="text-xs resize-none"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <Label className="text-xs">Category *</Label>
            <Select
              value={form.category}
              onValueChange={(v) =>
                setForm((prev) => ({ ...prev, category: v as CommitCategory }))
              }
            >
              <SelectTrigger className="text-xs">
                <SelectValue placeholder="Select category..." />
              </SelectTrigger>
              <SelectContent>
                {COMMIT_CATEGORIES.map(({ value, label, emoji }) => (
                  <SelectItem key={value} value={value} className="text-xs">
                    {emoji} {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Mood */}
          <div className="flex flex-col gap-2">
            <Label className="text-xs">Mood (optional)</Label>
            <Select
              value={form.mood}
              onValueChange={(v) =>
                setForm((prev) => ({ ...prev, mood: v as CommitMood }))
              }
            >
              <SelectTrigger className="text-xs">
                <SelectValue placeholder="How are you feeling?" />
              </SelectTrigger>
              <SelectContent>
                {COMMIT_MOODS.map(({ value, label, emoji }) => (
                  <SelectItem key={value} value={value} className="text-xs">
                    {emoji} {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <ConfidencePicker
            value={form.confidence}
            onChange={(n) => setForm((prev) => ({ ...prev, confidence: n }))}
          />

          {error && <p className="text-xs text-destructive">{error}</p>}

          <Button onClick={handleSubmit} className="w-full text-xs">
            Commit to This
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
