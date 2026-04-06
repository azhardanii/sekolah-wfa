"use server"

import { db } from "@/lib/db"

export async function submitFormBrief(data: any) {
  try {
    const result = await db.formCustomDigitalProduct.create({
      data: {
        productName: data.productName,
        whatsapp: data.whatsapp,
        productType: data.productType,
        productDescription: data.productDescription,
        urgentProblem: data.urgentProblem,
        targetUser: data.targetUser || "",
        referenceProducts: data.referenceProducts || "",
        designStyle: data.designStyle,
        primaryColor: data.primaryColor,
        fontPreference: data.fontPreference,
        additionalNotes: data.additionalNotes || "",
      },
    })
    
    return { success: true, id: result.id }
  } catch (error) {
    console.error("Database Error:", error)
    return { error: "Terjadi kesalahan saat menyimpan ke database" }
  }
}
