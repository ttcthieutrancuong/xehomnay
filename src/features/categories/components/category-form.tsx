"use client";

import {
  categorySchema,
  type CategoryInput,
} from "@/features/categories/schemas/category.schema";
import { NETWORK_ERROR_MESSAGE } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Button,
  Group,
  Modal,
  Paper,
  Stack,
  Switch,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

type CategoryFormProps = {
  mode: "create" | "edit";
  categoryId?: number;
  initialValues?: CategoryInput;
};

export function CategoryForm({
  mode,
  categoryId,
  initialValues,
}: CategoryFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [confirmOpened, confirmModal] = useDisclosure(false);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const form = useForm<CategoryInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialValues ?? {
      name: "",
      description: "",
      isActive: true,
    },
  });
  const isEdit = mode === "edit";

  async function submitConfirmed() {
    const parsed = categorySchema.safeParse(form.getValues());
    if (!parsed.success) {
      await form.trigger();
      confirmModal.close();
      return;
    }

    setIsSaving(true);
    setError(null);
    try {
      const response = await fetch(
        isEdit
          ? `/api/admin/categories/${categoryId}`
          : "/api/admin/categories",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsed.data),
        },
      );
      const result = (await response.json().catch(() => null)) as {
        message?: string;
        category?: { id: number };
      } | null;
      if (!response.ok) {
        setError(result?.message ?? "Không thể lưu danh mục.");
        confirmModal.close();
        return;
      }

      await queryClient.invalidateQueries({
        queryKey: ["admin", "categories"],
      });
      confirmModal.close();
      router.push(`/admin/danh-muc/${result?.category?.id ?? categoryId}`);
      router.refresh();
    } catch {
      setError(NETWORK_ERROR_MESSAGE);
      confirmModal.close();
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <>
      <Paper withBorder radius="lg" className="admin-entity-panel">
        <Stack gap="lg">
          <div>
            <Title order={2} size="h3">
              Thông tin
            </Title>
          </div>
          {error && (
            <Alert color="red" title="Không thể lưu danh mục">
              {error}
            </Alert>
          )}
          <TextInput
            label="Tên danh mục"
            placeholder="Ví dụ: Xe du lịch"
            maxLength={80}
            withAsterisk
            {...form.register("name")}
            error={form.formState.errors.name?.message}
          />
          <Textarea
            label="Mô tả"
            placeholder="Mô tả ngắn về danh mục"
            autosize
            minRows={3}
            maxRows={6}
            maxLength={500}
            {...form.register("description")}
            error={form.formState.errors.description?.message}
          />
          <Controller
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <Switch
                label="Hiển thị danh mục"
                description="Danh mục đang hiển thị có thể được sử dụng trên website."
                checked={field.value}
                onChange={(event) =>
                  field.onChange(event.currentTarget.checked)
                }
              />
            )}
          />
          <Group justify="flex-end" mt="sm">
            <Button
              component={Link}
              href={
                isEdit && categoryId
                  ? `/admin/danh-muc/${categoryId}`
                  : "/admin/danh-muc"
              }
              variant="default"
            >
              Hủy
            </Button>
            <Button
              onClick={form.handleSubmit(() => {
                setError(null);
                confirmModal.open();
              })}
              loading={isSaving}
            >
              {isEdit ? "Cập nhật" : "Tạo mới"}
            </Button>
          </Group>
        </Stack>
      </Paper>

      <Modal
        opened={confirmOpened}
        onClose={() => {
          if (!isSaving) confirmModal.close();
        }}
        title={isEdit ? "Xác nhận cập nhật" : "Xác nhận tạo mới"}
        centered
        radius="lg"
      >
        <Stack gap="md">
          <Text size="sm" c="dimmed">
            {isEdit
              ? "Bạn có muốn cập nhật danh mục này không?"
              : "Bạn có muốn tạo danh mục mới không?"}
          </Text>
          <Group justify="flex-end">
            <Button
              variant="default"
              onClick={confirmModal.close}
              disabled={isSaving}
            >
              Quay lại
            </Button>
            <Button onClick={submitConfirmed} loading={isSaving}>
              {isEdit ? "Cập nhật" : "Tạo mới"}
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
