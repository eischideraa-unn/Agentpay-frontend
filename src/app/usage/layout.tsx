import type { ReactNode } from "react";
import type { Metadata } from "next";
import { pageTitles } from "../pageTitles";

export const metadata: Metadata = {
  title: pageTitles.usage,
};

export default function UsageLayout({ children }: { children: ReactNode }) {
  return children;
}
