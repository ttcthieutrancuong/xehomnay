import type {
  DataTablePage,
  DataTableQueryState,
} from "@/components/data-table/data-table.types";
import type { Category } from "../types/category";

export async function getCategories({
  state,
  signal,
}: {
  state: DataTableQueryState;
  signal: AbortSignal;
}): Promise<DataTablePage<Category>> {
  const params = new URLSearchParams({
    page: String(state.pagination.pageIndex + 1),
    pageSize: String(state.pagination.pageSize),
  });
  if (state.globalFilter.trim())
    params.set("search", state.globalFilter.trim());

  const status = state.columnFilters.find(
    (filter) => filter.id === "status",
  )?.value;
  if (Array.isArray(status) && status.length === 1)
    params.set("status", String(status[0]));
  if (Array.isArray(status) && status.length === 2) {
    // Both values mean no status filter; the server query remains unfiltered.
  }

  const dateRange = state.columnFilters.find(
    (filter) => filter.id === "createdAt",
  )?.value;
  if (Array.isArray(dateRange)) {
    if (dateRange[0]) params.set("from", String(dateRange[0]));
    if (dateRange[1]) params.set("to", String(dateRange[1]));
  }

  const sort = state.sorting[0];
  if (sort) {
    params.set("sort", sort.id);
    params.set("direction", sort.desc ? "desc" : "asc");
  }

  const response = await fetch(`/api/admin/categories?${params}`, { signal });
  if (!response.ok) {
    const result = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;
    throw new Error(
      result?.message ?? `Không thể tải danh mục (HTTP ${response.status}).`,
    );
  }
  return response.json() as Promise<DataTablePage<Category>>;
}
