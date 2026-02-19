import { formatCommitDate } from "@/lib/repo-utils";
import { COMMIT_CATEGORIES, COMMIT_MOODS } from "@/types/repo";

interface CommitMetaProps {
  category: string;
  mood?: string;
  confidence?: number;
  createdAt: number;
}

export function CommitMeta({
  category,
  mood,
  confidence,
  createdAt,
}: CommitMetaProps) {
  const categoryMeta = COMMIT_CATEGORIES.find((c) => c.value === category);
  const moodMeta = mood ? COMMIT_MOODS.find((m) => m.value === mood) : null;

  return (
    <div className="flex items-center gap-3 px-4 pb-3 text-[10px] text-muted-foreground flex-wrap">
      {categoryMeta && (
        <span>
          {categoryMeta.emoji} {categoryMeta.label}
        </span>
      )}
      {moodMeta && (
        <span>
          {moodMeta.emoji} {moodMeta.label}
        </span>
      )}
      {confidence != null && <span>⚡ {confidence}/10 confidence</span>}
      <span className="ml-auto">{formatCommitDate(createdAt)}</span>
    </div>
  );
}
