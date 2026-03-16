'use client';

import React, { useState, useEffect } from 'react';


// Type declarations
interface Prize {
  id: number;
  amount: string;
  note: string;
  color: string;
  textColor: string;
  weight: number;
}

interface SliceData extends Prize {
  startAngle: number;
  endAngle: number;
  sliceAngle: number;
}

// Data pecahan uang THR dengan tambahan "weight" (probabilitas/ukuran potongan dalam persentase)
// Total weight harus 100
const prizes: Prize[] = [
  { id: 0, amount: "1.000", note: "Pecahan 1.000", color: "#F1C40F", textColor: "#6E2C00", weight: 25 }, 
  { id: 1, amount: "2.000", note: "Pecahan 2.000", color: "#95A5A6", textColor: "#1B2631", weight: 25 }, 
  { id: 2, amount: "4.000", note: "Pecahan 4.000", color: "#2ECC71", textColor: "#145A32", weight: 15 }, 
  { id: 3, amount: "5.000", note: "Pecahan 5.000", color: "#D35400", textColor: "#FDEDEC", weight: 12 }, 
  { id: 4, amount: "10.000", note: "Pecahan 10.000", color: "#9B59B6", textColor: "#F4ECF7", weight: 10 }, 
  { id: 5, amount: "20.000", note: "Pecahan 20.000", color: "#27AE60", textColor: "#EAFAF1", weight: 7 }, 
  { id: 6, amount: "50.000", note: "Pecahan 50.000", color: "#3498DB", textColor: "#EBF5FB", weight: 4 }, 
  { id: 7, amount: "100.000", note: "Pecahan 100.000", color: "#E74C3C", textColor: "#FDEDEC", weight: 2 }, 
];

// Komponen Ilustrasi Uang Kartun
const MoneyCartoon = ({ amount, note, color }: { amount: string; note: string; color: string }) => (
  <svg viewBox="0 0 300 150" className="w-full max-w-[240px] h-auto mx-auto mb-6 drop-shadow-2xl">
    <rect x="5" y="5" width="290" height="140" rx="12" fill="rgba(0,0,0,0.2)" />
    <rect x="0" y="0" width="290" height="140" rx="12" fill={color} />
    <rect x="15" y="15" width="260" height="110" rx="8" fill="rgba(255,255,255,0.1)" stroke="white" strokeWidth="2" strokeDasharray="8,6" />
    <circle cx="145" cy="70" r="35" fill="rgba(255,255,255,0.2)" />
    <text x="145" y="40" fontSize="16" fill="white" fontWeight="900" textAnchor="middle" letterSpacing="2">BANK INDONESIA</text>
    <text x="145" y="82" fontSize="36" fill="white" fontWeight="900" textAnchor="middle" filter="drop-shadow(2px 2px 0px rgba(0,0,0,0.3))">Rp {amount}</text>
    <rect x="85" y="100" width="120" height="20" rx="10" fill="white" />
    <text x="145" y="114" fontSize="11" fill={color} fontWeight="bold" textAnchor="middle">{note}</text>
    <text x="30" y="35" fontSize="12" fill="white" fontWeight="bold">{amount.split('.')[0]}</text>
    <text x="260" y="120" fontSize="12" fill="white" fontWeight="bold">{amount.split('.')[0]}</text>
  </svg>
);

