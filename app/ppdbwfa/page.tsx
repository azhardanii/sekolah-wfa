"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function PPDBForm() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    // Saat pertama render halaman ➔ fade-in
    setIsVisible(true);
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    message: "",
    agreeWhatsapp: false,
    agreeGroup: false,
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const sanitize = (str: string) => str.replace(/[<>\/\\{}]/g, "").trim(); // basic sanitasi karakter berbahaya

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    let newValue: string | boolean;

    if (type === "checkbox") {
      newValue = (e.target as HTMLInputElement).checked;
    } else {
      newValue = sanitize(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setStatus("idle");

    const { name, email, whatsapp, message, agreeWhatsapp, agreeGroup } =
      formData;

    if (!name || !email || !whatsapp || !message) {
      setErrorMsg("Semua field wajib diisi.");
      return;
    }
    if (!agreeWhatsapp || !agreeGroup) {
      setErrorMsg("Checkbox harus dicentang.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbwYxh199iAM7dc5oOWzYoTVm6MrE8gOkgwkqcR-27KV575S2il61Fv4kdxM2f0ZK3T3xQ/exec",
        {
          method: "POST",
          body: JSON.stringify({
            name: sanitize(name),
            email: sanitize(email),
            whatsapp: sanitize(whatsapp),
            message: sanitize(message),
            agreeWhatsapp,
            agreeGroup,
          }),
        }
      );

      if (res.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          whatsapp: "",
          message: "",
          agreeWhatsapp: false,
          agreeGroup: false,
        });
      } else {
        throw new Error("Gagal submit");
      }
    } catch (error) {
      setStatus("error");
      setErrorMsg(
        "Ups! Terjadi kesalahan saat mengirim. Coba lagi sebentar lagi."
      );
    }
  };

  const inputStyle =
    "w-full bg-transparent border-x-0 border-t-0 border-b pt-5 pb-3 border-[#156357]/30 text-sm placeholder:text-[#156357]/70 focus:outline-none focus:ring-0";

  return (
    <div className="bg-[radial-gradient(circle_at_0%_0%,_#ffffff_0%,_#ffffff_40%,_#ffffff_70%,_#34d0ce_100%)]">
      <div
        className={`relative min-h-screen flex flex-col items-center justify-center  p-6 transition-opacity duration-300 
    ${isVisible ? "opacity-100" : "opacity-0"}`}
      >
        {status === "loading" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
          </div>
        )}
        {(status === "error" || errorMsg) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 backdrop-blur-sm text-white bg-red-900/60 z-30 p-6">
            <h3 className="text-xl">{errorMsg}</h3>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => {
                  setStatus("idle");
                  setFormData({
                    name: "",
                    email: "",
                    whatsapp: "",
                    message: "",
                    agreeWhatsapp: false,
                    agreeGroup: false,
                  });
                  setErrorMsg("");
                }}
                className="px-5 py-2 bg-white/20 hover:bg-white/30 text-white font-medium rounded-full transition duration-200"
              >
                Tutup
              </button>
            </div>
          </div>
        )}

        {status === "success" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 backdrop-blur-sm text-white bg-green-900/60 z-30 p-6">
            <h3 className="text-2xl font-bold">Terima kasih! 🎉</h3>
            <p className="text-center text-base max-w-md">
              Kamu berhasil mendaftar Early Access Sekolah WFA. Silahkan masuk
              ke grup WhatsApp yaa!
            </p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => {
                  setStatus("idle");
                  setFormData({
                    name: "",
                    email: "",
                    whatsapp: "",
                    message: "",
                    agreeWhatsapp: false,
                    agreeGroup: false,
                  });
                  setErrorMsg("");
                }}
                className="px-5 py-2 bg-white/20 hover:bg-white/30 text-white font-medium rounded-full transition duration-200"
              >
                Tutup
              </button>

              <Link
                href="https://chat.whatsapp.com/LINK-GRUP-KAMU" // Ganti dengan link grup WA asli
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 bg-green-700 hover:bg-green-600 text-white font-medium rounded-full transition duration-200 text-center"
              >
                Join Grup WA
              </Link>
            </div>
          </div>
        )}

        <div className="absolute top-10">
          <Image
            className="mx-auto"
            src="/logo-wfa.webp"
            alt="Sekolah WFA Logo"
            width={125}
            height={38}
            priority
          />
        </div>
        <div className="relative w-full max-w-xl mx-auto text-[#156357]">
          <h1 className="text-3xl text-center">
            FORMULIR <b>[ P.P.D.B. ]</b>
          </h1>
          <p className="text-center text-xl pb-5">
            Pendaftaran Pembelajar Digital Baru
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 px-5 text-[#156357]"
          >
            <input
              name="name"
              placeholder="Nama Lengkap"
              value={formData.name}
              onChange={handleChange}
              autoComplete="off"
              required
              className={inputStyle}
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
              required
              className={inputStyle}
            />
            <input
              name="whatsapp"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Nomor WhatsApp"
              value={formData.whatsapp}
              onChange={handleChange}
              autoComplete="off"
              required
              className={inputStyle}
            />

            <textarea
              name="message"
              placeholder="Apa yang kamu harapkan dari Sekolah WFA?"
              value={formData.message}
              onChange={handleChange}
              autoComplete="off"
              required
              rows={1}
              className={inputStyle}
            />
            <label className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                name="agreeWhatsapp"
                checked={formData.agreeWhatsapp}
                onChange={handleChange}
                className="mt-1 accent-blue-600"
                required
              />
              Saya bersedia menerima notifikasi WhatsApp dari Sekolah WFA
            </label>
            <label className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                name="agreeGroup"
                checked={formData.agreeGroup}
                onChange={handleChange}
                className="mt-1 accent-blue-600"
                required
              />
              Saya bersedia dimasukkan ke grup early access
            </label>
            <div className="pt-10 flex justify-center w-full">
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-[radial-gradient(circle_at_0%_0%,_#1d8b84,_#156357,_#156357,_#156357,_#156357,_#1d8b84)] text-white font-semibold border-white border-2 px-10 py-2 rounded-lg transition duration-200 disabled:opacity-50"
              >
                &#x25B6; SUBMIT &#x25C0;
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
