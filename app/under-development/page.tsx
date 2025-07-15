'use client';

import FeaturePage from "@/components/FeaturePage";

export default function UnderDevelopmentPage() {
  return (
    <FeaturePage
      title="⚒️ Under Development 🛠️"
      description={
        <>
          Halaman ini sedang dalam tahap pengembangan,<br />
          pantau Mading Sekolah WFA untuk update info terbaru!
        </>
      }
      status="302."
    />
  );
}
  