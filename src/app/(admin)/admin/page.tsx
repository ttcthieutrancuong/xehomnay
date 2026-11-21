import {
  Badge,
  Box,
  Button,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  IconArrowDownRight,
  IconArrowRight,
  IconArrowUpRight,
  IconCar,
  IconExternalLink,
  IconReceipt,
  IconUsers,
} from "@tabler/icons-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Tổng quan" };

const stats = [
  {
    label: "Yêu cầu thuê",
    value: "248",
    change: "+12,8%",
    trend: "up",
    detail: "so với tháng trước",
    icon: IconReceipt,
    color: "blue",
  },
  {
    label: "Xe đang hoạt động",
    value: "86",
    change: "+6",
    trend: "up",
    detail: "xe mới trong tháng",
    icon: IconCar,
    color: "teal",
  },
  {
    label: "Tài khoản khách hàng",
    value: "1.284",
    change: "+8,2%",
    trend: "up",
    detail: "so với tháng trước",
    icon: IconUsers,
    color: "violet",
  },
  {
    label: "Danh mục dịch vụ",
    value: "06",
    change: "Ổn định",
    trend: "steady",
    detail: "đang được sử dụng",
    icon: undefined,
    color: "orange",
  },
] as const;

const chartPoints = [
  { x: 30, y: 142 },
  { x: 135, y: 118 },
  { x: 240, y: 130 },
  { x: 345, y: 76 },
  { x: 450, y: 92 },
  { x: 555, y: 52 },
  { x: 670, y: 68 },
];
const chartLine = chartPoints.map(({ x, y }) => `${x},${y}`).join(" ");
const chartArea = `30,190 ${chartLine} 670,190`;

const recentRequests = [
  {
    id: "DH-2408",
    customer: "Nguyễn Minh Anh",
    vehicle: "Toyota Vios",
    status: "Chờ xác nhận",
    tone: "yellow",
  },
  {
    id: "DH-2407",
    customer: "Trần Quốc Bảo",
    vehicle: "Mitsubishi Xpander",
    status: "Đã xác nhận",
    tone: "teal",
  },
  {
    id: "DH-2406",
    customer: "Lê Thu Hà",
    vehicle: "VinFast VF 8",
    status: "Đang thuê",
    tone: "blue",
  },
];

