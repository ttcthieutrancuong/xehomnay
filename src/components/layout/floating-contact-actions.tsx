"use client";

import { ActionIcon, Affix, Stack, Text, Tooltip } from "@mantine/core";
import { IconChevronUp, IconPhone } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export function FloatingContactActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 360);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Affix position={{ bottom: 24, right: 24 }} zIndex={30}>
      <Stack gap="sm" role="group" aria-label="Liên hệ nhanh">
        <Tooltip label="Nhắn tin qua Zalo" position="left">
          <ActionIcon
            className="floating-action floating-action--zalo"
            component="a"
            href="https://zalo.me/0852342525"
            target="_blank"
            rel="noreferrer"
            aria-label="Nhắn tin qua Zalo"
            size={54}
            radius="xl"
            variant="filled"
            color="blue"
          >
            <Text size="xs" fw={800} c="white">
              Zalo
            </Text>
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Gọi hotline 085 234 2525" position="left">
          <ActionIcon
            className="floating-action floating-action--phone"
            component="a"
            href="tel:+84852342525"
            aria-label="Gọi hotline 085 234 2525"
            size={54}
            radius="xl"
            variant="filled"
            color="blue.7"
          >
            <IconPhone size={22} stroke={2} />
          </ActionIcon>
        </Tooltip>
        {showBackToTop && (
          <Tooltip label="Lên đầu trang" position="left">
            <ActionIcon
              className="floating-action floating-action--back-to-top motion-enter"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Cuộn lên đầu trang"
              size={54}
              radius="xl"
              variant="default"
              color="blue"
            >
              <IconChevronUp size={21} stroke={2} />
            </ActionIcon>
          </Tooltip>
        )}
      </Stack>
    </Affix>
  );
}
