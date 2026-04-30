'use client';

import { use, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Player } from '@lottiefiles/react-lottie-player';
import HomeButton from '@/app/components/HomeButton';
import RouletteWheel from '@/app/hadiah/RouletteWheel';
import { BUS_PRIZES, type Prize } from '@/app/hadiah/data';

/* ─── Result Modal ─── */
function ResultModal({
  prize,
  onClose,
}: {
  prize: Prize;
  onClose: () => void;
}) {
  const isLottie = prize.image.endsWith('.json');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal card */}
      <div className="relative z-10 w-full max-w-sm rounded-3xl bg-slate-800 border border-white/10 p-8 text-center shadow-2xl animate-fade-in">
        {/* Confetti burst emoji */}
        <p className="text-5xl mb-4" aria-hidden="true">
          🎉
        </p>

        <h2 className="text-2xl font-black text-white mb-2">Selamat!</h2>
        <p className="text-slate-300 text-lg font-semibold mb-6">
          Kamu mendapatkan{' '}
          <span className="text-amber-400 font-black">{prize.name}</span>
        </p>

        {/* Prize image */}
        <div className="relative w-40 h-40 mx-auto mb-6 rounded-2xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
          {isLottie ? (
            <Player
              src={prize.image}
              autoplay
              loop
              style={{ height: '100%', width: '100%' }}
              className="p-2 relative z-10"
            />
          ) : (
            <Image
              src={prize.image}
              alt={prize.name}
              fill
              className="object-contain p-3 relative z-10"
              onError={(e) => {
                // Fallback: hide broken images gracefully
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          )}
          {/* Fallback emoji if image not found */}
          <span className="absolute text-6xl opacity-20 pointer-events-none">
            🎁
          </span>
        </div>

        <button
          onClick={onClose}
          className="
            w-full px-6 py-3.5 rounded-xl font-bold text-base
            bg-gradient-to-r from-amber-400 to-orange-500
            text-slate-900 shadow-lg shadow-amber-500/20
            active:scale-95 transition-transform duration-150
          "
        >
          Kembali
        </button>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function HadiahBusPage({
  params,
}: {
  params: Promise<{ busId: string }>;
}) {
  const { busId } = use(params);
  const [resultPrize, setResultPrize] = useState<Prize | null>(null);

  const prizes = BUS_PRIZES[busId];

  const handleResult = useCallback((prize: Prize) => {
    setResultPrize(prize);
  }, []);

  // Guard: invalid bus id
  if (!prizes) {
    return (
      <main className="min-h-dvh bg-slate-900 flex flex-col items-center justify-center px-5 py-10">
        <p className="text-white text-xl font-bold mb-4">Bus tidak ditemukan 😕</p>
        <HomeButton />
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-slate-900 flex flex-col items-center px-5 py-8">
      {/* Title */}
      <header className="text-center mb-6 animate-fade-in">
        <h1 className="text-2xl font-black text-white tracking-tight">
          Bus {busId}
        </h1>
        <p className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 text-lg font-bold mt-1">
          Putar hadiah mu!
        </p>
      </header>

      {/* Roulette wheel */}
      <div className="animate-fade-in-up">
        <RouletteWheel prizes={prizes} onResult={handleResult} />
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-8 animate-fade-in-up stagger-2">
        <HomeButton />
        <Link
          href="/hadiah"
          className="
            inline-flex items-center gap-2 px-5 py-3 rounded-xl
            bg-white/10 border border-white/10
            text-white font-semibold text-base
            active:scale-95 transition-transform duration-150
          "
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>
          Pilih Bus
        </Link>
      </div>

      {/* Result modal */}
      {resultPrize && (
        <ResultModal
          prize={resultPrize}
          onClose={() => setResultPrize(null)}
        />
      )}
    </main>
  );
}
