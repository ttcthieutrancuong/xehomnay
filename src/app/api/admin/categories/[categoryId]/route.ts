import { requireAdminApi } from "@/features/auth/server/require-admin-api";
import { categorySchema } from "@/features/categories/schemas/category.schema";
import { SUCCESS_MESSAGE } from "@/lib/constants";
import { prisma } from "@/server/prisma";
import { NextResponse } from "next/server";

type RouteContext = { params: Promise<{ categoryId: string }> };

async function getCategoryId(params: RouteContext["params"]) {
  const { categoryId } = await params;
  const id = Number(categoryId);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

export async function GET(_request: Request, { params }: RouteContext) {
  const authError = await requireAdminApi();
  if (authError) return authError;

  const id = await getCategoryId(params);
  if (!id) {
    return NextResponse.json(
      { message: "Danh mục không hợp lệ." },
      { status: 400 },
    );
  }

  const category = await prisma.category.findFirst({
    where: { id, deletedAt: null },
  });
  if (!category) {
    return NextResponse.json(
      { message: "Không tìm thấy danh mục." },
      { status: 404 },
    );
  }

  return NextResponse.json({ category });
}

export async function PATCH(request: Request, { params }: RouteContext) {
  const authError = await requireAdminApi();
  if (authError) return authError;

  const id = await getCategoryId(params);
  if (!id) {
    return NextResponse.json(
      { message: "Danh mục không hợp lệ." },
      { status: 400 },
    );
  }

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

  const currentCategory = await prisma.category.findFirst({
    where: { id, deletedAt: null },
    select: { id: true },
  });
  if (!currentCategory) {
    return NextResponse.json(
      { message: "Không tìm thấy danh mục." },
      { status: 404 },
    );
  }

  const duplicateCategory = await prisma.category.findFirst({
    where: {
      id: { not: id },
      name: { equals: parsed.data.name, mode: "insensitive" },
      deletedAt: null,
    },
    select: { id: true },
  });
  if (duplicateCategory) {
    return NextResponse.json(
      { message: "Tên danh mục đã tồn tại." },
      { status: 409 },
    );
  }

  const category = await prisma.category.update({
    where: { id },
    data: { ...parsed.data, description: parsed.data.description || null },
  });
  return NextResponse.json({ message: SUCCESS_MESSAGE, category });
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const authError = await requireAdminApi();
  if (authError) return authError;

  const id = await getCategoryId(params);
  if (!id) {
    return NextResponse.json(
      { message: "Danh mục không hợp lệ." },
      { status: 400 },
    );
  }

  const result = await prisma.category.updateMany({
    where: { id, deletedAt: null },
    data: { deletedAt: new Date() },
  });
  if (result.count === 0) {
    return NextResponse.json(
      { message: "Không tìm thấy danh mục." },
      { status: 404 },
    );
  }

  return NextResponse.json({ message: SUCCESS_MESSAGE });
}
