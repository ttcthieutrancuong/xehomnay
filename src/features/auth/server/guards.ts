import { authOptions } from "@/lib/auth";
import { prisma } from "@/server/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import "server-only";

export async function requireUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/?auth=login");

  const id = Number(session.user.id);
  if (!Number.isSafeInteger(id) || id < 1) redirect("/?auth=login");

  const user = await prisma.user.findFirst({
    where: { id, deletedAt: null },
    select: { id: true, name: true, email: true, role: true },
  });
  if (!user) redirect("/?auth=login");

  return { ...user, id: String(user.id) };
}

export async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== "ADMIN") redirect("/");
  return user;
}
