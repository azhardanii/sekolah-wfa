import { db } from "@/lib/db";
import DashboardChart from "./DashboardChart";
import Link from "next/link";

export default async function AdminDashboard() {
  const [
    totalUsers, 
    articleCounts, 
    totalProducts, 
    recentProducts
  ] = await Promise.all([
    db.user.count(),
    db.article.groupBy({
      by: ['status'],
      _count: true,
    }),
    db.formCustomDigitalProduct.count(),
    db.formCustomDigitalProduct.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' }
    })
  ]);

  const totalArticles = articleCounts.reduce((acc, curr) => acc + curr._count, 0);
  
  // Format for chart: [ {name: 'Draft', total: 5}, {name: 'Published', total: 10} ]
  const chartData = [
    { name: 'Draft AI', total: articleCounts.find(a => a.status === 'DRAFT')?._count || 0 },
    { name: 'Terjadwal', total: articleCounts.find(a => a.status === 'SCHEDULED')?._count || 0 },
    { name: 'Mading (Publik)', total: articleCounts.find(a => a.status === 'PUBLISHED')?._count || 0 },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-bold text-[#147167]">Overview Dashboard</h1>
           <p className="text-gray-500 mt-1">Ringkasan aktivitas dan performa sistem internal</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stat Cards */}
        <div className="bg-white p-6 rounded-2xl border border-teal-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-bl-full -z-0 opacity-50" />
          <h3 className="text-gray-500 text-sm font-medium relative z-10">Total Artikel</h3>
          <div className="flex items-baseline gap-2 relative z-10 mt-2">
            <p className="text-4xl font-bold text-[#147167] tracking-tight">{totalArticles}</p>
            <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">Items</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-teal-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full -z-0 opacity-50" />
          <h3 className="text-gray-500 text-sm font-medium relative z-10">Total Pengguna</h3>
          <div className="flex items-baseline gap-2 relative z-10 mt-2">
            <p className="text-4xl font-bold text-indigo-700 tracking-tight">{totalUsers}</p>
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">Users</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-teal-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-full -z-0 opacity-50" />
          <h3 className="text-gray-500 text-sm font-medium relative z-10">Product Leads (Baru)</h3>
          <div className="flex items-baseline gap-2 relative z-10 mt-2">
            <p className="text-4xl font-bold text-orange-600 tracking-tight">{totalProducts}</p>
            <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">Requests</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-gray-800">Distribusi Status Artikel</h2>
            <Link href="/ruang-arsip/articles" className="text-sm font-medium text-[#2AB3B0] hover:text-[#147167]">Lihat semua &rarr;</Link>
          </div>
          <DashboardChart data={chartData} />
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
             <h2 className="text-lg font-bold text-gray-800">Custom Product Leads Terbaru</h2>
             <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2.5 py-1 rounded-full">{recentProducts.length} Terakhir</span>
          </div>
          
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-sm border-separate border-spacing-y-2">
              <thead className="text-gray-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-4 font-semibold pb-2">Nama Produk / Client</th>
                  <th className="px-4 font-semibold pb-2">WhatsApp</th>
                  <th className="px-4 font-semibold pb-2 text-right">Tanggal</th>
                </tr>
              </thead>
              <tbody className="">
                {recentProducts.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-gray-500 bg-gray-50 rounded-xl rounded-b-none">Belum ada request/leads.</td>
                  </tr>
                ) : (
                  recentProducts.map((lead, idx) => (
                    <tr key={lead.id} className="bg-gray-50/50 hover:bg-[#E0F7F4]/40 transition-colors group">
                      <td className={`p-4 font-medium text-gray-800 ${idx === 0 ? 'rounded-tl-2xl' : ''} ${idx === recentProducts.length - 1 ? 'rounded-bl-2xl' : ''}`}>
                        <div className="line-clamp-1">{lead.productName}</div>
                      </td>
                      <td className="p-4 text-gray-600 font-mono text-xs">{lead.whatsapp}</td>
                      <td className={`p-4 text-gray-500 text-right ${idx === 0 ? 'rounded-tr-2xl' : ''} ${idx === recentProducts.length - 1 ? 'rounded-br-2xl' : ''}`}>
                        {lead.createdAt.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
