'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import HomeButton from '@/app/components/HomeButton';

/* ─── Word bank ─── */
const WORD_BANK = [
  'Ayam', 'Nasi', 'Bebek', 'Bis', 'Fanama', 'Tabungan', 'Mobil',
  'Liburan', 'Nusantara', 'Awan', 'Nelayan', 'Naga', 'Apel',
  'Langit', 'Taman', 'Negeri', 'Indonesia', 'Angin', 'Nelpon',
  'Obat', 'Tangan', 'Neraca', 'Angkasa', 'Ajaib', 'Bintang',
  'Gunung', 'Nelangsa', 'Abadi', 'Irama', 'Album',
];

/* ─── Helpers ─── */
function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ─── Page Component ─── */
export default function SambungKataPage() {
  const [started, setStarted] = useState(false);
  const [currentWord, setCurrentWord] = useState('');
  const [isShuffling, setIsShuffling] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const cleanup = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => cleanup, [cleanup]);

  /** Start the game with a random word */
  const handleStart = () => {
    setStarted(true);
    setCurrentWord(pickRandom(WORD_BANK));
  };

  /** Shuffle and pick a new word */
  const handleShuffle = () => {
    if (isShuffling) return;
    setIsShuffling(true);

    let tick = 0;
    const totalTicks = 15;

    intervalRef.current = setInterval(() => {
      setCurrentWord(pickRandom(WORD_BANK));
      tick++;

      if (tick >= totalTicks) {
        cleanup();
        setCurrentWord(pickRandom(WORD_BANK));
        setIsShuffling(false);
      }
    }, 80);
  };

  /* ─── Instruction Screen ─── */
  if (!started) {
    return (
      <main className="min-h-dvh bg-slate-900 flex flex-col items-center px-5 py-8">
        <h1 className="text-3xl font-black text-white tracking-tight mb-2 animate-fade-in">
          🔗 SAMBUNG KATA
        </h1>

        {/* Instructions card */}
        <div className="w-full max-w-md mt-6 rounded-2xl bg-sky-500/10 border border-sky-500/20 p-6 animate-fade-in-up space-y-3">
          <h2 className="text-sky-400 font-bold text-lg">📋 Cara Bermain</h2>
          <ul className="text-slate-300 text-sm leading-relaxed space-y-2">
            <li>🔹 Sambung kata berdasarkan <strong>huruf terakhir</strong>.</li>
            <li>🔹 Maksimal <strong>3 detik</strong> untuk menjawab.</li>
            <li>🔹 Dilarang mengulang kata yang sudah diucapkan peserta lain.</li>
            <li>🔹 Jika tidak bisa menjawab → <strong>gugur</strong>.</li>
            <li>🔹 Dilanjutkan ke bangku / orang berikutnya.</li>
            <li>🔹 Jika sudah sampai belakang diulang ke depan sampai tersisa 1–3 pemenang.</li>
            <li>🔹 Hanya dalam <strong>Bahasa Indonesia</strong>.</li>
            <li>🔹 Beri contoh terlebih dahulu.</li>
          </ul>
          <p className="text-sky-400/60 text-xs italic mt-2">
            Kata yang ditampilkan di sini hanya sebagai ide saja. Bisa menggunakan kata random.
          </p>
        </div>

        {/* Buttons */}
        <div className="w-full max-w-md space-y-3 mt-8 animate-fade-in-up stagger-2">
          <button
            onClick={handleStart}
            className="
              w-full py-4 rounded-2xl font-bold text-xl
              bg-gradient-to-r from-sky-500 to-blue-600
              text-white shadow-lg shadow-sky-500/25
              active:scale-[0.97] transition-transform duration-150
            "
          >
            🚀 Mulai
          </button>
          <div className="flex justify-center pt-2">
            <HomeButton />
          </div>
        </div>
      </main>
    );
  }

  /* ─── Game Screen ─── */
  const lastLetter = currentWord.charAt(currentWord.length - 1).toUpperCase();

  return (
    <main className="min-h-dvh bg-slate-900 flex flex-col items-center px-5 py-8">
      <h1 className="text-2xl font-black text-white tracking-tight mb-6 animate-fade-in">
        🔗 SAMBUNG KATA
      </h1>

      {/* Main display */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm">
        <div
          className={`
            w-full rounded-3xl p-8 flex flex-col items-center justify-center min-h-[220px]
            bg-gradient-to-br from-sky-500/20 to-blue-500/10
            border-2 border-sky-500/20
            ${isShuffling ? 'animate-text-shimmer' : ''}
            transition-colors duration-300
          `}
        >
          <span
            className={`
              font-black text-5xl text-center text-white transition-all duration-200
              ${isShuffling ? 'text-sky-300' : ''}
            `}
          >
            {currentWord}
          </span>

          {/* Highlight last letter */}
          {!isShuffling && (
            <div className="mt-4 flex items-center gap-2 animate-fade-in">
              <span className="text-slate-400 text-sm">Huruf terakhir:</span>
              <span className="text-sky-400 font-black text-2xl bg-sky-500/20 px-3 py-1 rounded-lg">
                {lastLetter}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="w-full max-w-sm space-y-3 mt-8 mb-4">
        <button
          onClick={handleShuffle}
          disabled={isShuffling}
          className="
            w-full py-4 rounded-2xl font-bold text-xl
            bg-gradient-to-r from-sky-500 to-blue-600
            text-white shadow-lg shadow-sky-500/25
            active:scale-[0.97] transition-transform duration-150
            disabled:opacity-60 disabled:cursor-not-allowed
          "
        >
          {isShuffling ? 'Mengacak...' : '🎲 ACAK'}
        </button>

        <div className="flex justify-center pt-2">
          <HomeButton />
        </div>
      </div>
    </main>
  );
}
