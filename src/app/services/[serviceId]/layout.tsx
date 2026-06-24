import type { ReactNode } from "react";
import type { Metadata } from "next";
import { serviceTitle } from "../../pageTitles";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}): Promise<Metadata> {
  const { serviceId } = await params;
  return {
    title: serviceTitle(serviceId),
  };
}

export default function ServiceDetailLayout({ children }: { children: ReactNode }) {
  return children;
}
