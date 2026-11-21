import {
  Group,
  Paper,
  SimpleGrid,
  Skeleton,
  Stack,
  Table,
} from "@mantine/core";

const widths = ["68%", "82%", "54%", "74%", "62%"] as const;

type AdminTableBodySkeletonProps = {
  rowCount?: number;
  columnCount: number;
  enableSelection?: boolean;
  enableRowNumbers?: boolean;
  enableActions?: boolean;
};

/** Shared loading rows. The real table toolbar and headers stay mounted. */
export function AdminTableBodySkeleton({
  rowCount = 6,
  columnCount,
  enableSelection = false,
  enableRowNumbers = false,
  enableActions = false,
}: AdminTableBodySkeletonProps) {
  return (
    <>
      {Array.from({ length: rowCount }, (_, rowIndex) => (
        <Table.Tr key={`skeleton-${rowIndex}`} aria-hidden="true">
          {enableSelection && (
            <Table.Td>
              <Skeleton height={16} width={16} radius={4} />
            </Table.Td>
          )}
          {enableRowNumbers && (
            <Table.Td>
              <Skeleton height={16} width={20} mx="auto" />
            </Table.Td>
          )}
          {Array.from({ length: columnCount }, (_, columnIndex) => (
            <Table.Td key={`skeleton-cell-${columnIndex}`}>
              {columnIndex === 0 ? (
                <Stack gap={7}>
                  <Skeleton
                    height={15}
                    width={widths[rowIndex % widths.length]}
                  />
                  <Skeleton height={12} width="42%" />
                </Stack>
              ) : (
                <Skeleton
                  height={15}
                  width={widths[(rowIndex + columnIndex) % widths.length]}
                />
              )}
            </Table.Td>
          ))}
          {enableActions && (
            <Table.Td>
              <Group justify="flex-end" gap="xs">
                <Skeleton height={32} width={32} radius="sm" />
                <Skeleton height={32} width={32} radius="sm" />
              </Group>
            </Table.Td>
          )}
        </Table.Tr>
      ))}
    </>
  );
}

/** Shared full-width placeholder for admin entity detail pages. */
export function AdminDetailSkeleton() {
  return (
    <Stack gap="lg" aria-label="Đang tải nội dung" role="status">
      <Skeleton height={36} width={115} radius="md" />
      <Group justify="space-between" align="center" gap="md" wrap="wrap">
        <Stack gap={8}>
          <Skeleton height={26} width={200} />
          <Skeleton height={14} width={180} />
        </Stack>
        <Group>
          <Skeleton height={38} width={130} radius="md" />
          <Skeleton height={38} width={130} radius="md" />
        </Group>
      </Group>
      <Paper withBorder radius="lg" className="admin-entity-panel">
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
          {Array.from({ length: 5 }, (_, index) => (
            <Stack gap={8} key={`detail-field-${index}`}>
              <Skeleton height={14} width={100 + (index % 2) * 25} />
              <Skeleton height={18} width={index % 2 ? "65%" : "80%"} />
            </Stack>
          ))}
        </SimpleGrid>
      </Paper>
    </Stack>
  );
}

/** Shared full-width placeholder for admin create and edit forms. */
export function AdminFormSkeleton() {
  return (
    <Paper
      withBorder
      radius="lg"
      className="admin-entity-panel"
      role="status"
      aria-label="Đang tải biểu mẫu"
    >
      <Stack gap="lg">
        <Stack gap="sm">
          <Skeleton height={20} width={190} />
          <Skeleton height={14} width="min(420px, 70%)" />
        </Stack>
        <Stack gap="sm">
          <Skeleton height={14} width={120} />
          <Skeleton height={44} radius="sm" />
        </Stack>
        <Stack gap="sm">
          <Skeleton height={14} width={100} />
          <Skeleton height={44} radius="sm" />
        </Stack>
        <Stack gap="sm">
          <Skeleton height={14} width={145} />
          <Skeleton height={18} width={225} />
        </Stack>
        <Group justify="flex-end" mt="md">
          <Skeleton height={40} width={100} radius="sm" />
          <Skeleton height={40} width={160} radius="sm" />
        </Group>
      </Stack>
    </Paper>
  );
}
