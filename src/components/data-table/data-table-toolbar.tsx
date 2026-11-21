"use client";

import {
  ActionIcon,
  Badge,
  Button,
  Checkbox,
  Group,
  Loader,
  MultiSelect,
  Paper,
  Popover,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import {
  IconAdjustmentsHorizontal,
  IconFilterOff,
  IconSearch,
  IconSettings,
} from "@tabler/icons-react";
import type {
  ColumnFiltersState,
  ReactTable,
  RowData,
  Updater,
} from "@tanstack/react-table";
import type { ReactNode } from "react";
import type { DataTableFilter } from "./data-table.types";
import { dataTableFeatures } from "./table-features";

type DataTableToolbarProps<TData extends RowData> = {
  table: ReactTable<typeof dataTableFeatures, TData>;
  filters: DataTableFilter[];
  activeFilters: ColumnFiltersState;
  onFiltersChange: (updater: Updater<ColumnFiltersState>) => void;
  search: string;
  searchPlaceholder?: string;
  onSearchChange: (value: string) => void;
  isFetching: boolean;
  enableColumnVisibility?: boolean;
  toolbarActions?: ReactNode;
  selectedRows: TData[];
  bulkActions?: (selectedRows: TData[], clear: () => void) => ReactNode;
  stale: boolean;
  clearAll: () => void;
};

function formatFilterValue(
  filter: DataTableFilter | undefined,
  value: unknown,
): string {
  const values = Array.isArray(value) ? value : [value];
  if (filter && "options" in filter) {
    return values
      .map(
        (item) =>
          filter.options.find((option) => option.value === String(item))
            ?.label ?? String(item),
      )
      .join(" – ");
  }
  return values.map(String).join(" – ");
}

export function DataTableToolbar<TData extends RowData>({
  table,
  filters,
  activeFilters,
  onFiltersChange,
  search,
  searchPlaceholder,
  onSearchChange,
  isFetching,
  enableColumnVisibility,
  toolbarActions,
  selectedRows,
  bulkActions,
  stale,
  clearAll,
}: DataTableToolbarProps<TData>) {
  return (
    <Paper radius={0} className="data-table__toolbar">
      <Group justify="space-between" gap="sm" wrap="wrap">
        <Group
          gap="sm"
          style={{ flex: 1 }}
          wrap="wrap"
          className="data-table__filters"
        >
          <TextInput
            size="sm"
            aria-label="Tìm kiếm trong bảng"
            leftSection={<IconSearch size={17} />}
            placeholder={searchPlaceholder ?? "Tìm kiếm..."}
            value={search}
            onChange={(event) => onSearchChange(event.currentTarget.value)}
            w={{ base: "100%", sm: 250, md: 300 }}
            rightSection={isFetching ? <Loader size={14} /> : null}
          />
          {filters.map((filter) => {
            const current = activeFilters.find(
              (item) => item.id === filter.id,
            )?.value;
            if (filter.type === "multiSelect") {
              return (
                <MultiSelect
                  key={filter.id}
                  size="sm"
                  aria-label={filter.label}
                  placeholder={filter.label}
                  data={filter.options}
                  value={Array.isArray(current) ? (current as string[]) : []}
                  onChange={(value) =>
                    onFiltersChange((old) => [
                      ...old.filter((entry) => entry.id !== filter.id),
                      ...(value.length ? [{ id: filter.id, value }] : []),
                    ])
                  }
                  clearable
                  searchable
                  w={{ base: "100%", xs: 170 }}
                />
              );
            }
            if (filter.type === "select") {
              return (
                <Select
                  key={filter.id}
                  size="sm"
                  aria-label={filter.label}
                  placeholder={filter.label}
                  data={filter.options}
                  value={typeof current === "string" ? current : null}
                  onChange={(value) =>
                    onFiltersChange((old) => [
                      ...old.filter((entry) => entry.id !== filter.id),
                      ...(value ? [{ id: filter.id, value }] : []),
                    ])
                  }
                  clearable
                  w={{ base: "100%", xs: 160 }}
                />
              );
            }
            return (
              <Group
                key={filter.id}
                gap={6}
                wrap="wrap"
                className="data-table__date-filter"
              >
                <Group gap={6} wrap="nowrap" c="dimmed">
                  <IconAdjustmentsHorizontal size={15} />
                  <Text size="xs" fw={600}>
                    {filter.label}
                  </Text>
                </Group>
                <TextInput
                  size="sm"
                  type="date"
                  aria-label={`${filter.label} từ ngày`}
                  value={Array.isArray(current) ? String(current[0] ?? "") : ""}
                  onChange={(event) => {
                    const next = [
                      event.currentTarget.value,
                      Array.isArray(current) ? String(current[1] ?? "") : "",
                    ];
                    onFiltersChange((old) => [
                      ...old.filter((entry) => entry.id !== filter.id),
                      ...(next.some(Boolean)
                        ? [{ id: filter.id, value: next }]
                        : []),
                    ]);
                  }}
                  w={{ base: 132, sm: 142 }}
                />
                <TextInput
                  size="sm"
                  type="date"
                  aria-label={`${filter.label} đến ngày`}
                  value={Array.isArray(current) ? String(current[1] ?? "") : ""}
                  onChange={(event) => {
                    const next = [
                      Array.isArray(current) ? String(current[0] ?? "") : "",
                      event.currentTarget.value,
                    ];
                    onFiltersChange((old) => [
                      ...old.filter((entry) => entry.id !== filter.id),
                      ...(next.some(Boolean)
                        ? [{ id: filter.id, value: next }]
                        : []),
                    ]);
                  }}
                  w={{ base: 132, sm: 142 }}
                />
              </Group>
            );
          })}
          {(activeFilters.length > 0 || Boolean(search)) && (
            <Button
              size="xs"
              variant="subtle"
              color="gray"
              leftSection={<IconFilterOff size={16} />}
              onClick={clearAll}
            >
              Xóa tìm kiếm và bộ lọc
            </Button>
          )}
        </Group>
        <Group gap="sm" wrap="nowrap">
          {toolbarActions}
          {enableColumnVisibility && (
            <Popover position="bottom-end" withArrow shadow="md">
              <Popover.Target>
                <Button
                  size="xs"
                  variant="light"
                  color="blue"
                  leftSection={<IconSettings size={15} />}
                >
                  Cột hiển thị
                </Button>
              </Popover.Target>
              <Popover.Dropdown>
                <Stack gap="xs">
                  {table.getAllLeafColumns().map((column) => (
                    <Checkbox
                      key={column.id}
                      size="xs"
                      label={
                        typeof column.columnDef.header === "string"
                          ? column.columnDef.header
                          : column.id
                      }
                      checked={column.getIsVisible()}
                      onChange={column.getToggleVisibilityHandler()}
                    />
                  ))}
                </Stack>
              </Popover.Dropdown>
            </Popover>
          )}
        </Group>
      </Group>
      {(activeFilters.length > 0 ||
        (selectedRows.length > 0 && bulkActions)) && (
        <Group mt="sm" gap="xs">
          {activeFilters.map(({ id, value }) => {
            const definition = filters.find((filter) => filter.id === id);
            return (
              <Badge
                key={id}
                variant="light"
                color="blue"
                rightSection={
                  <ActionIcon
                    aria-label={`Xóa bộ lọc ${definition?.label ?? id}`}
                    size="xs"
                    variant="transparent"
                    onClick={() =>
                      onFiltersChange((old) =>
                        old.filter((item) => item.id !== id),
                      )
                    }
                  >
                    ×
                  </ActionIcon>
                }
              >
                {definition?.label ?? id}:{" "}
                {formatFilterValue(definition, value)}
              </Badge>
            );
          })}
          {selectedRows.length > 0 && bulkActions && (
            <Group inert={stale} aria-disabled={stale}>
              {bulkActions(selectedRows, () => table.resetRowSelection())}
            </Group>
          )}
        </Group>
      )}
    </Paper>
  );
}
