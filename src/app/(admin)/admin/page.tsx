import { requireAdmin } from "@/features/auth/server/guards";
import {
  Avatar,
  Badge,
  Button,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  IconArrowUpRight,
  IconCar,
  IconLock,
  IconUserCheck,
} from "@tabler/icons-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bảng điều khiển",
};

export default async function AdminPage() {
  const user = await requireAdmin();
  const initials = (user.name ?? user.email ?? "A").slice(0, 1).toUpperCase();

  return (
    <Stack gap="xl">
      <Group justify="space-between" align="flex-end" gap="lg" wrap="wrap">
        <Stack gap="xs">
          <Text size="xs" fw={700} c="blue.6" tt="uppercase" lts={1}>
            Bảng điều khiển
          </Text>
          <Title order={1}>Tổng quan</Title>
          <Text c="dimmed">
            Quản lý nền tảng xehomnay.com trong một không gian riêng.
          </Text>
        </Stack>
        <Button
          component="a"
          href="/profile"
          variant="default"
          rightSection={<IconArrowUpRight size={16} />}
        >
          Tài khoản cá nhân
        </Button>
      </Group>

      <Paper
        radius="lg"
        p={{ base: "lg", sm: "xl" }}
        style={{
          overflow: "hidden",
          background:
            "radial-gradient(circle at 90% 12%, rgb(85 184 255 / 18%), transparent 26%), linear-gradient(115deg, #0b3b75, #1769e0)",
        }}
      >
        <Group justify="space-between" align="center" wrap="wrap" gap="lg">
          <Stack gap="xs">
            <Badge color="blue" variant="light" radius="xl" mb="sm">
              QUYỀN QUẢN TRỊ
            </Badge>
            <Title order={2} c="white">
              Chào mừng trở lại, {user.name?.split(" ")[0] ?? "quản trị viên"}
            </Title>
            <Text c="white" opacity={0.72} mt={6}>
              Đây là trung tâm quản trị của xehomnay.com.
            </Text>
          </Stack>
          <Avatar size={72} radius="xl" color="blue" variant="light">
            {initials}
          </Avatar>
        </Group>
      </Paper>

      <Grid gap="lg">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper withBorder radius="lg" p="xl" mih={185} shadow="xs">
            <Group justify="space-between" align="flex-start">
              <ThemeIcon color="blue" variant="light" radius="md" size={42}>
                <IconUserCheck size={21} />
              </ThemeIcon>
              <Badge color="blue" variant="light">
                Đang hoạt động
              </Badge>
            </Group>
            <Text size="xs" c="dimmed" mt="lg">
              QUẢN TRỊ VIÊN
            </Text>
            <Text fw={700} size="lg" mt={4}>
              {user.name ?? "Quản trị viên"}
            </Text>
            <Text c="dimmed" size="sm">
              {user.email}
            </Text>
          </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper withBorder radius="lg" p="xl" mih={185} shadow="xs">
            <ThemeIcon color="blue" variant="light" radius="md" size={42}>
              <IconLock size={21} />
            </ThemeIcon>
            <Text size="xs" c="dimmed" mt="lg">
              PHÂN QUYỀN
            </Text>
            <Text fw={700} size="lg" mt={4}>
              ADMIN
            </Text>
            <Text c="dimmed" size="sm">
              Chỉ tài khoản quản trị mới truy cập được khu vực này.
            </Text>
          </Paper>
        </Grid.Col>
      </Grid>

      <Paper
        radius="lg"
        p={{ base: "xl", sm: 42 }}
        withBorder
        shadow="xs"
        style={{
          display: "flex",
          minHeight: 280,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          textAlign: "center",
        }}
      >
        <ThemeIcon color="blue" variant="light" radius="xl" size={58}>
          <IconCar size={28} />
        </ThemeIcon>
        <Title order={3} mt="md">
          Không gian quản trị đã sẵn sàng
        </Title>
        <Text c="dimmed" maw={440} ta="center" lh={1.6}>
          Khi các nghiệp vụ xe và đặt chỗ được phát triển, công cụ quản lý sẽ
          xuất hiện tại đây.
        </Text>
        <Button component="a" href="/" variant="light">
          Xem trang chủ
        </Button>
      </Paper>
    </Stack>
  );
}
