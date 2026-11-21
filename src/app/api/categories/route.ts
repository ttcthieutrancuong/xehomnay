import { getPublicCategories } from "@/features/categories/server/get-public-categories";
import { NextResponse } from "next/server";

export async function GET() {
  const categories = await getPublicCategories();

  return NextResponse.json(
    { categories },
    {
      headers: {
        "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
      },
    },
  );
}
