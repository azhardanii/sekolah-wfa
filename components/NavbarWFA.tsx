"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Data Mega Menu dipindah ke luar agar bisa diakses Mobile & Desktop
const megaMenuItems = [
  {
    title: "Ruang Kelas",
    desc: "Pembelajaran kerja WFA (berpenghasilan dari mana aja). Akses kapanpun & dimanapun Kamu berada.",
    icon: "/iconwfa-ruangkelas.svg",
    href: "/ruang-kelas",
  },
  {
    title: "Laboratorium",
    desc: "Digital Asset's Agency (jasa customise development digital tools).",
    icon: "/iconwfa-lab.svg",
    href: "/laboratorium",
  },
  {
    title: "Rekreasi",
    desc: "Trip bersama ke destinasi dalam & luar negeri, sekaligus menjalin relasi.",
    icon: "/iconwfa-rekreasi.svg",
    href: "/rekreasi",
  },
  {
    title: "Ruang BK",
    desc: "Konsultasi Mental Health & Kenali Potensi Dalam Dirimu Bareng Psikolog.",
    icon: "/iconwfa-ruangbk.svg",
    href: "/ruang-bk",
  },
  {
    title: "Kantin",
    desc: "Tempat Jajan Ebook, Tools Digital, Record Webinar, dsb.",
    icon: "/iconwfa-kantin.svg",
    href: "/kantin",
  },
  {
    title: "Mading",
    desc: "Pusat Info loker, showcase karya, & news update seputar dunia digital.",
    icon: "/iconwfa-mading.svg",
    href: "/mading",
  },
];

const navItems = [
  { name: "Beranda", href: "/" },
  { name: "Fasilitas", href: "/fasilitas", hasMegaMenu: true },
  { name: "Profil Sekolah", href: "/profil" },
  { name: "Cerita Alumni", href: "/alumni" },
  { name: "Mading", href: "/mading" },
  { name: "Promo", href: "/promo" },
];

