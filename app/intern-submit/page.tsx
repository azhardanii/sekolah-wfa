import Head from 'next/head';

export default function Pendaftaran() {
  return (
    <>
      <Head>
        <title>Internship Submit | Sekolah WFA</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
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