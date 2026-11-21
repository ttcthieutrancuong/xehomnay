"use client";

import { DataTable } from "@/components/data-table";
import { dataTableFeatures } from "@/components/data-table/table-features";
import { Badge, Text, Tooltip } from "@mantine/core";
import { createColumnHelper } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { getCategories } from "../api/get-categories";
import type { Category } from "../types/category";

const columnHelper = createColumnHelper<typeof dataTableFeatures, Category>();
const dateFormatter = new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium" });
const statusOptions = [
  { label: "Đang hiển thị", value: "active" },
  { label: "Đang ẩn", value: "inactive" },
];
const categoryQueryKey = ["admin", "categories"] as const;
const categoryDefaultState = { sorting: [{ id: "createdAt", desc: true }] };
export function CategoryTable() {
  const router = useRouter();
  const columns = useMemo(
    () =>
      columnHelper.columns([
        columnHelper.accessor("name", {
          header: "Danh mục",
          cell: ({ getValue }) => (
            <Text fw={650} c="blue.9" size="sm">
              {getValue()}
            </Text>
          ),
          enableSorting: true,
          size: 360,
          minSize: 280,
          maxSize: 480,
        }),
        columnHelper.accessor((category) => category.description ?? "", {
          id: "description",
          header: "Mô tả",
          cell: ({ getValue }) => {
            const description = getValue();

            return (
              <Tooltip
                label={description}
                disabled={!description}
                multiline
                w={360}
                withArrow
                openDelay={300}
              >
                <Text
                  size="sm"
                  c="gray.7"
                  truncate="end"
                  style={{
                    maxWidth: 360,
                    overflow: "hidden",
                    cursor: description ? "help" : undefined,
                  }}
                >
                  {description || "—"}
                </Text>
              </Tooltip>
            );
          },
          enableSorting: false,
          size: 420,
          minSize: 260,
          maxSize: 560,
        }),
        columnHelper.accessor("isActive", {
          header: "Trạng thái",
          cell: ({ getValue }) => (
            <Badge
              color={getValue() ? "teal" : "gray"}
              variant="light"
              radius="xl"
              size="md"
            >
              {getValue() ? "Đang hiển thị" : "Đang ẩn"}
            </Badge>
          ),
          enableSorting: true,
          size: 190,
          minSize: 160,
          maxSize: 220,
        }),
        columnHelper.accessor("createdAt", {
          header: "Ngày tạo",
          cell: ({ getValue }) => (
            <Text size="sm" c="gray.7" fw={500}>
              {dateFormatter.format(new Date(getValue()))}
            </Text>
          ),
          enableSorting: true,
          size: 180,
          minSize: 160,
          maxSize: 200,
        }),
      ]),
    [],
  );

  return (
    <DataTable
      mode="server"
      queryKey={categoryQueryKey}
      queryFn={getCategories}
      columns={columns}
      getRowId={(category) => String(category.id)}
      searchPlaceholder="Tìm kiếm"
      filters={[
        {
          type: "multiSelect",
          id: "status",
          label: "Trạng thái",
          options: statusOptions,
        },
      ]}
      urlState
      defaultState={categoryDefaultState}
      enableRowNumbers
      enableColumnVisibility
      stickyHeader
      emptyMessage="Chưa có danh mục dịch vụ"
      onRowClick={(category) => router.push(`/admin/danh-muc/${category.id}`)}
    />
  );
}
