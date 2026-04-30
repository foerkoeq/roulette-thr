'use client';

import Link from 'next/link';

/** Game definitions for the landing page menu */
const GAMES = [
  {
    id: 'abc-5-dasar',
    title: 'ABC 5 DASAR',
    emoji: '🔤',
    description: 'Tebak 5 hal berdasarkan huruf & kategori acak',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'smart-ass',
    title: 'SMART ASS',
    emoji: '🧠',
    description: 'Tebak siapa aku dari 8 petunjuk!',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    id: 'sambung-kata',
    title: 'SAMBUNG KATA',
    emoji: '🔗',
    description: 'Sambung kata dari huruf terakhir!',
    gradient: 'from-sky-500 to-blue-600',
  },
  {
    id: 'bawa-barang',
    title: 'BAWA BARANG KE BULAN',
    emoji: '🌙',
    description: 'Tebak pola barang yang boleh dibawa',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    id: 'scavenger-hunt',
    title: 'SCAVENGER HUNT',
    emoji: '🔍',
    description: 'Siapa cepat angkat barang, dia menang!',
    gradient: 'from-rose-500 to-pink-600',
  },
] as const;

export default function LandingPage() {
  return (
    <main className="min-h-dvh bg-slate-900 px-5 py-10 flex flex-col items-center">
      {/* Header */}
      <header className="text-center mb-10 animate-fade-in">
        <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/10 mb-4">
          <span className="text-sm font-semibold text-slate-300 tracking-widest uppercase">
            🎉 Game Time!
          </span>
        </div>

        <h1 className="text-4xl font-black text-white tracking-tight leading-tight">
          Ice Breaking
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
            FANAMA
          </span>
        </h1>

        <p className="text-slate-400 mt-3 text-base font-medium">
          Pilih permainan untuk memulai 👇
        </p>
      </header>

      {/* Game Cards */}
      <nav className="w-full max-w-md space-y-3" aria-label="Daftar permainan">
        {GAMES.map((game, index) => (
          <Link
            key={game.id}
            href={`/${game.id}`}
            className={`
              block w-full rounded-2xl overflow-hidden
              bg-gradient-to-r ${game.gradient}
              shadow-lg
              active:scale-[0.97] transition-transform duration-150
              animate-fade-in-up stagger-${index + 1}
            `}
          >
            <div className="flex items-center gap-4 px-5 py-4">
              <span className="text-3xl flex-shrink-0" aria-hidden="true">
                {game.emoji}
              </span>

              <div className="flex-1 min-w-0">
                <h2 className="text-white font-bold text-lg leading-tight">
                  {game.title}
                </h2>
                <p className="text-white/75 text-sm mt-0.5 leading-snug">
                  {game.description}
                </p>
              </div>

              <svg
                className="w-5 h-5 text-white/50 flex-shrink-0"
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

      {/* Hadiah / Prize roulette link */}
      <div className="w-full max-w-md mt-6 animate-fade-in-up stagger-5">
        <Link
          href="/hadiah"
          className="
            block w-full rounded-2xl overflow-hidden
            bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500
            shadow-lg shadow-amber-500/20
            active:scale-[0.97] transition-transform duration-150
          "
        >
          <div className="flex items-center gap-4 px-5 py-4">
            <span className="text-3xl flex-shrink-0" aria-hidden="true">
              🎁
            </span>

            <div className="flex-1 min-w-0">
              <h2 className="text-white font-bold text-lg leading-tight">
                HADIAH
              </h2>
              <p className="text-white/80 text-sm mt-0.5 leading-snug">
                Putar roda &amp; dapatkan hadiahmu!
              </p>
            </div>

            <svg
              className="w-5 h-5 text-white/60 flex-shrink-0"
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
      </div>

      {/* Footer */}
      <p className="text-slate-600 text-xs mt-12 animate-fade-in">
        Made with ⚡ for FANAMA
      </p>
    </main>
  );
}