import { FeaturedCarsSlider } from "@/features/cars/components/featured-cars-slider";
import { createPageMetadata } from "@/lib/seo";
import { imageAssets } from "@/lib/image-assets";
import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  IconArrowRight,
  IconArrowUpRight,
  IconBriefcase2,
  IconCalendarMonth,
  IconCar,
  IconHeart,
  IconMapPin,
  IconPhone,
  IconPlane,
  IconPointFilled,
  IconStar,
  IconSteeringWheel,
  IconUsers,
} from "@tabler/icons-react";
import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";

export const metadata: Metadata = createPageMetadata({
  title: "Thuê xe du lịch, xe văn phòng, xe tự lái",
  description:
    "Tìm dịch vụ thuê xe du lịch, xe văn phòng, xe cưới, xe tháng và xe tự lái. Liên hệ Today Travel để trao đổi lịch trình và nhu cầu sử dụng.",
  pathname: "/",
});

const sectionPadding = { base: 56, md: 88 };

const services = [
  {
    id: "xe-du-lich",
    title: "Xe du lịch",
    description:
      "Cho chuyến đi gia đình, nhóm bạn, tham quan hoặc về quê cuối tuần.",
    icon: IconPlane,
  },
  {
    id: "xe-van-phong",
    title: "Xe văn phòng",
    description:
      "Đưa đón sân bay, đi công tác và phục vụ nhu cầu di chuyển của doanh nghiệp.",
    icon: IconBriefcase2,
  },
  {
    id: "xe-cuoi",
    title: "Xe cưới hỏi",
    description:
      "Phương tiện cho lễ cưới, lễ hỏi và những dịp quan trọng của gia đình.",
    icon: IconHeart,
  },
  {
    id: "xe-thang",
    title: "Xe tháng",
    description:
      "Phục vụ lịch trình đưa đón thường xuyên của cá nhân hoặc doanh nghiệp.",
    icon: IconCalendarMonth,
  },
  {
    id: "xe-tu-lai",
    title: "Xe tự lái",
    description:
      "Chủ động cầm lái và sắp xếp thời gian theo kế hoạch riêng của bạn.",
    icon: IconSteeringWheel,
  },
  {
    id: "xe-vip",
    title: "Xe VIP",
    description:
      "Dành cho nhu cầu đón tiếp đối tác, tham dự sự kiện và những chuyến đi cần sự chỉn chu.",
    icon: IconStar,
  },
];

const preparationTips = [
  {
    title: "Lịch trình",
    description: "Ngày đi, thời gian dự kiến và các điểm đón, trả khách.",
    icon: IconMapPin,
  },
  {
    title: "Số hành khách",
    description: "Số người đi cùng và lượng hành lý cần mang theo.",
    icon: IconUsers,
  },
  {
    title: "Hình thức thuê",
    description: "Nhu cầu có tài xế, tự lái, thuê theo chuyến hay theo tháng.",
    icon: IconCar,
  },
];

const bookingSteps = [
  {
    number: "01",
    title: "Chia sẻ lịch trình",
    description: "Ngày đi, điểm đón trả và số người tham gia.",
  },
  {
    number: "02",
    title: "Chọn hình thức thuê",
    description: "Trao đổi nhu cầu xe có tài xế, tự lái hoặc thuê dài hạn.",
  },
  {
    number: "03",
    title: "Thống nhất phương án",
    description: "Làm rõ loại xe, thời gian phục vụ và điều kiện thuê.",
  },
];

