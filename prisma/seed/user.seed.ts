import { hashPassword } from "../../src/features/auth/services/credentials";
import type { PrismaClient } from "../../src/generated/prisma/client";

const ADMIN_EMAIL = "admin@xehomnay.com";
const ADMIN_PASSWORD = "admin@123456";

export async function seedUser(prisma: PrismaClient) {
  const passwordHash = await hashPassword(ADMIN_PASSWORD);

  const admin = await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    create: {
      name: "Quản trị viên",
      email: ADMIN_EMAIL,
      passwordHash,
      role: "ADMIN",
    },
    update: {
      name: "Quản trị viên",
      passwordHash,
      role: "ADMIN",
      deletedAt: null,
    },
    select: { id: true, email: true },
  });

  console.info(
    `Đã tạo/cập nhật tài khoản ADMIN: ${admin.email} (id ${admin.id}).`,
  );
}
