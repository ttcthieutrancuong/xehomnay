import { CategoryTable } from "@/features/categories/components/category-table";
import { Button, Group, Stack, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";

export const metadata = { title: "Danh mục" };

export default function AdminCategoriesPage() {
  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center" gap="md" wrap="wrap">
        <Title order={1} size="h2" c="blue.9">
          Danh mục
        </Title>
        <Link href="/admin/danh-muc/tao-moi" style={{ textDecoration: "none" }}>
          <Button leftSection={<IconPlus size={17} />}>Tạo mới</Button>
        </Link>
      </Group>
      <CategoryTable />
    </Stack>
  );
}
