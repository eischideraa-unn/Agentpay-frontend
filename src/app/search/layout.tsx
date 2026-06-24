import type { ReactNode } from "react";
import type { Metadata } from "next";
import { pageTitles } from "../pageTitles";

export const metadata: Metadata = {
  title: pageTitles.search,
};

export default function SearchLayout({ children }: { children: ReactNode }) {
  return children;
}
