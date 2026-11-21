import type { Metadata } from "next";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";
import "./globals.css";
import { MantineProvider } from "@/providers/mantine-provider";
import { QueryProvider } from "@/providers/query-provider";

export const metadata: Metadata = {
  title: "Xehomnay",
  description: "Nền tảng thuê xe Xehomnay",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>
        <MantineProvider>
          <QueryProvider>{children}</QueryProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
