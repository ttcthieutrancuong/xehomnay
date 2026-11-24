import { SignOutButton } from "@/features/auth/components/sign-out-button";
import {
  Avatar,
  Badge,
  Box,
  Container,
  Grid,
  Group,
  NavLink,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import { IconLayoutDashboard, IconUserCircle } from "@tabler/icons-react";
import type { ReactNode } from "react";
import { Brand } from "./brand";

export function AdminWorkspace({
  user,
  children,
}: Readonly<{
  user: { name?: string | null; email?: string | null };
  children: ReactNode;
}>) {
  const initials = (user.name ?? user.email ?? "A").slice(0, 1).toUpperCase();

  return (
    <Grid gap={0} mih="100svh" bg="gray.0">
      <Grid.Col span={{ base: 12, md: 3, lg: 2 }}>
        <Paper
          radius={0}
          p="md"
          bg="blue.9"
          c="white"
          mih={{ base: "auto", md: "100svh" }}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Group justify="space-between" mb="lg">
            <Brand light />
            <Text size="xs" fw={700} c="blue.2" tt="uppercase" hiddenFrom="md">
              Quản trị
            </Text>
          </Group>

          <Text
            size="xs"
            fw={700}
            c="blue.2"
            tt="uppercase"
            lts={1}
            mb="xs"
            visibleFrom="md"
          >
            Quản trị
          </Text>
          <Stack gap={4} visibleFrom="md">
            <NavLink
              component="a"
              href="/admin"
              label="Tổng quan"
              leftSection={<IconLayoutDashboard size={18} />}
              active
              variant="subtle"
              color="blue"
              c="white"
            />
            <NavLink
              component="a"
              href="/profile"
              label="Tài khoản cá nhân"
              leftSection={<IconUserCircle size={18} />}
              variant="subtle"
              c="blue.0"
            />
          </Stack>

          <Group gap={4} hiddenFrom="md" mb="md">
            <NavLink
              component="a"
              href="/admin"
              label="Tổng quan"
              leftSection={<IconLayoutDashboard size={18} />}
              active
              variant="subtle"
              color="blue"
              c="white"
            />
            <NavLink
              component="a"
              href="/profile"
              label="Tài khoản"
              leftSection={<IconUserCircle size={18} />}
              variant="subtle"
              c="blue.0"
            />
          </Group>

          <Group
            mt="auto"
            pt="md"
            style={{ borderTop: "1px solid rgba(255,255,255,.16)" }}
            wrap="nowrap"
            visibleFrom="md"
          >
            <Avatar color="blue" radius="xl" size={38}>
              {initials}
            </Avatar>
            <Box style={{ flex: 1, minWidth: 0 }}>
              <Text size="sm" fw={700} c="white" lineClamp={1}>
                {user.name ?? "Quản trị viên"}
              </Text>
              <Text size="xs" c="blue.2" lineClamp={1}>
                {user.email}
              </Text>
            </Box>
            <SignOutButton />
          </Group>
        </Paper>
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 9, lg: 10 }}>
        <Box mih="100svh" style={{ display: "flex", flexDirection: "column" }}>
          <Paper
            component="header"
            radius={0}
            withBorder
            px={{ base: "md", md: "xl" }}
            py="sm"
          >
            <Group justify="space-between">
              <Stack gap={2}>
                <Text size="xs" c="dimmed">
                  xehomnay.com / ADMIN
                </Text>
                <Text fw={700}>Không gian quản trị</Text>
              </Stack>
              <Group gap="sm">
                <Badge color="blue" variant="light">
                  Đang hoạt động
                </Badge>
                <Box hiddenFrom="md">
                  <SignOutButton />
                </Box>
              </Group>
            </Group>
          </Paper>
          <Container
            component="main"
            size="xl"
            px={{ base: "md", md: "xl" }}
            py={{ base: "xl", md: 48 }}
            style={{ flex: 1, width: "100%" }}
          >
            {children}
          </Container>
        </Box>
      </Grid.Col>
    </Grid>
  );
}
