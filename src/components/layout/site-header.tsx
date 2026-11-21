"use client";

import { Brand } from "@/components/layout/brand";
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
import {
  IconArrowRight,
  IconBriefcase2,
  IconCalendarMonth,
  IconChevronDown,
  IconHeart,
  IconPlane,
  IconStar,
  IconSteeringWheel,
} from "@tabler/icons-react";
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

const serviceLinks = [
  { href: "/#xe-du-lich", label: "Xe du lịch", icon: IconPlane },
  { href: "/#xe-van-phong", label: "Xe văn phòng", icon: IconBriefcase2 },
  { href: "/#xe-cuoi", label: "Xe cưới", icon: IconHeart },
  { href: "/#xe-thang", label: "Xe tháng", icon: IconCalendarMonth },
  { href: "/#xe-tu-lai", label: "Xe tự lái", icon: IconSteeringWheel },
  { href: "/#xe-vip", label: "Xe VIP", icon: IconStar },
];

const pageLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/gioi-thieu", label: "Giới thiệu" },
  { href: "/tin-tuc", label: "Tin tức" },
  { href: "/lien-he", label: "Liên hệ" },
];

function ServiceMenu() {
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
        {serviceLinks.map(({ href, label, icon: Icon }) => (
          <Menu.Item
            component={Link}
            href={href}
            key={label}
            leftSection={<Icon size={17} stroke={1.8} />}
          >
            {label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [drawerOpened, drawer] = useDisclosure(false);
  const [authOpened, auth] = useDisclosure(false);

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
              <ServiceMenu />
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
          {serviceLinks.map(({ href, label, icon: Icon }) => (
            <NavLink
              component={Link}
              href={href}
              label={label}
              leftSection={<Icon size={18} stroke={1.8} />}
              key={label}
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
