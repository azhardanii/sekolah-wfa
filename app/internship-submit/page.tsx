import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Internship Submit | Sekolah WFA',
};

export default function Pendaftaran() {
  return (
    <>
      <div className="flex h-screen w-screen overflow-hidden bg-white">
        <iframe 
          src="https://docs.google.com/forms/d/e/1FAIpQLSexPteBTQJqXRfHzeDmSexxyYEcd23QZQ1TtMyh7ns-d5iQgA/viewform?embedded=true"
          className="w-full h-full border-0"
          title="Formulir Pendaftaran"
        >
          Loading…
        </iframe>
      </div>
    </>
  );
}