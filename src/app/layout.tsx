import { APP_NAME, SITE_URL } from "@/lib/constants";
import { MantineProvider } from "@/providers/mantine-provider";
import "@mantine/core/styles.css";
import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: APP_NAME,
  title: {
    default: "xehomnay.com | Dịch vụ thuê xe",
    template: "%s | xehomnay.com",
  },
  description:
    "Tìm dịch vụ thuê xe du lịch, xe văn phòng, xe cưới, xe tháng và xe tự lái. Liên hệ Today Travel để trao đổi lịch trình và nhu cầu sử dụng.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>
        <MantineProvider>
          <NuqsAdapter>{children}</NuqsAdapter>
        </MantineProvider>
      </body>
    </html>
  );
}
