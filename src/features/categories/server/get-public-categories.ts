import { prisma } from "@/server/prisma";
import { cache } from "react";

export type PublicCategory = {
  id: number;
  name: string;
  description: string | null;
};

export const getPublicCategories = cache(async (): Promise<PublicCategory[]> =>
  prisma.category.findMany({
    where: { isActive: true, deletedAt: null },
    select: { id: true, name: true, description: true },
    orderBy: { id: "asc" },
  }),
);
