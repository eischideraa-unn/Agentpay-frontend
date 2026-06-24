import { type ReactNode } from "react";

type Props = {
  label: ReactNode;
  value: ReactNode;
  trend?: { delta: number; positiveIsGood?: boolean };
};

/**
 * Displays a metric tile with an optional trend indicator.
 *
 * Trend colour semantics (`positiveIsGood` defaults to `true`):
 *   - delta > 0 + positive is good  → green (emerald)
 *   - delta > 0 + positive is bad   → red (rose)
 *   - delta ≤ 0 + positive is bad   → green (emerald)
 *   - delta ≤ 0 + positive is good  → red (rose)
 */
export function StatTile({ label, value, trend }: Props) {
  return (
    <div className="rounded-lg border border-zinc-200 p-4 text-center dark:border-zinc-800">
      <dt className="text-xs uppercase tracking-wide text-zinc-500">{label}</dt>
      <dd className="mt-1 text-2xl font-semibold">{value}</dd>
      {trend && (
        <p
          className={`mt-1 text-xs ${
            (trend.delta > 0 ? trend.positiveIsGood !== false : trend.positiveIsGood === false)
              ? "text-emerald-700"
              : "text-rose-700"
          }`}
        >
          {trend.delta > 0 ? "+" : ""}
          {trend.delta}
        </p>
      )}
    </div>
  );
}
