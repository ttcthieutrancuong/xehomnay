"use client";

import { NETWORK_ERROR_MESSAGE } from "@/lib/constants";
import { Alert, Button, Group, Modal, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CategoryDeleteButton({
  categoryId,
  categoryName,
}: {
  categoryId: number;
  categoryName: string;
}) {
  const [opened, modal] = useDisclosure(false);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  async function deleteCategory() {
    setIsDeleting(true);
    setError(null);
    try {
      const response = await fetch(`/api/admin/categories/${categoryId}`, {
        method: "DELETE",
      });
      const result = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;
      if (!response.ok) {
        setError(result?.message ?? "Không thể xóa danh mục.");
        return;
      }
      await queryClient.invalidateQueries({
        queryKey: ["admin", "categories"],
      });
      modal.close();
      router.push("/admin/danh-muc");
      router.refresh();
    } catch {
      setError(NETWORK_ERROR_MESSAGE);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <Button
        color="red"
        variant="light"
        onClick={() => {
          setError(null);
          modal.open();
        }}
      >
        Xoá
      </Button>
      <Modal
        opened={opened}
        onClose={() => {
          if (!isDeleting) modal.close();
        }}
        title="Xoá danh mục?"
        centered
        radius="lg"
      >
        <Stack gap="md">
          <Text size="sm" c="dimmed">
            Bạn có chắc chắn muốn xoá danh mục “{categoryName}” không?
          </Text>
          {error && (
            <Alert color="red" title="Không thể xóa danh mục">
              {error}
            </Alert>
          )}
          <Group justify="flex-end">
            <Button
              variant="default"
              onClick={modal.close}
              disabled={isDeleting}
            >
              Hủy
            </Button>
            <Button color="red" onClick={deleteCategory} loading={isDeleting}>
              Xoá
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
