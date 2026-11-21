import { authOptions } from "@/lib/auth";
import { prisma } from "@/server/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import "server-only";

export async function requireAdminApi() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Bạn cần đăng nhập." },
      { status: 401 },
    );
  }

  const id = Number(session.user.id);
  if (!Number.isSafeInteger(id) || id < 1) {
    return NextResponse.json(
      { message: "Bạn cần đăng nhập." },
      { status: 401 },
    );
  }

  const admin = await prisma.user.findFirst({
    where: { id, role: "ADMIN", deletedAt: null },
    select: { id: true },
  });

  if (!admin) {
    return NextResponse.json(
      { message: "Bạn không có quyền thực hiện thao tác này." },
      { status: 403 },
    );
  }

  return null;
}
