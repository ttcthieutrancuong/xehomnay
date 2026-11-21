"use client";

import {
  Box,
  Button,
  Card,
  Group,
  Modal,
  SimpleGrid,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { IconMaximize, IconZoomIn } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";

export type LegalDocument = Readonly<{
  title: string;
  description: string;
  src: string;
  alt: string;
}>;

type LegalDocumentsGalleryProps = Readonly<{
  documents: ReadonlyArray<LegalDocument>;
}>;

export function LegalDocumentsGallery({
  documents,
}: LegalDocumentsGalleryProps) {
  const [activeDocument, setActiveDocument] = useState<LegalDocument | null>(
    null,
  );

  return (
    <>
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
        {documents.map((document) => (
          <Card
            key={document.src}
            className="interactive-card"
            withBorder
            radius="xl"
            padding="md"
          >
            <Stack gap="md">
              <UnstyledButton
                type="button"
                onClick={() => setActiveDocument(document)}
                aria-label={`Mở xem ${document.title}`}
                style={{
                  position: "relative",
                  display: "block",
                  height: "clamp(250px, 30vw, 380px)",
                  overflow: "hidden",
                  borderRadius: 12,
                  background: "var(--mantine-color-gray-1)",
                }}
              >
                <Image
                  src={document.src}
                  alt={document.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "contain" }}
                />
                <Group
                  pos="absolute"
                  right={12}
                  bottom={12}
                  gap={6}
                  bg="white"
                  px="sm"
                  py={6}
                  style={{
                    borderRadius: 999,
                    boxShadow: "0 4px 16px #082b5520",
                  }}
                >
                  <IconZoomIn size={16} color="var(--mantine-color-blue-7)" />
                  <Text size="xs" fw={700} c="blue.9">
                    Nhấn để phóng to
                  </Text>
                </Group>
              </UnstyledButton>

              <Group justify="space-between" align="flex-start" gap="sm">
                <Stack gap={4}>
                  <Text fw={700} c="blue.9">
                    {document.title}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {document.description}
                  </Text>
                </Stack>
              </Group>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>

      <Modal
        opened={activeDocument !== null}
        onClose={() => setActiveDocument(null)}
        title={activeDocument?.title}
        centered
        size="min(1100px, 94vw)"
        radius="lg"
        padding="md"
        overlayProps={{ backgroundOpacity: 0.72, blur: 2 }}
      >
        {activeDocument && (
          <Stack gap="sm">
            <Box
              pos="relative"
              h="min(72vh, 900px)"
              style={{ background: "var(--mantine-color-gray-0)" }}
            >
              <Image
                src={activeDocument.src}
                alt={activeDocument.alt}
                fill
                sizes="94vw"
                style={{ objectFit: "contain" }}
              />
            </Box>
            <Group justify="space-between" align="center">
              <Text size="sm" c="dimmed">
                {activeDocument.description}
              </Text>
              <Button
                component="a"
                href={activeDocument.src}
                target="_blank"
                rel="noreferrer"
                variant="light"
                rightSection={<IconMaximize size={16} />}
              >
                Mở ảnh gốc
              </Button>
            </Group>
          </Stack>
        )}
      </Modal>
    </>
  );
}
