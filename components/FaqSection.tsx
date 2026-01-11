'use client';

import { useState } from 'react';

interface FAQData {
  id: number;
  question: string;
  answer: string;
}

interface FAQItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

const faqData: FAQData[] = [
  {
    id: 1,
    question: "Sistem Belajarnya gimana kak?",
    answer: "Sistem belajar kami online dengan akses materi seumur hidup. Kamu bisa belajar kapan saja dan di mana saja melalui dashboard member area yang sudah kami sediakan."
  },
  {
    id: 2,
    question: "Aku GAPTEK banget, bisa nggak ikut belajar di sini?",
    answer: "Tentu bisa! Materi disusun dari level pemula (nol) hingga mahir. Kami menggunakan bahasa yang mudah dimengerti."
  },
  {
    id: 3,
    question: "Emang masih bisa ya dapet uang dari internet di zaman sekarang?",
    answer: "Sangat bisa. Faktanya, ekonomi digital terus tumbuh. Kuncinya adalah memiliki skill yang relevan."
  },
  {
    id: 4,
    question: "Kalau aku udah kerja, bisa ikut belajar juga nggak?",
    answer: "Bisa banget. Karena sistemnya fleksibel, kamu bisa meluangkan waktu 1-2 jam sehari sepulang kerja."
  },
  {
    id: 5,
    question: "Apa sih gunanya bikin konten di sosmed?",
    answer: "Konten adalah aset digital. Dengan konten, kamu membangun personal branding dan kepercayaan."
  },
  {
    id: 6,
    question: "Apaan deh Digital Product? Ebook?",
    answer: "Produk digital adalah produk yang tidak memiliki bentuk fisik, seperti Ebook, Video Course, atau Template."
  }
];

const FAQItem = ({ question, answer, defaultOpen = false }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`w-full border-[3px] transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'bg-transparent border-[#147167] rounded-3xl' : 'bg-transparent border-[#147167]/70 hover:border-[#147167] rounded-full'}`}>
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between py-5 px-10 text-left focus:outline-none group">
        <span className="text-[#147167] font-medium text-base md:text-lg pr-4">
          {question}
        </span>
                
        <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
          <svg className={`w-6 h-6 text-[#147167] transform transition-transform duration-500 ease-in-out ${isOpen ? 'rotate-45' : 'rotate-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </button>

      <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <div className="px-5">
            <div className="w-full h-[1px] bg-[#147167]/70"></div>
          </div>
          
          <div className="py-5 px-10 text-[#147167] leading-relaxed text-sm md:text-base">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function FAQSection() {
  return (
    <section className="w-full min-h-screen py-20 px-4 flex flex-col items-center justify-center">
      <div className="mb-10 text-center">
        <h2 className="text-3xl md:text-[3.5rem] h-16 pt-1 font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#26D7C4] to-[#147167] uppercase tracking-wider">
          Frequently Ask Question
        </h2>
      </div>

      <div className="w-full max-w-5xl flex flex-col gap-6">
        {faqData.map((item, index) => (
          <FAQItem 
            key={item.id} 
            question={item.question} 
            answer={item.answer} 
            defaultOpen={index === 0}
          />
        ))}
      </div>
    </section>
  );
}