"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[white] via-[#26D7C4]/50 to-[white] p-4">
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-white opacity-30 rounded-full translate-x-1/3 -translate-y-[30%] pointer-events-none"></div>
        <div className="absolute -bottom-10 right-10 w-[300px] h-[300px] bg-gradient-to-b from-[#26D7C4] to-white opacity-15 rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white opacity-30 rounded-full -translate-x-1/3 -translate-y-[30%] pointer-events-none"></div>
        <div className="absolute -bottom-10 left-10 w-[300px] h-[300px] bg-gradient-to-b from-[#26D7C4] to-white opacity-15 rounded-full pointer-events-none"></div>

        <div className="absolute w-full flex justify-center top-10">
            <Image
                src="/logo-wfa.webp" 
                alt="Sekolah WFA Logo" 
                width={135}
                height={75}
                priority
                className="object-contain"
            />
        </div>
        
        <div className="p-8">
          <button 
            onClick={() => signIn("google", { callbackUrl: "/ruang-belajar" })}
            className="w-full flex items-center text-xl justify-center gap-3 border-2 border-[#147167] py-5 px-32 rounded-3xl bg-gray-50 text-[#147167] font-semibold active:scale-95 transition-transform duration-150 ease-in-out shadow-lg"
          >
            <Image src="https://www.svgrepo.com/show/475656/google-color.svg" width={30} height={30} alt="Google" />
            Login with Google
          </button>
        </div>

      {/* <div className="absolute bottom-6 text-center w-full text-teal-800/40 text-sm">
        &copy; 2024 Sekolah WFA
      </div> */}
    </div>
  );
}