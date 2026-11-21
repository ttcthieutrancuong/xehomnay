import { FloatingContactActions } from "@/components/layout/floating-contact-actions";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getPublicCategories } from "@/features/categories/server/get-public-categories";
import { QueryProvider } from "@/providers/query-provider";
import { Box } from "@mantine/core";
import type { ReactNode } from "react";

export default async function PublicLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const categories = await getPublicCategories();

  return (
    <QueryProvider>
      <Box component="div" bg="white" style={{ overflowX: "clip" }}>
        <SiteHeader categories={categories} />
        {children}
        <SiteFooter categories={categories} />
        <FloatingContactActions />
      </Box>
    </QueryProvider>
  );
}
