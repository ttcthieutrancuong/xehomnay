import { UserWorkspace } from "@/components/layout/user-workspace";
import { requireUser } from "@/features/auth/server/guards";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: { default: "Tài khoản cá nhân", template: "%s | xehomnay.com" },
  robots: { index: false, follow: false },
};

export default async function UserLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const user = await requireUser();
  return <UserWorkspace user={user}>{children}</UserWorkspace>;
}
