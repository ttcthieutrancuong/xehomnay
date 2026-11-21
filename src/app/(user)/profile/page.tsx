import { SignOutButton } from "@/features/auth/components/sign-out-button";
import { requireUser } from "@/features/auth/server/guards";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  Grid,
  GridCol,
  Group,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { IconAt, IconShieldCheck, IconUser } from "@tabler/icons-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hồ sơ tài khoản",
};

export default async function ProfilePage() {
  const user = await requireUser();
  const initials = (user.name ?? user.email ?? "X").slice(0, 1).toUpperCase();

  return (
    <Stack gap="xl">
      <Stack gap="xs">
        <Text size="xs" fw={700} c="blue.6" tt="uppercase" lts={1}>
          Không gian cá nhân
        </Text>
        <Title order={1}>Xin chào, {user.name?.split(" ")[0] ?? "bạn"}</Title>
        <Text c="dimmed">
          Quản lý thông tin đăng nhập và tài khoản xehomnay.com của bạn.
        </Text>
      </Stack>

      <Paper
        radius="xl"
        p={{ base: "lg", sm: "xl" }}
        style={{
          overflow: "hidden",
          background:
            "radial-gradient(circle at 90% 12%, rgb(85 184 255 / 18%), transparent 26%), linear-gradient(115deg, #0b3b75, #1769e0)",
        }}
      >
        <Group justify="space-between" align="center" wrap="wrap" gap="lg">
          <Group gap="md" wrap="nowrap">
            <Avatar size={64} radius="xl" color="blue" variant="light">
              {initials}
            </Avatar>
            <Box>
              <Text c="white" fw={700} size="lg">
                {user.name ?? "Thành viên xehomnay.com"}
              </Text>
              <Text c="white" opacity={0.72} size="sm">
                {user.email}
              </Text>
            </Box>
          </Group>
          <Badge
            color="blue"
            leftSection={<IconShieldCheck size={14} />}
            variant="light"
            size="lg"
            radius="xl"
          >
            {user.role === "ADMIN" ? "Quản trị viên" : "Tài khoản cá nhân"}
          </Badge>
        </Group>
      </Paper>

      <Grid gap="lg">
        <GridCol span={{ base: 12, md: 7 }}>
          <Paper withBorder radius="lg" p="xl" h="100%" shadow="xs">
            <Group gap="sm" mb="lg">
              <ThemeIcon color="blue" variant="light" radius="md" size={38}>
                <IconUser size={19} />
              </ThemeIcon>
              <Box>
                <Title order={3} size="h4">
                  Thông tin tài khoản
                </Title>
                <Text size="xs" c="dimmed">
                  Thông tin hiện đang liên kết với tài khoản đăng nhập.
                </Text>
              </Box>
            </Group>
            <Stack gap="md">
              <Stack gap={6}>
                <Text size="xs" c="dimmed">
                  HỌ VÀ TÊN
                </Text>
                <Text fw={600}>{user.name ?? "Chưa cập nhật"}</Text>
              </Stack>
              <Divider />
              <Stack gap={6}>
                <Group gap={6}>
                  <IconAt size={14} />
                  <Text size="xs" c="dimmed">
                    EMAIL ĐĂNG NHẬP
                  </Text>
                </Group>
                <Text fw={600}>{user.email}</Text>
              </Stack>
              <Divider />
              <Stack gap={6}>
                <Text size="xs" c="dimmed">
                  LOẠI TÀI KHOẢN
                </Text>
                <Text fw={600}>
                  {user.role === "ADMIN" ? "Quản trị viên" : "Thành viên"}
                </Text>
              </Stack>
            </Stack>
          </Paper>
        </GridCol>
        <GridCol span={{ base: 12, md: 5 }}>
          <Paper withBorder radius="lg" p="xl" h="100%" shadow="xs">
            <ThemeIcon color="blue" variant="light" radius="xl" size={46}>
              <IconShieldCheck size={23} />
            </ThemeIcon>
            <Title order={3} size="h4" mt="md">
              Bảo mật tài khoản
            </Title>
            <Text size="sm" c="dimmed" lh={1.6}>
              Bạn có thể đăng xuất khỏi phiên hiện tại sau khi sử dụng thiết bị
              dùng chung.
            </Text>
            <SignOutButton />
          </Paper>
        </GridCol>
      </Grid>
    </Stack>
  );
}
