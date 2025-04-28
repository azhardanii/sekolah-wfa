"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ClientBriefForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    contactName: "",
    email: "",
    whatsapp: "",
    productType: "",
    productDescription: "",
    urgentProblem: "",
    targetUser: "",
    targetAge: "",
    platform: "",
    mainFeatures: "",
    exampleProducts: "",
    paymentRequired: false,
    paymentMethod: "",
    designStyle: "",
    primaryColor: "",
    fontPreference: "",
    startDate: "",
    deadline: "",
    budget: "",
    additionalNotes: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Sanitizing function
  const sanitize = (str: string) => str.replace(/[<>\/\\{}]/g, "").trim();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    let newValue: string | boolean;

    if (type === "checkbox") {
      newValue = (e.target as HTMLInputElement).checked;
    } else {
      newValue = value;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const resetForm = () => {
    setFormData({
      productName: "",
      contactName: "",
      email: "",
      whatsapp: "",
      productType: "",
      urgentProblem: "",
      productDescription: "",
      targetUser: "",
      targetAge: "",
      platform: "",
      mainFeatures: "",
      exampleProducts: "",
      paymentRequired: false,
      paymentMethod: "",
      designStyle: "",
      primaryColor: "",
      fontPreference: "",
      startDate: "",
      deadline: "",
      budget: "",
      additionalNotes: "",
    });
    setErrorMsg("");
    setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setStatus("idle");

    const {
      productName,
      contactName,
      email,
      whatsapp,
      productType,
      productDescription,
      targetUser,
      targetAge,
      platform,
      mainFeatures,
      exampleProducts,
      paymentRequired,
      paymentMethod,
      designStyle,
      primaryColor,
      fontPreference,
      startDate,
      deadline,
      budget,
      additionalNotes,
    } = formData;

    if (
      !productName.trim() ||
      !contactName.trim() ||
      !email.trim() ||
      !whatsapp.trim()
    ) {
      setErrorMsg("Semua field wajib diisi.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbz63v3nL9ta2iOvV2bNrHqqVjYiluWE7Y_UeDCEP0ogvzLm0Ut9TFV04_ggTLpVhFmi/exec",
        {
          method: "POST",
          body: JSON.stringify({
            productName: sanitize(productName),
            contactName: sanitize(contactName),
            email: sanitize(email),
            whatsapp: sanitize(whatsapp),
            productType: sanitize(productType),
            productDescription: sanitize(productDescription),
            targetUser: sanitize(targetUser),
            targetAge: sanitize(targetAge),
            platform: sanitize(platform),
            mainFeatures: sanitize(mainFeatures),
            exampleProducts: sanitize(exampleProducts),
            paymentRequired,
            paymentMethod: sanitize(paymentMethod),
            designStyle: sanitize(designStyle),
            primaryColor: sanitize(primaryColor),
            fontPreference: sanitize(fontPreference),
            startDate: sanitize(startDate),
            deadline: sanitize(deadline),
            budget: sanitize(budget),
            additionalNotes: sanitize(additionalNotes),
          }),
        }
      );

      if (res.ok) {
        setStatus("success");
        setFormData({
          productName: "",
          contactName: "",
          email: "",
          whatsapp: "",
          urgentProblem: "",
          productType: "",
          productDescription: "",
          targetUser: "",
          targetAge: "",
          platform: "",
          mainFeatures: "",
          exampleProducts: "",
          paymentRequired: false,
          paymentMethod: "",
          designStyle: "",
          primaryColor: "",
          fontPreference: "",
          startDate: "",
          deadline: "",
          budget: "",
          additionalNotes: "",
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
        className={`min-h-screen flex flex-col items-center justify-center p-10 transition-opacity duration-300 
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
                onClick={resetForm}
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
              Kamu berhasil mengirimkan brief produk digital. Kami akan segera
              menghubungi Anda.
            </p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={resetForm}
                className="px-5 py-2 bg-white/20 hover:bg-white/30 text-white font-medium rounded-full transition duration-200"
              >
                Tutup
              </button>
            </div>
          </div>
        )}

        <div className="w-full max-w-xl mx-auto text-[#156357]">
          <Image
            className="mx-auto pb-10"
            src="/logo-wfa.webp"
            alt="Logo"
            width={125}
            height={38}
            priority
          />
          <h1 className="text-3xl text-center mb-5">
            Brief Custom Development
            <br /> <b>DIGITAL PRODUCT</b>
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 px-5 text-[#156357]"
          >
            <input
              name="whatsapp"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="No. WA Aktif"
              value={formData.whatsapp}
              onChange={handleChange}
              required
              className={inputStyle}
            />
            <textarea
              name="urgentProblem"
              placeholder="Urgensi/Masalah Kenapa Dibutuhkan?"
              value={formData.urgentProblem}
              onChange={handleChange}
              required
              rows={1}
              className={inputStyle}
            />
            <textarea
              name="productDescription"
              placeholder="Deskripskan Ide yang Ingin Direalisasikan"
              value={formData.productDescription}
              onChange={handleChange}
              required
              rows={1}
              className={inputStyle}
            />

            <div className="text-sm pt-3 opacity-70">
              <label className="block mb-2 font-medium">Jenis Produk:</label>
              {[
                "Template Spreadsheet",
                "Flip Book / Workbook",
                "Web App",
                "Bot (WA/Tele/Discord)",
                "Lainnya",
              ].map((option) => (
                <label key={option} className="flex items-center gap-2 mb-1">
                  <input
                    type="radio"
                    name="productType"
                    value={option}
                    checked={formData.productType === option}
                    onChange={handleChange}
                  />
                  {option}
                </label>
              ))}
            </div>

            <input
              name="productName"
              placeholder="Nama Produk"
              value={formData.productName}
              onChange={handleChange}
              required
              className={inputStyle}
            />
            <p className="text-xs cursor-pointer">
              → Saran Nama [generate by AI]
            </p>
            {/* Add additional form fields as per the client brief */}
            {/* Don't forget to add the checkboxes for agreement */}
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
