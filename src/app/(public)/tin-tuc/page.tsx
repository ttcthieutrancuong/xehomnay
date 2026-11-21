import { PageIntro } from "@/components/common/page-intro";
import { NewsArticleCard } from "@/features/news/components/news-article-card";
import { newsArticles } from "@/features/news/data/articles";
import { createPageMetadata } from "@/lib/seo";
import {
  Badge,
  Box,
  Button,
  Container,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = createPageMetadata({
  title: "Kinh nghiệm thuê xe và cẩm nang di chuyển",
  description:
    "Kinh nghiệm thuê xe thực tế: chuẩn bị thông tin đặt xe, chọn loại xe theo nhu cầu và sắp xếp chuyến đón sân bay.",
  pathname: "/tin-tuc",
});

const featuredArticle =
  newsArticles.find((article) => article.featured) ?? newsArticles[0];
const otherArticles = newsArticles.filter(
  (article) => article.slug !== featuredArticle.slug,
);

export default function NewsPage() {
  return (
    <Box component="main">
      <PageIntro
        currentPage="Tin tức"
        eyebrow="Tin tức & cẩm nang"
        title={
          <>
            Cẩm nang thuê xe
            <br />
            <Box
              component="span"
              c="blue.6"
              style={{ fontSize: "inherit", fontWeight: "inherit" }}
            >
              cho từng chuyến đi.
            </Box>
          </>
        }
        description="Tìm hiểu cách chuẩn bị thông tin đặt xe, chọn loại xe theo số người và thống nhất lịch đón để chuyến đi được sắp xếp thuận lợi hơn."
      />

      <Box component="section" py={{ base: 56, md: 88 }}>
        <Container size="xl" px={{ base: "md", sm: "xl" }}>
          <Group justify="space-between" align="flex-end" gap="lg" mb="lg">
            <Stack gap="xs">
              <Text size="sm" fw={700} c="blue.7">
                Bài viết nổi bật
              </Text>
              <Title order={2} size="h2" c="blue.9" lh={1.2}>
                Chuẩn bị rõ thông tin, đặt xe thuận tiện hơn.
              </Title>
            </Stack>
          </Group>

          <Paper
            className="motion-enter"
            withBorder
            radius="xl"
            p={{ base: "sm", md: "md" }}
            shadow="xs"
          >
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
              <Link
                href={`/tin-tuc/${featuredArticle.slug}`}
                aria-label={`Đọc bài: ${featuredArticle.title}`}
                style={{ textDecoration: "none" }}
              >
                <Box
                  pos="relative"
                  mih={{ base: 240, md: 380 }}
                  style={{ overflow: "hidden", borderRadius: 16 }}
                >
                  <Image
                    src={featuredArticle.image}
                    alt={featuredArticle.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 55vw"
                    style={{ objectFit: "cover" }}
                  />
                  <Badge
                    pos="absolute"
                    top={16}
                    left={16}
                    color="white"
                    variant="light"
                    radius="xl"
                    tt="none"
                  >
                    Hình ảnh minh họa
                  </Badge>
                </Box>
              </Link>

              <Stack justify="center" gap="md" p={{ base: "sm", md: "xl" }}>
                <Badge
                  color="blue"
                  variant="light"
                  radius="xl"
                  tt="none"
                  w="fit-content"
                >
                  {featuredArticle.category}
                </Badge>
                <Title order={3} size="h2" c="blue.9" lh={1.25}>
                  {featuredArticle.title}
                </Title>
                <Text c="dimmed" lh={1.75}>
                  {featuredArticle.excerpt}
                </Text>
                <Button
                  component="a"
                  href={`/tin-tuc/${featuredArticle.slug}`}
                  rightSection={<IconArrowRight size={17} />}
                  w="fit-content"
                >
                  Đọc bài viết
                </Button>
              </Stack>
            </SimpleGrid>
          </Paper>
        </Container>
      </Box>

      <Box
        component="section"
        py={{ base: 56, md: 88 }}
        style={{ background: "#f4f8fc" }}
      >
        <Container size="xl" px={{ base: "md", sm: "xl" }}>
          <Group justify="space-between" align="flex-end" gap="lg" mb="xl">
            <Stack gap="xs">
              <Text size="sm" fw={700} c="blue.7">
                Cẩm nang thuê xe
              </Text>
              <Title order={2} size="h2" c="blue.9">
                Kinh nghiệm cho từng chuyến đi
              </Title>
            </Stack>
            <Button
              component="a"
              href="/#dich-vu"
              variant="light"
              rightSection={<IconArrowRight size={16} />}
            >
              Xem dịch vụ thuê xe
            </Button>
          </Group>
          <SimpleGrid
            className="reveal-grid"
            cols={{ base: 1, md: 2 }}
            spacing="md"
          >
            {otherArticles.map((article) => (
              <NewsArticleCard key={article.slug} article={article} />
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <Box component="section" py={{ base: 40, md: 56 }}>
        <Container size="xl" px={{ base: "md", sm: "xl" }}>
          <Paper
            radius="xl"
            p={{ base: "lg", md: "xl" }}
            bg="blue.0"
            withBorder
          >
            <Group justify="space-between" align="center" gap="lg">
              <Stack gap="xs" maw={700}>
                <Text fw={700} c="blue.9">
                  Bạn đã có lịch trình?
                </Text>
                <Text size="sm" c="dimmed" lh={1.65}>
                  Chia sẻ ngày đi, điểm đón và số hành khách để Today Travel tư
                  vấn phương án phù hợp.
                </Text>
              </Stack>
              <Button component="a" href="/lien-he">
                Trao đổi với chúng tôi
              </Button>
            </Group>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}
