import { PageIntro } from "@/components/common/page-intro";
import { getPublicCategories } from "@/features/categories/server/get-public-categories";
import {
  LegalDocumentsGallery,
  type LegalDocument,
} from "@/features/company/components/legal-documents-gallery";
import { createPageMetadata } from "@/lib/seo";
import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Divider,
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
  IconBuilding,
  IconCheck,
  IconPhone,
  IconShieldCheck,
  IconTargetArrow,
  IconUsers,
} from "@tabler/icons-react";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "Giới thiệu Today Travel",
  description:
    "Tìm hiểu về Today Travel, đơn vị vận hành xehomnay.com, các dịch vụ thuê xe, phương châm phục vụ và hồ sơ pháp lý doanh nghiệp.",
  pathname: "/gioi-thieu",
});

const missions = [
  {
    title: "Với khách hàng",
    description:
      "Nỗ lực mang đến chuyến đi thuận tiện, thoải mái và an toàn cho khách hàng.",
    icon: IconUsers,
  },
  {
    title: "Với cộng đồng",
    description:
      "Góp phần xây dựng văn hóa giao thông và chấp hành nghiêm các quy định trên đường.",
    icon: IconShieldCheck,
  },
  {
    title: "Mục tiêu",
    description:
      "Hướng tới trở thành doanh nghiệp hàng đầu trong lĩnh vực cung cấp dịch vụ du lịch tại Việt Nam.",
    icon: IconTargetArrow,
  },
];

const legalDocuments: LegalDocument[] = [
  {
    title: "Giấy chứng nhận đăng ký doanh nghiệp",
    description: "Công ty TNHH Đầu tư Thương mại và Du lịch Today.",
    src: "/images/legal-documents/dang-ky-kinh-danh-cty-today-scaled.jpg",
    alt: "Ảnh giấy chứng nhận đăng ký doanh nghiệp của Công ty Today",
  },
  {
    title: "Giấy phép kinh doanh vận tải bằng xe ô tô",
    description: "Giấy phép số 8198/GPKDVT, cấp lần thứ nhất.",
    src: "/images/legal-documents/giay-phep-kinh-doanh-cty-today.jpg",
    alt: "Ảnh giấy phép kinh doanh vận tải bằng xe ô tô của Công ty Today",
  },
];

function ServiceAreaCard({
  label,
  description,
}: Readonly<{ label: string; description: string | null }>) {
  return (
    <Card
      className="interactive-card"
      withBorder
      radius="lg"
      padding="md"
      h="100%"
    >
      <Stack gap={6}>
        <Text fw={600} size="sm" c="blue.9" lh={1.5}>
          {label}
        </Text>
        {description && (
          <Text size="xs" c="dimmed" lh={1.6}>
            {description}
          </Text>
        )}
      </Stack>
    </Card>
  );
}