function SectionBadge({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <Badge
      color="blue"
      variant="light"
      radius="xl"
      size="md"
      tt="none"
      leftSection={<IconPointFilled size={11} />}
    >
      {children}
    </Badge>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: Readonly<{ eyebrow: string; title: ReactNode; description?: string }>) {
  return (
    <Stack gap="sm" maw={660}>
      <SectionBadge>{eyebrow}</SectionBadge>
      <Title order={2} size="h2" lh={1.2}>
        {title}
      </Title>
      {description && (
        <Text size="md" c="dimmed" lh={1.7} maw={620}>
          {description}
        </Text>
      )}
    </Stack>
  );
}

function HeroVehiclePhoto() {
  return (
    <Box
      pos="relative"
      h="clamp(340px, 42vw, 500px)"
      bg="blue.0"
      style={{ overflow: "hidden", borderRadius: 24 }}
    >
      <Image
        src={imageAssets.hero}
        alt="Xe du lịch đang di chuyển trên cung đường giữa núi non"
        fill
        preload
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{ objectFit: "cover" }}
      />
      <Box
        pos="absolute"
        inset={0}
        style={{
          background:
            "linear-gradient(180deg, rgba(8,43,85,.02) 35%, rgba(8,43,85,.78) 100%)",
        }}
      />
      <Badge
        pos="absolute"
        top={20}
        right={20}
        color="white"
        variant="light"
        radius="xl"
        tt="none"
      >
        Hình ảnh minh họa
      </Badge>
      <Paper
        pos="absolute"
        bottom={{ base: 16, sm: 24 }}
        left={{ base: 16, sm: 24 }}
        right={{ base: 16, sm: 24 }}
        p={{ base: "md", sm: "lg" }}
        radius="lg"
        style={{
          background: "rgba(8, 43, 85, .74)",
          backdropFilter: "blur(12px)",
        }}
      >
        <Group gap="sm" wrap="nowrap">
          <ThemeIcon size={42} radius="md" variant="light" color="blue">
            <IconCar size={22} />
          </ThemeIcon>
          <Stack gap={3}>
            <Text fw={700} c="white">
              Chọn xe theo chuyến đi
            </Text>
            <Text size="sm" c="blue.0">
              Số người · hành lý · lịch trình
            </Text>
          </Stack>
        </Group>
      </Paper>
    </Box>
  );
}

