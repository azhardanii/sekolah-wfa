"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

const initialFormData = {
  productName: "",
  whatsapp: "",
  productType: "",
  productDescription: "",
  urgentProblem: "",
  targetUser: "",
  referenceProducts: "",
  designStyle: "",
  primaryColor: "",
  fontPreference: "",
  additionalNotes: "",
};

type Status = "idle" | "loading" | "success" | "error";

export default function ClientBriefForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const sanitize = (str: string) => str.replace(/[<>\/\\{}]/g, "").trim();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setErrorMsg("");
    setStatus("idle");
  };

  const validateFields = (): boolean => {
    const required = [
      "productName",
      "productType",
      "productDescription",
      "whatsapp",
      "urgentProblem",
      "designStyle",
      "primaryColor",
      "fontPreference",
    ];
    for (const field of required) {
      const val = formData[field as keyof typeof formData];
      if (!val.toString().trim()) {
        setErrorMsg(`Field "${field}" wajib diisi.`);
        return false;
      }
    }

    if (!/^\d{9,15}$/.test(formData.whatsapp)) {
      setErrorMsg("No. WA tidak valid.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setStatus("idle");

    if (!validateFields()) return;

    setStatus("loading");

    try {
      if (!supabase) {
        throw new Error("Supabase client belum terinisialisasi.");
      }

      const sanitizedData = Object.fromEntries(
        Object.entries(formData).map(([key, val]) => [
          key,
          typeof val === "string" ? sanitize(val) : val,
        ])
      );

      const { error } = await supabase
        .from("form_custom_digital_product")
        .insert([sanitizedData]);

      if (error) {
        console.error(
          "Error dari Supabase:",
          error.message,
          error.details,
          error.hint
        );
        throw error;
      }

      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(
        "Ups! Terjadi kesalahan saat menyimpan ke database. Coba lagi nanti."
      );
    }
  };

  const inputStyle =
    "w-full bg-transparent border-x-0 border-t-0 border-b pt-5 pb-3 border-[#156357]/30 text-sm placeholder:text-[#156357]/70 focus:outline-none focus:ring-0";

  const formFields: {
    name: string;
    placeholder: string;
    type: "input" | "textarea";
    inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  }[] = [
    {
      name: "whatsapp",
      placeholder: "No. WA Aktif",
      type: "input",
      inputMode: "numeric",
    },
    {
      name: "productName",
      placeholder: "Nama Produk",
      type: "input",
    },
    {
      name: "productDescription",
      placeholder: "Deskripsikan Produk",
      type: "textarea",
    },
    {
      name: "urgentProblem",
      placeholder: "Masalah yg Terselesaikan dengan Produk ini?",
      type: "textarea",
    },
    {
      name: "targetUser",
      placeholder: "Target Pengguna, Siapa yang Menggunakan?",
      type: "input",
    },
    {
      name: "referenceProducts",
      placeholder: "Referensi (link/nama produk) *jika ada",
      type: "input",
    },
    {
      name: "primaryColor",
      placeholder: "Warna Utama / Color Pallete",
      type: "input",
    },
    {
      name: "fontPreference",
      placeholder: "Font yang Ingin Digunakan",
      type: "input",
    },
    {
      name: "additionalNotes",
      placeholder: "Catatan Penting",
      type: "textarea",
    },
  ];

  const productTypes = [
    "Template Spreadsheet",
    "Flip Book / Workbook",
    "Web App",
    "Bot (WA/Tele/Discord)",
  ];

  const designStyle = [
    "Minimalist",
    "Modern & Futuristic",
    "Clean Professional",
    "Fun & Energic",
    "Vintage/Retro",
  ];

  return (
    <div className="bg-[radial-gradient(circle_at_0%_0%,_#ffffff_0%,_#ffffff_40%,_#ffffff_70%,_#34d0ce_100%)] relative w-full min-h-screen">
      <div
        className={`min-h-screen flex flex-col items-center justify-center p-5 md:p-10 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {status === "loading" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
          </div>
        )}

        {(status === "error" || errorMsg) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 backdrop-blur-sm text-white bg-red-900/60 z-30 p-6">
            <h3 className="text-xl text-center">{errorMsg}</h3>
            <button
              onClick={resetForm}
              className="px-5 py-2 bg-white/20 hover:bg-white/30 text-white font-medium rounded-full transition duration-200"
            >
              Tutup
            </button>
          </div>
        )}

        {status === "success" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 backdrop-blur-sm text-white bg-green-900/60 z-30 p-6">
            <h3 className="text-2xl font-bold">Terima kasih! 🎉</h3>
            <p className="text-center text-base max-w-md">
              Kamu berhasil mengirim brief produk digitalmu. Tunggu sebentar
              yaa, kamu akan segera dihubungi via WA.
            </p>
            <button
              onClick={resetForm}
              className="px-5 py-2 bg-white/20 hover:bg-white/30 text-white font-medium rounded-full transition duration-200"
            >
              Tutup
            </button>
          </div>
        )}

        <div className="w-full max-w-xl mx-auto text-[#156357]">
          <Image
            src="/logo-wfa.webp"
            alt="Logo"
            width={125}
            height={38}
            priority
            className="mx-auto pb-10"
          />
          <h1 className="text-3xl text-center mb-5">
            Brief Custom Development
            <br />
            <b>DIGITAL PRODUCT</b>
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 px-5 text-[#156357]"
          >
            {formFields.map(({ name, placeholder, type, inputMode }) => {
              const inputProps = inputMode ? { inputMode } : {};

              return type === "textarea" ? (
                <textarea
                  key={name}
                  name={name}
                  placeholder={placeholder}
                  value={formData[name as keyof typeof formData] as string}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  rows={1}
                  className={inputStyle}
                />
              ) : (
                <input
                  key={name}
                  name={name}
                  type="text"
                  placeholder={placeholder}
                  value={formData[name as keyof typeof formData] as string}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  className={inputStyle}
                  {...inputProps}
                />
              );
            })}

            <div className="text-sm pt-3 opacity-70">
              <label className="block mb-2 font-medium">Jenis Produk:</label>
              {productTypes.map((option) => (
                <label key={option} className="flex items-center gap-2 mb-1">
                  <input
                    type="radio"
                    name="productType"
                    value={option}
                    checked={formData.productType === option}
                    onChange={handleChange}
                    required
                  />
                  {option}
                </label>
              ))}
            </div>

            <div className="text-sm pt-3 opacity-70">
              <label className="block mb-2 font-medium">Tampilan Visual:</label>
              {designStyle.map((option) => (
                <label key={option} className="flex items-center gap-2 mb-1">
                  <input
                    type="radio"
                    name="designStyle"
                    value={option}
                    checked={formData.designStyle === option}
                    onChange={handleChange}
                    required
                  />
                  {option}
                </label>
              ))}
            </div>

            <div className="flex justify-center w-full pt-3">
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