export default function AdminPage() {
  return (
    <Stack gap="xl" className="admin-dashboard">
      <Group justify="space-between" align="center" gap="md" wrap="wrap">
        <Stack gap={4}>
          <Text className="admin-dashboard__eyebrow">KHÔNG GIAN QUẢN TRỊ</Text>
          <Title order={1} className="admin-dashboard__title">
            Tổng quan
          </Title>
          <Text className="admin-dashboard__muted">
            Theo dõi hoạt động và tình hình kinh doanh trên xehomnay.com.
          </Text>
        </Stack>
        <Group gap="sm">
          <Badge
            color="gray"
            variant="light"
            radius="xl"
            className="admin-dashboard__preview-badge"
          >
            Dữ liệu minh họa
          </Badge>
          <Button
            component="a"
            href="/"
            target="_blank"
            rel="noreferrer"
            variant="default"
            rightSection={<IconExternalLink size={16} />}
          >
            Xem website
          </Button>
        </Group>
      </Group>

      <SimpleGrid cols={{ base: 1, xs: 2, xl: 4 }} spacing="md">
        {stats.map(
          ({ label, value, change, trend, detail, icon: Icon, color }) => (
            <Paper
              key={label}
              className="admin-dashboard__stat"
              radius="lg"
              p="lg"
            >
              <Group justify="space-between" align="flex-start" wrap="nowrap">
                <Stack gap={10}>
                  <Text className="admin-dashboard__stat-label">{label}</Text>
                  <Text className="admin-dashboard__stat-value">{value}</Text>
                </Stack>
                {Icon && (
                  <ThemeIcon
                    variant="light"
                    color={color}
                    size={42}
                    radius="md"
                  >
                    <Icon size={20} stroke={1.8} />
                  </ThemeIcon>
                )}
              </Group>
              <Group gap={6} mt="md" wrap="nowrap">
                {trend === "up" ? (
                  <IconArrowUpRight
                    size={16}
                    className="admin-dashboard__trend-up"
                  />
                ) : (
                  <IconArrowDownRight
                    size={16}
                    className="admin-dashboard__trend-steady"
                  />
                )}
                <Text
                  className={`admin-dashboard__stat-change admin-dashboard__stat-change--${trend}`}
                >
                  {change}
                </Text>
                <Text className="admin-dashboard__stat-detail">{detail}</Text>
              </Group>
            </Paper>
          ),
        )}
      </SimpleGrid>

      <Box className="admin-dashboard__primary-grid">
        <Paper className="admin-dashboard__panel" radius="lg" p="lg">
          <Group
            justify="space-between"
            align="flex-start"
            gap="md"
            wrap="wrap"
          >
            <Stack gap={4}>
              <Title order={2} className="admin-dashboard__panel-title">
                Hoạt động cho thuê
              </Title>
              <Text size="sm" className="admin-dashboard__muted">
                Lượt xem xe và yêu cầu thuê trong 7 ngày gần nhất
              </Text>
            </Stack>
            <Button
              size="xs"
              variant="default"
              rightSection={<IconArrowDownRight size={15} />}
            >
              7 ngày qua
            </Button>
          </Group>

          <Group gap="lg" mt="lg" className="admin-dashboard__chart-legend">
            <Group gap={8}>
              <span className="admin-dashboard__legend-dot admin-dashboard__legend-dot--primary" />
              <Text size="sm">Lượt xem xe</Text>
            </Group>
            <Group gap={8}>
              <span className="admin-dashboard__legend-dot admin-dashboard__legend-dot--secondary" />
              <Text size="sm">Yêu cầu thuê</Text>
            </Group>
          </Group>

          <Box
            className="admin-dashboard__chart-wrap"
            role="img"
            aria-label="Biểu đồ minh họa lượt xem xe và yêu cầu thuê trong 7 ngày"
          >
            <svg
              className="admin-dashboard__chart"
              viewBox="0 0 700 220"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="views-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#2878e3" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#2878e3" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[35, 75, 115, 155, 195].map((y) => (
                <line
                  key={y}
                  x1="30"
                  x2="670"
                  y1={y}
                  y2={y}
                  className="admin-dashboard__chart-gridline"
                />
              ))}
              <polygon points={chartArea} fill="url(#views-fill)" />
              <polyline
                points={chartLine}
                className="admin-dashboard__chart-line"
              />
              <polyline
                points="30,168 135,152 240,160 345,128 450,140 555,108 670,120"
                className="admin-dashboard__chart-line admin-dashboard__chart-line--secondary"
              />
              {chartPoints.map(({ x, y }) => (
                <circle
                  key={x}
                  cx={x}
                  cy={y}
                  r="4"
                  className="admin-dashboard__chart-point"
                />
              ))}
            </svg>
            <Group
              justify="space-between"
              className="admin-dashboard__chart-labels"
            >
              {["T.2", "T.3", "T.4", "T.5", "T.6", "T.7", "CN"].map((day) => (
                <Text key={day} size="xs" c="dimmed">
                  {day}
                </Text>
              ))}
            </Group>
          </Box>
        </Paper>

        <Paper
          className="admin-dashboard__panel admin-dashboard__quick-actions"
          radius="lg"
          p="lg"
        >
          <Group justify="space-between" align="center" mb="lg">
            <Stack gap={4}>
              <Title order={2} className="admin-dashboard__panel-title">
                Truy cập nhanh
              </Title>
              <Text size="sm" className="admin-dashboard__muted">
                Các khu vực quản trị thường dùng
              </Text>
            </Stack>
          </Group>
          <Stack gap="sm">
            <Button
              component="a"
              href="/admin/danh-muc"
              variant="subtle"
              color="gray"
              justify="space-between"
              rightSection={<IconArrowRight size={17} />}
              className="admin-dashboard__quick-link"
            >
              Quản lý danh mục
            </Button>
            <Button
              component="a"
              href="/admin/danh-muc/tao-moi"
              variant="subtle"
              color="gray"
              justify="space-between"
              rightSection={<IconArrowRight size={17} />}
              className="admin-dashboard__quick-link"
            >
              Tạo danh mục mới
            </Button>
          </Stack>
          <Box className="admin-dashboard__quick-note" mt="lg">
            <Text size="sm" fw={600}>
              Sẵn sàng mở rộng
            </Text>
            <Text size="xs" className="admin-dashboard__muted" mt={4}>
              Thống kê xe và yêu cầu thuê sẽ được kết nối khi hoàn thiện các
              nghiệp vụ tương ứng.
            </Text>
          </Box>
        </Paper>
      </Box>

      <Paper className="admin-dashboard__panel" radius="lg" p="lg">
        <Group justify="space-between" align="center" mb="sm" wrap="wrap">
          <Stack gap={4}>
            <Title order={2} className="admin-dashboard__panel-title">
              Yêu cầu thuê gần đây
            </Title>
            <Text size="sm" className="admin-dashboard__muted">
              Một số yêu cầu mới nhất trên hệ thống
            </Text>
          </Stack>
          <Badge color="blue" variant="light" radius="xl">
            3 yêu cầu
          </Badge>
        </Group>
        <Box className="admin-dashboard__request-list">
          {recentRequests.map((request) => (
            <Group
              key={request.id}
              justify="space-between"
              gap="md"
              wrap="wrap"
              className="admin-dashboard__request-row"
            >
              <Group
                gap="md"
                wrap="nowrap"
                className="admin-dashboard__request-main"
              >
                <ThemeIcon variant="light" color="blue" size={42} radius="md">
                  <IconCar size={20} />
                </ThemeIcon>
                <Stack gap={3}>
                  <Text
                    size="sm"
                    fw={650}
                    className="admin-dashboard__request-customer"
                  >
                    {request.customer}
                  </Text>
                  <Text size="xs" className="admin-dashboard__muted">
                    {request.vehicle}{" "}
                    <span className="admin-dashboard__request-id">
                      · {request.id}
                    </span>
                  </Text>
                </Stack>
              </Group>
              <Badge color={request.tone} variant="light" radius="xl">
                {request.status}
              </Badge>
            </Group>
          ))}
        </Box>
      </Paper>
    </Stack>
  );
}
