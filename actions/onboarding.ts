"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { Prisma } from "@prisma/client"

export async function submitOnboarding(rawAnswers: Record<string, string>) {
  const session = await auth()
  
  if (!session?.user?.id) {
    return { error: "User tidak ditemukan atau belum login" }
  }

  const userId: string = session.user.id

  try {
    await db.$transaction(async (tx: Prisma.TransactionClient) => {
      for (const [questionId, answer] of Object.entries(rawAnswers)) {
        await tx.formResponse.create({
          data: {
            userId: userId,
            questionId,
            answer,
          },
        })
      }

      await tx.user.update({
        where: { id: userId },
        data: { onboardingCompleted: true },
      })
    })

    revalidatePath("/", "layout") 
    
    return { success: true }
  } catch (error) {
    console.error("Database Error:", error)
    return { error: "Terjadi kesalahan pada database" }
  }
}