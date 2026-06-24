import type { ReactNode } from "react";
import type { Metadata } from "next";
import { pageTitles } from "../pageTitles";

export const metadata: Metadata = {
  title: pageTitles.stats,
};

export default function StatsLayout({ children }: { children: ReactNode }) {
  return children;
}
