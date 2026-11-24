import {
  Button,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";

const serviceOptions = [
  "Xe du lịch",
  "Xe văn phòng",
  "Xe cưới",
  "Xe tháng",
  "Xe tự lái",
  "Xe VIP",
  "Đón tiễn sân bay",
  "Khác",
];

export function ContactRequestForm() {
  return (
    <Paper
      className="motion-enter"
      withBorder
      radius="xl"
      p={{ base: "md", sm: "xl" }}
      shadow="xs"
    >
      <Stack gap="lg">
        <Stack gap="xs">
          <Text size="sm" fw={700} c="blue.7">
            Thông tin chuyến đi
          </Text>
          <Title order={2} size="h3" c="blue.9">
            Bạn cần thuê xe cho lịch trình nào?
          </Title>
          <Text size="sm" c="dimmed" lh={1.65}>
            Cho biết nhu cầu của bạn để đội ngũ Today Travel có cơ sở trao đổi
            phương án phù hợp.
          </Text>
        </Stack>

        <Stack gap="md">
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            <TextInput
              label="Họ và tên"
              placeholder="Tên của bạn"
              autoComplete="name"
              required
            />
            <TextInput
              label="Số điện thoại"
              placeholder="Nhập số điện thoại"
              type="tel"
              autoComplete="tel"
              required
            />
          </SimpleGrid>

          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            <TextInput
              label="Email"
              placeholder="Nhập địa chỉ email"
              type="email"
              autoComplete="email"
            />
            <Select
              label="Dịch vụ quan tâm"
              placeholder="Chọn dịch vụ"
              data={serviceOptions}
              searchable
              clearable
            />
          </SimpleGrid>

          <Textarea
            label="Thông tin chuyến đi"
            placeholder="Ví dụ: ngày đi, điểm đón trả, số hành khách và hành lý..."
            minRows={4}
            autosize
          />

          <Stack gap="xs" align="flex-start">
            <Button type="button" rightSection={<IconArrowRight size={17} />}>
              Gửi thông tin chuyến đi
            </Button>
            <Text size="xs" c="dimmed">
              Biểu mẫu đang trong giai đoạn chuẩn bị giao diện và chưa gửi dữ
              liệu.
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
}
