import "../globals.css";
import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import Script from "next/script";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title:
    "Content Auto Pilot – Bantu Kamu Membuat dan Mengelola Konten Lebih Efisien!!",
  description:
    "Tools digital yang membantu kamu membuat dan mengelola konten lebih profesional, simpel, dan engaging. Cocok untuk mahasiswa, kreator pemula, influencer, affiliator, digital agency, maupun bisnis owner.",
  openGraph: {
    title:
      "Content Auto Pilot – Bantu Kamu Membuat dan Mengelola Konten Lebih Efisien!!",
    description:
      "Tools digital all-in-one untuk membuat dan mengelola konten. Cocok untuk mahasiswa, kreator pemula, influencer, freelancer, affiliator, digital agency, maupun bisnis owner.",
    url: "https://sekolahwfa.com/content-auto-pilot",
    siteName: "Content Auto Pilot",
    images: [
      {
        url: "https://raw.githubusercontent.com/azhardanii/sekolah-wfa/main/public/content-pilot/cap-metaimg.jpg",
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
      "https://raw.githubusercontent.com/azhardanii/sekolah-wfa/main/public/content-pilot/cap-metaimg.jpg",
    ],
    creator: "@azhardanii",
  },
};

export default function ContentAutoPilotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className={`min-h-screen bg-white relative overflow-x-hidden [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/30 hover:[&::-webkit-scrollbar-thumb]:bg-white/50 [&::-webkit-scrollbar-thumb]:rounded-full ${poppins.className}`}
    >
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1346212237107053');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript><img height="1" width="1" style={{ display: "none" }}
        src="https://www.facebook.com/tr?id=1346212237107053&ev=PageView&noscript=1" />
      </noscript>
      {children}
    </main>
  );
}