// Komponen Jarum Tangan Kartun
const CartoonHandPointer = () => (
  <svg viewBox="0 0 100 130" className="w-16 h-20 absolute -top-8 left-1/2 transform -translate-x-1/2 z-20" style={{ filter: 'drop-shadow(0px 8px 6px rgba(0,0,0,0.5))' }}>
    <path d="M 30 0 L 70 0 L 75 25 L 25 25 Z" fill="#ffffff" stroke="#1f2937" strokeWidth="5" strokeLinejoin="round" />
    <path d="M 30 0 L 70 0" stroke="#1f2937" strokeWidth="5" strokeLinecap="round" />
    <path d="M 25 25 C 5 25, 5 65, 25 75 L 25 75 C 25 85, 35 90, 45 90 L 45 120 C 45 130, 55 130, 55 120 L 55 90 C 65 90, 75 85, 75 75 C 95 65, 95 25, 70 25 Z" fill="#ffffff" stroke="#1f2937" strokeWidth="5" strokeLinejoin="round" />
    <path d="M 40 40 L 40 65 M 50 40 L 50 65 M 60 40 L 60 65" stroke="#1f2937" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

export default function App() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [prize, setPrize] = useState<SliceData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [wheelData, setWheelData] = useState<SliceData[]>([]);

  const size = 320;
  const center = size / 2;
  const radius = 150;

  // Mengacak susunan roda dan menghitung sudut saat pertama kali dimuat
  useEffect(() => {
    // Fungsi untuk mengacak array
    const shuffleArray = <T,>(array: T[]): T[] => {
      let shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    const shuffledPrizes = shuffleArray(prizes);
    
    let currentAngle = 0;
    const slices = shuffledPrizes.map((p) => {
      // Menghitung besaran sudut berdasarkan weight/probabilitas
      const sliceAngle = (p.weight / 100) * 360; 
      const startAngle = currentAngle;
      const endAngle = currentAngle + sliceAngle;
      currentAngle += sliceAngle;
      
      return { ...p, startAngle, endAngle, sliceAngle };
    });

    setWheelData(slices);
  }, []);

  // Fungsi membuat bentuk potongan pie SVG dengan ukuran dinamis
  const createSlice = (startAngle: number, endAngle: number) => {
    const startRad = (Math.PI / 180) * startAngle;
    const endRad = (Math.PI / 180) * endAngle;

    const x1 = center + radius * Math.cos(startRad);
    const y1 = center + radius * Math.sin(startRad);
    const x2 = center + radius * Math.cos(endRad);
    const y2 = center + radius * Math.sin(endRad);

    // Menentukan apakah potongan lebih dari 180 derajat (opsional, tapi aman)
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

    return `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  // Posisi teks di tengah-tengah potongan yang ukurannya dinamis
  const getTextTransform = (startAngle: number, endAngle: number, isTinySlice: boolean) => {
    const centerAngle = startAngle + (endAngle - startAngle) / 2;
    const centerRad = (Math.PI / 180) * centerAngle;
    
    // Jika potongannya tipis, teks sedikit ditarik ke luar agar tetap muat
    const textRadius = isTinySlice ? radius * 0.75 : radius * 0.6; 
    const x = center + textRadius * Math.cos(centerRad);
    const y = center + textRadius * Math.sin(centerRad);

    return `translate(${x}, ${y}) rotate(${centerAngle})`;
  };

  const spinWheel = () => {
    if (isSpinning || wheelData.length === 0 || showModal) return;
    setIsSpinning(true);
    
    // Tentukan pemenang berdasarkan sistem tiket/probabilitas
    const rand = Math.random() * 100;
    let cumulative = 0;
    let selectedPrize = wheelData[0];

    for (let slice of wheelData) {
      cumulative += slice.weight;
      if (rand <= cumulative) {
        selectedPrize = slice;
        break;
      }
    }

    // Tentukan titik tengah dari slice yang menang
    const sliceCenterAngle = selectedPrize.startAngle + (selectedPrize.sliceAngle / 2);
    
    // Tambahkan sedikit offset acak agar tidak berhenti persis di garis tengah
    const maxOffset = selectedPrize.sliceAngle / 2 - 2; // -2 derajat margin aman
    const randomOffset = (Math.random() * (maxOffset * 2)) - maxOffset;
    
    // Koordinat SVG: 270 derajat adalah posisi jam 12 (atas)
    let targetModulo = 270 - sliceCenterAngle + randomOffset;
    if (targetModulo < 0) targetModulo += 360;

    const extraSpins = 360 * 8; // 8 putaran penuh (lebih kencang)
    const currentModulo = rotation % 360;
    
    let rotationToAdd = targetModulo - currentModulo;
    if (rotationToAdd < 0) rotationToAdd += 360;

    const newRotation = rotation + extraSpins + rotationToAdd;
    setRotation(newRotation);

    if (navigator.vibrate) navigator.vibrate(50);

    setTimeout(() => {
      setIsSpinning(false);
      setPrize(selectedPrize);
      setShowModal(true);
      if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 200]);
    }, 5000); // 5 detik animasi berhenti
  };

  return (
    // Memindahkan onClick ke div terluar agar bisa ditap dimana saja
    <div 
      className="min-h-screen bg-gradient-to-br from-teal-500 via-green-500 to-emerald-700 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans cursor-pointer"
      onClick={spinWheel}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-yellow-300 text-4xl opacity-50 animate-pulse">✨</div>
        <div className="absolute top-32 right-12 text-yellow-300 text-3xl opacity-40 animate-pulse delay-100">✨</div>
        <div className="absolute bottom-20 left-20 text-yellow-300 text-5xl opacity-30 animate-pulse delay-200">✨</div>
        <div className="absolute bottom-32 right-16 text-yellow-300 text-2xl opacity-60 animate-pulse delay-300">✨</div>
      </div>

      <div className="text-center z-10 mb-8 mt-4 pointer-events-none">
        <div className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full inline-block mb-3 border border-white/30 shadow-lg">
          <h2 className="text-yellow-100 font-bold tracking-widest text-sm uppercase">Spesial Lebaran</h2>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)] leading-tight">
          <span className="text-yellow-300">THR</span> KELUARGA MAS FARUQ
        </h1>
        <p className="text-green-50 mt-2 font-medium">Bagi-bagi rejeki buat anak sholeh!</p>
        <p className="text-yellow-200 mt-1 text-sm font-bold animate-pulse mt-4 bg-black/20 rounded-full inline-block px-4 py-1">
          👇 Tap dimana saja untuk putar! 👇
        </p>
      </div>

      <div className="relative z-10 my-4 flex justify-center items-center pointer-events-none">
        <CartoonHandPointer />
        <div className="absolute inset-0 bg-yellow-400 rounded-full scale-105 shadow-[0_0_30px_rgba(0,0,0,0.3)] border-4 border-yellow-200" />
        <div className="absolute inset-0 rounded-full scale-105 border-[10px] border-dashed border-yellow-500 animate-[spin_20s_linear_infinite] opacity-50" />

        <div className="relative bg-white rounded-full overflow-hidden shadow-inner border-4 border-yellow-700/20"
             style={{ width: size, height: size }}>
          {wheelData.length > 0 && (
            <svg
              viewBox={`0 0 ${size} ${size}`}
              className="w-full h-full"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: isSpinning ? 'transform 5s cubic-bezier(0.2, 0.8, 0.1, 1)' : 'transform 0s',
              }}
            >
              {wheelData.map((p, index) => {
                const isTinySlice = p.sliceAngle < 15; // Cek jika potongan sangat tipis
                return (
                  <g key={index}>
                    <path d={createSlice(p.startAngle, p.endAngle)} fill={p.color} stroke="#ffffff" strokeWidth="2" />
                    <text
                      transform={getTextTransform(p.startAngle, p.endAngle, isTinySlice)}
                      fill={p.textColor}
                      fontSize={isTinySlice ? "14" : "18"}
                      fontWeight="900"
                      textAnchor="start"
                      alignmentBaseline="middle"
                      className="drop-shadow-sm"
                    >
                      {p.amount}
                    </text>
                  </g>
                );
              })}
              <circle cx={center} cy={center} r="35" fill="#ffffff" stroke="#eab308" strokeWidth="4" />
            </svg>
          )}
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <img src="/logo.png" alt="Logo" className="w-16 h-16 rounded-full object-cover z-20 shadow-sm" />
          </div>
        </div>
      </div>

      {/* Tombol visual tetap ada untuk daya tarik, tapi event klik diatur oleh div parent */}
      <div
        className={`mt-6 z-10 relative group pointer-events-none ${isSpinning ? 'opacity-70 scale-95' : 'animate-bounce'}`}
      >
        <div className="absolute inset-0 bg-yellow-600 rounded-full translate-y-2"></div>
        <div className="relative bg-gradient-to-b from-yellow-300 to-yellow-500 text-yellow-900 px-10 py-4 rounded-full font-black text-2xl uppercase tracking-wider border-2 border-yellow-200 shadow-xl flex items-center gap-2">
          {isSpinning ? 'Memutar...' : 'Putar Sekarang!'}
        </div>
      </div>

      <div className="mt-12 z-10 text-white/80 text-sm font-medium tracking-wide pointer-events-none">
        Coded with ⚡ by Mas Faruq
      </div>

      {showModal && prize && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]"
             onClick={(e) => {
               // Hentikan event klik agar tidak langsung memutar roda lagi saat menutup modal
               e.stopPropagation(); 
               setShowModal(false);
             }}>
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full text-center relative shadow-2xl animate-[slideUp_0.4s_cubic-bezier(0.175,0.885,0.32,1.275)] overflow-hidden"
               onClick={(e) => e.stopPropagation()} // Mencegah tap di dalam box menutup modal
          >
            <div className="absolute inset-0 opacity-10 animate-[spin_10s_linear_infinite]" 
                 style={{ background: 'conic-gradient(from 0deg, transparent 0 15deg, #000 15deg 30deg, transparent 30deg 45deg, #000 45deg 60deg, transparent 60deg 75deg, #000 75deg 90deg, transparent 90deg 105deg, #000 105deg 120deg, transparent 120deg 135deg, #000 135deg 150deg, transparent 150deg 165deg, #000 165deg 180deg, transparent 180deg 195deg, #000 195deg 210deg, transparent 210deg 225deg, #000 225deg 240deg, transparent 240deg 255deg, #000 255deg 270deg, transparent 270deg 285deg, #000 285deg 300deg, transparent 300deg 315deg, #000 315deg 330deg, transparent 330deg 345deg, #000 345deg 360deg)' }}>
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl font-black text-green-600 mb-2">Horeee!! 🎉</h3>
              <p className="text-gray-600 font-medium mb-6">Alhamdulillah, kamu dapat THR:</p>
              
              <MoneyCartoon amount={prize.amount} note={prize.note} color={prize.color} />
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowModal(false);
                }}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold text-lg py-4 rounded-2xl shadow-lg transition-transform active:scale-95 mt-2"
              >
                Ambil THR & Main Lagi
              </button>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px) scale(0.9); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}} />
    </div>
  );
}