export default function HomePage() {
  const businessStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CÔNG TY TNHH ĐẦU TƯ THƯƠNG MẠI VÀ DU LỊCH TODAY",
    alternateName: "xehomnay.com",
    url: "https://xehomnay.com",
    logo: "https://xehomnay.com/icon.svg",
    email: "thuexe@todaytravel.vn",
    telephone: "+84852342525",
    identifier: {
      "@type": "PropertyValue",
      propertyID: "Mã số doanh nghiệp",
      value: "0108648082",
    },
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "Số 10, ngõ 253 Nguyễn Khang",
        addressLocality: "Phường Yên Hòa, Hà Nội",
        addressCountry: "VN",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "Thôn Thương Am",
        addressLocality: "Phường Hà Nam, Ninh Bình",
        addressCountry: "VN",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Dịch vụ cho thuê xe",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: service.title },
      })),
    },
  };

  return (
    <Box component="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(businessStructuredData).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      <Box
        component="section"
        className="page-hero"
        py={{ base: 56, md: 80 }}
        style={{
          background:
            "radial-gradient(ellipse at 8% 8%, rgb(213 233 255 / 52%), transparent 35%), linear-gradient(180deg, #fafdff, #f4f8fc)",
        }}
      >
        <Container size="xl" px={{ base: "md", sm: "xl" }}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={{ base: 36, md: 56 }}>
            <Stack justify="center" gap="md" maw={590} className="motion-enter">
              <SectionBadge>Dịch vụ thuê xe · Today Travel</SectionBadge>
              <Title
                order={1}
                size="h1"
                c="blue.9"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.035em",
                }}
              >
                Chọn xe phù hợp.
                <br />
                <Box
                  component="span"
                  c="blue.6"
                  style={{ fontSize: "inherit", fontWeight: "inherit" }}
                >
                  An tâm lên đường.
                </Box>
              </Title>
              <Text c="dimmed" size="md" maw={500} lh={1.75}>
                Từ chuyến du lịch cùng gia đình đến nhu cầu đưa đón thường
                xuyên, xehomnay.com giúp bạn tìm hiểu dịch vụ theo lịch trình và
                mục đích sử dụng.
              </Text>
              <Group mt="xs" gap="sm">
                <Button
                  component="a"
                  href="#dich-vu"
                  size="md"
                  rightSection={<IconArrowRight size={17} />}
                >
                  Xem dịch vụ thuê xe
                </Button>
                <Button
                  component="a"
                  href="#cach-thue-xe"
                  size="md"
                  variant="default"
                >
                  Cách thuê xe
                </Button>
              </Group>
              <Group gap="xs" mt="xs" wrap="wrap">
                <IconPhone size={16} color="var(--mantine-color-blue-6)" />
                <Text size="sm" c="dimmed">
                  Tư vấn lịch trình:
                </Text>
                <Text
                  component="a"
                  href="tel:+84852342525"
                  size="sm"
                  fw={600}
                  c="blue.7"
                >
                  085.234.2525
                </Text>
                <Text size="sm" c="dimmed">
                  ·
                </Text>
                <Text
                  component="a"
                  href="tel:+84912112878"
                  size="sm"
                  fw={600}
                  c="blue.7"
                >
                  0912 112 878
                </Text>
              </Group>
            </Stack>
            <Box className="motion-enter-media">
              <HeroVehiclePhoto />
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      <Box component="section" id="dich-vu" py={sectionPadding}>
        <Container size="xl" px={{ base: "md", sm: "xl" }}>
          <Box mb={36}>
            <SectionHeading
              eyebrow="Dịch vụ"
              title={<>Bạn cần xe cho dịp nào?</>}
              description="Du lịch, công tác, cưới hỏi hay đưa đón định kỳ — chọn dịch vụ theo mục đích và thời gian sử dụng."
            />
          </Box>

          <SimpleGrid
            className="reveal-grid"
            cols={{ base: 1, sm: 2, lg: 3 }}
            spacing="md"
          >
            {services.map(({ id, title, description, icon: Icon }) => (
              <Card
                component="a"
                className="interactive-card"
                href="/lien-he"
                id={id}
                key={id}
                padding="lg"
                radius="lg"
                withBorder
                shadow="xs"
                style={{
                  display: "flex",
                  minHeight: 210,
                  flexDirection: "column",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <Group justify="space-between" align="flex-start">
                  <ThemeIcon size={48} radius="md" variant="light">
                    <Icon size={23} stroke={1.7} />
                  </ThemeIcon>
                  <IconArrowUpRight
                    size={18}
                    color="var(--mantine-color-gray-5)"
                  />
                </Group>
                <Title order={3} size="h3" mt="lg">
                  {title}
                </Title>
                <Text c="dimmed" mt="xs" lh={1.65} size="sm">
                  {description}
                </Text>
              </Card>
            ))}
          </SimpleGrid>

          <Paper
            withBorder
            radius="lg"
            p={{ base: "md", sm: "lg" }}
            mt="lg"
            bg="blue.0"
          >
            <Group justify="space-between" gap="md">
              <Text fw={600} maw={650}>
                Chưa rõ dịch vụ nào phù hợp? Chia sẻ lịch trình và số hành khách
                để được tư vấn cụ thể hơn.
              </Text>
              <Button
                component="a"
                href="/lien-he"
                variant="light"
                rightSection={<IconArrowRight size={17} />}
              >
                Tư vấn chọn xe
              </Button>
            </Group>
          </Paper>
        </Container>
      </Box>

      <FeaturedCarsSlider sectionPadding={sectionPadding} />

      <Box
        component="section"
        id="cach-thue-xe"
        py={sectionPadding}
        bg="gray.0"
      >
        <Container size="xl" px={{ base: "md", sm: "xl" }}>
          <Box mb={36}>
            <SectionHeading
              eyebrow="Cách thuê xe"
              title={<>Ba bước để bắt đầu thuê xe</>}
              description="Từ nhu cầu ban đầu đến phương án cụ thể, các bước trao đổi được sắp xếp rõ ràng để bạn dễ chuẩn bị."
            />
          </Box>
          <SimpleGrid
            className="reveal-grid"
            cols={{ base: 1, md: 3 }}
            spacing="md"
          >
            {bookingSteps.map(({ number, title, description }) => (
              <Paper
                key={number}
                className="interactive-card"
                withBorder
                radius="lg"
                p="lg"
                h="100%"
              >
                <Stack gap="md">
                  <ThemeIcon variant="light" size={46} radius="xl" fw={700}>
                    {number}
                  </ThemeIcon>
                  <Box>
                    <Title order={3} size="h3" c="blue.9">
                      {title}
                    </Title>
                    <Text size="sm" c="dimmed" mt="xs" lh={1.65}>
                      {description}
                    </Text>
                  </Box>
                </Stack>
              </Paper>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <Box component="section" id="thong-tin-thue-xe" py={sectionPadding}>
        <Container size="xl" px={{ base: "md", sm: "xl" }}>
          <Box mb={36}>
            <SectionHeading
              eyebrow="Chuẩn bị chuyến đi"
              title={<>Thông tin để tư vấn đúng nhu cầu</>}
              description="Chỉ cần nắm trước một vài chi tiết, bạn sẽ dễ trao đổi loại xe và hình thức thuê phù hợp hơn."
            />
          </Box>
          <SimpleGrid
            className="reveal-grid"
            cols={{ base: 1, md: 3 }}
            spacing="md"
          >
            {preparationTips.map(
              ({ title, description, icon: Icon }, index) => (
                <Paper key={title} withBorder radius="lg" p="lg" shadow="xs">
                  <Group gap="sm" align="flex-start" wrap="nowrap">
                    <ThemeIcon size={42} radius="md" variant="light">
                      <Icon size={21} />
                    </ThemeIcon>
                    <Stack gap="xs">
                      <Text size="xs" c="blue.6" fw={700}>
                        0{index + 1}
                      </Text>
                      <Title order={3} size="h3">
                        {title}
                      </Title>
                      <Text c="dimmed" size="sm" lh={1.65}>
                        {description}
                      </Text>
                    </Stack>
                  </Group>
                </Paper>
              ),
            )}
          </SimpleGrid>
        </Container>
      </Box>

      <Box
        component="section"
        id="lien-he"
        py={{ base: 56, md: 72 }}
        bg="blue.9"
        c="white"
        style={{
          background:
            "radial-gradient(circle at 88% 20%, rgba(85,184,255,.24), transparent 28%), linear-gradient(120deg, #082b55, #1256bd)",
        }}
      >
        <Container size="xl" px={{ base: "md", sm: "xl" }}>
          <Group justify="space-between" align="center" gap="xl">
            <Stack gap="sm" maw={700}>
              <SectionBadge>Cần tư vấn thuê xe?</SectionBadge>
              <Title order={2} size="h2" c="white">
                Chia sẻ lịch trình để được tư vấn chọn xe phù hợp.
              </Title>
              <Text c="blue.0" size="md" lh={1.65}>
                Gọi cho Today Travel để trao đổi ngày đi, điểm đón và nhu cầu sử
                dụng xe.
              </Text>
            </Stack>
            <Group gap="sm" wrap="wrap">
              <Button
                component="a"
                href="tel:+84852342525"
                size="md"
                variant="white"
                color="blue"
                leftSection={<IconPhone size={18} />}
              >
                Gọi 085.234.2525
              </Button>
              <Button
                component="a"
                href="/lien-he"
                size="md"
                variant="default"
                rightSection={<IconArrowRight size={17} />}
              >
                Gửi yêu cầu tư vấn
              </Button>
            </Group>
          </Group>
        </Container>
      </Box>
    </Box>
  );
}
