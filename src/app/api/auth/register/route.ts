import { registerSchema } from "@/features/auth/schemas/auth.schema";
import { hashPassword } from "@/features/auth/services/credentials";
import { SUCCESS_MESSAGE } from "@/lib/constants";
import { prisma } from "@/server/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const input = registerSchema.safeParse(
    await request.json().catch(() => null),
  );
  if (!input.success)
    return NextResponse.json(
      {
        message: input.error.issues[0]?.message ?? "Thông tin không hợp lệ.",
      },
      { status: 400 },
    );

  const existing = await prisma.user.findUnique({
    where: { email: input.data.email },
    select: { id: true },
  });
  if (existing)
    return NextResponse.json(
      { message: "Email này đã được sử dụng." },
      { status: 409 },
    );

  const passwordHash = await hashPassword(input.data.password);
  await prisma.user.create({
    data: { name: input.data.name, email: input.data.email, passwordHash },
  });

  return NextResponse.json(
    { message: SUCCESS_MESSAGE },
    { status: 201 },
  );
}
