import type { ReactNode } from "react";
import type { Metadata } from "next";
import { pageTitles } from "../pageTitles";

export const metadata: Metadata = {
  title: pageTitles.agents,
};

export default function AgentsLayout({ children }: { children: ReactNode }) {
  return children;
}
