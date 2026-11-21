"use client";

import {
  ActionIcon,
  Box,
  Group,
  SegmentedControl,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { IconCar, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";

export function AuthModal({ onClose }: Readonly<{ onClose: () => void }>) {
  const [tab, setTab] = useState("login");

  return (
    <Stack gap="lg">
      <Group justify="space-between" align="flex-start" wrap="nowrap">
        <Stack gap="sm">
          <Group gap="xs">
            <ThemeIcon size={38} radius="md" variant="light">
              <IconCar size={20} stroke={1.8} />
            </ThemeIcon>
            <Text fw={750} c="blue.9" size="sm">
              xehomnay.com
            </Text>
          </Group>
          <Box>
            <Title order={2} size="h2">
              {tab === "login" ? "Chào mừng bạn trở lại" : "Tạo tài khoản mới"}
            </Title>
            <Text c="dimmed" size="sm" mt={6}>
              {tab === "login"
                ? "Đăng nhập để quản lý tài khoản xehomnay.com."
                : "Tạo tài khoản để lưu thông tin và sử dụng dịch vụ."}
            </Text>
          </Box>
        </Stack>
        <ActionIcon
          variant="light"
          color="gray"
          radius="xl"
          size={36}
          aria-label="Đóng cửa sổ tài khoản"
          onClick={onClose}
        >
          <IconX size={18} />
        </ActionIcon>
      </Group>

      <Stack gap="lg">
        <SegmentedControl
          aria-label="Chọn hình thức tài khoản"
          color="blue"
          data={[
            { label: "Đăng nhập", value: "login" },
            { label: "Tạo tài khoản", value: "register" },
          ]}
          fullWidth
          onChange={setTab}
          radius="md"
          size="sm"
          value={tab}
        />
        {tab === "register" ? <RegisterForm /> : <LoginForm />}
      </Stack>
    </Stack>
  );
}
