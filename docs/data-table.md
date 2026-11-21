# Shared DataTable

## Audit and decisions

- The admin area had no existing table implementation or category listing endpoint. `Category` is the first bounded, useful proof of concept.
- Installed stack: Next.js 16.4.6, React 19.3.0, Mantine 9.8.2, TanStack Query 5.108.2, TanStack Table 9.3.1, nuqs 2.10.3, and Zod 4.6.7. No libraries were added for virtualization; server pagination keeps the initial row count small.
- TanStack Table is headless. It owns sorting/filter/pagination/selection models; Mantine owns controls and presentation. The feature supplies typed columns, a unique row ID, query key, and query function. The shared table never constructs an endpoint.
- Server mode uses TanStack Query because query identity includes all server-owned state. Client mode applies the registered row models to the supplied bounded data set. Pagination, filtering, and sorting are manual together in server mode so the browser never reprocesses a single server page.
- URL state is opt-in through nuqs. Search/filter/sort/page state is canonical in nuqs when enabled, otherwise in the table controller. The search input draft is transient and commits after 350 ms.

## Structure

```text
src/
  components/data-table/
    data-table.tsx             # Shared controller, TanStack integration and table UI
    data-table-pagination.tsx  # Reusable paging controls
    data-table.types.ts        # Generic public contracts
    table-features.ts          # Explicit TanStack v9 feature/model registration
  providers/query-provider.tsx # One QueryClient for the protected admin tree
  features/categories/
    api/get-categories.ts      # Feature-owned request serialization
    components/category-table.tsx
    types/category.ts
  app/api/admin/categories/route.ts # Auth, Zod validation and Prisma query
```

The reusable contract is a discriminated union:

```ts
type DataTableQueryState = {
  globalFilter: string;
  columnFilters: ColumnFiltersState;
  sorting: SortingState;
  pagination: PaginationState;
};

type DataTableQuery<TData> = (input: {
  state: DataTableQueryState;
  signal: AbortSignal;
}) => Promise<{ rows: TData[]; rowCount: number }>;

type DataTableProps<TData> = CommonProps<TData> &
  (
    | { mode: "client"; data: TData[] }
    | {
        mode: "server";
        queryKey: readonly unknown[];
        queryFn: DataTableQuery<TData>;
        initialData?: { rows: TData[]; rowCount: number };
      }
  );
```

TanStack Table 9.3.1 changed the React API from v8: use `useTable`, register explicit `tableFeatures`, and render cells with `table.FlexRender`. Column definitions are typed as `ColumnDef<typeof dataTableFeatures, TData>`. Keep `columns`, fallback data, query keys, and row IDs stable. A feature's column `id` should match its filter ID when using column filters.

## Example: admin categories

```tsx
<DataTable
  mode="server"
  queryKey={["admin", "categories"]}
  queryFn={getCategories}
  columns={columns}
  getRowId={(category) => String(category.id)}
  filters={[
    { type: "multiSelect", id: "status", label: "Trạng thái", options },
    { type: "dateRange", id: "createdAt", label: "Ngày tạo" },
  ]}
  urlState
  defaultState={{ sorting: [{ id: "createdAt", desc: true }] }}
/>
```

The `/api/admin/categories` endpoint independently requires an ADMIN session, validates page/search/filter/sort inputs with Zod, excludes soft-deleted records, and runs paginated rows and count together. Do not treat client-side table state as authorization or validation.

## State and request flow

```text
Search draft --350ms--> nuqs URL or local table state
                              |
                              +--> controlled TanStack Table state
                              |
                              +--> TanStack Query key --> feature queryFn(state, signal)
                                                        --> validated feature API --> database
```

TanStack Query receives and forwards `AbortSignal`, deduplicates requests by query key, caches results, keeps previous rows during transitions, and prefetches the next page when the total count confirms one exists. While the visible rows are placeholders or a request failed, the table marks them stale and disables their interaction. QueryClientProvider is scoped to the admin layout. Root NuqsAdapter enables opt-in URL sync in App Router.

## Included capabilities and boundaries

- Search with 350 ms debounce; select, multiselect, and date range filters with removable chips and clear-all.
- Sorting, page size, pagination, unique row IDs, row selection, feature toolbar/bulk action/row action slots.
- Optional column visibility, pinning, resizing, and sticky header.
- Client and server processing modes; custom Mantine/TanStack cell renderers through column definitions.
- Initial skeletons, background-fetch indicator with previous data, distinct empty/no-match states, retryable query errors, horizontal scroll, and keyboard-operable Mantine controls.
- The category proof of concept uses server pagination, global search, multi-select status, date range, sorting, URL sync, and column visibility. It does not add category writes or pretend a bulk action exists before those operations are defined.
- Virtualization is deferred: categories are paginated and there is no measured large-row workload. Use React Profiler with realistic data before adding virtualization or more memoization.

## Verification

Run `npm run lint`, `npm run typecheck`, and `npm run build`. The POC has been checked with those commands. Runtime behavior against PostgreSQL still requires the local database and an ADMIN session. A React Profiler capture and manual keyboard/screen-reader audit require an interactive browser session and remain follow-up review items.

## Official references

- [TanStack Table: React Quick Start](https://tanstack.com/table/latest/docs/framework/react/quick-start)
- [TanStack Table: Client-side vs server-side processing](https://tanstack.com/table/latest/docs/guide/client-side-vs-server-side)
- [TanStack Query: Query cancellation](https://tanstack.com/query/latest/docs/framework/react/guides/query-cancellation)
- [TanStack Query: v5 migration and `keepPreviousData`](https://tanstack.com/query/latest/docs/framework/react/guides/migrating-to-v5)
- [Mantine: `useDebouncedCallback`](https://mantine.dev/hooks/use-debounced-callback/)
- [nuqs: Next.js App Router adapter](https://nuqs.dev/docs/adapters)
