"use client";

import { Button } from "@mantine/core";
import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <Button variant="light" onClick={() => signOut({ callbackUrl: "/" })}>
      Đăng xuất
    </Button>
  );
}
