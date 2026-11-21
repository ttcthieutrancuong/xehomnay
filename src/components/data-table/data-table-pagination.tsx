import { Group, Pagination, Select, Text } from "@mantine/core";
import type { PaginationState } from "@tanstack/react-table";

type DataTablePaginationProps = {
  pagination: PaginationState;
  pageCount: number;
  rowCount: number;
  onChange: (pagination: PaginationState) => void;
};

export function DataTablePagination({
  pagination,
  pageCount,
  rowCount,
  onChange,
}: DataTablePaginationProps) {
  const firstRow =
    rowCount === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1;
  const lastRow = Math.min(
    (pagination.pageIndex + 1) * pagination.pageSize,
    rowCount,
  );

  return (
    <Group
      justify="space-between"
      className="data-table__pagination"
      wrap="wrap"
    >
      <Group gap="xs">
        <Text size="sm" c="dimmed">
          Số dòng mỗi trang
        </Text>
        <Select
          size="sm"
          aria-label="Số dòng mỗi trang"
          data={["10", "20", "50"]}
          value={String(pagination.pageSize)}
          onChange={(value) =>
            onChange({ pageIndex: 0, pageSize: Number(value ?? 10) })
          }
          w={82}
        />
      </Group>
      <Text size="sm" c="dimmed" className="data-table__range-count">
        {rowCount === 0
          ? "Chưa có bản ghi"
          : `Hiển thị ${firstRow}–${lastRow} trong ${rowCount} bản ghi`}
      </Text>
      <Group gap="md">
        <Text size="sm" c="dimmed">
          Trang {pagination.pageIndex + 1} / {pageCount}
        </Text>
        <Pagination
          total={pageCount}
          value={pagination.pageIndex + 1}
          onChange={(page) => onChange({ ...pagination, pageIndex: page - 1 })}
          size="sm"
          withControls
        />
      </Group>
    </Group>
  );
}
