import type { ReactNode } from "react";
import type { Metadata } from "next";
import { agentTitle } from "../../pageTitles";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ agent: string }>;
}): Promise<Metadata> {
  const { agent } = await params;
  return {
    title: agentTitle(agent),
  };
}

export default function AgentLayout({ children }: { children: ReactNode }) {
  return children;
}
