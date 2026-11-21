import { AdminPageBreadcrumb } from "@/components/admin/admin-page-breadcrumb";
import { CategoryForm } from "@/features/categories/components/category-form";
import { Stack, Title } from "@mantine/core";

export const metadata = { title: "Thêm danh mục" };

export default function CreateCategoryPage() {
  return (
    <Stack gap="lg">
      <AdminPageBreadcrumb
        backHref="/admin/danh-muc"
        items={[
          { label: "Danh mục", href: "/admin/danh-muc" },
          { label: "Tạo mới" },
        ]}
      />
      <Title order={1} size="h2" c="blue.9">
        Tạo mới
      </Title>
      <CategoryForm mode="create" />
    </Stack>
  );
}
