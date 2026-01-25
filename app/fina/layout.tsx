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
    "FINA – Financial Assistant Sekolah WFA",
  description:
    "Bantu mengelola keuangan cuma lewat WhatsApp. Tanpa instal aplikasi tambahan! Terintegrasi dengan AI dan Sheets secara otomatis.",
  openGraph: {
    title:
      "FINA – Financial Assistant Sekolah WFA",
    description:
      "Kelola keuangan cuma lewat WhatsApp. Tanpa instal aplikasi tambahan! Terintegrasi dengan AI dan Sheets secara otomatis.",
    url: "https://sekolahwfa.com/fina",
    siteName: "F.I.N.A – Financial Assistant Sekolah WFA",
    images: [
      {
        url: "https://raw.githubusercontent.com/azhardanii/sekolah-wfa/main/public/content-pilot/cap-metaimg.jpg",
        width: 1200,
        height: 630,
        alt: "F.I.N.A – Financial Assistant Sekolah WFA",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FINA – Financial Assistant Sekolah WFA",
    description:
      "Kelola keuangan cuma lewat WhatsApp. Tanpa instal aplikasi tambahan! Terintegrasi dengan AI dan Sheets secara otomatis.",
    images: [
      "https://raw.githubusercontent.com/azhardanii/sekolah-wfa/main/public/content-pilot/cap-metaimg.jpg",
    ],
    creator: "@azhardanii",
  },
};

export default function FINALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className={`min-h-screen bg-white relative overflow-x-hidden [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/30 hover:[&::-webkit-scrollbar-thumb]:bg-white/50 [&::-webkit-scrollbar-thumb]:rounded-full ${poppins.className}`}
    >
      {/* <Script id="meta-pixel" strategy="afterInteractive">
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
      </noscript> */}
      {children}
    </main>
  );
}
