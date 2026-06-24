import type { ReactNode } from "react";
import type { Metadata } from "next";
import { pageTitles } from "../pageTitles";

export const metadata: Metadata = {
  title: pageTitles.admin,
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return children;
}
