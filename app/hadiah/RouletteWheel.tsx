'use client';

import { useRef, useState, useCallback, useMemo } from 'react';
import { SEGMENT_COLORS, type Prize } from './data';

/* ─── Constants ─── */
const WHEEL_SIZE = 320;
const CENTER = WHEEL_SIZE / 2;
const RADIUS = CENTER - 4; // small inset for border breathing room
const MIN_FULL_SPINS = 5;
const MAX_FULL_SPINS = 8;
const SPIN_DURATION_MS = 5000;

/* ─── Helpers ─── */

/** Convert degrees → radians */
const deg2rad = (deg: number) => (deg * Math.PI) / 180;

/** Build a weighted list: each prize appears `quantity` times */
function buildWeightedSegments(prizes: Prize[]) {
  const segments: Prize[] = [];
  for (const prize of prizes) {
    for (let i = 0; i < prize.quantity; i++) {
      segments.push(prize);
    }
  }
  return segments;
}

/* ─── Component ─── */
interface RouletteWheelProps {
  prizes: Prize[];
  onResult: (prize: Prize) => void;
}

export default function RouletteWheel({ prizes, onResult }: RouletteWheelProps) {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  // Weighted segment list (each prize appears quantity-times)
  const segments = useMemo(() => buildWeightedSegments(prizes), [prizes]);
  const segCount = segments.length;
  const segAngle = 360 / segCount;

  /** Pick a random winner and spin the wheel */
  const spin = useCallback(() => {
    if (spinning) return;
    setSpinning(true);

    // Random winner index
    const winnerIdx = Math.floor(Math.random() * segCount);

    // The pointer is at the TOP (12 o'clock). Segment 0 starts at the right (3 o'clock).
    // So the "top" in wheel coordinates is 270°.
    // We want the center of the winning segment to land under the pointer.
    const segCenter = winnerIdx * segAngle + segAngle / 2;
    // Angle to rotate so the pointer points at the segment center:
    const targetAngle = 360 - segCenter + 270; // +270 because pointer is top

    const fullSpins =
      MIN_FULL_SPINS + Math.floor(Math.random() * (MAX_FULL_SPINS - MIN_FULL_SPINS + 1));

    const totalRotation = fullSpins * 360 + ((targetAngle % 360) + 360) % 360;

    // Use previous rotation as base to keep rotating in the same direction
    setRotation((prev) => prev + totalRotation);

    setTimeout(() => {
      setSpinning(false);
      onResult(segments[winnerIdx]);
    }, SPIN_DURATION_MS);
  }, [spinning, segCount, segAngle, segments, onResult]);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Wheel wrapper with pointer */}
      <div className="relative" style={{ width: WHEEL_SIZE, height: WHEEL_SIZE }}>
        {/* Pointer triangle (top-center) */}
        <div
          className="absolute z-20 left-1/2 -translate-x-1/2 -top-2"
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }}
        >
          <div
            className="w-0 h-0"
            style={{
              borderLeft: '14px solid transparent',
              borderRight: '14px solid transparent',
              borderTop: '28px solid #facc15',
            }}
          />
        </div>

        {/* Spinning disc */}
        <div
          ref={wheelRef}
          className="w-full h-full rounded-full border-4 border-white/20 overflow-hidden"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning
              ? `transform ${SPIN_DURATION_MS}ms cubic-bezier(0.17, 0.67, 0.12, 0.99)`
              : 'none',
          }}
        >
          <svg
            viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`}
            width={WHEEL_SIZE}
            height={WHEEL_SIZE}
            className="block"
          >
            {segments.map((seg, i) => {
              const startAngle = i * segAngle;
              const endAngle = startAngle + segAngle;
              const color = SEGMENT_COLORS[i % SEGMENT_COLORS.length];

              // SVG arc coordinates
              const x1 = CENTER + RADIUS * Math.cos(deg2rad(startAngle));
              const y1 = CENTER + RADIUS * Math.sin(deg2rad(startAngle));
              const x2 = CENTER + RADIUS * Math.cos(deg2rad(endAngle));
              const y2 = CENTER + RADIUS * Math.sin(deg2rad(endAngle));
              const largeArc = segAngle > 180 ? 1 : 0;

              const pathD = [
                `M ${CENTER} ${CENTER}`,
                `L ${x1} ${y1}`,
                `A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${x2} ${y2}`,
                'Z',
              ].join(' ');

              // Position text along the mid-angle, pushed outward
              const midAngle = startAngle + segAngle / 2;
              const textRadius = RADIUS * 0.62;
              const tx = CENTER + textRadius * Math.cos(deg2rad(midAngle));
              const ty = CENTER + textRadius * Math.sin(deg2rad(midAngle));

              // Decide font-size based on segment count
              const fontSize = segCount > 30 ? 6 : segCount > 20 ? 7 : 8;

              return (
                <g key={i}>
                  <path d={pathD} fill={color} stroke="#0f172a" strokeWidth={1} />
                  <text
                    x={tx}
                    y={ty}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#fff"
                    fontWeight="700"
                    fontSize={fontSize}
                    transform={`rotate(${midAngle}, ${tx}, ${ty})`}
                    style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
                  >
                    {seg.name}
                  </text>
                </g>
              );
            })}

            {/* Center hub */}
            <circle cx={CENTER} cy={CENTER} r={18} fill="#0f172a" stroke="#facc15" strokeWidth={3} />
            <text
              x={CENTER}
              y={CENTER}
              textAnchor="middle"
              dominantBaseline="central"
              fill="#facc15"
              fontWeight="900"
              fontSize="10"
            >
              🎁
            </text>
          </svg>
        </div>

        {/* Outer glow ring */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow: spinning
              ? '0 0 40px rgba(250, 204, 21, 0.4), inset 0 0 30px rgba(0,0,0,0.3)'
              : '0 0 20px rgba(250, 204, 21, 0.15), inset 0 0 30px rgba(0,0,0,0.3)',
            transition: 'box-shadow 0.5s ease',
          }}
        />
      </div>

      {/* Spin button */}
      <button
        onClick={spin}
        disabled={spinning}
        className={`
          px-10 py-4 rounded-2xl font-black text-lg tracking-wide
          transition-all duration-200
          ${
            spinning
              ? 'bg-slate-700 text-slate-400 cursor-not-allowed scale-95'
              : 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 shadow-lg shadow-amber-500/25 active:scale-95 hover:shadow-amber-500/40'
          }
        `}
      >
        {spinning ? '🎰 Memutar…' : '🎯 PUTAR!'}
      </button>
    </div>
  );
}
