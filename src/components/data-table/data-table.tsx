"use client";

import { AdminTableBodySkeleton } from "@/components/admin/admin-skeletons";
import {
  ActionIcon,
  Alert,
  Box,
  Button,
  Checkbox,
  Group,
  Paper,
  Stack,
  Table,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import {
  IconArrowsSort,
  IconChevronDown,
  IconChevronUp,
  IconInbox,
  IconPin,
  IconSearchOff,
} from "@tabler/icons-react";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  type ColumnFiltersState,
  type PaginationState,
  type RowData,
  type SortingState,
  type Updater,
  useTable,
} from "@tanstack/react-table";
import {
  parseAsInteger,
  parseAsJson,
  parseAsString,
  useQueryStates,
} from "nuqs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import type {
  DataTablePage,
  DataTableProps,
  DataTableQueryState,
} from "./data-table.types";
import { dataTableFeatures } from "./table-features";

const defaultData: never[] = [];
const urlParsers = {
  dtq: parseAsString.withDefault(""),
  dtp: parseAsInteger.withDefault(1),
  dts: parseAsInteger.withDefault(10),
  dtsort: parseAsJson<SortingState>(
    (value) => value as SortingState,
  ).withDefault([]),
  dtf: parseAsJson<ColumnFiltersState>(
    (value) => value as ColumnFiltersState,
  ).withDefault([]),
};

