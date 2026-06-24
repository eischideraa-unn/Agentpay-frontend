import type { ReactNode } from "react";
import type { Metadata } from "next";
import { serviceAgentsTitle } from "../../../pageTitles";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}): Promise<Metadata> {
  const { serviceId } = await params;
  return {
    title: serviceAgentsTitle(serviceId),
  };
}

export default function ServiceAgentsLayout({ children }: { children: ReactNode }) {
  return children;
}
