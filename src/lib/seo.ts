import { APP_NAME } from "@/lib/constants";
import type { Metadata } from "next";

type PageMetadataOptions = Readonly<{
  title: string;
  description: string;
  pathname: string;
  type?: "website" | "article";
  image?: Readonly<{ url: string; alt: string }>;
}>;

export function createPageMetadata({
  title,
  description,
  pathname,
  type = "website",
  image = {
    url: "/opengraph-image",
    alt: "xehomnay.com · Dịch vụ thuê xe",
  },
}: PageMetadataOptions): Metadata {
  const socialTitle = `${title} | ${APP_NAME}`;

  return {
    title,
    description,
    alternates: { canonical: pathname },
    openGraph: {
      type,
      siteName: APP_NAME,
      locale: "vi_VN",
      title: socialTitle,
      description,
      url: pathname,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image.url],
    },
  };
}