export function DataTable<TData extends RowData>(props: DataTableProps<TData>) {
  const [url, setUrl] = useQueryStates(urlParsers, {
    history: "replace",
    shallow: true,
  });
  const [searchDraft, setSearchDraft] = useState<string | null>(null);
  const [localQueryState, setLocalQueryState] = useState<DataTableQueryState>(
    () => ({
      globalFilter: props.defaultState?.globalFilter ?? "",
      columnFilters: props.defaultState?.columnFilters ?? [],
      sorting: props.defaultState?.sorting ?? [],
      pagination: props.defaultState?.pagination ?? {
        pageIndex: 0,
        pageSize: 10,
      },
    }),
  );
  const queryState = useMemo<DataTableQueryState>(
    () =>
      props.urlState
        ? {
            globalFilter: url.dtq,
            columnFilters: url.dtf.length
              ? url.dtf
              : (props.defaultState?.columnFilters ?? []),
            sorting: url.dtsort.length
              ? url.dtsort
              : (props.defaultState?.sorting ?? []),
            pagination: {
              pageIndex: Math.max(0, url.dtp - 1),
              pageSize: url.dts,
            },
          }
        : localQueryState,
    [
      props.urlState,
      props.defaultState,
      url.dtq,
      url.dtf,
      url.dtp,
      url.dts,
      url.dtsort,
      localQueryState,
    ],
  );
  const globalFilterDraft =
    searchDraft ?? (props.urlState ? url.dtq : queryState.globalFilter);

  const updateQueryState = useCallback(
    (updater: (state: DataTableQueryState) => DataTableQueryState) => {
      const next = updater(queryState);
      if (props.urlState) {
        void setUrl({
          dtq: next.globalFilter || null,
          dtp: next.pagination.pageIndex ? next.pagination.pageIndex + 1 : null,
          dts:
            next.pagination.pageSize === 10 ? null : next.pagination.pageSize,
          dtsort: next.sorting.length ? next.sorting : null,
          dtf: next.columnFilters.length ? next.columnFilters : null,
        });
      } else {
        setLocalQueryState(next);
      }
    },
    [props.urlState, queryState, setUrl],
  );

  const commitSearch = useDebouncedCallback((value: string) => {
    updateQueryState((state) => ({
      ...state,
      globalFilter: value,
      pagination: { ...state.pagination, pageIndex: 0 },
    }));
    setSearchDraft(null);
  }, 350);

  const onPaginationChange = (updater: Updater<PaginationState>) =>
    updateQueryState((state) => ({
      ...state,
      pagination:
        typeof updater === "function" ? updater(state.pagination) : updater,
    }));
  const onSortingChange = (updater: Updater<SortingState>) =>
    updateQueryState((state) => ({
      ...state,
      sorting: typeof updater === "function" ? updater(state.sorting) : updater,
      pagination: { ...state.pagination, pageIndex: 0 },
    }));
  const onColumnFiltersChange = (updater: Updater<ColumnFiltersState>) =>
    updateQueryState((state) => ({
      ...state,
      columnFilters:
        typeof updater === "function" ? updater(state.columnFilters) : updater,
      pagination: { ...state.pagination, pageIndex: 0 },
    }));

  const serverQueryKey = props.mode === "server" ? props.queryKey : undefined;
  const serverQueryFn = props.mode === "server" ? props.queryFn : undefined;
  const clientData = props.mode === "client" ? props.data : defaultData;

  const serverQuery = useQuery<DataTablePage<TData>>({
    queryKey: [...(serverQueryKey ?? ["data-table-client"]), queryState],
    queryFn: ({ signal }) =>
      serverQueryFn
        ? serverQueryFn({ state: queryState, signal })
        : Promise.resolve({ rows: clientData, rowCount: clientData.length }),
    enabled: props.mode === "server",
    initialData: props.mode === "server" ? props.initialData : undefined,
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
  const queryClient = useQueryClient();
  const tableData =
    props.mode === "client"
      ? clientData
      : (serverQuery.data?.rows ?? defaultData);
  const tableState = useMemo(
    () => ({
      globalFilter: queryState.globalFilter,
      columnFilters: queryState.columnFilters,
      sorting: queryState.sorting,
      pagination: queryState.pagination,
    }),
    [queryState],
  );
  const table = useTable<typeof dataTableFeatures, TData>({
    features: dataTableFeatures,
    columns: props.columns,
    data: tableData,
    getRowId: props.getRowId,
    state: tableState,
    onGlobalFilterChange: (updater) =>
      updateQueryState((state) => ({
        ...state,
        globalFilter:
          typeof updater === "function" ? updater(state.globalFilter) : updater,
      })),
    onColumnFiltersChange,
    onSortingChange,
    onPaginationChange,
    manualFiltering: props.mode === "server",
    manualSorting: props.mode === "server",
    manualPagination: props.mode === "server",
    rowCount:
      props.mode === "server" ? (serverQuery.data?.rowCount ?? 0) : undefined,
    enableRowSelection: props.enableSelection,
    enableColumnPinning: props.enableColumnPinning,
    enableColumnResizing: props.enableColumnResizing,
  });

  const activeFilters = queryState.columnFilters;
  const hasSearchOrFilters = Boolean(
    queryState.globalFilter || activeFilters.length,
  );
  const selectedRows = table
    .getSelectedRowModel()
    .rows.map((row) => row.original);
  const stale = serverQuery.isPlaceholderData || serverQuery.isError;
  const isInitialLoading = props.mode === "server" && serverQuery.isPending;
  const pageCount = Math.max(1, table.getPageCount());
  const resultCount =
    props.mode === "server"
      ? (serverQuery.data?.rowCount ?? 0)
      : props.data.length;

  useEffect(() => {
    if (
      !serverQueryKey ||
      !serverQueryFn ||
      !serverQuery.data ||
      serverQuery.isPlaceholderData ||
      queryState.pagination.pageIndex + 1 >= pageCount
    )
      return;
    const nextState = {
      ...queryState,
      pagination: {
        ...queryState.pagination,
        pageIndex: queryState.pagination.pageIndex + 1,
      },
    };
    void queryClient.prefetchQuery({
      queryKey: [...serverQueryKey, nextState],
      queryFn: ({ signal }) => serverQueryFn({ state: nextState, signal }),
      staleTime: 30_000,
    });
  }, [
    pageCount,
    queryClient,
    queryState,
    serverQueryFn,
    serverQueryKey,
    serverQuery.data,
    serverQuery.isPlaceholderData,
  ]);

  const clearAll = () => {
    setSearchDraft(null);
    commitSearch.cancel();
    updateQueryState((state) => ({
      ...state,
      globalFilter: "",
      columnFilters: [],
      pagination: { ...state.pagination, pageIndex: 0 },
    }));
  };

  return (
    <Paper withBorder radius="lg" bg="white" className="data-table">
      <Stack gap={0}>
        <DataTableToolbar
          table={table}
          filters={props.filters ?? []}
          activeFilters={activeFilters}
          onFiltersChange={onColumnFiltersChange}
          search={globalFilterDraft}
          searchPlaceholder={props.searchPlaceholder}
          onSearchChange={(value) => {
            setSearchDraft(value);
            commitSearch(value);
          }}
          isFetching={serverQuery.isFetching}
          enableColumnVisibility={props.enableColumnVisibility}
          toolbarActions={props.toolbarActions}
          selectedRows={selectedRows}
          bulkActions={props.bulkActions}
          stale={stale}
          clearAll={clearAll}
        />
        {props.mode === "server" && serverQuery.isError && (
          <Alert
            color="red"
            title="Không tải được dữ liệu"
            m="md"
            withCloseButton={false}
          >
            <Group justify="space-between">
              <Text size="sm">
                {serverQuery.error instanceof Error
                  ? serverQuery.error.message
                  : "Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại."}
              </Text>
              <Button
                size="xs"
                variant="light"
                color="red"
                onClick={() => void serverQuery.refetch()}
              >
                Thử lại
              </Button>
            </Group>
          </Alert>
        )}
        <Box className="data-table__scroll" data-stale={stale || undefined}>
          <Table.ScrollContainer minWidth={760} type="native">
            <Table
              highlightOnHover
              verticalSpacing="sm"
              horizontalSpacing="md"
              striped="odd"
              stickyHeader={props.stickyHeader}
              className="data-table__table"
            >
              <Table.Thead>
                {table.getHeaderGroups().map((group) => (
                  <Table.Tr key={group.id}>
                    {props.enableSelection && (
                      <Table.Th w={42}>
                        <Checkbox
                          aria-label="Chọn tất cả trên trang"
                          checked={table.getIsAllPageRowsSelected()}
                          indeterminate={table.getIsSomePageRowsSelected()}
                          onChange={table.getToggleAllPageRowsSelectedHandler()}
                        />
                      </Table.Th>
                    )}
                    {props.enableRowNumbers && (
                      <Table.Th w={64} ta="center">
                        STT
                      </Table.Th>
                    )}
                    {group.headers.map((header) => (
                      <Table.Th
                        key={header.id}
                        style={{ width: header.getSize() }}
                      >
                        {header.isPlaceholder ? null : (
                          <Group gap={5} wrap="nowrap" justify="space-between">
                            <Group gap={4} wrap="nowrap">
                              <Box
                                onClick={header.column.getToggleSortingHandler()}
                                style={{
                                  cursor: header.column.getCanSort()
                                    ? "pointer"
                                    : undefined,
                                }}
                              >
                                {header.column.columnDef.header ? (
                                  <table.FlexRender header={header} />
                                ) : null}
                              </Box>
                              {header.column.getCanSort() && (
                                <ActionIcon
                                  aria-label={`Sắp xếp theo ${header.id}`}
                                  variant="subtle"
                                  color="gray"
                                  size="sm"
                                  onClick={header.column.getToggleSortingHandler()}
                                >
                                  {header.column.getIsSorted() === "asc" ? (
                                    <IconChevronUp size={15} />
                                  ) : header.column.getIsSorted() === "desc" ? (
                                    <IconChevronDown size={15} />
                                  ) : (
                                    <IconArrowsSort size={15} />
                                  )}
                                </ActionIcon>
                              )}
                              {props.enableColumnPinning &&
                                header.column.getCanPin() && (
                                  <ActionIcon
                                    aria-label={`Ghim cột ${header.id}`}
                                    variant="subtle"
                                    color={
                                      header.column.getIsPinned()
                                        ? "blue"
                                        : "gray"
                                    }
                                    size="sm"
                                    onClick={() =>
                                      header.column.pin(
                                        header.column.getIsPinned()
                                          ? false
                                          : "start",
                                      )
                                    }
                                  >
                                    <IconPin size={15} />
                                  </ActionIcon>
                                )}
                            </Group>
                            {props.enableColumnResizing &&
                              header.column.getCanResize() && (
                                <Box
                                  role="separator"
                                  tabIndex={0}
                                  aria-label={`Đổi độ rộng cột ${header.id}`}
                                  aria-orientation="vertical"
                                  onKeyDown={(event) => {
                                    if (event.key === "ArrowRight") {
                                      table.setColumnSizing((sizing) => ({
                                        ...sizing,
                                        [header.column.id]:
                                          header.getSize() + 16,
                                      }));
                                    } else if (event.key === "ArrowLeft") {
                                      table.setColumnSizing((sizing) => ({
                                        ...sizing,
                                        [header.column.id]:
                                          header.getSize() - 16,
                                      }));
                                    }
                                  }}
                                  onMouseDown={header.getResizeHandler()}
                                  onTouchStart={header.getResizeHandler()}
                                  className="data-table__resize-handle"
                                />
                              )}
                          </Group>
                        )}
                      </Table.Th>
                    ))}
                    {props.rowActions && (
                      <Table.Th w={100} ta="right">
                        Thao tác
                      </Table.Th>
                    )}
                  </Table.Tr>
                ))}
              </Table.Thead>
              <Table.Tbody>
                {isInitialLoading ? (
                  <AdminTableBodySkeleton
                    rowCount={Math.min(queryState.pagination.pageSize, 6)}
                    columnCount={table.getVisibleLeafColumns().length}
                    enableSelection={props.enableSelection}
                    enableRowNumbers={props.enableRowNumbers}
                    enableActions={Boolean(props.rowActions)}
                  />
                ) : table.getRowModel().rows.length === 0 ? (
                  <Table.Tr>
                    <Table.Td
                      colSpan={
                        table.getVisibleLeafColumns().length +
                        Number(Boolean(props.enableSelection)) +
                        Number(Boolean(props.enableRowNumbers)) +
                        Number(Boolean(props.rowActions))
                      }
                    >
                      <Stack
                        align="center"
                        gap="sm"
                        py={52}
                        px="md"
                        className="data-table__empty"
                      >
                        <ThemeIcon
                          size={56}
                          radius="xl"
                          variant="light"
                          color={hasSearchOrFilters ? "gray" : "blue"}
                        >
                          {hasSearchOrFilters ? (
                            <IconSearchOff size={26} stroke={1.7} />
                          ) : (
                            <IconInbox size={26} stroke={1.7} />
                          )}
                        </ThemeIcon>
                        <Text fw={650} size="sm" c="blue.9" mt={4}>
                          {hasSearchOrFilters
                            ? "Không tìm thấy kết quả phù hợp"
                            : (props.emptyMessage ?? "Chưa có dữ liệu")}
                        </Text>
                        <Text size="sm" c="dimmed" ta="center" maw={360}>
                          {hasSearchOrFilters
                            ? "Thử thay đổi từ khóa hoặc xóa bộ lọc."
                            : "Dữ liệu sẽ xuất hiện tại đây khi được thêm."}
                        </Text>
                        {hasSearchOrFilters ? (
                          <Button variant="subtle" onClick={clearAll}>
                            Xóa tìm kiếm và bộ lọc
                          </Button>
                        ) : null}
                      </Stack>
                    </Table.Td>
                  </Table.Tr>
                ) : (
                  table.getRowModel().rows.map((row, rowIndex) => (
                    <Table.Tr
                      key={row.id}
                      tabIndex={props.onRowClick && !stale ? 0 : undefined}
                      data-clickable={
                        props.onRowClick && !stale ? "true" : undefined
                      }
                      style={{
                        cursor:
                          props.onRowClick && !stale ? "pointer" : undefined,
                      }}
                      onClick={(event) => {
                        if (!props.onRowClick || stale) return;
                        const target = event.target;
                        if (
                          target instanceof Element &&
                          target.closest(
                            "a, button, input, [role='button'], [role='checkbox']",
                          )
                        )
                          return;
                        props.onRowClick(row.original);
                      }}
                      onKeyDown={(event) => {
                        if (
                          props.onRowClick &&
                          !stale &&
                          event.target === event.currentTarget &&
                          (event.key === "Enter" || event.key === " ")
                        ) {
                          event.preventDefault();
                          props.onRowClick(row.original);
                        }
                      }}
                    >
                      {props.enableSelection && (
                        <Table.Td>
                          <Checkbox
                            aria-label={`Chọn dòng ${row.id}`}
                            checked={row.getIsSelected()}
                            onChange={row.getToggleSelectedHandler()}
                            disabled={stale}
                          />
                        </Table.Td>
                      )}
                      {props.enableRowNumbers && (
                        <Table.Td ta="center">
                          <Text size="sm" c="dimmed" fw={600}>
                            {queryState.pagination.pageIndex *
                              queryState.pagination.pageSize +
                              rowIndex +
                              1}
                          </Text>
                        </Table.Td>
                      )}
                      {row.getVisibleCells().map((cell) => (
                        <Table.Td key={cell.id}>
                          <table.FlexRender cell={cell} />
                        </Table.Td>
                      ))}
                      {props.rowActions && (
                        <Table.Td>
                          <Group
                            justify="flex-end"
                            inert={stale}
                            aria-disabled={stale}
                            style={
                              stale
                                ? { pointerEvents: "none", opacity: 0.5 }
                                : undefined
                            }
                          >
                            {props.rowActions(row.original)}
                          </Group>
                        </Table.Td>
                      )}
                    </Table.Tr>
                  ))
                )}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </Box>
        <DataTablePagination
          pagination={queryState.pagination}
          pageCount={pageCount}
          rowCount={resultCount}
          onChange={onPaginationChange}
        />
      </Stack>
    </Paper>
  );
}
