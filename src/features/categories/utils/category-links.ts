import type { PublicCategory } from "../server/get-public-categories";

export function getCategoryAnchorId(categoryId: number): string {
  return `danh-muc-${categoryId}`;
}

export function getCategoryKey(name: string): string {
  return name
    .toLocaleLowerCase("vi-VN")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getCategoryHref(category: PublicCategory): string {
  return `/#${getCategoryAnchorId(category.id)}`;
}
