import { Group, Text, ThemeIcon } from "@mantine/core";
import { IconCar } from "@tabler/icons-react";
import Link from "next/link";

export function Brand({ light = false }: Readonly<{ light?: boolean }>) {
  return (
    <Link
      href="/"
      aria-label="xehomnay.com, trang chủ"
      style={{
        color: light ? "white" : "var(--mantine-color-blue-9)",
        textDecoration: "none",
      }}
    >
      <Group gap="xs" wrap="nowrap">
        <ThemeIcon size={40} radius="md" variant="light" color="blue">
          <IconCar size={22} stroke={1.8} />
        </ThemeIcon>
        <Text fw={800} size="lg" lh={1}>
          xehomnay.com
        </Text>
      </Group>
    </Link>
  );
}
