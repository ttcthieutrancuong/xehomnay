import { NewsArticleCard } from "@/features/news/components/news-article-card";
import { getNewsArticle, newsArticles } from "@/features/news/data/articles";
import { createPageMetadata } from "@/lib/seo";
import {
  Anchor,
  Badge,
  Box,
  Breadcrumbs,
  Button,
  Container,
  Divider,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconArrowLeft, IconPhone } from "@tabler/icons-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

type NewsArticlePageProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

export function generateStaticParams() {
  return newsArticles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: NewsArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsArticle(slug);

  if (!article) {
    return {
      title: "Không tìm thấy bài viết",
      robots: { index: false, follow: false },
    };
  }

  return createPageMetadata({
    title: article.title,
    description: article.excerpt,
    pathname: `/tin-tuc/${article.slug}`,
    type: "article",
    image: { url: article.image, alt: article.imageAlt },
  });
}

export default async function NewsArticlePage({
  params,
}: NewsArticlePageProps) {
  const { slug } = await params;
  const article = getNewsArticle(slug);

  if (!article) notFound();

  const relatedArticles = newsArticles.filter(
    (item) => item.slug !== article.slug,
  );

  return (
    <Box component="main">
      <Box
        component="section"
        py={{ base: 36, md: 56 }}
        style={{ background: "#f4f8fc" }}
      >
        <Container size="lg" px={{ base: "md", sm: "xl" }}>
          <Breadcrumbs mb="xl" c="dimmed" separator="/">
            <Anchor href="/" size="sm" c="dimmed" underline="hover">
              Trang chủ
            </Anchor>
            <Anchor href="/tin-tuc" size="sm" c="dimmed" underline="hover">
              Tin tức
            </Anchor>
            <Text size="sm" c="blue.8" fw={600} lineClamp={1}>
              {article.category}
            </Text>
          </Breadcrumbs>
          <Stack gap="md" maw={900}>
            <Badge
              color="blue"
              variant="light"
              radius="xl"
              tt="none"
              w="fit-content"
            >
              {article.category}
            </Badge>
            <Title
              order={1}
              c="blue.9"
              lh={1.18}
              style={{ fontSize: "clamp(2rem, 4.2vw, 3.25rem)" }}
            >
              {article.title}
            </Title>
            <Text size="lg" c="dimmed" lh={1.7}>
              {article.excerpt}
            </Text>
          </Stack>
        </Container>
      </Box>

      <Container
        size="lg"
        px={{ base: "md", sm: "xl" }}
        py={{ base: 32, md: 48 }}
      >
        <Box
          pos="relative"
          h="clamp(240px, 42vw, 480px)"
          style={{ overflow: "hidden", borderRadius: 24 }}
        >
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 960px"
            style={{ objectFit: "cover" }}
          />
          <Badge
            pos="absolute"
            top={16}
            right={16}
            color="white"
            variant="light"
            radius="xl"
            tt="none"
          >
            Hình ảnh minh họa
          </Badge>
        </Box>

        <SimpleGrid
          className="article-layout-grid"
          cols={{ base: 1, md: 12 }}
          spacing={{ base: 32, md: 56 }}
          mt={{ base: 32, md: 48 }}
        >
          <Box className="article-main-column">
            <Stack gap="lg">
              <Text size="lg" fw={600} c="blue.9" lh={1.8}>
                {article.introduction}
              </Text>
              <Divider />
              {article.sections.map((section) => (
                <Stack component="section" key={section.heading} gap="sm">
                  <Title order={2} size="h3" c="blue.9" lh={1.3}>
                    {section.heading}
                  </Title>
                  {section.paragraphs.map((paragraph) => (
                    <Text key={paragraph} c="dimmed" lh={1.85}>
                      {paragraph}
                    </Text>
                  ))}
                  {section.points?.map((point) => (
                    <Group
                      key={point}
                      gap="sm"
                      align="flex-start"
                      wrap="nowrap"
                    >
                      <Box
                        component="span"
                        aria-hidden="true"
                        mt={9}
                        w={6}
                        h={6}
                        style={{
                          flex: "0 0 auto",
                          borderRadius: "50%",
                          background: "var(--mantine-color-blue-6)",
                        }}
                      />
                      <Text c="dimmed" lh={1.7}>
                        {point}
                      </Text>
                    </Group>
                  ))}
                </Stack>
              ))}
              <Button
                component="a"
                href="/tin-tuc"
                variant="light"
                leftSection={<IconArrowLeft size={16} />}
                w="fit-content"
              >
                Quay lại tin tức
              </Button>
            </Stack>
          </Box>

          <Box className="article-sidebar-column">
            <Stack gap="md" style={{ position: "sticky", top: 104 }}>
              <Paper withBorder radius="lg" p="lg" bg="blue.0">
                <Stack gap="sm">
                  <Text fw={700} c="blue.9">
                    Cần tư vấn dịch vụ?
                  </Text>
                  <Text size="sm" c="dimmed" lh={1.65}>
                    Chia sẻ lịch trình và nhu cầu thuê xe với Today Travel.
                  </Text>
                  <Button
                    component="a"
                    href="tel:+84852342525"
                    leftSection={<IconPhone size={16} />}
                    fullWidth
                  >
                    085.234.2525
                  </Button>
                  <Button
                    component="a"
                    href="/#dich-vu"
                    variant="default"
                    fullWidth
                  >
                    Xem dịch vụ
                  </Button>
                </Stack>
              </Paper>
            </Stack>
          </Box>
        </SimpleGrid>
      </Container>

      <Box component="section" py={{ base: 48, md: 72 }} bg="gray.0">
        <Container size="xl" px={{ base: "md", sm: "xl" }}>
          <Title order={2} size="h2" c="blue.9" mb="xl">
            Bài viết liên quan
          </Title>
          <SimpleGrid
            className="reveal-grid"
            cols={{ base: 1, md: 2 }}
            spacing="md"
          >
            {relatedArticles.map((relatedArticle) => (
              <NewsArticleCard
                key={relatedArticle.slug}
                article={relatedArticle}
              />
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
}
