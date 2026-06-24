import type { ReactNode } from "react";
import type { Metadata } from "next";
import { pageTitles } from "../pageTitles";

export const metadata: Metadata = {
  title: pageTitles.services,
};

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return children;
}
