'use client';

import HomeButton from '@/app/components/HomeButton';

export default function BawaBarangPage() {
  return (
    <main className="min-h-dvh bg-slate-900 flex flex-col items-center px-5 py-8">
      <h1 className="text-3xl font-black text-white tracking-tight mb-2 animate-fade-in">
        🌙 BAWA BARANG KE BULAN
      </h1>

      <p className="text-slate-400 text-center text-sm mb-6 animate-fade-in">
        Permainan teka-teki pola rahasia
      </p>

      {/* Instructions */}
      <div className="w-full max-w-md flex-1 space-y-4 animate-fade-in-up">
        {/* Rule explanation card */}
        <div className="rounded-2xl bg-violet-500/10 border border-violet-500/20 p-6">
          <h2 className="text-violet-400 font-bold text-lg mb-3">📋 Aturan Permainan</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            TL punya <strong>aturan rahasia</strong>, dan peserta harus menebak
            apa yang boleh dibawa ke bulan berdasarkan pola tersebut.
          </p>
        </div>

        {/* Example 1 */}
        <div className="rounded-2xl bg-white/5 border border-white/5 p-5 space-y-3">
          <h3 className="text-violet-300 font-bold text-base">💡 Contoh Pola</h3>
          <div className="text-slate-300 text-sm leading-relaxed space-y-2">
            <p>
              <span className="text-violet-400 font-semibold">&quot;Nama saya Anton (A),</span>{' '}
              Saya ke Bulan mau bawa{' '}
              <span className="text-violet-400 font-semibold">Apel (A)&quot;</span>
            </p>
            <p>
              Lalu TL menunjuk anak bernama{' '}
              <span className="text-white font-semibold">Budi (B)</span>,{' '}
              &quot;Budi mau bawa apa?&quot;
            </p>
            <p>
              Kalau Budi jawab &quot;Bawa pisang&quot;, TL bilang{' '}
              <span className="text-red-400 font-semibold">&quot;Salah, kamu ngga boleh ikut!&quot;</span>
            </p>
            <p>
              Budi harusnya bawa barang berawalan{' '}
              <span className="text-violet-400 font-bold">B</span>{' '}
              (Baju, Buku, dll..)
            </p>
          </div>
        </div>

        {/* Example 2 — TL script */}
        <div className="rounded-2xl bg-white/5 border border-white/5 p-5 space-y-3">
          <h3 className="text-violet-300 font-bold text-base">🎤 Script untuk TL</h3>
          <div className="text-slate-300 text-sm leading-relaxed space-y-2">
            <p>&quot;Ayo kita main teka-teki bawa ke bulan!&quot;</p>
            <p>
              <span className="text-violet-400 font-semibold">
                &quot;Nama saya Anton (A), Saya ke Bulan mau bawa Apel (A)&quot;
              </span>
            </p>
            <p>&quot;Nama adik siapa?&quot;</p>
            <p>
              Misal <span className="text-white font-semibold">Caca</span>,
              &quot;Caca mau bawa apa ke bulan?&quot;
            </p>
            <p>
              Harusnya membawa:{' '}
              <span className="text-violet-400 font-semibold">
                Capit, Capung, Colokan, dll
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Home button */}
      <div className="w-full max-w-md mt-8 mb-4 flex justify-center animate-fade-in-up stagger-2">
        <HomeButton />
      </div>
    </main>
  );
}
