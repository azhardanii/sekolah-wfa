"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  // State untuk melacak menu mana yang sedang di-hover
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  const firstItem = navItems[0];
  const lastItem = navItems[navItems.length - 1];

  const isFirstActive = pathname === firstItem.href;
  const isLastActive = pathname === lastItem.href;


  return (
    <nav className="relative z-50 flex items-center justify-between px-6 md:px-24 mt-4 py-4">
      {/* 1. LOGO SECTION */}
      <Link href="/" className="flex flex-col">
        <Image
          src="/logo-wfa.webp"
          alt="Sekolah WFA Logo"
          width={100}
          height={50}
          priority
          className="object-contain hover:opacity-80 transition-opacity"
        />
      </Link>

      {/* 2. NAVIGATION LINKS */}
      <div className="hidden md:flex pt-[3.5px] pb-[3.65px] pl-[3.75px] pr-[4px] rounded-full bg-gradient-to-b from-[#2AB3B0] to-[#147167] shadow-sm">
        <div
          className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full text-base relative"
        >

          {navItems.map((item, index) => {
            const isActuallyActive = pathname === item.href;
            const isHovered = hoveredItem === item.name;
            
            const showAsActive = hoveredItem 
              ? isHovered 
              : isActuallyActive;

            let inactiveLinkPadding = "px-2";

            if (index === 0) {
              inactiveLinkPadding = "pl-8 pr-2"; 
            } else if (index === navItems.length - 1) {
              inactiveLinkPadding = "pr-8 pl-2";
            }

            const megaMenuItems = [
              {
                title: "Ruang Kelas",
                desc: "Pembelajaran kerja WFA (berpenghasilan dari mana aja). Akses kapanpun & dimanapun Kamu berada.",
                icon: "/iconwfa-ruangkelas.webp",
                href: "/ruang-kelas"
              },
              {
                title: "Laboratorium",
                desc: "Digital Asset's Agency (jasa customise development digital tools).",
                icon: "/iconwfa-lab.webp",
                href: "/laboratorium"
              },
              {
                title: "Rekreasi",
                desc: "Trip bersama ke destinasi dalam & luar negeri, sekaligus menjalin relasi.",
                icon: "/iconwfa-rekreasi.webp",
                href: "/rekreasi"
              },
              {
                title: "Ruang BK",
                desc: "Konsultasi Mental Health & Kenali Potensi Dalam Dirimu Bareng Psikolog.",
                icon: "/iconwfa-ruangbk.webp",
                href: "/ruang-bk"
              },
              {
                title: "Kantin",
                desc: "Tempat Jajan Ebook, Tools Digital, Record Webinar, dsb.",
                icon: "/iconwfa-kantin.webp",
                href: "/kantin"
              },
              {
                title: "Mading",
                desc: "Pusat Info loker, showcase karya, & news update seputar dunia digital.",
                icon: "/iconwfa-mading.webp",
                href: "/mading"
              },
            ];

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

                {item.hasMegaMenu && isMegaMenuOpen && (
                  <div className="absolute top-full -left-72 mt-0.5 w-[1000px] z-50">
                    <div
                      className="rounded-[30px] p-8 grid grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2 duration-300"
                      style={{
                        background: "linear-gradient(to bottom, #147167, #26D7C4)",
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

      {/* 3. CTA BUTTON */}
      <Link 
        href="/ruang-kelas"
        className="hidden md:block group relative pb-[3.5px] pt-[3.5px] pl-[3px] pr-[3px] rounded-full bg-gradient-to-t from-[#147167] to-[#2AB3B0] shadow-lg shadow-teal-700/20 active:scale-95 transition-all duration-150"
      >
        <div className="px-6 py-2 rounded-full bg-gradient-to-r from-[#2AB3B0] to-[#147167] text-white font-semibold text-base tracking-wide flex items-center gap-2">
          Belajar GRATIS <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform inline-block">↗</span>
        </div>
      </Link>
    </nav>
  );
}