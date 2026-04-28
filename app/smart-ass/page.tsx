'use client';

import { useState, useMemo } from 'react';
import HomeButton from '@/app/components/HomeButton';

/* ─── Question bank ─── */
interface Question {
  clues: string[];
  answer: string;
}

const QUESTIONS: Question[] = [
  {
    clues: [
      'Aku adalah lembaran kain warisan budaya kebanggaan Indonesia.',
      'Aku memiliki sangat banyak corak dan motif yang indah.',
      'Motifku biasanya berbeda-beda tergantung dari daerah mana aku berasal.',
      'Pembuatan tradisionalku menggunakan bahan lilin panas yang disebut "malam".',
      'Alat kecil yang digunakan untuk melukis pola di atasku bernama canting.',
      'Biasanya kalian memakainya sebagai seragam sekolah di hari Kamis atau Jumat.',
      'Ayah dan Ibu juga sering memakainya saat pergi ke kantor atau acara pernikahan.',
      'Setiap tanggal 2 Oktober, bangsa Indonesia selalu merayakan hari khusus untukku.',
    ],
    answer: 'Batik',
  },
  {
    clues: [
      'Aku adalah putra kebanggaan bangsa Indonesia.',
      'Aku dikenal sangat cerdas dan gemar membaca sejak kecil.',
      'Aku menuntut ilmu teknik hingga ke negara Jerman.',
      'Keahlian utamaku adalah merancang dan membuat pesawat terbang.',
      'Pesawat N250 Gatotkaca adalah salah satu mahakaryaku.',
      'Aku pernah memimpin negara ini di masa awal reformasi.',
      'Aku adalah Presiden Republik Indonesia yang ketiga.',
      'Kisah cintaku bersama Ibu Ainun sangat terkenal dan dijadikan film.',
    ],
    answer: 'B.J. Habibie',
  },
  {
    clues: [
      'Aku adalah sebuah tugu peringatan yang sangat terkenal di Indonesia.',
      'Aku berdiri gagah di tengah lapangan yang sangat luas di ibukota.',
      'Aku dibangun untuk mengenang sejarah dan perjuangan kemerdekaan rakyat.',
      'Di bagian dasarku terdapat ruangan museum diorama sejarah nasional.',
      'Kalian bisa menaiki lift di dalam tubuhku hingga ke pelataran puncak.',
      'Dari puncakku, Ayah, Bunda, dan adik-adik bisa melihat pemandangan kota Jakarta dari atas.',
      'Bangunanku menjulang tinggi dengan mahkota yang berbentuk seperti kobaran lidah api.',
      'Lidah api di pucukku itu sangat bersinar karena dilapisi puluhan kilogram emas asli.',
    ],
    answer: 'Monas (Monumen Nasional)',
  },
  {
    clues: [
      'Aku adalah makanan tradisional kebanggaan Nusantara.',
      'Daerah asalku adalah dari Minangkabau, Sumatera Barat.',
      'Bahan utamaku biasanya berupa potongan daging sapi.',
      'Aku dimasak perlahan menggunakan santan dan banyak rempah.',
      'Proses memasakku di atas api membutuhkan waktu berjam-jam.',
      'Warnaku cokelat gelap kehitaman dengan bumbu yang mengering.',
      'Kalian pasti selalu menemukanku di etalase setiap rumah makan Padang.',
      'Aku pernah dinobatkan sebagai salah satu makanan paling enak di dunia!',
    ],
    answer: 'Rendang',
  },
];

