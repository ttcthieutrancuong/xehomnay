import { AdminPageBreadcrumb } from "@/components/admin/admin-page-breadcrumb";
import { CategoryDeleteButton } from "@/features/categories/components/category-delete-button";
import { prisma } from "@/server/prisma";
import {
  Badge,
  Button,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = { params: Promise<{ categoryId: string }> };
const dateFormatter = new Intl.DateTimeFormat("vi-VN", {
  dateStyle: "long",
  timeStyle: "short",
});
export async function generateMetadata({ params }: PageProps) {
  const { categoryId } = await params;
  const id = Number(categoryId);
  if (!Number.isSafeInteger(id) || id < 1) return { title: "Danh mục" };
  const category = await prisma.category.findFirst({
    where: { id, deletedAt: null },
    select: { name: true },
  });
  return { title: category?.name ?? "Danh mục" };
}

export default async function CategoryDetailPage({ params }: PageProps) {
  const { categoryId } = await params;
  const id = Number(categoryId);
  if (!Number.isSafeInteger(id) || id < 1) notFound();
  const category = await prisma.category.findFirst({
    where: { id, deletedAt: null },
  });
  if (!category) notFound();
  return (
    <Stack gap="lg">
      <AdminPageBreadcrumb
        backHref="/admin/danh-muc"
        items={[
          { label: "Danh mục", href: "/admin/danh-muc" },
          { label: category.name },
        ]}
      />
      <Group justify="space-between" align="center" gap="md" wrap="wrap">
        <Title order={1} size="h2" c="blue.9">
          Chi tiết
        </Title>
        <Group gap="sm">
          <Link
            href={`/admin/danh-muc/${id}/chinh-sua`}
            style={{ textDecoration: "none" }}
          >
            <Button variant="light" leftSection={<IconPencil size={17} />}>
              Chỉnh sửa
            </Button>
          </Link>
          <CategoryDeleteButton categoryId={id} categoryName={category.name} />
        </Group>
      </Group>
      <Paper withBorder radius="lg" className="admin-entity-panel">
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
          <Stack gap={6}>
            <Text size="sm" c="dimmed">
              Tên danh mục
            </Text>
            <Text fw={600}>{category.name}</Text>
          </Stack>
          <Stack gap={6}>
            <Text size="sm" c="dimmed">
              Mô tả
            </Text>
            <Text fw={500} style={{ whiteSpace: "pre-wrap" }}>
              {category.description || "Chưa có mô tả"}
            </Text>
          </Stack>
          <Stack gap={6}>
            <Text size="sm" c="dimmed">
              Trạng thái
            </Text>
            <Badge
              color={category.isActive ? "teal" : "gray"}
              variant="light"
              w="fit-content"
            >
              {category.isActive ? "Đang hiển thị" : "Đang ẩn"}
            </Badge>
          </Stack>
          <Stack gap={6}>
            <Text size="sm" c="dimmed">
              Ngày tạo
            </Text>
            <Text fw={500}>{dateFormatter.format(category.createdAt)}</Text>
          </Stack>
          <Stack gap={6}>
            <Text size="sm" c="dimmed">
              Cập nhật lần cuối
            </Text>
            <Text fw={500}>{dateFormatter.format(category.updatedAt)}</Text>
          </Stack>
        </SimpleGrid>
      </Paper>
    </Stack>
  );
}
