import type {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  RowData,
  SortingState,
} from "@tanstack/react-table";
import type { ReactNode } from "react";
import type { dataTableFeatures } from "./table-features";

export type DataTablePage<TData extends RowData> = {
  rows: TData[];
  rowCount: number;
};

export type DataTableQueryState = {
  globalFilter: string;
  columnFilters: ColumnFiltersState;
  sorting: SortingState;
  pagination: PaginationState;
};

export type DataTableQuery<TData extends RowData> = (input: {
  state: DataTableQueryState;
  signal: AbortSignal;
}) => Promise<DataTablePage<TData>>;

export type DataTableFilter =
  | {
      type: "select";
      id: string;
      label: string;
      options: { label: string; value: string }[];
    }
  | {
      type: "multiSelect";
      id: string;
      label: string;
      options: { label: string; value: string }[];
    }
  | { type: "dateRange"; id: string; label: string };

type CommonDataTableProps<TData extends RowData> = {
  columns: ColumnDef<typeof dataTableFeatures, TData>[];
  getRowId: (row: TData) => string;
  searchPlaceholder?: string;
  filters?: DataTableFilter[];
  urlState?: boolean;
  enableSelection?: boolean;
  enableRowNumbers?: boolean;
  enableColumnVisibility?: boolean;
  enableColumnPinning?: boolean;
  enableColumnResizing?: boolean;
  stickyHeader?: boolean;
  toolbarActions?: ReactNode;
  bulkActions?: (selectedRows: TData[], clear: () => void) => ReactNode;
  rowActions?: (row: TData) => ReactNode;
  onRowClick?: (row: TData) => void;
  emptyMessage?: string;
  defaultState?: Partial<DataTableQueryState>;
};

export type DataTableProps<TData extends RowData> =
  CommonDataTableProps<TData> &
    (
      | { mode: "client"; data: TData[] }
      | {
          mode: "server";
          queryKey: readonly unknown[];
          queryFn: DataTableQuery<TData>;
          initialData?: DataTablePage<TData>;
        }
    );
