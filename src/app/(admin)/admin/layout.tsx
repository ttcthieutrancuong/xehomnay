import { AdminWorkspace } from "@/components/layout/admin-workspace";
import { requireAdmin } from "@/features/auth/server/guards";
import { QueryProvider } from "@/providers/query-provider";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: { default: "Quản trị", template: "%s | xehomnay.com" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const user = await requireAdmin();
  return (
    <QueryProvider>
      <AdminWorkspace user={user}>{children}</AdminWorkspace>
    </QueryProvider>
  );
}
