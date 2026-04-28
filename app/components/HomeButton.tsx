import Link from 'next/link';

/** Reusable home/beranda button — appears on every game page */
export default function HomeButton() {
  return (
    <Link
      href="/"
      className="
        inline-flex items-center gap-2 px-5 py-3 rounded-xl
        bg-white/10 border border-white/10
        text-white font-semibold text-base
        active:scale-95 transition-transform duration-150
      "
      aria-label="Kembali ke beranda"
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
          d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
      Beranda
    </Link>
  );
}
