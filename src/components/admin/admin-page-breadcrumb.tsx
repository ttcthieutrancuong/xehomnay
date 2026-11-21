import { ActionIcon, Box, Breadcrumbs, Text } from "@mantine/core";
import { IconArrowLeft, IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type AdminPageBreadcrumbProps = {
  backHref: string;
  items: BreadcrumbItem[];
};

export function AdminPageBreadcrumb({
  backHref,
  items,
}: AdminPageBreadcrumbProps) {
  const currentItem = items.at(-1);
  const parentItems = items.slice(0, -1);

  return (
    <Box component="nav" aria-label="Breadcrumb">
      <div className="admin-page-breadcrumb">
        <Link
          href={backHref}
          className="admin-page-breadcrumb__back-link"
          aria-label="Quay lại"
        >
          <ActionIcon
            variant="subtle"
            color="gray"
            size="lg"
            aria-hidden="true"
          >
            <IconArrowLeft size={19} />
          </ActionIcon>
        </Link>
        <Breadcrumbs
          c="dimmed"
          separator={<IconChevronRight size={14} stroke={1.7} />}
        >
          {parentItems.map((item) =>
            item.href ? (
              <Link
                key={`${item.href}-${item.label}`}
                href={item.href}
                className="admin-category-breadcrumb__link"
              >
                {item.label}
              </Link>
            ) : (
              <Text key={item.label} size="sm" c="dimmed">
                {item.label}
              </Text>
            ),
          )}
          {currentItem && (
            <Text
              size="sm"
              c="blue.8"
              fw={600}
              lineClamp={1}
              maw="min(360px, 48vw)"
              aria-current="page"
            >
              {currentItem.label}
            </Text>
          )}
        </Breadcrumbs>
      </div>
    </Box>
  );
}
