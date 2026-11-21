"use client";

import { Brand } from "@/components/layout/brand";
import { getPublicCategories as fetchPublicCategories } from "@/features/categories/api/get-public-categories";
import type { PublicCategory } from "@/features/categories/server/get-public-categories";
import { getCategoryHref } from "@/features/categories/utils/category-links";
import {
  Box,
  Burger,
  Button,
  Center,
  Container,
  Drawer,
  Group,
  Loader,
  Menu,
  Modal,
  NavLink,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowRight, IconChevronDown } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const AuthModal = dynamic(
  () =>
    import("@/features/auth/components/auth-modal").then(
      (module) => module.AuthModal,
    ),
  {
    ssr: false,
    loading: () => (
      <Center mih={220}>
        <Loader size="sm" color="blue" />
      </Center>
    ),
  },
);

const pageLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/gioi-thieu", label: "Giới thiệu" },
  { href: "/tin-tuc", label: "Tin tức" },
  { href: "/lien-he", label: "Liên hệ" },
];

function ServiceMenu({
  categories,
}: Readonly<{ categories: PublicCategory[] }>) {
  return (
    <Menu
      shadow="md"
      width={260}
      position="bottom-start"
      offset={10}
      trigger="click-hover"
    >
      <Menu.Target>
        <Button
          variant="subtle"
          color="dark"
          rightSection={<IconChevronDown size={15} />}
          radius="md"
          px="sm"
        >
          Dịch vụ
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Chọn dịch vụ</Menu.Label>
        {categories.map((category) => (
          <Menu.Item
            component={Link}
            href={getCategoryHref(category)}
            key={category.id}
          >
            {category.name}
          </Menu.Item>
        ))}
        {categories.length === 0 && (
          <Text c="dimmed" size="sm" px="sm" py="xs">
            Hiện chưa có dịch vụ
          </Text>
        )}
      </Menu.Dropdown>
    </Menu>
  );
}

export function SiteHeader({
  categories,
}: Readonly<{ categories: PublicCategory[] }>) {
  const pathname = usePathname();
  const [drawerOpened, drawer] = useDisclosure(false);
  const [authOpened, auth] = useDisclosure(false);
  const { data: activeCategories = categories } = useQuery({
    queryKey: ["public", "categories"],
    queryFn: fetchPublicCategories,
    initialData: categories,
    staleTime: 60_000,
  });

  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    if (currentUrl.searchParams.get("auth") === "login") {
      auth.open();
      currentUrl.searchParams.delete("auth");
      window.history.replaceState(
        null,
        "",
        `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`,
      );
    }
  }, [auth]);

  return (
    <>
      <Box
        component="header"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          background: "rgb(255 255 255 / 94%)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--mantine-color-gray-2)",
        }}
      >
        <Container size="xl" px={{ base: "md", sm: "xl" }} py="sm">
          <Group justify="space-between" wrap="nowrap" mih={56}>
            <Brand />

            <Group
              component="nav"
              aria-label="Điều hướng chính"
              gap={8}
              visibleFrom="lg"
              wrap="nowrap"
            >
              {pageLinks.map(({ href, label }) => (
                <Button
                  component={Link}
                  href={href}
                  key={label}
                  variant={pathname === href ? "light" : "subtle"}
                  color={pathname === href ? "blue" : "dark"}
                  size="sm"
                  radius="md"
                  px="sm"
                >
                  {label}
                </Button>
              ))}
              <ServiceMenu categories={activeCategories} />
            </Group>

            <Group gap="xs" visibleFrom="lg" wrap="nowrap">
              <Button
                variant="subtle"
                color="dark"
                radius="md"
                onClick={auth.open}
              >
                Đăng nhập
              </Button>
              <Button
                component={Link}
                href="/#dich-vu"
                rightSection={<IconArrowRight size={16} />}
                radius="md"
              >
                Khám phá dịch vụ
              </Button>
            </Group>

            <Burger
              opened={drawerOpened}
              onClick={drawer.toggle}
              aria-label={drawerOpened ? "Đóng điều hướng" : "Mở điều hướng"}
              hiddenFrom="lg"
            />
          </Group>
        </Container>
      </Box>

      <Modal
        opened={authOpened}
        onClose={auth.close}
        centered
        size={460}
        padding={0}
        radius="xl"
        overlayProps={{ backgroundOpacity: 0.48, blur: 3 }}
        title={null}
        withCloseButton={false}
        styles={{
          content: {
            border: "1px solid var(--mantine-color-gray-2)",
            boxShadow: "0 28px 90px rgb(8 43 85 / 24%)",
          },
          body: { padding: "clamp(22px, 5vw, 30px)" },
        }}
      >
        {authOpened && <AuthModal onClose={auth.close} />}
      </Modal>

      <Drawer
        opened={drawerOpened}
        onClose={drawer.close}
        position="right"
        size="min(88vw, 380px)"
        title={<Brand />}
        padding="lg"
      >
        <Stack gap={4} mt="md">
          {pageLinks.map(({ href, label }) => (
            <NavLink
              component={Link}
              href={href}
              label={label}
              key={label}
              active={pathname === href}
              onClick={drawer.close}
            />
          ))}
          <Text size="xs" fw={700} c="dimmed" tt="uppercase" mt="md" mb={4}>
            Dịch vụ
          </Text>
          {activeCategories.length === 0 && (
            <Text c="dimmed" size="sm" px="sm" py="xs">
              Hiện chưa có dịch vụ
            </Text>
          )}
          {activeCategories.map((category) => (
            <NavLink
              component={Link}
              href={getCategoryHref(category)}
              label={category.name}
              key={category.id}
              onClick={drawer.close}
            />
          ))}
          <Group grow mt="md">
            <Button
              variant="default"
              onClick={() => {
                drawer.close();
                auth.open();
              }}
            >
              Đăng nhập
            </Button>
            <Button component={Link} href="/#dich-vu" onClick={drawer.close}>
              Khám phá
            </Button>
          </Group>
        </Stack>
      </Drawer>
    </>
  );
}
