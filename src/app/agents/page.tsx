"use client";

import { useEffect, useState } from "react";
import { apiGet } from "@/lib/apiClient";

type StatsResponse = {
  totalServices: number;
  totalApiKeys: number;
  totalRequests: number;
  uniqueAgents: number;
  paused: boolean;
};

export default function AgentsPage() {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiGet<StatsResponse>("/api/v1/stats")
      .then(setStats)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto flex min-h-[60vh] max-w-3xl flex-col gap-6 p-8 focus:outline-none"
    >
      <h1 className="text-3xl font-semibold tracking-tight">Agents</h1>
      {error && (
        <p role="alert" className="text-sm text-rose-600">
          {error}
        </p>
      )}
      {stats && (
        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          <strong>{stats.uniqueAgents}</strong> unique agent(s) seen across{" "}
          <strong>{stats.totalServices}</strong> services. Click an entry in
          the future agents directory to drill into their per-service usage.
        </p>
      )}
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        Per-agent listing follows in the next commit.
      </p>
    </main>
  );
}
