import { db } from "@/lib/db"
import { OnboardingForm } from "@/components/OnboardingForm"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function OnboardingPage() {
  // 1. Safety Check (meskipun middleware sudah jaga)
  const session = await auth()
  if (!session) redirect("/api/auth/signin")
  
  // 2. Fetch Pertanyaan yang aktif & urutkan
  const questions = await db.onboardingQuestion.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  })

  // 3. Render Client Component
  return <OnboardingForm questions={questions} />
}