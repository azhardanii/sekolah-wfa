import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Providers } from "@/components/providers"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
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
    <html lang="id" className="scrollbar-hide overflow-x-hidden scroll-smooth">
      <body className={`${poppins.variable} font-poppins`}>
        <Providers>
          {children}
        </Providers>
        </body>
    </html>
  );
}
