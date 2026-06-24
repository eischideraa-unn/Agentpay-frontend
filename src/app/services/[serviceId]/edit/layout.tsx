import type { ReactNode } from "react";
import type { Metadata } from "next";
import { serviceEditTitle } from "../../../pageTitles";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}): Promise<Metadata> {
  const { serviceId } = await params;
  return {
    title: serviceEditTitle(serviceId),
  };
}

export default function EditServiceLayout({ children }: { children: ReactNode }) {
  return children;
}
