"use client";

import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconArrowRight,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import Image from "next/image";
import { imageAssets } from "@/lib/image-assets";
import { useEffect, useRef, useState } from "react";

const featuredCars = [
  {
    id: "suv",
    category: "SUV",
    title: "Rộng rãi cho chuyến đi gia đình",
    description:
      "Tham khảo dòng xe gầm cao cho nhóm nhỏ hoặc lịch trình có nhiều hành lý.",
    label: "Gia đình · hành lý",
    image: imageAssets.suv,
    alt: "SUV di chuyển trên cung đường núi",
    href: "/#xe-du-lich",
    service: "Xe du lịch",
  },
  {
    id: "sedan",
    category: "SEDAN",
    title: "Gọn gàng cho lịch trình trong phố",
    description:
      "Gợi ý cho lịch công tác, đưa đón sân bay hoặc nhu cầu di chuyển hằng ngày.",
    label: "Công tác · đô thị",
    image: imageAssets.sedan,
    alt: "Sedan màu đen đỗ trên đường phố",
    href: "/#xe-van-phong",
    service: "Xe văn phòng",
  },
  {
    id: "mpv",
    category: "MPV",
    title: "Cả nhóm cùng đi một chuyến",
    description:
      "Tham khảo khi gia đình hoặc nhóm bạn muốn sắp xếp chỗ ngồi trên cùng một xe.",
    label: "Gia đình · nhóm bạn",
    image: imageAssets.mpv,
    alt: "MPV màu trắng phù hợp cho chuyến đi gia đình",
    href: "/#xe-du-lich",
    service: "Xe du lịch",
  },
  {
    id: "minibus",
    category: "MINIBUS",
    title: "Thêm lựa chọn cho đoàn đông",
    description:
      "Gợi ý cho chuyến đi tập thể, tour hoặc nhu cầu đưa đón theo đoàn.",
    label: "Tour · đoàn thể",
    image: imageAssets.minibus,
    alt: "Xe van chở khách lưu thông trên đường phố",
    href: "/#xe-du-lich",
    service: "Xe du lịch",
  },
];

type FeaturedCarsSliderProps = Readonly<{
  sectionPadding?: { base: number; md: number };
}>;

