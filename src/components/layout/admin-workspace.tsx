"use client";

import { SignOutButton } from "@/features/auth/components/sign-out-button";
import {
  ActionIcon,
  Autocomplete,
  Avatar,
  Box,
  Burger,
  Divider,
  Drawer,
  Group,
  NavLink,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import {
  IconCategory,
  IconChevronLeft,
  IconChevronRight,
  IconExternalLink,
  IconGauge,
  IconSearch,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Brand } from "./brand";

type AdminUser = { name?: string | null; email?: string | null };

const navigation = [
  {
    label: "Tổng quan",
    href: "/admin",
    icon: IconGauge,
    matches: (pathname: string) => pathname === "/admin",
  },
  {
    label: "Danh mục",
    href: "/admin/danh-muc",
    icon: IconCategory,
    matches: (pathname: string) => pathname.startsWith("/admin/danh-muc"),
  },
];

function AdminNavigation({
  onNavigate,
  collapsed = false,
}: Readonly<{ onNavigate?: () => void; collapsed?: boolean }>) {
  const pathname = usePathname();

  return (
    <Stack gap={8}>
      <Text className="admin-sidebar__section-label">Không gian quản trị</Text>
      {navigation.map(({ label, href, icon: Icon, matches }) => (
        <Tooltip
          key={href}
          label={label}
          position="right"
          withArrow
          disabled={!collapsed}
        >
          <NavLink
            component={Link}
            href={href}
            label={collapsed ? undefined : label}
            leftSection={<Icon size={19} stroke={1.8} />}
            rightSection={
              !collapsed && matches(pathname) ? (
                <IconChevronRight size={15} />
              ) : null
            }
            active={matches(pathname)}
            onClick={onNavigate}
            className="admin-sidebar__link"
            aria-label={label}
            aria-current={matches(pathname) ? "page" : undefined}
          />
        </Tooltip>
      ))}
    </Stack>
  );
}

function AdminIdentity({
  user,
  collapsed = false,
}: Readonly<{ user: AdminUser; collapsed?: boolean }>) {
  const initials = (user.name ?? user.email ?? "A").slice(0, 1).toUpperCase();

  return (
    <Group
      className={`admin-sidebar__identity${collapsed ? " admin-sidebar__identity--collapsed" : ""}`}
      wrap="nowrap"
      gap="sm"
    >
      <Tooltip
        label={user.name ?? user.email ?? "Quản trị viên"}
        position="right"
      >
        <Avatar color="blue" variant="light" radius="md" size={40}>
          {initials}
        </Avatar>
      </Tooltip>
      {!collapsed && (
        <Box
          className="admin-sidebar__identity-details"
          style={{ minWidth: 0, flex: 1 }}
        >
          <Text size="sm" fw={650} c="white" lineClamp={1}>
            {user.name ?? "Quản trị viên"}
          </Text>
          <Text size="xs" c="gray.5" lineClamp={1}>
            {user.email}
          </Text>
        </Box>
      )}
      <SignOutButton compact />
    </Group>
  );
}

export function AdminWorkspace({
  user,
  children,
}: Readonly<{ user: AdminUser; children: ReactNode }>) {
  const [mobileNavOpened, setMobileNavOpened] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [navigationSearch, setNavigationSearch] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  function navigateToSection(label: string) {
    const item = navigation.find((entry) => entry.label === label);
    if (!item) return;
    router.push(item.href);
    setNavigationSearch("");
  }

  return (
    <Box className="admin-workspace">
      <Box
        component="aside"
        className={`admin-sidebar${sidebarCollapsed ? " admin-sidebar--collapsed" : ""}`}
        visibleFrom="md"
      >
        <Box className="admin-sidebar__brand">
          <Brand light />
        </Box>

        <Box className="admin-sidebar__navigation">
          <AdminNavigation collapsed={sidebarCollapsed} />
        </Box>

        <Stack gap="sm" className="admin-sidebar__bottom">
          <Divider color="dark.4" />
          <AdminIdentity user={user} collapsed={sidebarCollapsed} />
        </Stack>
      </Box>

      <Drawer
        opened={mobileNavOpened}
        onClose={() => setMobileNavOpened(false)}
        title={<Brand />}
        size={300}
        padding="md"
        classNames={{
          root: "admin-mobile-drawer-root",
          content: "admin-mobile-drawer",
          header: "admin-mobile-drawer__header",
        }}
      >
        <Stack justify="space-between" mih="calc(100dvh - 100px)">
          <AdminNavigation onNavigate={() => setMobileNavOpened(false)} />
          <Stack gap="sm">
            <AdminIdentity user={user} />
          </Stack>
        </Stack>
      </Drawer>

      <Box className="admin-workspace__main">
        <Box component="header" className="admin-topbar">
          <Box className="admin-topbar__inner">
            <Group gap="sm" wrap="nowrap" className="admin-topbar__controls">
              <Burger
                opened={mobileNavOpened}
                onClick={() => setMobileNavOpened((opened) => !opened)}
                aria-label={
                  mobileNavOpened ? "Đóng điều hướng" : "Mở điều hướng"
                }
                hiddenFrom="md"
                size="sm"
              />
              <Tooltip
                label={sidebarCollapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"}
                position="bottom"
                withArrow
              >
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  aria-label={
                    sidebarCollapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"
                  }
                  aria-expanded={!sidebarCollapsed}
                  onClick={() => setSidebarCollapsed((collapsed) => !collapsed)}
                  visibleFrom="md"
                  size="lg"
                  className="admin-topbar__sidebar-toggle"
                >
                  {sidebarCollapsed ? (
                    <IconChevronRight size={19} />
                  ) : (
                    <IconChevronLeft size={19} />
                  )}
                </ActionIcon>
              </Tooltip>
            </Group>
            <Autocomplete
              aria-label="Tìm mục trong menu quản trị"
              className="admin-topbar__navigation-search"
              placeholder="Tìm mục quản trị..."
              leftSection={<IconSearch size={17} />}
              data={navigation.map((item) => item.label)}
              value={navigationSearch}
              onChange={setNavigationSearch}
              onOptionSubmit={navigateToSection}
              limit={navigation.length}
              comboboxProps={{ withinPortal: true, shadow: "md" }}
            />
            <Group gap="xs" wrap="nowrap" className="admin-topbar__actions">
              <Avatar
                color="blue"
                variant="light"
                radius="xl"
                size={34}
                hiddenFrom="md"
              >
                {(user.name ?? user.email ?? "A").slice(0, 1).toUpperCase()}
              </Avatar>
              <ActionIcon
                component={Link}
                href="/"
                target="_blank"
                rel="noreferrer"
                variant="subtle"
                color="gray"
                size="lg"
                aria-label="Mở website"
                visibleFrom="md"
              >
                <IconExternalLink size={19} />
              </ActionIcon>
            </Group>
          </Box>
        </Box>
        <Box component="main" className="admin-workspace__content">
          {children}
        </Box>
      </Box>
    </Box>
  );
}
