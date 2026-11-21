import { Brand } from "@/components/layout/brand";
import type { PublicCategory } from "@/features/categories/server/get-public-categories";
import { getCategoryHref } from "@/features/categories/utils/category-links";
import {
  ActionIcon,
  Anchor,
  Box,
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
  IconArrowUpRight,
  IconBrandFacebook,
  IconBrandLinkedin,
  IconMail,
  IconMapPin,
  IconPhone,
  IconWorld,
} from "@tabler/icons-react";
import Link from "next/link";

const helpLinks = [
  { label: "Giới thiệu xehomnay.com", href: "/gioi-thieu" },
  { label: "Xem các dịch vụ", href: "/#dich-vu" },
  { label: "Tin tức & cẩm nang", href: "/tin-tuc" },
  { label: "Liên hệ tư vấn", href: "/lien-he" },
  {
    label: "Tuyển dụng",
    href: "mailto:thuexe@todaytravel.vn?subject=Ứng%20tuyển%20Today%20Travel",
  },
];

function FooterLinkGroup({
  title,
  links,
}: Readonly<{
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}>) {
  return (
    <Stack gap="xs">
      <Text component="h2" fw={700} size="sm" c="white" mb={4}>
        {title}
      </Text>
      {links.map(({ label, href }) =>
        href.startsWith("/") ? (
          <Link
            href={href}
            key={label}
            style={{
              color: "var(--mantine-color-gray-3)",
              textDecoration: "none",
            }}
          >
            <Text size="sm">{label}</Text>
          </Link>
        ) : (
          <Anchor
            href={href}
            key={label}
            c="gray.3"
            size="sm"
            underline="hover"
          >
            {label}
          </Anchor>
        ),
      )}
    </Stack>
  );
}

