'use client';

import FeaturePage from "@/components/FeaturePage";

export default function NotFoundPage() {
  return (
    <FeaturePage
      title="🚫 Not Found 🚫"
      description={
        <>
          Halaman yang ingin kamu kunjungi tidak ditemukan,<br />
          periksa URL / Link mu! mungkin ada yang typo.
        </>
      }
      status="404."
    />
  );
}
  