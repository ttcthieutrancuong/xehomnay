import { FloatingContactActions } from "@/components/layout/floating-contact-actions";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Box } from "@mantine/core";
import type { ReactNode } from "react";

export default function PublicLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <Box component="div" bg="white" style={{ overflowX: "clip" }}>
      <SiteHeader />
      {children}
      <SiteFooter />
      <FloatingContactActions />
    </Box>
  );
}