export function SiteFooter({
  categories,
}: Readonly<{ categories: PublicCategory[] }>) {
  const serviceLinks = categories.map((category) => ({
    label: `Cho thuê ${category.name.toLocaleLowerCase("vi-VN")}`,
    href: getCategoryHref(category),
  }));

  return (
    <Box
      component="footer"
      c="white"
      pt={{ base: 48, md: 72 }}
      style={{
        background:
          "radial-gradient(ellipse at 90% 0%, rgba(50,143,239,.18), transparent 32%), linear-gradient(145deg, #082b55, #0b3b75 65%, #082b55)",
      }}
    >
      <Container size="xl" px={{ base: "md", sm: "xl" }}>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={{ base: 32, md: 64 }}>
          <Stack gap="xl">
            <Brand light />
            <Stack gap="sm">
              <Text size="xs" fw={700} c="blue.2" tt="uppercase" lts={1}>
                Đơn vị vận hành
              </Text>
              <Title order={2} size="h3" c="white" maw={520} lh={1.35}>
                Công ty TNHH Đầu tư Thương mại và Du lịch Today
              </Title>
            </Stack>
            <Stack gap="md" maw={580}>
              <CompanyInfo icon={<IconMapPin size={17} />} label="Trụ sở">
                Số 10, ngõ 253 Nguyễn Khang, phường Yên Hòa, TP. Hà Nội
              </CompanyInfo>
              <CompanyInfo
                icon={<IconMapPin size={17} />}
                label="Văn phòng Ninh Bình"
              >
                Thôn Thương Am, phường Hà Nam, tỉnh Ninh Bình
              </CompanyInfo>
              <Text size="sm" c="blue.1" mt={4}>
                Mã số doanh nghiệp:{" "}
                <Text span fw={700} c="white">
                  0108648082
                </Text>
              </Text>
            </Stack>
          </Stack>

          <Paper
            radius="xl"
            p={{ base: "lg", md: 28 }}
            withBorder
            style={{
              alignSelf: "center",
              borderColor: "rgba(255,255,255,.16)",
              background: "rgba(255,255,255,.075)",
              boxShadow: "0 18px 45px rgba(0,0,0,.08)",
            }}
          >
            <Stack gap="lg">
              <Box>
                <Text fw={700} size="lg" c="white">
                  Tư vấn & liên hệ
                </Text>
                <Text size="sm" c="blue.1" mt={4}>
                  Chúng tôi sẵn sàng trao đổi về lịch trình thuê xe.
                </Text>
              </Box>
              <Stack gap="lg">
                <ContactRow
                  icon={<IconPhone size={18} />}
                  label="Hotline tư vấn"
                >
                  <Group gap={6} wrap="wrap">
                    <Anchor href="tel:+84852342525" c="white" fw={700}>
                      085.234.2525
                    </Anchor>
                    <Text c="blue.2">·</Text>
                    <Anchor href="tel:+84912112878" c="white" fw={700}>
                      0912 112 878
                    </Anchor>
                  </Group>
                </ContactRow>
                <ContactRow icon={<IconMail size={18} />} label="Email">
                  <Anchor
                    href="mailto:thuexe@todaytravel.vn"
                    c="white"
                    fw={600}
                  >
                    thuexe@todaytravel.vn
                  </Anchor>
                </ContactRow>
                <ContactRow icon={<IconWorld size={18} />} label="Website">
                  <Anchor href="https://xehomnay.com" c="white" fw={600}>
                    xehomnay.com <IconArrowUpRight size={14} />
                  </Anchor>
                </ContactRow>
              </Stack>
            </Stack>
          </Paper>
        </SimpleGrid>

        <Divider my={{ base: 32, md: 48 }} color="blue.7" />

        <SimpleGrid
          cols={{ base: 1, xs: 2, md: 4 }}
          spacing={{ base: 28, md: 40 }}
        >
          <FooterLinkGroup title="Dịch vụ thuê xe" links={serviceLinks} />
          <FooterLinkGroup title="Trợ giúp nhanh" links={helpLinks} />
          <Stack gap="xs">
            <Text component="h2" fw={700} size="sm" c="white" mb={4}>
              Chính sách & quy định
            </Text>
            <Text size="sm" c="gray.3">
              Chính sách và quy định chung
            </Text>
            <Text size="sm" c="gray.3">
              Chính sách bảo mật thông tin
            </Text>
          </Stack>
          <Stack gap="sm">
            <Text component="h2" fw={700} size="sm" c="white">
              Chia sẻ cùng xehomnay.com
            </Text>
            <Text size="sm" c="blue.1">
              Kết nối và chia sẻ dịch vụ với bạn bè.
            </Text>
            <Group gap="sm">
              <ActionIcon
                component="a"
                href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fxehomnay.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Chia sẻ xehomnay.com trên Facebook"
                title="Chia sẻ trên Facebook"
                size={42}
                radius="xl"
                variant="light"
                color="blue"
              >
                <IconBrandFacebook size={20} />
              </ActionIcon>
              <ActionIcon
                component="a"
                href="https://www.linkedin.com/in/xe-h%C3%B4m-nay-a6a485170/"
                target="_blank"
                rel="noreferrer"
                aria-label="Xem xehomnay.com trên LinkedIn"
                title="LinkedIn"
                size={42}
                radius="xl"
                variant="light"
                color="blue"
              >
                <IconBrandLinkedin size={20} />
              </ActionIcon>
            </Group>
          </Stack>
        </SimpleGrid>

        <Group
          justify="space-between"
          gap="xs"
          py="lg"
          mt={{ base: 32, md: 48 }}
          style={{ borderTop: "1px solid var(--mantine-color-blue-7)" }}
        >
          <Text size="xs" c="blue.1">
            © {new Date().getFullYear()} xehomnay.com · Công ty TNHH Đầu tư
            Thương mại và Du lịch Today
          </Text>
          <Text size="xs" c="blue.1">
            Đồng hành cùng bạn trên mọi cung đường.
          </Text>
        </Group>
      </Container>
    </Box>
  );
}

function CompanyInfo({
  icon,
  label,
  children,
}: Readonly<{
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}>) {
  return (
    <Group align="flex-start" gap="sm" wrap="nowrap">
      <ThemeIcon size={30} variant="light" color="blue" radius="xl">
        {icon}
      </ThemeIcon>
      <Text size="sm" c="blue.0" lh={1.65}>
        <Text span fw={700} c="white">
          {label}:
        </Text>
        {children}
      </Text>
    </Group>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: Readonly<{
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}>) {
  return (
    <Group align="flex-start" gap="sm" wrap="nowrap">
      <ThemeIcon variant="light" color="blue" radius="md" mt={1}>
        {icon}
      </ThemeIcon>
      <Stack gap={4}>
        <Text size="xs" fw={700} c="blue.2" tt="uppercase" lts={0.8}>
          {label}
        </Text>
        {children}
      </Stack>
    </Group>
  );
}
