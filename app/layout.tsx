import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sekolah WFA",
  description:
    "Sekolah WFA – Sekolah Digital Terlengkap untuk Pekerja WFA Masa Kini. Belajar, Berkarya, dan Berpenghasilan Dari Mana Aja!",
  openGraph: {
    title: "Sekolah WFA – Belajar, Berkarya, dan Berpenghasilan Dari Mana Aja!",
    description:
      "Sekolah Digital Terlengkap untuk Para Pekerja WFA Masa Kini.",
    url: "https://sekolahwfa.com",
    siteName: "Sekolah WFA",
    images: [
      {
        url: "https://res.cloudinary.com/dpytrn22z/image/upload/v1745844397/sekolah-WFA_vi4fzq.jpg",
        width: 1200,
        height: 630,
        alt: "Sekolah WFA – Sekolah Digital Terlengkap untuk Pekerja WFA Masa Kini.",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sekolah WFA – Belajar, Berkarya, dan Berpenghasilan Dari Mana Aja",
    description:
      "Sekolah WFA membantumu membangun masa depan fleksibel lewat skill digital. Belajar, Berkarya, dan Berpenghasilan Dari Mana Aja!",
    images: [
      "https://res.cloudinary.com/dpytrn22z/image/upload/v1745844397/sekolah-WFA_vi4fzq.jpg",
    ],
    creator: "@sekolahwfa",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} scrollbar-hide`}>
      <body className="font-inter antialiased overflow-x-hidden">{children}</body>
    </html>
  );
}
