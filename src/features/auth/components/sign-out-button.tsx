"use client";

import {
  ActionIcon,
  Button,
  Group,
  Modal,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { signOut } from "next-auth/react";
import { useState } from "react";

export function SignOutButton({
  compact = false,
}: Readonly<{ compact?: boolean }>) {
  const [confirmationOpened, setConfirmationOpened] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut({ callbackUrl: "/" });
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <>
      <Modal
        opened={confirmationOpened}
        onClose={() => setConfirmationOpened(false)}
        title="Xác nhận đăng xuất"
        centered
        radius="lg"
        size="sm"
        closeOnClickOutside={!isSigningOut}
        closeOnEscape={!isSigningOut}
      >
        <Stack gap="lg">
          <Text c="dimmed" size="sm">
            Bạn có chắc chắn muốn đăng xuất khỏi tài khoản này?
          </Text>
          <Group justify="flex-end" gap="sm">
            <Button
              variant="default"
              onClick={() => setConfirmationOpened(false)}
              disabled={isSigningOut}
            >
              Hủy
            </Button>
            <Button color="red" onClick={handleSignOut} loading={isSigningOut}>
              Đăng xuất
            </Button>
          </Group>
        </Stack>
      </Modal>

      {compact ? (
        <Tooltip label="Đăng xuất">
          <ActionIcon
            variant="subtle"
            color="gray.4"
            aria-label="Đăng xuất"
            onClick={() => setConfirmationOpened(true)}
          >
            <IconLogout size={19} />
          </ActionIcon>
        </Tooltip>
      ) : (
        <Button variant="light" onClick={() => setConfirmationOpened(true)}>
          Đăng xuất
        </Button>
      )}
    </>
  );
}
