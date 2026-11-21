import type { NewsArticle } from "@/features/news/types/article";
import { Badge, Box, Card, Group, Stack, Text, Title } from "@mantine/core";
import { IconArrowUpRight } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export function NewsArticleCard({
  article,
}: Readonly<{ article: NewsArticle }>) {
  return (
    <Link
      href={`/tin-tuc/${article.slug}`}
      style={{ color: "inherit", textDecoration: "none" }}
    >
      <Card
        className="interactive-card"
        withBorder
        radius="xl"
        padding={0}
        h="100%"
        style={{ overflow: "hidden" }}
      >
        <Box pos="relative" h={220} bg="gray.1">
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
          />
        </Box>
        <Stack gap="sm" p="lg">
          <Badge
            color="blue"
            variant="light"
            radius="xl"
            tt="none"
            w="fit-content"
          >
            {article.category}
          </Badge>
          <Title order={3} size="h4" c="blue.9" lh={1.4}>
            {article.title}
          </Title>
          <Text size="sm" c="dimmed" lh={1.7}>
            {article.excerpt}
          </Text>
          <Group gap={6} mt="xs">
            <Text size="sm" fw={700} c="blue.7">
              Đọc bài viết
            </Text>
            <IconArrowUpRight size={16} color="var(--mantine-color-blue-7)" />
          </Group>
        </Stack>
      </Card>
    </Link>
  );
}
