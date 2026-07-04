"use client";

import { usePolling } from "@/lib/usePolling";

type Stats = {
  totalServices: number;
  totalApiKeys: number;
  totalRequests: number;
  uniqueAgents: number;
  paused: boolean;
};

export default function StatsPage() {
  const statsState = usePolling<Stats>("/api/v1/stats", 5000);
  const stats = statsState.data;
  const error = statsState.error;

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto flex min-h-[60vh] max-w-3xl flex-col gap-6 p-8 focus:outline-none"
    >
      <h1 className="text-3xl font-semibold tracking-tight">Stats</h1>
      {error && (
        <p role="alert" className="text-sm text-rose-600">
          {error}
        </p>
      )}
      {stats && (
        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            ["Services", stats.totalServices],
            ["API keys", stats.totalApiKeys],
            ["Requests", stats.totalRequests],
            ["Agents", stats.uniqueAgents],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-lg border border-zinc-200 p-4 text-center dark:border-zinc-800"
            >
              <dt className="text-xs uppercase tracking-wide text-zinc-500">
                {label}
              </dt>
              <dd className="mt-1 text-2xl font-semibold">{value}</dd>
            </div>
          ))}
        </dl>
      )}
      {stats?.paused && (
        <p role="status" className="text-sm text-amber-700">
          The backend is currently paused — writes are refused.
        </p>
      )}
    </main>
  );
}
