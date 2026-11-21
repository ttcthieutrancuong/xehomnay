import { requireAdminApi } from "@/features/auth/server/require-admin-api";
import { categorySchema } from "@/features/categories/schemas/category.schema";
import { SUCCESS_MESSAGE } from "@/lib/constants";
import { prisma } from "@/server/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const querySchema = z
  .object({
    page: z.coerce.number().int().min(1).default(1),
    pageSize: z.coerce.number().int().min(1).max(100).default(10),
    search: z.string().trim().max(120).default(""),
    status: z.enum(["active", "inactive"]).optional(),
    from: z.iso.date().optional(),
    to: z.iso.date().optional(),
    sort: z
      .enum(["name", "createdAt", "updatedAt", "isActive"])
      .default("createdAt"),
    direction: z.enum(["asc", "desc"]).default("desc"),
  })
  .refine(({ from, to }) => !from || !to || from <= to, {
    message: "Khoảng ngày không hợp lệ.",
  });

export async function GET(request: Request) {
  const authError = await requireAdminApi();
  if (authError) return authError;

  const parsed = querySchema.safeParse(
    Object.fromEntries(new URL(request.url).searchParams),
  );
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Bộ lọc không hợp lệ." },
      { status: 400 },
    );
  }

  const { page, pageSize, search, status, from, to, sort, direction } =
    parsed.data;
  const createdAt =
    from || to
      ? {
          ...(from ? { gte: new Date(`${from}T00:00:00.000Z`) } : {}),
          ...(to
            ? {
                lt: new Date(
                  new Date(`${to}T00:00:00.000Z`).getTime() + 86_400_000,
                ),
              }
            : {}),
        }
      : undefined;
  const where = {
    deletedAt: null,
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { description: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
    ...(status ? { isActive: status === "active" } : {}),
    ...(createdAt ? { createdAt } : {}),
  };
  const orderBy = { [sort]: direction };
  const [rows, rowCount] = await Promise.all([
    prisma.category.findMany({
      where,
      orderBy: [orderBy, { id: "asc" }],
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        name: true,
        description: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
    prisma.category.count({ where }),
  ]);

  return NextResponse.json({ rows, rowCount });
}

export async function POST(request: Request) {
  const authError = await requireAdminApi();
  if (authError) return authError;

  const parsed = categorySchema.safeParse(
    await request.json().catch(() => null),
  );
  if (!parsed.success) {
    return NextResponse.json(
      {
        message:
          parsed.error.issues[0]?.message ?? "Thông tin danh mục không hợp lệ.",
      },
      { status: 400 },
    );
  }

  const existingCategory = await prisma.category.findFirst({
    where: {
      name: { equals: parsed.data.name, mode: "insensitive" },
      deletedAt: null,
    },
    select: { id: true },
  });
  if (existingCategory) {
    return NextResponse.json(
      { message: "Tên danh mục đã tồn tại." },
      { status: 409 },
    );
  }

  const category = await prisma.category.create({
    data: { ...parsed.data, description: parsed.data.description || null },
  });
  return NextResponse.json(
    { message: SUCCESS_MESSAGE, category },
    { status: 201 },
  );
}
