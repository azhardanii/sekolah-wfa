import { auth } from "@/auth"

export default async function RuangBelajarPage() {
  const session = await auth()

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Selamat Datang di Ruang Belajar! 🎓</h1>
      <p>Halo, kak {session?.user?.name} 👋🏻 <br />Ini adalah area khusus member.</p>
    </div>
  )
}