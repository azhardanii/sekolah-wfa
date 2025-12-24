"use client"

import { useSession } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Check, ChevronLeft } from "lucide-react"
import { submitOnboarding } from "@/actions/onboarding"

interface Question {
  id: string
  question: string
  type: string
}

interface OnboardingFormProps {
  questions: Question[]
}

export function OnboardingForm({ questions }: OnboardingFormProps) {
  const { update } = useSession()
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [direction, setDirection] = useState(1)

  const currentQuestion = questions[currentIndex]
  const currentAnswer = answers[currentQuestion?.id] || ""
  const isValid = currentAnswer.trim().length > 0

  const progress = ((currentIndex + 1) / questions.length) * 100

  const handleNext = () => {
    if (!isValid) return 

    if (currentIndex < questions.length - 1) {
      setDirection(1)
      setCurrentIndex((prev) => prev + 1)
    } else {
      finishOnboarding()
    }
  }

  const handleBack = () => {
    if (currentIndex > 0) {
      setDirection(-1)
      setCurrentIndex((prev) => prev - 1)
    }
  }

  const handleInput = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }))
  }

    const finishOnboarding = async () => {
        if (!isValid) return
        setIsSubmitting(true)

        try {
        const result = await submitOnboarding(answers)

        if (result && result.success) {
            // 🔥 3. UPDATE TOKEN JWT SECARA MANUAL
            await update({ onboardingCompleted: true })

            // 4. Beri jeda sedikit agar session tersimpan, lalu redirect
            router.refresh()
            window.location.href = "/ruang-belajar" 
        } else {
            setIsSubmitting(false)
            alert(result?.error || "Gagal menyimpan")
        }
        } catch (error) {
        setIsSubmitting(false)
        alert("Terjadi kesalahan koneksi.")
        }
    }

  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction > 0 ? -50 : 50, opacity: 0 }),
  }

  if (!questions || questions.length === 0) {
    return <div className="text-center mt-20">Tidak ada pertanyaan onboarding.</div>
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-2 bg-gray-200">
        <motion.div 
          className="h-full bg-blue-600"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQuestion.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
            className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 min-h-[300px] flex flex-col justify-center"
          >
            <span className="text-sm font-bold text-blue-600 mb-4 block">
              Pertanyaan {currentIndex + 1} dari {questions.length}
            </span>

            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              {currentQuestion.question}
              <span className="text-red-500 ml-1">*</span>
            </h2>

            <input
              type="text"
              autoFocus
              className="w-full text-2xl border-b-2 border-gray-300 focus:border-blue-600 outline-none py-2 bg-transparent transition-colors placeholder:text-gray-300"
              placeholder="Ketik jawabanmu..."
              value={currentAnswer}
              onChange={(e) => handleInput(e.target.value)}
              onKeyDown={(e) => {
                // Mencegah Enter kalau input masih kosong/spasi doang
                if (e.key === "Enter") {
                  e.preventDefault() // Mencegah perilaku default form
                  if (isValid) {
                    handleNext()
                  }
                }
              }}
            />
            
            {/* Feedback Error kecil jika user mencoba mengetik tapi masih kosong */}
            {!isValid && currentAnswer.length > 0 && (
               <p className="text-xs text-red-400 mt-2">Wajib diisi dengan benar.</p>
            )}
            
            <p className="text-xs text-gray-400 mt-4">
              {isValid ? "Tekan Enter ↵ untuk lanjut" : "Isi jawaban untuk melanjutkan"}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-8 px-2">
          <button
            onClick={handleBack}
            disabled={currentIndex === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              currentIndex === 0 
                ? "text-gray-300 cursor-not-allowed" 
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <ChevronLeft size={20} /> Sebelumnya
          </button>

          <button
            onClick={handleNext}
            disabled={!isValid || isSubmitting}
            className={`
              px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all
              ${!isValid || isSubmitting 
                ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none" 
                : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-blue-500/30"
              }
            `}
          >
            {isSubmitting ? (
              "Menyimpan..."
            ) : currentIndex === questions.length - 1 ? (
              <>Selesai <Check size={20} /></>
            ) : (
              <>Lanjut <ArrowRight size={20} /></>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}