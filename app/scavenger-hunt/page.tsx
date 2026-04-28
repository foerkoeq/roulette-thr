'use client';

import HomeButton from '@/app/components/HomeButton';

/* ─── Example items for the TL ─── */
const EXAMPLES = [
  'Siapa yang bawa uang koin 500 rupiah lama / warna coklat / emas paling banyak?',
  'Siapa yang bawa struk minimarket warna putih?',
  'Coba angkat uang logam 500 rupiah gambar melati!',
  'Siapa yang bawa jepit rambut warna pink?',
  'Siapa yang punya foto selfie sama hewan peliharaan di HP?',
  'Siapa yang bawa tisu basah di tas?',
  'Siapa yang pakai kaos kaki warna hitam?',
  'Siapa yang bawa charger HP?',
];

export default function ScavengerHuntPage() {
  return (
    <main className="min-h-dvh bg-slate-900 flex flex-col items-center px-5 py-8">
      <h1 className="text-3xl font-black text-white tracking-tight mb-2 animate-fade-in">
        🔍 SCAVENGER HUNT
      </h1>

      <p className="text-slate-400 text-center text-sm mb-6 animate-fade-in">
        Siapa cepat angkat barang, dia menang!
      </p>

      {/* Instructions */}
      <div className="w-full max-w-md flex-1 space-y-4 animate-fade-in-up">
        {/* Rule card */}
        <div className="rounded-2xl bg-rose-500/10 border border-rose-500/20 p-6">
          <h2 className="text-rose-400 font-bold text-lg mb-3">📋 Cara Bermain</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            TL akan menyebutkan satu <strong>barang spesifik</strong> yang
            mungkin dibawa oleh peserta, dan peserta pertama yang berhasil{' '}
            <strong>mengangkat barang</strong> tersebut akan menang.
          </p>
        </div>

        {/* Example items */}
        <div className="rounded-2xl bg-white/5 border border-white/5 p-5">
          <h3 className="text-rose-300 font-bold text-base mb-4">💡 Contoh Pertanyaan</h3>
          <ul className="space-y-3">
            {EXAMPLES.map((example, i) => (
              <li
                key={i}
                className="flex gap-3 items-start text-slate-300 text-sm leading-relaxed"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 font-bold text-xs flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span>{example}</span>
              </li>
            ))}
          </ul>

          <p className="text-slate-500 text-xs italic mt-4">
            Dan masih banyak lagi! Kreativitas TL yang menentukan 🎤
          </p>
        </div>
      </div>

      {/* Home button */}
      <div className="w-full max-w-md mt-8 mb-4 flex justify-center animate-fade-in-up stagger-2">
        <HomeButton />
      </div>
    </main>
  );
}
