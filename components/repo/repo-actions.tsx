"use client";

import { useRef, useState } from "react";

import { Download, RotateCcw, Upload } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/8bit/alert-dialog";
import { Button } from "@/components/ui/8bit/button";

interface RepoActionsProps {
  onExport: () => void;
  onImport: (jsonString: string) => boolean;
  onReset: () => void;
}

export function RepoActions({ onExport, onImport, onReset }: RepoActionsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importError, setImportError] = useState("");
  const [importSuccess, setImportSuccess] = useState(false);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result;
      if (typeof content !== "string") return;

      const success = onImport(content);
      if (success) {
        setImportSuccess(true);
        setImportError("");
        setTimeout(() => setImportSuccess(false), 3000);
      } else {
        setImportError("Invalid backup file. Please use a valid JSON export.");
      }
    };
    reader.readAsText(file);

    // Reset input so same file can be re-imported
    event.target.value = "";
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Export */}
      <Button
        variant="outline"
        size="sm"
        className="text-xs gap-2"
        onClick={onExport}
      >
        <Download size={13} />
        Export
      </Button>

      {/* Import */}
      <Button
        variant="outline"
        size="sm"
        className="text-xs gap-2"
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload size={13} />
        Import
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Reset */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm" className="text-xs gap-2">
            <RotateCcw size={13} />
            Reset Repo
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle
              style={{ fontFamily: "'Press Start 2P', monospace" }}
              className="text-sm"
            >
              git reset --hard
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs">
              This will permanently delete ALL commits, branches, and data. This
              action cannot be undone. Export a backup first if you want to keep
              your history.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-xs">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={onReset}
              className="text-xs bg-destructive hover:bg-destructive/90"
            >
              Reset Everything
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Feedback messages */}
      {importError && (
        <p className="text-xs text-destructive w-full">{importError}</p>
      )}
      {importSuccess && (
        <p className="text-xs text-[oklch(0.72_0.2_142)] w-full">
          ✓ Repo imported successfully!
        </p>
      )}
    </div>
  );
}
