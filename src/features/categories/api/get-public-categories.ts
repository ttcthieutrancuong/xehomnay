import type { PublicCategory } from "../server/get-public-categories";

export async function getPublicCategories({
  signal,
}: {
  signal: AbortSignal;
}): Promise<PublicCategory[]> {
  const response = await fetch("/api/categories", { signal });

  if (!response.ok) {
    throw new Error("Không thể tải danh mục dịch vụ.");
  }

  const result = (await response.json()) as {
    categories: PublicCategory[];
  };

  return result.categories;
}
