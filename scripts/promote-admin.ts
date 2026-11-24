import { loadEnvConfig } from "@next/env";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

loadEnvConfig(process.cwd());

const email = process.argv[2]?.trim().toLowerCase();
if (!email) throw new Error("Usage: npm run admin:promote -- user@example.com");
if (!process.env.DATABASE_URL)
  throw new Error("Set DATABASE_URL in .env first.");

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

try {
  const user = await prisma.user.update({
    where: { email },
    data: { role: "ADMIN" },
  });
  console.log(`Granted ADMIN to ${user.email} (id ${user.id}).`);
} finally {
  await prisma.$disconnect();
}
