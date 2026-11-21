import { PageIntro } from "@/components/common/page-intro";
import { getPublicCategories } from "@/features/categories/server/get-public-categories";
import { ContactRequestForm } from "@/features/company/components/contact-request-form";
import { createPageMetadata } from "@/lib/seo";
import {
  Anchor,
  Box,
  Card,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  IconArrowUpRight,
  IconBuilding,
  IconMail,
  IconMapPin,
  IconPhone,
  IconWorld,
} from "@tabler/icons-react";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "Liên hệ Today Travel",
  description:
    "Gọi hotline, gửi email hoặc để lại thông tin chuyến đi để được Today Travel tư vấn dịch vụ thuê xe. Xem địa chỉ trụ sở và văn phòng.",
  pathname: "/lien-he",
});

const contactMethods = [
  {
    label: "Hotline tư vấn",
    value: "085.234.2525 · 0912 112 878",
    description: "Trao đổi lịch trình và nhu cầu thuê xe.",
    href: "tel:+84852342525",
    action: "Gọi hotline",
    icon: IconPhone,
  },
  {
    label: "Email",
    value: "thuexe@todaytravel.vn",
    description: "Gửi yêu cầu hoặc thông tin chuyến đi qua email.",
    href: "mailto:thuexe@todaytravel.vn",
    action: "Soạn email",
    icon: IconMail,
  },
  {
    label: "Website",
    value: "xehomnay.com",
    description: "Tìm hiểu thêm về các dịch vụ của chúng tôi.",
    href: "https://xehomnay.com",
    action: "Mở website",
    icon: IconWorld,
  },
];

const offices = [
  {
    label: "Trụ sở chính",
    address: "Số 10, ngõ 253 Nguyễn Khang, phường Yên Hòa, TP. Hà Nội",
  },
  {
    label: "Văn phòng Ninh Bình",
    address: "Thôn Thương Am, phường Hà Nam, tỉnh Ninh Bình",
  },
];

function ContactMethodCard({
  label,
  value,
  description,
  href,
  action,
  icon: Icon,
}: (typeof contactMethods)[number]) {
  const isExternal = href.startsWith("https://");

  return (
    <Card
      className="interactive-card"
      withBorder
      radius="lg"
      padding="lg"
      h="100%"
    >
      <Stack gap="md" h="100%">
        <ThemeIcon size={46} radius="md" variant="light">
          <Icon size={22} stroke={1.8} />
        </ThemeIcon>
        <Box>
          <Text size="sm" fw={700} c="blue.9">
            {label}
          </Text>
          <Text fw={700} c="blue.8" mt={6} style={{ overflowWrap: "anywhere" }}>
            {value}
          </Text>
          <Text size="sm" c="dimmed" mt="xs" lh={1.65}>
            {description}
          </Text>
        </Box>
        <Anchor
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer" : undefined}
          mt="auto"
          fw={700}
          size="sm"
          underline="hover"
        >
          <Group component="span" gap={6} wrap="nowrap">
            {action}
            <IconArrowUpRight size={15} />
          </Group>
        </Anchor>
      </Stack>
    </Card>
  );
}

export default async function ContactPage() {
  const categories = await getPublicCategories();

  return (
    <Box component="main">
      <PageIntro
        currentPage="Liên hệ"
        eyebrow="Liên hệ tư vấn · Today Travel"
        title={
          <>
            Tư vấn thuê xe
            <br />
            <Box
              component="span"
              c="blue.6"
              style={{ fontSize: "inherit", fontWeight: "inherit" }}
            >
              theo lịch trình của bạn.
            </Box>
          </>
        }
        description="Cho chúng tôi biết điểm đi, ngày khởi hành và số hành khách. Today Travel sẽ cùng bạn trao đổi phương án thuê xe phù hợp."
      />

      <Box component="section" py={{ base: 56, md: 88 }}>
        <Container size="xl" px={{ base: "md", sm: "xl" }}>
          <Stack gap="xs" maw={720} mb={{ base: "xl", md: 36 }}>
            <Text size="sm" fw={700} c="blue.7">
              Liên hệ Today Travel
            </Text>
            <Title order={2} size="h2" c="blue.9" lh={1.2}>
              Bạn muốn trao đổi trực tiếp hay gửi thông tin?
            </Title>
            <Text c="dimmed" lh={1.7}>
              Gọi hotline để được hỗ trợ nhanh, hoặc gửi email kèm lịch trình
              khi cần trao đổi chi tiết.
            </Text>
          </Stack>

          <SimpleGrid
            className="reveal-grid"
            cols={{ base: 1, sm: 2, lg: 3 }}
            spacing="md"
          >
            {contactMethods.map((method) => (
              <ContactMethodCard key={method.label} {...method} />
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <Box component="section" py={{ base: 56, md: 88 }} bg="gray.0">
        <Container size="xl" px={{ base: "md", sm: "xl" }}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={{ base: 28, md: 48 }}>
            <Stack gap="md">
              <Stack gap="sm" mb="xs">
                <Text size="sm" fw={700} c="blue.7">
                  Văn phòng
                </Text>
                <Title order={2} size="h2" c="blue.9" lh={1.2}>
                  Trụ sở và văn phòng
                </Title>
                <Text c="dimmed" lh={1.75}>
                  Bạn có thể liên hệ hoặc tìm đường đến các địa điểm làm việc
                  của Công ty TNHH Đầu tư Thương mại và Du lịch Today.
                </Text>
                <Group gap="xs" mt="xs" wrap="nowrap" align="flex-start">
                  <ThemeIcon size={30} radius="xl" variant="light">
                    <IconBuilding size={16} />
                  </ThemeIcon>
                  <Text size="sm" c="dimmed" lh={1.65}>
                    Mã số doanh nghiệp:{" "}
                    <Text span fw={700} c="blue.9">
                      0108648082
                    </Text>
                  </Text>
                </Group>
              </Stack>
              {offices.map((office) => {
                const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`;

                return (
                  <Card
                    key={office.label}
                    className="interactive-card"
                    withBorder
                    radius="lg"
                    padding="lg"
                  >
                    <Group align="flex-start" gap="md" wrap="nowrap">
                      <ThemeIcon size={44} radius="md" variant="light">
                        <IconMapPin size={21} stroke={1.8} />
                      </ThemeIcon>
                      <Stack gap={6}>
                        <Text fw={700} c="blue.9">
                          {office.label}
                        </Text>
                        <Text size="sm" c="dimmed" lh={1.65}>
                          {office.address}
                        </Text>
                        <Anchor
                          href={mapsUrl}
                          target="_blank"
                          rel="noreferrer"
                          size="sm"
                          fw={700}
                          underline="hover"
                        >
                          Xem trên bản đồ <IconArrowUpRight size={14} />
                        </Anchor>
                      </Stack>
                    </Group>
                  </Card>
                );
              })}
            </Stack>

            <ContactRequestForm categories={categories} />
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
}
