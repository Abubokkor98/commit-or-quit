export type CommitStatus = "in-progress" | "success" | "failed" | "reverted";

export type CommitCategory =
  | "career"
  | "health"
  | "relationships"
  | "finance"
  | "learning"
  | "creativity"
  | "lifestyle"
  | "other";

export type CommitMood =
  | "motivated"
  | "nervous"
  | "confident"
  | "uncertain"
  | "excited"
  | "tired";

export interface Commit {
  id: string;
  message: string;
  branch: string;
  category: CommitCategory;
  mood?: CommitMood;
  confidence?: number;
  status: CommitStatus;
  createdAt: number;
  revertedFrom?: string;
}

export interface Branch {
  name: string;
  createdAt: number;
}

export interface RepoState {
  commits: Commit[];
  branches: Branch[];
  activeBranch: string;
}

export const COMMIT_CATEGORIES: {
  value: CommitCategory;
  label: string;
  emoji: string;
}[] = [
  { value: "career", label: "Career", emoji: "💼" },
  { value: "health", label: "Health", emoji: "💪" },
  { value: "relationships", label: "Relationships", emoji: "❤️" },
  { value: "finance", label: "Finance", emoji: "💰" },
  { value: "learning", label: "Learning", emoji: "📚" },
  { value: "creativity", label: "Creativity", emoji: "🎨" },
  { value: "lifestyle", label: "Lifestyle", emoji: "🌿" },
  { value: "other", label: "Other", emoji: "✨" },
];

export const COMMIT_MOODS: {
  value: CommitMood;
  label: string;
  emoji: string;
}[] = [
  { value: "motivated", label: "Motivated", emoji: "🚀" },
  { value: "nervous", label: "Nervous", emoji: "😬" },
  { value: "confident", label: "Confident", emoji: "😎" },
  { value: "uncertain", label: "Uncertain", emoji: "🤔" },
  { value: "excited", label: "Excited", emoji: "🎉" },
  { value: "tired", label: "Tired", emoji: "😴" },
];

export const STATUS_CONFIG: Record<
  CommitStatus,
  { label: string; emoji: string; color: string }
> = {
  "in-progress": { label: "In Progress", emoji: "🔄", color: "text-amber-400" },
  success: { label: "Success", emoji: "✅", color: "text-green-400" },
  failed: { label: "Failed", emoji: "❌", color: "text-red-400" },
  reverted: { label: "Reverted", emoji: "⏪", color: "text-purple-400" },
};

export const DEFAULT_BRANCH_NAME = "main";
