'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import HomeButton from '@/app/components/HomeButton';

/* ─── Data ─── */
const CATEGORIES = [
  'Nama Kabupaten/Kota',
  'Negara',
  'Hewan',
  'Produk',
  'Tokoh / Artis',
];

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

/* ─── Types ─── */
type Phase = 'category' | 'letter';
type Status = 'idle' | 'shuffling' | 'result';

/* ─── Helpers ─── */
function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ─── Page Component ─── */
export default function AbcLimaDasarPage() {
  const [phase, setPhase] = useState<Phase>('category');
  const [status, setStatus] = useState<Status>('idle');
  const [displayText, setDisplayText] = useState('?');
  const [selectedCategory, setSelectedCategory] = useState('');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /** Clean up any running interval */
  const cleanup = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => cleanup, [cleanup]);

  /** Shuffle categories and pick one */
  const handleShuffleCategory = () => {
    if (status === 'shuffling') return;
    setStatus('shuffling');

    let tick = 0;
    const totalTicks = 20;

    intervalRef.current = setInterval(() => {
      setDisplayText(pickRandom(CATEGORIES));
      tick++;

      if (tick >= totalTicks) {
        cleanup();
        const final = pickRandom(CATEGORIES);
        setDisplayText(final);
        setSelectedCategory(final);
        setStatus('result');
      }
    }, 100);
  };

  /** Move from category result to letter phase */
  const goToLetterPhase = () => {
    setPhase('letter');
    setStatus('idle');
    setDisplayText('?');
  };

  /** Shuffle letters and pick one */
  const handleShuffleLetter = () => {
    if (status === 'shuffling') return;
    setStatus('shuffling');

    let tick = 0;
    const totalTicks = 25;

    intervalRef.current = setInterval(() => {
      setDisplayText(pickRandom(LETTERS));
      tick++;

      if (tick >= totalTicks) {
        cleanup();
        setDisplayText(pickRandom(LETTERS));
        setStatus('result');
      }
    }, 80);
  };

  /** Reset the whole game back to category phase */
  const handleReset = () => {
    cleanup();
    setPhase('category');
    setStatus('idle');
    setDisplayText('?');
    setSelectedCategory('');
  };

  /* ─── Derived state ─── */
  const isShuffling = status === 'shuffling';
  const isResult = status === 'result';
  const isIdle = status === 'idle';

  return (
    <main className="min-h-dvh bg-slate-900 flex flex-col items-center px-5 py-8">
      {/* Title */}
      <h1 className="text-3xl font-black text-white tracking-tight mb-2 animate-fade-in">
        🔤 ABC 5 Dasar
      </h1>

      {/* Instruction */}
      <p className="text-slate-400 text-center text-sm max-w-xs mb-8 animate-fade-in leading-relaxed">
        {phase === 'category'
          ? 'Silahkan klik tombol "Acak" lalu umumkan dapat kategori apa'
          : `Kategori: "${selectedCategory}" — Acak huruf A-Z!`}
      </p>

      {/* Display area */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm">
        {/* Category badge (shown in letter phase) */}
        {phase === 'letter' && (
          <div className="mb-4 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 animate-fade-in">
            <span className="text-emerald-400 font-semibold text-sm">
              {selectedCategory}
            </span>
          </div>
        )}

        {/* Main display card */}
        <div
          className={`
            w-full rounded-3xl p-8 flex items-center justify-center min-h-[200px]
            bg-gradient-to-br from-emerald-500/20 to-teal-500/10
            border-2 border-emerald-500/20
            ${isShuffling ? 'animate-text-shimmer' : ''}
            ${isResult ? 'border-emerald-400/50' : ''}
            transition-colors duration-300
          `}
        >
          <span
            className={`
              font-black text-center leading-tight transition-all duration-200
              ${phase === 'letter' && (isResult || isShuffling)
                ? 'text-8xl text-emerald-400'
                : 'text-4xl text-white'
              }
              ${isIdle ? 'text-slate-500' : ''}
            `}
          >
            {displayText}
          </span>
        </div>

        {/* Arrow indicator — only shown when idle */}
        {isIdle && !isShuffling && (
          <div className="mt-6 flex flex-col items-center animate-arrow-bounce">
            <svg
              className="w-8 h-8 text-emerald-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
              />
            </svg>
            <span className="text-emerald-400/70 text-xs font-semibold mt-1">
              Klik Acak
            </span>
          </div>
        )}
      </div>

      {/* Buttons — hidden during letter shuffling for clarity */}
      {!(phase === 'letter' && isShuffling) && (
        <div className="w-full max-w-sm space-y-3 mt-8 mb-4 animate-fade-in">
          {/* Category phase: ACAK or SELANJUTNYA */}
          {phase === 'category' && (
            <>
              {isResult ? (
                <button
                  onClick={goToLetterPhase}
                  className="
                    w-full py-4 rounded-2xl font-bold text-xl
                    bg-gradient-to-r from-emerald-500 to-teal-500
                    text-white shadow-lg shadow-emerald-500/25
                    active:scale-[0.97] transition-transform duration-150
                  "
                >
                  Selanjutnya →
                </button>
              ) : (
                <button
                  onClick={handleShuffleCategory}
                  disabled={isShuffling}
                  className="
                    w-full py-4 rounded-2xl font-bold text-xl
                    bg-gradient-to-r from-emerald-500 to-teal-500
                    text-white shadow-lg shadow-emerald-500/25
                    active:scale-[0.97] transition-transform duration-150
                    disabled:opacity-60 disabled:cursor-not-allowed
                  "
                >
                  {isShuffling ? 'Mengacak...' : '🎲 ACAK'}
                </button>
              )}
            </>
          )}

          {/* Letter phase: ACAK and ULANGI */}
          {phase === 'letter' && !isShuffling && (
            <>
              <button
                onClick={handleShuffleLetter}
                className="
                  w-full py-4 rounded-2xl font-bold text-xl
                  bg-gradient-to-r from-emerald-500 to-teal-500
                  text-white shadow-lg shadow-emerald-500/25
                  active:scale-[0.97] transition-transform duration-150
                "
              >
                🎲 ACAK HURUF
              </button>
              <button
                onClick={handleReset}
                className="
                  w-full py-3 rounded-2xl font-semibold text-base
                  bg-white/10 border border-white/10
                  text-white
                  active:scale-[0.97] transition-transform duration-150
                "
              >
                🔄 Acak Kategori Baru
              </button>
            </>
          )}

          {/* Home button — always visible when buttons are shown */}
          <div className="flex justify-center pt-2">
            <HomeButton />
          </div>
        </div>
      )}
    </main>
  );
}
