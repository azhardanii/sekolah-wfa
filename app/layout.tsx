import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sekolah WFA",
  description:
    "Sekolah WFA – Platform Digital Terlengkap untuk Pekerja WFA Masa Kini. Belajar, Berkarya, dan Berpenghasilan Dari Mana Aja!",
  keywords: [
    "sekolah WFA",
    "platform digital WFA",
    "belajar kerja remote",
    "pekerja fleksibel",
    "belajar digital skill",
    "kursus online WFA",
    "work from anywhere",
    "belajar freelance",
    "penghasilan online",
    "peluang kerja digital",
    "sekolah fleksibel",
  ],
  openGraph: {
    title: "Sekolah WFA – Platform Digital Terlengkap untuk Pekerja WFA",
    description:
      "Sekolah WFA – Platform Digital Terlengkap untuk Pekerja WFA Masa Kini. Belajar, Berkarya, dan Berpenghasilan Dari Mana Aja!",
    url: "https://sekolahwfa.com",
    siteName: "Sekolah WFA",
    images: [
      {
        url: "https://res.cloudinary.com/dpytrn22z/image/upload/v1745843216/sekolahWFA_la7vpj.jpg", 
        width: 1200,
        height: 630,
        alt: "Sekolah WFA – Platform Digital Terlengkap untuk Pekerja WFA",
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
      "https://res.cloudinary.com/dpytrn22z/image/upload/v1745843216/sekolahWFA_la7vpj.jpg",
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
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
