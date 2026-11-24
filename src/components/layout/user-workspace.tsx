import { SignOutButton } from "@/features/auth/components/sign-out-button";
import {
  Avatar,
  Badge,
  Box,
  Container,
  Group,
  NavLink,
  Paper,
  Text,
} from "@mantine/core";
import { IconHome2, IconUserCircle } from "@tabler/icons-react";
import type { ReactNode } from "react";
import { Brand } from "./brand";

type WorkspaceUser = {
  name?: string | null;
  email?: string | null;
  role: "USER" | "ADMIN";
};

export function UserWorkspace({
  user,
  children,
}: Readonly<{ user: WorkspaceUser; children: ReactNode }>) {
  const initials = (user.name ?? user.email ?? "X").slice(0, 1).toUpperCase();

  return (
    <Box
      mih="100svh"
      bg="gray.0"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <Paper
        component="header"
        radius={0}
        withBorder
        shadow="xs"
        style={{ position: "sticky", top: 0, zIndex: 10 }}
      >
        <Container size="xl" py="sm" px={{ base: "md", sm: "xl" }}>
          <Group justify="space-between" wrap="nowrap">
            <Brand />
            <Group
              component="nav"
              aria-label="Điều hướng tài khoản"
              gap="xs"
              visibleFrom="sm"
            >
              <NavLink
                component="a"
                href="/profile"
                label="Tài khoản"
                leftSection={<IconUserCircle size={18} />}
                active
                variant="subtle"
              />
              <NavLink
                component="a"
                href="/"
                label="Trang chủ"
                leftSection={<IconHome2 size={18} />}
                variant="subtle"
              />
            </Group>
            <Group gap="sm" wrap="nowrap">
              <Avatar color="blue" radius="xl" size={38}>
                {initials}
              </Avatar>
              <Box maw={170} visibleFrom="md">
                <Text size="sm" fw={700} lineClamp={1}>
                  {user.name ?? "Thành viên"}
                </Text>
                <Text size="xs" c="dimmed" lineClamp={1}>
                  {user.email}
                </Text>
              </Box>
              {user.role === "ADMIN" && (
                <Badge color="blue" variant="light" visibleFrom="sm">
                  Admin
                </Badge>
              )}
              <SignOutButton />
            </Group>
          </Group>
          <Group
            component="nav"
            aria-label="Điều hướng tài khoản"
            hiddenFrom="sm"
            mt="xs"
            gap="xs"
          >
            <NavLink
              component="a"
              href="/profile"
              label="Tài khoản"
              leftSection={<IconUserCircle size={18} />}
              active
              variant="subtle"
            />
            <NavLink
              component="a"
              href="/"
              label="Trang chủ"
              leftSection={<IconHome2 size={18} />}
              variant="subtle"
            />
          </Group>
        </Container>
      </Paper>

      <Container
        component="main"
        size="lg"
        px={{ base: "md", sm: "xl" }}
        py={{ base: "xl", md: 52 }}
        style={{ flex: 1 }}
      >
        {children}
      </Container>

      <Paper component="footer" radius={0} withBorder bg="white">
        <Container size="lg" px={{ base: "md", sm: "xl" }} py="md">
          <Text size="xs" c="dimmed">
            © 2026 xehomnay.com · Tài khoản của bạn
          </Text>
        </Container>
      </Paper>
    </Box>
  );
}