export default function NavbarWFA() {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  
  // State untuk Mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileFasilitasOpen, setIsMobileFasilitasOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      // Kunci scroll halaman utama
      document.body.style.overflow = "hidden";
    } else {
      // Kembalikan scroll halaman utama
      document.body.style.overflow = "unset";
    }

    // Cleanup function: memastikan scroll kembali aktif jika komponen di-unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className={isMobileMenuOpen ? "fixed top-4 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-24 py-4" : "relative z-50 flex items-center justify-between px-6 md:px-24 mt-4 py-4"}>
      {isMobileMenuOpen && (
        <div className="fixed top-0 left-0 right-0 h-[6.5rem] w-full bg-white z-50 md:hidden" />
      )}
      {/* 1. LOGO SECTION */}
      <Link href="/" className="flex flex-col relative z-50">
        <Image
          src="/logo-wfa.webp"
          alt="Sekolah WFA Logo"
          width={100}
          height={50}
          priority
          className="object-contain hover:opacity-80 transition-opacity"
        />
      </Link>

      {/* ================= DESKTOP NAV START (SAMA PERSIS SEPERTI SEBELUMNYA) ================= */}
      {/* Dibungkus hidden md:flex agar hilang di mobile */}
      <div className="hidden md:flex pt-[3.5px] pb-[3.65px] pl-[3.75px] pr-[4px] rounded-full bg-gradient-to-b from-[#2AB3B0] to-[#147167] shadow-sm">
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full text-base relative">
          {navItems.map((item, index) => {
            const isActuallyActive = pathname === item.href;
            const isHovered = hoveredItem === item.name;

            const showAsActive = hoveredItem ? isHovered : isActuallyActive;

            let inactiveLinkPadding = "px-2";

            if (index === 0) {
              inactiveLinkPadding = "pl-8 pr-2";
            } else if (index === navItems.length - 1) {
              inactiveLinkPadding = "pr-8 pl-2";
            }

            return (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => {
                  setHoveredItem(item.name);
                  if (item.hasMegaMenu) setIsMegaMenuOpen(true);
                }}
                onMouseLeave={() => {
                  setHoveredItem(null);
                  if (item.hasMegaMenu) setIsMegaMenuOpen(false);
                }}
              >
                {showAsActive ? (
                  <div className="px-[2.5px] py-[0px] rounded-full bg-gradient-to-b from-[#2AB3B0] to-[#147167] scale-105 inline-block">
                    <Link
                      href={item.href}
                      className="block w-full h-full bg-gradient-to-r from-[#2AB3B0] to-[#147167] text-white px-5 py-2 rounded-full font-medium"
                    >
                      {item.name}
                    </Link>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`text-[#147167] font-semibold hover:text-[#2AB3B0] transition-all duration-300 scale-105 ${inactiveLinkPadding}`}
                  >
                    {item.name}
                  </Link>
                )}

                {/* MEGA MENU DESKTOP */}
                {item.hasMegaMenu && isMegaMenuOpen && (
                  <div className="absolute top-full -left-72 mt-0.5 w-[1000px] z-50">
                    <div
                      className="rounded-[30px] p-8 grid grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2 duration-300"
                      style={{
                        background:
                          "linear-gradient(to bottom, #147167, #26D7C4)",
                        boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.7)",
                      }}
                    >
                      {megaMenuItems.map((menu, idx) => (
                        <Link
                          key={idx}
                          href={menu.href}
                          className="bg-white rounded-2xl py-6 px-2 flex flex-col items-center text-center hover:scale-[1.02] transition-transform duration-200 cursor-pointer shadow-sm"
                        >
                          <div className="mb-4 relative w-16 h-16">
                            <Image
                              src={menu.icon}
                              alt={menu.title}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <h4 className="text-[#147167] font-bold text-xl mb-2">
                            {menu.title}
                          </h4>
                          <p className="text-[#147167] text-xs leading-relaxed px-2 font-medium">
                            {menu.desc}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* ================= DESKTOP NAV END ================= */}

      {/* 3. CTA BUTTON & MOBILE TOGGLE */}
      {/* Container utama tombol stylingnya SAMA untuk Desktop & Mobile */}
      <div
        className="group relative pb-[3.5px] pt-[3.5px] pl-[3px] pr-[3px] rounded-full bg-gradient-to-t from-[#147167] to-[#2AB3B0] shadow-lg shadow-teal-700/20 active:scale-95 transition-all duration-150 z-50 cursor-pointer"
        onClick={() => {
          // Hanya berfungsi sebagai toggle di mode mobile
          if (window.innerWidth < 768) {
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }
        }}
      >
        {/* DESKTOP CONTENT: Text Belajar Gratis */}
        <Link
          href="/ruang-kelas"
          className="hidden md:flex px-6 py-2 rounded-full bg-gradient-to-r from-[#2AB3B0] to-[#147167] text-white font-semibold text-base tracking-wide items-center gap-2"
        >
          Belajar GRATIS{" "}
          <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform inline-block">
            ↗
          </span>
        </Link>

        {/* MOBILE CONTENT: Hamburger / Close Icon */}
        <div className="md:hidden flex w-12 h-10 items-center justify-center rounded-full bg-gradient-to-r from-[#2AB3B0] to-[#147167] text-white">
          {isMobileMenuOpen ? (
            // Icon X
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Icon Hamburger (Garis 3)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </div>
      </div>

      {/* ================= MOBILE MENU OVERLAY ================= */}
      <div
        className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex-1 overflow-y-auto pt-28 pb-10 px-6">
          <div className="flex flex-col gap-4">
            {navItems.map((item, index) => {
              // Khusus Logic untuk Item Fasilitas (Mega Menu di Mobile)
              if (item.hasMegaMenu) {
                return (
                  <div key={index} className="flex flex-col border-b border-gray-100 pb-2">
                    <button
                      onClick={() => setIsMobileFasilitasOpen(!isMobileFasilitasOpen)}
                      className="flex items-center justify-between w-full py-3 text-lg font-bold text-[#147167]"
                    >
                      <span>{item.name}</span>
                      <span className={`transition-transform duration-300 ${isMobileFasilitasOpen ? "rotate-180" : ""}`}>
                        ▼
                      </span>
                    </button>
                    
                    {/* Mega Menu Content Mobile */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        isMobileFasilitasOpen ? "max-h-[2000px] opacity-100 mt-2" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="grid grid-cols-1 gap-4 pl-2">
                        {megaMenuItems.map((megaItem, idx) => (
                          <Link
                            key={idx}
                            href={megaItem.href}
                            onClick={() => setIsMobileMenuOpen(false)} // Tutup menu saat klik
                            className="flex items-start gap-4 p-3 rounded-xl bg-gray-50 hover:bg-teal-50 border border-transparent hover:border-teal-200 transition-colors"
                          >
                            <div className="relative w-12 h-12 flex-shrink-0">
                              <Image
                                src={megaItem.icon}
                                alt={megaItem.title}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <div>
                              <h5 className="font-bold text-[#147167] text-base">{megaItem.title}</h5>
                              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{megaItem.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              // Link Navigasi Biasa (Non-Dropdown)
              return (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3 text-lg font-bold text-[#147167] border-b border-gray-100 hover:text-[#2AB3B0] hover:pl-2 transition-all"
                >
                  {item.name}
                </Link>
              );
            })}

            {/* Tombol CTA di dalam menu mobile (opsional, karena tombol trigger di atas sudah jadi menu) */}
            <Link
                href="/ruang-kelas"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-6 w-full text-center py-4 rounded-full bg-gradient-to-r from-[#2AB3B0] to-[#147167] text-white font-bold text-lg shadow-md active:scale-95 transition-transform"
              >
                Mulai Belajar GRATIS
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}