export function FeaturedCarsSlider({
  sectionPadding = { base: 56, md: 88 },
}: FeaturedCarsSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const updateActiveSlide = () => {
      const slides = Array.from(slider.children) as HTMLElement[];
      const nextIndex = slides.reduce((closestIndex, slide, index) => {
        const closestSlide = slides[closestIndex];
        if (!closestSlide) return index;

        const currentDistance = Math.abs(
          slide.getBoundingClientRect().left -
            slider.getBoundingClientRect().left,
        );
        const closestDistance = Math.abs(
          closestSlide.getBoundingClientRect().left -
            slider.getBoundingClientRect().left,
        );

        return currentDistance < closestDistance ? index : closestIndex;
      }, 0);

      setActiveIndex(nextIndex);
    };

    slider.addEventListener("scroll", updateActiveSlide, { passive: true });
    return () => slider.removeEventListener("scroll", updateActiveSlide);
  }, []);

  const moveToSlide = (index: number) => {
    const slider = sliderRef.current;
    const slide = slider?.children[index] as HTMLElement | undefined;
    if (!slider || !slide) return;

    slider.scrollTo({
      left:
        slider.scrollLeft +
        slide.getBoundingClientRect().left -
        slider.getBoundingClientRect().left,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  const moveBy = (direction: -1 | 1) => {
    moveToSlide(
      Math.min(featuredCars.length - 1, Math.max(0, activeIndex + direction)),
    );
  };

  return (
    <Box
      component="section"
      id="xe-noi-bat"
      py={sectionPadding}
      style={{
        background:
          "radial-gradient(ellipse at 92% 8%, rgb(213 233 255 / 78%), transparent 34%), linear-gradient(180deg, #f4f8fc, #ffffff)",
      }}
    >
      <Container size="xl" px={{ base: "md", sm: "xl" }}>
        <Group justify="space-between" align="flex-end" gap="lg" mb="xl">
          <Stack gap="sm" maw={720}>
            <Badge color="blue" variant="light" radius="xl" size="md" tt="none">
              Gợi ý dòng xe
            </Badge>
            <Stack gap="xs">
              <Title order={2} size="h2" lh={1.2}>
                Chọn dòng xe theo chuyến đi của bạn.
              </Title>
              <Text c="dimmed" size="md" lh={1.7} maw={640}>
                Tham khảo không gian và mục đích sử dụng. Loại xe cụ thể sẽ được
                tư vấn theo số người, hành lý và lịch trình.
              </Text>
            </Stack>
          </Stack>
          <Text size="sm" c="dimmed" fw={600} visibleFrom="sm">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(featuredCars.length).padStart(2, "0")}
          </Text>
        </Group>

        <Box
          ref={sliderRef}
          className="featured-car-slider-track"
          role="region"
          aria-label="Dòng xe tham khảo"
          tabIndex={0}
          style={{
            display: "flex",
            gap: 16,
            overflowX: "auto",
            overscrollBehaviorInline: "contain",
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
          }}
        >
          {featuredCars.map((car, index) => (
            <Card
              key={car.id}
              className="featured-car-slide"
              component="article"
              aria-label={`${index + 1} trên ${featuredCars.length}: ${car.category}`}
              padding={0}
              radius="xl"
              withBorder
              shadow="sm"
              style={{
                flex: "0 0 100%",
                overflow: "hidden",
                scrollSnapAlign: "start",
              }}
            >
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing={0}>
                <Box
                  pos="relative"
                  h={{ base: 250, sm: 320, md: 420 }}
                  bg="gray.1"
                  style={{ overflow: "hidden" }}
                >
                  <Image
                    src={car.image}
                    alt={car.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                  <Badge
                    pos="absolute"
                    top={{ base: 14, sm: 20 }}
                    left={{ base: 14, sm: 20 }}
                    color="white"
                    variant="light"
                    radius="xl"
                    tt="none"
                  >
                    Hình ảnh tham khảo
                  </Badge>
                  <Text
                    pos="absolute"
                    right={{ base: 14, sm: 20 }}
                    bottom={{ base: 14, sm: 20 }}
                    c="white"
                    size="sm"
                    fw={700}
                    style={{ textShadow: "0 1px 8px rgb(0 0 0 / 50%)" }}
                  >
                    {car.category}
                  </Text>
                </Box>

                <Stack
                  justify="space-between"
                  gap="xl"
                  p={{ base: "lg", sm: "xl", lg: 40 }}
                  mih={{ base: 270, md: 420 }}
                  style={{
                    background:
                      "radial-gradient(circle at 100% 0%, rgb(213 233 255 / 55%), transparent 38%), #ffffff",
                  }}
                >
                  <Group justify="space-between" align="center">
                    <Badge color="blue" variant="light" radius="xl" tt="none">
                      {car.service}
                    </Badge>
                    <Text size="sm" c="dimmed" fw={600} hiddenFrom="sm">
                      {String(index + 1).padStart(2, "0")} /{" "}
                      {String(featuredCars.length).padStart(2, "0")}
                    </Text>
                  </Group>

                  <Stack gap="md">
                    <Text
                      size="xs"
                      c="blue.6"
                      fw={800}
                      tt="uppercase"
                      lts={1.2}
                    >
                      {car.category} · {car.label}
                    </Text>
                    <Title order={3} size="h2" c="blue.9" lh={1.2}>
                      {car.title}
                    </Title>
                    <Text c="dimmed" size="md" lh={1.7} maw={460}>
                      {car.description}
                    </Text>
                  </Stack>

                  <Button
                    component="a"
                    href={car.href}
                    rightSection={<IconArrowRight size={17} />}
                    w="fit-content"
                    size="md"
                  >
                    Xem dịch vụ {car.service.toLowerCase()}
                  </Button>
                </Stack>
              </SimpleGrid>
            </Card>
          ))}
        </Box>

        <Group justify="space-between" align="center" mt="lg" gap="md">
          <Group gap={6} role="group" aria-label="Chọn dòng xe">
            {featuredCars.map((car, index) => (
              <ActionIcon
                key={car.id}
                variant={activeIndex === index ? "filled" : "light"}
                color="blue"
                radius="xl"
                size={30}
                aria-label={`Xem gợi ý ${car.category}`}
                aria-current={activeIndex === index ? "true" : undefined}
                onClick={() => moveToSlide(index)}
              >
                {activeIndex === index ? (
                  <Text size="xs" fw={700} c="white">
                    {index + 1}
                  </Text>
                ) : (
                  <Box
                    component="span"
                    w={6}
                    h={6}
                    style={{
                      borderRadius: "50%",
                      background: "var(--mantine-color-blue-5)",
                    }}
                  />
                )}
              </ActionIcon>
            ))}
          </Group>

          <Group gap="xs">
            <Text size="xs" c="dimmed" hiddenFrom="sm">
              Vuốt ngang để xem các dòng xe
            </Text>
            <ActionIcon
              variant="default"
              size={42}
              radius="xl"
              aria-label="Xem gợi ý trước"
              disabled={activeIndex === 0}
              onClick={() => moveBy(-1)}
            >
              <IconChevronLeft size={19} />
            </ActionIcon>
            <ActionIcon
              variant="default"
              size={42}
              radius="xl"
              aria-label="Xem gợi ý tiếp theo"
              disabled={activeIndex === featuredCars.length - 1}
              onClick={() => moveBy(1)}
            >
              <IconChevronRight size={19} />
            </ActionIcon>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
