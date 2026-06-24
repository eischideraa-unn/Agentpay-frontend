import type { ReactNode } from "react";
import type { Metadata } from "next";
import { pageTitles } from "../pageTitles";

export const metadata: Metadata = {
  title: pageTitles.webhooks,
};

export default function WebhooksLayout({ children }: { children: ReactNode }) {
  return children;
}
