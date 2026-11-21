import { AdminFormSkeleton } from "@/components/admin/admin-skeletons";
import { Group, Skeleton, Stack } from "@mantine/core";

export default function EditCategoryLoading() {
  return (
    <Stack gap="lg" role="status" aria-label="Đang tải biểu mẫu danh mục">
      <Skeleton height={36} width={170} radius="md" />
      <Group gap="md" wrap="nowrap">
        <Skeleton height={50} width={50} radius="md" />
        <Skeleton height={28} width={260} />
      </Group>
      <AdminFormSkeleton />
    </Stack>
  );
}
