import "../globals.css";
import { Poppins } from "next/font/google";
import type { Metadata } from "next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title:
    "Content Auto Pilot – Bantu Kamu Membuat dan Mengelola Konten Lebih Efisien!!",
  description:
    "Tools digital yang membantu kamu membuat dan mengelola konten lebih profesional, simpel, dan engaging. Cocok untuk mahasiswa, kreator pemula, influencer, freelancer, affiliator, digital agency, maupun bisnis owner.",
  openGraph: {
    title:
      "Content Auto Pilot – Bantu Kamu Membuat dan Mengelola Konten Lebih Efisien!!",
    description:
      "Tools digital all-in-one untuk membuat dan mengelola konten. Cocok untuk mahasiswa, kreator pemula, influencer, freelancer, affiliator, digital agency, maupun bisnis owner.",
    url: "https://sekolahwfa.com/content-auto-pilot",
    siteName: "Content Auto Pilot",
    images: [
      {
        url: "https://res.cloudinary.com/dpytrn22z/image/upload/v1757232018/Meta_Image_imcz0t.webp",
        width: 1200,
        height: 630,
        alt: "Content Auto Pilot – All in One Tools for Create & Manage Content",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Content Auto Pilot",
    description:
      "Toolkit simpel & profesional untuk membuat & mengelola konten lebih efisien.",
    images: [
      "https://res.cloudinary.com/dpytrn22z/image/upload/v1757232018/Meta_Image_imcz0t.webp",
    ],
    creator: "@azhardanii",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={poppins.className}>
      <body className="min-h-screen bg-white relative overflow-x-hidden [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/30 hover:[&::-webkit-scrollbar-thumb]:bg-white/50 [&::-webkit-scrollbar-thumb]:rounded-full">
          {children}
      </body>
    </html>
  );
}