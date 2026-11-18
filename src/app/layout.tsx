import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "XeHômNay | Thuê xe dễ dàng",
  description: "Đặt xe phù hợp cho mọi hành trình cùng XeHômNay.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
