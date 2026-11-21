import { AdminPageBreadcrumb } from "@/components/admin/admin-page-breadcrumb";
import { CategoryForm } from "@/features/categories/components/category-form";
import { prisma } from "@/server/prisma";
import { Stack, Title } from "@mantine/core";
import { notFound } from "next/navigation";

type PageProps = { params: Promise<{ categoryId: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { categoryId } = await params;
  const id = Number(categoryId);
  if (!Number.isSafeInteger(id) || id < 1) return { title: "Chỉnh sửa" };
  const category = await prisma.category.findFirst({
    where: { id, deletedAt: null },
    select: { name: true },
  });
  return {
    title: "Chỉnh sửa",
  };
}

export default async function EditCategoryPage({ params }: PageProps) {
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
        backHref={`/admin/danh-muc/${id}`}
        items={[
          { label: "Danh mục", href: "/admin/danh-muc" },
          { label: category.name, href: `/admin/danh-muc/${id}` },
          { label: "Chỉnh sửa" },
        ]}
      />
      <Title order={1} size="h2" c="blue.9">
        Chỉnh sửa
      </Title>
      <CategoryForm
        mode="edit"
        categoryId={id}
        initialValues={{
          name: category.name,
          description: category.description ?? "",
          isActive: category.isActive,
        }}
      />
    </Stack>
  );
}