/* ─── Helpers ─── */
function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/* ─── Page Component ─── */
export default function SmartAssPage() {
  const [started, setStarted] = useState(false);
  const [revealedCount, setRevealedCount] = useState(1);
  const [showAnswer, setShowAnswer] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);

  /** Shuffle order on mount */
  const shuffledQuestions = useMemo(() => shuffleArray(QUESTIONS), []);

  const currentQuestion = shuffledQuestions[questionIndex % shuffledQuestions.length];
  const totalClues = currentQuestion.clues.length;

  /** Start the game */
  const handleStart = () => {
    setStarted(true);
    setRevealedCount(1);
    setShowAnswer(false);
  };

  /** Show next clue */
  const handleNextClue = () => {
    if (revealedCount < totalClues) {
      setRevealedCount((prev) => prev + 1);
    }
  };

  /** Pick a new random question */
  const handleRandomize = () => {
    setQuestionIndex((prev) => prev + 1);
    setRevealedCount(1);
    setShowAnswer(false);
  };

  /* ─── Instruction Screen ─── */
  if (!started) {
    return (
      <main className="min-h-dvh bg-slate-900 flex flex-col items-center px-5 py-8">
        <h1 className="text-3xl font-black text-white tracking-tight mb-2 animate-fade-in">
          🧠 SMART ASS
        </h1>

        {/* Instructions card */}
        <div className="w-full max-w-md mt-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 p-6 animate-fade-in-up">
          <h2 className="text-amber-400 font-bold text-lg mb-3">📋 Cara Bermain</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Tebak siapa aku berdasarkan clue yang akan aku baca. Siapa cepat dan
            tepat menjawab dia menang. Contohkan 1–2 soal terlebih dahulu.
          </p>
        </div>

        {/* Buttons */}
        <div className="w-full max-w-md space-y-3 mt-8 animate-fade-in-up stagger-2">
          <button
            onClick={handleStart}
            className="
              w-full py-4 rounded-2xl font-bold text-xl
              bg-gradient-to-r from-amber-500 to-orange-500
              text-white shadow-lg shadow-amber-500/25
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
  return (
    <main className="min-h-dvh bg-slate-900 flex flex-col px-5 py-8">
      <h1 className="text-2xl font-black text-white tracking-tight text-center mb-6 animate-fade-in">
        🧠 SMART ASS
      </h1>

      {/* Clues list */}
      <div className="flex-1 w-full max-w-md mx-auto space-y-2.5 mb-6">
        {currentQuestion.clues.slice(0, revealedCount).map((clue, i) => (
          <div
            key={`${questionIndex}-${i}`}
            className="
              flex gap-3 items-start p-4 rounded-xl
              bg-white/5 border border-white/5
              animate-fade-in-up
            "
          >
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 font-bold text-sm flex items-center justify-center">
              {i + 1}
            </span>
            <p className="text-slate-200 text-sm leading-relaxed">{clue}</p>
          </div>
        ))}

        {/* Answer reveal */}
        {showAnswer && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-2 border-amber-500/30 text-center animate-fade-in-up">
            <p className="text-amber-400/70 text-xs font-semibold uppercase tracking-wider mb-1">
              Jawaban
            </p>
            <p className="text-white font-black text-3xl">{currentQuestion.answer}</p>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="w-full max-w-md mx-auto space-y-3 pb-4">
        {/* Next clue / Show answer */}
        {!showAnswer && (
          <>
            {revealedCount < totalClues ? (
              <button
                onClick={handleNextClue}
                className="
                  w-full py-3.5 rounded-2xl font-bold text-lg
                  bg-gradient-to-r from-amber-500 to-orange-500
                  text-white shadow-lg shadow-amber-500/25
                  active:scale-[0.97] transition-transform duration-150
                "
              >
                Clue Selanjutnya ({revealedCount}/{totalClues})
              </button>
            ) : (
              <button
                onClick={() => setShowAnswer(true)}
                className="
                  w-full py-3.5 rounded-2xl font-bold text-lg
                  bg-gradient-to-r from-amber-500 to-orange-500
                  text-white shadow-lg shadow-amber-500/25
                  active:scale-[0.97] transition-transform duration-150
                "
              >
                🎯 Tampilkan Jawaban
              </button>
            )}
          </>
        )}

        {/* Randomize for next question */}
        <button
          onClick={handleRandomize}
          className="
            w-full py-3 rounded-2xl font-semibold text-base
            bg-white/10 border border-white/10
            text-white
            active:scale-[0.97] transition-transform duration-150
          "
        >
          🎲 Acak Soal Baru
        </button>

        <div className="flex justify-center pt-1">
          <HomeButton />
        </div>
      </div>
    </main>
  );
}
