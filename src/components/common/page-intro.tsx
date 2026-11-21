import {
  Anchor,
  Badge,
  Box,
  Breadcrumbs,
  Container,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import type { ReactNode } from "react";

type PageIntroProps = Readonly<{
  currentPage: string;
  eyebrow: string;
  title: ReactNode;
  description: string;
  children?: ReactNode;
}>;

export function PageIntro({
  currentPage,
  eyebrow,
  title,
  description,
  children,
}: PageIntroProps) {
  return (
    <Box
      component="section"
      py={{ base: 52, md: 80 }}
      style={{
        background:
          "radial-gradient(ellipse at 10% 0%, rgb(213 233 255 / 70%), transparent 38%), linear-gradient(180deg, #fafdff, #f2f7fd)",
      }}
    >
      <Container size="xl" px={{ base: "md", sm: "xl" }}>
        <Breadcrumbs mb={{ base: 24, md: 32 }} c="dimmed" separator="/">
          <Anchor href="/" size="sm" c="dimmed" underline="hover">
            Trang chủ
          </Anchor>
          <Text size="sm" c="blue.8" fw={600}>
            {currentPage}
          </Text>
        </Breadcrumbs>

        <Stack
          className="motion-enter"
          align="center"
          gap="md"
          mb={children ? { base: 28, md: 40 } : 0}
        >
          <Badge color="blue" variant="light" radius="xl" tt="none">
            {eyebrow}
          </Badge>
          <Title
            order={1}
            ta="center"
            c="blue.9"
            lh={1.12}
            maw={900}
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
          >
            {title}
          </Title>
          <Text c="dimmed" size="md" maw={680} ta="center" lh={1.75}>
            {description}
          </Text>
        </Stack>

        {children}
      </Container>
    </Box>
  );
}
