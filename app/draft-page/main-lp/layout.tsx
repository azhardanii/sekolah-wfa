import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../../globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Sekolah WFA",
  description: "Platform Pembelajaran Digital",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className={`${poppins.variable} font-poppins bg-black text-white antialiased`}>
        {children}
      </div>
  );
}