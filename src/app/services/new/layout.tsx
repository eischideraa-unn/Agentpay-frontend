import type { ReactNode } from "react";
import type { Metadata } from "next";
import { pageTitles } from "../../pageTitles";

export const metadata: Metadata = {
  title: pageTitles.serviceNew,
};

export default function NewServiceLayout({ children }: { children: ReactNode }) {
  return children;
}
