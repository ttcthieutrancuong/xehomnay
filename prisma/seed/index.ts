import { loadEnvConfig } from "@next/env";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../src/generated/prisma/client";
import { seedCategories } from "./category.seed";
import { seedUser } from "./user.seed";

loadEnvConfig(process.cwd());

async function seed() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL chưa được cấu hình.");
  }

  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
  });

  try {
    await seedUser(prisma);
    await seedCategories(prisma);
  } finally {
    await prisma.$disconnect();
  }
}

seed().catch((error: unknown) => {
  console.error("Không thể chạy seed:", error);
  process.exitCode = 1;
});
