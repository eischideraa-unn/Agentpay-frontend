import type { ReactNode } from "react";
import type { Metadata } from "next";
import { pageTitles } from "../pageTitles";

export const metadata: Metadata = {
  title: pageTitles.events,
};

export default function EventsLayout({ children }: { children: ReactNode }) {
  return children;
}
