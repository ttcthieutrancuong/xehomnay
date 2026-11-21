import { Button, Container, Stack, Text, Title } from "@mantine/core";

export default function HomePage() {
  return (
    <Container size="md" py="xl">
      <Stack align="flex-start" gap="md" mt="xl">
        <Text c="blue" fw={700} size="sm">XE HOM NAY</Text>
        <Title order={1}>Xehomnay project foundation</Title>
        <Text c="dimmed" maw={560}>
          Nền tảng đã sẵn sàng để phát triển ứng dụng thuê xe theo kiến trúc modular monolith.
        </Text>
        <Button>Khám phá Xehomnay</Button>
      </Stack>
    </Container>
  );
}
