"use client";

import { Spinner } from "@/components/Spinner";
import { useToast } from "@/components/ToastProvider";
import { useState } from "react";

type ExportFormat = "json" | "csv";

type Props = {
  apiBase: string;
};

const buttonBase =
  "rounded-full px-5 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500";

function filenameFromDisposition(disposition: string | null, fallback: string) {
  const match = disposition?.match(/filename\*?=(?:UTF-8'')?"?([^";]+)"?/i);
  if (!match) return fallback;

  try {
    return decodeURIComponent(match[1]);
  } catch {
    return fallback;
  }
}

export function ExportActions({ apiBase }: Props) {
  const [downloading, setDownloading] = useState<ExportFormat | null>(null);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const startDownload = async (format: ExportFormat) => {
    setError(null);
    setDownloading(format);

    try {
      const response = await fetch(`${apiBase}/api/v1/usage/export.${format}`);
      if (!response.ok) {
        const body = await response.text().catch(() => "");
        throw new Error(body || `Export failed with status ${response.status}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filenameFromDisposition(
        response.headers.get("content-disposition"),
        `usage-export.${format}`,
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      toast.push(`${format.toUpperCase()} export downloaded.`, "info");
    } catch (err) {
      setError((err as Error).message || "Export failed");
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={downloading !== null}
          aria-busy={downloading === "json" || undefined}
          onClick={() => startDownload("json")}
          className={`${buttonBase} bg-black text-white`}
        >
          {downloading === "json" ? "Downloading JSON..." : "Download JSON"}
        </button>
        <button
          type="button"
          disabled={downloading !== null}
          aria-busy={downloading === "csv" || undefined}
          onClick={() => startDownload("csv")}
          className={`${buttonBase} border border-zinc-300 dark:border-zinc-700`}
        >
          {downloading === "csv" ? "Downloading CSV..." : "Download CSV"}
        </button>
      </div>
      {downloading && (
        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <Spinner label={`Preparing ${downloading.toUpperCase()} export`} />
          <span>Preparing {downloading.toUpperCase()} export...</span>
        </div>
      )}
      {error && (
        <p role="alert" className="text-sm text-rose-600">
          {error}
        </p>
      )}
    </div>
  );
}
