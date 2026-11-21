import type { PrismaClient } from "../../src/generated/prisma/client";

const categories = [
  {
    name: "Xe du lịch",
    description:
      "Xe phục vụ chuyến đi tham quan, nghỉ dưỡng và hành trình gia đình.",
  },
  {
    name: "Xe văn phòng",
    description:
      "Dịch vụ đưa đón nhân sự, tiếp khách và phục vụ nhu cầu đi lại của doanh nghiệp.",
  },
  {
    name: "Xe cưới hỏi",
    description:
      "Xe phục vụ lễ cưới, lễ hỏi và các sự kiện quan trọng của gia đình.",
  },
  {
    name: "Xe tháng",
    description:
      "Dịch vụ thuê xe dài hạn theo tháng cho cá nhân hoặc doanh nghiệp.",
  },
  {
    name: "Xe tự lái",
    description: "Thuê xe để tự cầm lái, chủ động sắp xếp lịch trình của bạn.",
  },
  {
    name: "Xe VIP",
    description:
      "Xe cao cấp phục vụ tiếp đón đối tác, sự kiện và những chuyến đi đặc biệt.",
  },
] as const;

export async function seedCategories(prisma: PrismaClient) {
  let createdCount = 0;
  let descriptionCount = 0;

  for (const category of categories) {
    const existingCategory = await prisma.category.findFirst({
      where: { name: category.name },
      select: { id: true, description: true },
    });

    if (existingCategory) {
      if (!existingCategory.description?.trim()) {
        await prisma.category.update({
          where: { id: existingCategory.id },
          data: { description: category.description },
        });
        descriptionCount += 1;
      }
      continue;
    }

    await prisma.category.create({ data: category });
    createdCount += 1;
  }

  console.info(
    `Đã thêm ${createdCount} danh mục; bổ sung mô tả cho ${descriptionCount} danh mục trống.`,
  );
}
