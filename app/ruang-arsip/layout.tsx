'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RuangArsipLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  type MenuItem = {
    label: string;
    href: string;
    icon: string;
    badge?: boolean;
  };

  const menuItems: MenuItem[] = [
    { label: 'Dashboard', href: '/ruang-arsip', icon: '🏠' },
    { label: 'Mading', href: '/ruang-arsip/articles', icon: '📰', badge: true },
    { label: 'Pengguna', href: '#', icon: '👥' },
    { label: 'Kelas Video', href: '#', icon: '🎥' },
    { label: 'Produk Digital', href: '#', icon: '📦' },
  ];

  return (
    <div className="min-h-screen flex bg-[#f4fbfa]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-[#26D7C4]/30 shadow-sm hidden md:flex flex-col relative z-10 h-screen overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#2AB3B0] to-[#147167] bg-clip-text text-transparent">
            Ruang Arsip
          </h2>
          <p className="text-sm text-gray-500 mt-1">Admin Dashboard</p>
        </div>
        
        <nav className="flex-1 px-4 mt-2 space-y-1 mb-8">
          {menuItems.map((item) => {
            const isActive = mounted && item.href !== '#' && (pathname === item.href || pathname.startsWith(`${item.href}/`));
            
            return (
              <Link 
                key={item.label} 
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all font-medium ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#E0F7F4] to-[#c8f0ec] text-[#147167] shadow-sm shadow-teal-500/10' 
                    : item.href === '#' 
                      ? 'text-gray-400 cursor-not-allowed opacity-70' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-[#2AB3B0]'
                }`}
                onClick={(e) => item.href === '#' && e.preventDefault()}
              >
                <span className="text-xl opacity-80">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
                
                {item.badge && (
                  <span className="ml-auto bg-[#2AB3B0] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                    New
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-6 border-t border-gray-100">
          <Link href="/" className="flex items-center gap-2 text-sm text-[#147167] hover:underline font-medium">
            &larr; Kembali ke Beranda
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden">
        {/* Decorative elements to match Sekolah WFA brand */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,_#26D7C4_0%,_transparent_100%)] blur-[100px] opacity-20 pointer-events-none -z-10" />
        
        <div className="h-full overflow-y-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
