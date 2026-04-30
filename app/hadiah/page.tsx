'use client';

import Link from 'next/link';
import HomeButton from '@/app/components/HomeButton';

/** Bus options shown on the prize selection page */
const BUSES = [
  { id: '1', label: 'Bus 1', emoji: '🚌', gradient: 'from-amber-500 to-orange-600' },
  { id: '2', label: 'Bus 2', emoji: '🚍', gradient: 'from-sky-500 to-blue-600' },
] as const;

export default function HadiahPage() {
  return (
    <main className="min-h-dvh bg-slate-900 flex flex-col items-center px-5 py-10">
      {/* Header */}
      <header className="text-center mb-10 animate-fade-in">
        <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/10 mb-4">
          <span className="text-sm font-semibold text-slate-300 tracking-widest uppercase">
            🎁 Hadiah
          </span>
        </div>

        <h1 className="text-3xl font-black text-white tracking-tight leading-tight">
          Pilih Bus Kamu
        </h1>

        <p className="text-slate-400 mt-3 text-base font-medium">
          Putar roda &amp; dapatkan hadiahmu! 🎉
        </p>
      </header>

      {/* Bus cards */}
      <nav className="w-full max-w-md space-y-4" aria-label="Pilih bus">
        {BUSES.map((bus, index) => (
          <Link
            key={bus.id}
            href={`/hadiah/${bus.id}`}
            className={`
              block w-full rounded-2xl overflow-hidden
              bg-gradient-to-r ${bus.gradient}
              shadow-lg
              active:scale-[0.97] transition-transform duration-150
              animate-fade-in-up stagger-${index + 1}
            `}
          >
            <div className="flex items-center gap-4 px-6 py-6">
              <span className="text-5xl flex-shrink-0" aria-hidden="true">
                {bus.emoji}
              </span>

              <div className="flex-1 min-w-0">
                <h2 className="text-white font-bold text-2xl leading-tight">
                  {bus.label}
                </h2>
                <p className="text-white/75 text-sm mt-1">
                  Tap untuk putar roda hadiah
                </p>
              </div>

              <svg
                className="w-6 h-6 text-white/50 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          </Link>
        ))}
      </nav>

      {/* Home button */}
      <div className="mt-10 animate-fade-in-up stagger-3">
        <HomeButton />
      </div>
    </main>
  );
}