export default async function AboutPage() {
  const categories = await getPublicCategories();

  return (
    <Box component="main">
      <PageIntro
        currentPage="Giới thiệu"
        eyebrow="Giới thiệu Today Travel"
        title={
          <>
            Cùng bạn trên
            <br />
            <Box
              component="span"
              c="blue.6"
              style={{ fontSize: "inherit", fontWeight: "inherit" }}
            >
              mọi nẻo đường.
            </Box>
          </>
        }
        description="xehomnay.com là kênh dịch vụ thuộc hệ sinh thái Today Travel, giới thiệu các dịch vụ thuê xe và du lịch do công ty cung cấp."
      />

      <Box component="section" py={{ base: 56, md: 88 }}>
        <Container size="lg" px={{ base: "md", sm: "xl" }}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={{ base: 28, md: 48 }}>
            <Stack gap="md">
              <Badge color="blue" variant="light" radius="xl" tt="none">
                Lời ngỏ
              </Badge>
              <Title order={2} size="h2" c="blue.9" lh={1.2}>
                Trân trọng sự tin tưởng của Quý khách.
              </Title>
              <Text c="dimmed" lh={1.85}>
                Công ty TNHH Đầu tư Thương mại và Du lịch Today (Today Travel)
                trân trọng gửi lời chúc sức khỏe, thành công và thịnh vượng đến
                Quý khách hàng. Cảm ơn Quý khách đã tin tưởng, sử dụng dịch vụ
                và đồng hành cùng chúng tôi trong thời gian qua.
              </Text>
              <Text c="dimmed" lh={1.85}>
                xehomnay.com là một trong những kênh thuộc hệ sinh thái Today
                Travel. Chúng tôi cung cấp thông tin về các hình thức thuê xe,
                giúp khách hàng tìm hiểu lựa chọn phù hợp với nhu cầu và ngân
                sách.
              </Text>
              <Text c="dimmed" lh={1.85}>
                Hoạt động tại Hà Nội, Today Travel cung cấp dịch vụ cho thuê xe
                và tổ chức tour du lịch. Đội ngũ luôn sẵn sàng trao đổi lịch
                trình để tư vấn loại xe và hình thức phục vụ phù hợp.
              </Text>
            </Stack>

            <Paper
              withBorder
              radius="xl"
              p={{ base: "lg", md: "xl" }}
              bg="blue.0"
              style={{ alignSelf: "center" }}
            >
              <Stack gap="lg">
                <ThemeIcon size={52} radius="md" variant="light">
                  <IconBuilding size={26} />
                </ThemeIcon>
                <Box>
                  <Text size="xs" fw={700} c="blue.7" tt="uppercase" lts={1}>
                    Đơn vị vận hành
                  </Text>
                  <Title order={3} size="h4" c="blue.9" mt="xs" lh={1.45}>
                    Công ty TNHH Đầu tư Thương mại và Du lịch Today
                  </Title>
                </Box>
                <Divider color="blue.2" />
                <Group gap="xs" wrap="nowrap">
                  <ThemeIcon size={34} radius="xl" variant="light" color="blue">
                    <IconCheck size={18} />
                  </ThemeIcon>
                  <Text size="sm" c="blue.9" fw={600}>
                    Mã số doanh nghiệp: 0108648082
                  </Text>
                </Group>
              </Stack>
            </Paper>
          </SimpleGrid>
        </Container>
      </Box>

      <Box component="section" py={{ base: 56, md: 88 }}>
        <Container size="xl" px={{ base: "md", sm: "xl" }}>
          <Stack gap="sm" maw={700} mb={32}>
            <Badge color="blue" variant="light" radius="xl" tt="none">
              Minh bạch thông tin
            </Badge>
            <Title order={2} size="h2" c="blue.9" lh={1.2}>
              Hồ sơ pháp lý doanh nghiệp
            </Title>
            <Text c="dimmed" lh={1.7}>
              Tham khảo hồ sơ doanh nghiệp và giấy phép kinh doanh vận tải của
              Today Travel. Chọn tài liệu để xem rõ hơn hoặc mở ảnh gốc.
            </Text>
          </Stack>
          <LegalDocumentsGallery documents={legalDocuments} />
        </Container>
      </Box>

      <Box
        component="section"
        py={{ base: 56, md: 88 }}
        style={{ background: "#f4f8fc" }}
      >
        <Container size="xl" px={{ base: "md", sm: "xl" }}>
          <Stack gap="sm" maw={700} mb={32}>
            <Badge color="blue" variant="light" radius="xl" tt="none">
              Lĩnh vực hoạt động
            </Badge>
            <Title order={2} size="h2" c="blue.9" lh={1.2}>
              Dịch vụ Today Travel cung cấp
            </Title>
            <Text c="dimmed" lh={1.7}>
              Các dịch vụ thuê xe và du lịch phục vụ nhu cầu cá nhân, gia đình
              và tổ chức:
            </Text>
          </Stack>
          <SimpleGrid
            className="reveal-grid"
            cols={{ base: 1, sm: 2, lg: 4 }}
            spacing="sm"
          >
            {categories.length > 0 ? (
              categories.map((category) => (
                <ServiceAreaCard
                  key={category.id}
                  label={category.name}
                  description={category.description}
                />
              ))
            ) : (
              <Text c="dimmed" size="sm">
                Vui lòng liên hệ để được tư vấn dịch vụ hiện có.
              </Text>
            )}
          </SimpleGrid>
        </Container>
      </Box>

      <Box component="section" py={{ base: 56, md: 88 }}>
        <Container size="xl" px={{ base: "md", sm: "xl" }}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={{ base: 32, md: 64 }}>
            <Stack justify="center" gap="md" maw={560}>
              <Badge color="blue" variant="light" radius="xl" tt="none">
                Cách chúng tôi phục vụ
              </Badge>
              <Title order={2} size="h2" c="blue.9" lh={1.2}>
                Lắng nghe nhu cầu, chăm chút từng chuyến đi.
              </Title>
              <Text c="dimmed" lh={1.8}>
                Sự tin tưởng được xây dựng qua từng lần phục vụ. Today Travel
                chú trọng đội ngũ nhân sự, phương tiện và trang thiết bị để đáp
                ứng nhu cầu của khách hàng.
              </Text>
              <Text c="dimmed" lh={1.8}>
                Nhân viên tư vấn hỗ trợ khách hàng làm rõ lịch trình và nhu cầu.
                Đội ngũ tài xế được tuyển chọn, đào tạo nhằm mang đến chuyến đi
                thuận tiện và an toàn.
              </Text>
            </Stack>

            <Paper
              radius="xl"
              p={{ base: "lg", md: "xl" }}
              c="white"
              style={{
                background:
                  "radial-gradient(circle at 92% 8%, rgba(85,184,255,.25), transparent 32%), linear-gradient(145deg, #082b55, #1256bd)",
              }}
            >
              <Stack gap="md">
                <Box>
                  <Text size="xs" fw={700} c="blue.2" tt="uppercase" lts={1}>
                    Phương châm phục vụ
                  </Text>
                  <Title order={3} size="h3" c="white" mt="xs" lh={1.3}>
                    Uy tín, chất lượng trong từng dịch vụ.
                  </Title>
                </Box>
                <SimpleGrid cols={2} spacing="sm">
                  {["Uy tín", "Chất lượng", "Ấn tượng", "Hài lòng"].map(
                    (value, index) => (
                      <Paper
                        key={value}
                        radius="md"
                        p="sm"
                        style={{
                          border: "1px solid rgba(255,255,255,.16)",
                          background: "rgba(255,255,255,.08)",
                        }}
                      >
                        <Stack gap={4}>
                          <Text size="xs" fw={700} c="blue.2">
                            0{index + 1}
                          </Text>
                          <Text fw={700} c="white">
                            {value}
                          </Text>
                        </Stack>
                      </Paper>
                    ),
                  )}
                </SimpleGrid>
                <Text size="sm" c="blue.0" lh={1.7}>
                  Uy tín · Chất lượng · Ấn tượng · Hài lòng — phương châm phục
                  vụ của Today Travel.
                </Text>
              </Stack>
            </Paper>
          </SimpleGrid>
        </Container>
      </Box>

      <Box
        component="section"
        py={{ base: 56, md: 88 }}
        style={{ background: "#f4f8fc" }}
      >
        <Container size="xl" px={{ base: "md", sm: "xl" }}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={{ base: 32, md: 64 }}>
            <Stack gap="md" maw={560}>
              <Badge color="blue" variant="light" radius="xl" tt="none">
                Khách hàng đã đồng hành
              </Badge>
              <Title order={2} size="h2" c="blue.9" lh={1.2}>
                Phục vụ đa dạng nhu cầu di chuyển.
              </Title>
              <Text c="dimmed" lh={1.8}>
                Today Travel cung cấp dịch vụ cho các doanh nghiệp, tổ chức và
                khách hàng cá nhân thuộc nhiều lĩnh vực:
              </Text>
            </Stack>

            <Paper withBorder radius="xl" p={{ base: "lg", md: "xl" }}>
              <Stack gap="md">
                <Text size="xs" fw={700} c="blue.7" tt="uppercase" lts={1}>
                  Nhóm khách hàng
                </Text>
                {[
                  "Tập đoàn và công ty nước ngoài",
                  "Tổ chức phi chính phủ, khu công nghiệp",
                  "Ngân hàng, khách sạn và công ty du lịch",
                  "Chuyên gia và khách hàng cá nhân",
                ].map((item) => (
                  <Group key={item} gap="sm" wrap="nowrap">
                    <ThemeIcon size={28} radius="xl" variant="light">
                      <IconCheck size={16} />
                    </ThemeIcon>
                    <Text size="sm" fw={600} c="blue.9">
                      {item}
                    </Text>
                  </Group>
                ))}
              </Stack>
            </Paper>
          </SimpleGrid>
        </Container>
      </Box>

      <Box component="section" py={{ base: 56, md: 88 }}>
        <Container size="xl" px={{ base: "md", sm: "xl" }}>
          <Stack gap="sm" maw={680} mb={32}>
            <Badge color="blue" variant="light" radius="xl" tt="none">
              Mục tiêu & sứ mệnh
            </Badge>
            <Title order={2} size="h2" c="blue.9" lh={1.2}>
              Cùng hướng đến những chuyến đi tốt hơn.
            </Title>
          </Stack>
          <SimpleGrid
            className="reveal-grid"
            cols={{ base: 1, md: 3 }}
            spacing="md"
          >
            {missions.map(({ title, description, icon: Icon }) => (
              <Card
                key={title}
                className="interactive-card"
                withBorder
                radius="lg"
                padding="lg"
                h="100%"
              >
                <Stack gap="md">
                  <ThemeIcon size={48} radius="md" variant="light">
                    <Icon size={23} stroke={1.8} />
                  </ThemeIcon>
                  <Box>
                    <Title order={3} size="h4" c="blue.9">
                      {title}
                    </Title>
                    <Text c="dimmed" size="sm" mt="xs" lh={1.7}>
                      {description}
                    </Text>
                  </Box>
                </Stack>
              </Card>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <Box
        component="section"
        py={{ base: 44, md: 64 }}
        c="white"
        style={{
          background:
            "radial-gradient(circle at 88% 20%, rgba(85,184,255,.24), transparent 28%), linear-gradient(120deg, #082b55, #1256bd)",
        }}
      >
        <Container size="xl" px={{ base: "md", sm: "xl" }}>
          <Group justify="space-between" align="center" gap="xl">
            <Stack gap="sm" maw={740}>
              <Text size="sm" fw={700} c="blue.1">
                xehomnay.com · Today Travel
              </Text>
              <Title order={2} size="h2" c="white" lh={1.25}>
                Để Today Travel đồng hành cùng chuyến đi của bạn.
              </Title>
              <Text size="sm" c="blue.0" lh={1.7}>
                Trao đổi lịch trình và nhu cầu để được tư vấn dịch vụ phù hợp.
              </Text>
            </Stack>
            <Group gap="sm">
              <Button
                component="a"
                href="tel:+84852342525"
                size="md"
                variant="white"
                color="blue"
                leftSection={<IconPhone size={17} />}
              >
                Gọi tư vấn thuê xe
              </Button>
              <Button
                component="a"
                href="/#dich-vu"
                size="md"
                variant="default"
                rightSection={<IconArrowRight size={17} />}
              >
                Xem dịch vụ
              </Button>
            </Group>
          </Group>
        </Container>
      </Box>
    </Box>
  );
}
