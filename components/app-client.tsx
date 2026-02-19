"use client";

import { useState } from "react";

import { BootScreen } from "@/components/boot/boot-screen";
import { Dashboard } from "@/components/dashboard/dashboard";

export function AppClient() {
  const [bootComplete, setBootComplete] = useState(false);

  if (!bootComplete) {
    return <BootScreen onComplete={() => setBootComplete(true)} />;
  }

  return <Dashboard />;
}
