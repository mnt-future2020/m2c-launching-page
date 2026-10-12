"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Factory, MapPin, Scissors, ShoppingBag } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

// Both curves live in a 400×150 coordinate space; node centres sit at x = 44 / 200 / 356, y = 62.
const LEFT = "M44,62 C100,8 144,116 200,62";
const RIGHT = "M200,62 C256,8 300,116 356,62";

/** Maker / Customer node: rotating gradient halo, glossy core, bobbing icon and a small status badge. */
function EndNode({
  x,
  delay,
  label,
  sub,
  icon,
  badge,
  tone,
}: {
  x: string;
  delay: number;
  label: string;
  sub: string;
  icon: React.ReactNode;
  badge: React.ReactNode;
  tone: "ink" | "brand";
}) {
  const halo =
    tone === "ink"
      ? "bg-[conic-gradient(from_0deg,#e8a317,transparent_35%,#120d0d_60%,transparent_80%,#e8a317)]"
      : "bg-[conic-gradient(from_0deg,#e11d2a,transparent_35%,#e8a317_60%,transparent_80%,#e11d2a)]";
  const core =
    tone === "ink"
      ? "bg-[radial-gradient(circle_at_30%_25%,#4a3a3a,#120d0d_70%)] text-gold-soft shadow-[0_14px_30px_-8px_rgba(18,13,13,0.7)]"
      : "bg-[radial-gradient(circle_at_30%_25%,#ff6b5e,#e11d2a_45%,#9e0f17)] text-white shadow-[0_14px_30px_-8px_rgba(181,18,27,0.75)]";
  const glow = tone === "ink" ? "bg-gold/30" : "bg-brand-bright/35";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay, type: "spring", bounce: 0.45 }}
      className="absolute top-[41.3%] -translate-x-1/2 -translate-y-1/2"
      style={{ left: x }}
    >
      <div className="relative h-[54px] w-[54px] sm:h-[66px] sm:w-[66px]">
        {/* soft breathing glow */}
        <motion.span
          className={`absolute inset-0 rounded-full blur-xl ${glow}`}
          animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* rotating gradient halo */}
        <motion.span
          className={`absolute inset-0 rounded-full ${halo}`}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <span className="absolute inset-[2.5px] rounded-full bg-cream" />
        {/* glossy core */}
        <div className={`absolute inset-[6px] grid place-items-center overflow-hidden rounded-full ${core}`}>
          <span className="pointer-events-none absolute inset-x-2 top-1 h-1/3 rounded-full bg-white/20 blur-[2px]" />
          <motion.span
            animate={{ y: [0, -2.5, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            {icon}
          </motion.span>
        </div>
        {/* status badge */}
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.5, type: "spring", bounce: 0.6 }}
          className="absolute -bottom-0.5 -right-0.5 grid h-5 w-5 place-items-center rounded-full border-2 border-white bg-gold text-ink shadow-md sm:h-6 sm:w-6"
        >
          {badge}
        </motion.span>
      </div>
      <div className="absolute left-1/2 top-full mt-2.5 -translate-x-1/2 whitespace-nowrap text-center">
        <p className="text-[13px] font-bold leading-tight">{label}</p>
        <p className="text-[10.5px] text-ink/50">{sub}</p>
      </div>
    </motion.div>
  );
}

export default function MakerToCustomer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.9, ease }}
      className="relative mt-4 overflow-hidden rounded-3xl border border-black/5 bg-white/70 p-4 pb-5 shadow-[0_25px_60px_-30px_rgba(18,13,13,0.35)] backdrop-blur-xl sm:p-5 sm:pb-6"
    >
      <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-gold/20 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-brand-bright/15 blur-2xl" />

      <p className="relative text-center text-[10px] font-bold uppercase tracking-[0.3em] text-ink/45">
        The shortest distance
      </p>

      <div className="relative mx-auto aspect-[400/150] w-full">
        <svg viewBox="0 0 400 150" className="absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <linearGradient id="flow-l" x1="0" x2="1">
              <stop offset="0" stopColor="#120d0d" />
              <stop offset="1" stopColor="#e8a317" />
            </linearGradient>
            <linearGradient id="flow-r" x1="0" x2="1">
              <stop offset="0" stopColor="#e8a317" />
              <stop offset="1" stopColor="#e11d2a" />
            </linearGradient>
            <filter id="flow-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path d={LEFT} fill="none" stroke="url(#flow-l)" strokeOpacity="0.15" strokeWidth="8" strokeLinecap="round" />
          <path d={RIGHT} fill="none" stroke="url(#flow-r)" strokeOpacity="0.15" strokeWidth="8" strokeLinecap="round" />

          <motion.path
            d={LEFT}
            fill="none"
            stroke="url(#flow-l)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 1.2, ease }}
          />
          <motion.path
            d={RIGHT}
            fill="none"
            stroke="url(#flow-r)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 1.8, ease }}
          />
          <path d={LEFT} fill="none" stroke="#fff" strokeWidth="2" className="dash-flow" opacity="0.8" />
          <path d={RIGHT} fill="none" stroke="#fff" strokeWidth="2" className="dash-flow" opacity="0.8" />

          {[0, 0.8, 1.6].map((b, i) => (
            <g key={i} filter="url(#flow-glow)">
              <circle r="4.5" fill="#e8a317">
                <animateMotion dur="2.4s" begin={`${2 + b}s`} repeatCount="indefinite" path={LEFT} />
              </circle>
              <circle r="4.5" fill="#e11d2a">
                <animateMotion dur="2.4s" begin={`${3.2 + b}s`} repeatCount="indefinite" path={RIGHT} />
              </circle>
            </g>
          ))}
        </svg>

        <EndNode
          x="11%"
          delay={1}
          label="Maker"
          sub="Mills & weavers"
          tone="ink"
          icon={<Factory className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.8} />}
          badge={<Scissors className="h-2.5 w-2.5 sm:h-3 sm:w-3" strokeWidth={2.5} />}
        />

        {/* M2C centre */}
        <motion.div
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.4, type: "spring", bounce: 0.4 }}
          className="absolute left-1/2 top-[41.3%] -translate-x-1/2 -translate-y-1/2"
        >
          <div className="relative h-14 w-14 sm:h-[74px] sm:w-[74px]">
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-brand/30"
              animate={{ scale: [1, 1.3], opacity: [0.7, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
            />
            <div className="relative h-full w-full rounded-full bg-white p-1 shadow-[0_15px_40px_-10px_rgba(181,18,27,0.55)]">
              <span className="relative block h-full w-full">
                <Image src="/brand/emblem.png" alt="" fill sizes="80px" className="rounded-full" />
              </span>
            </div>
          </div>
          <div className="absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap text-center">
            <p className="text-[13px] font-bold leading-tight">M2C</p>
            <p className="text-[10.5px] text-ink/50">Direct platform</p>
          </div>
        </motion.div>

        <EndNode
          x="89%"
          delay={1.8}
          label="Customer"
          sub="Anywhere on earth"
          tone="brand"
          icon={<ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.8} />}
          badge={<MapPin className="h-2.5 w-2.5 sm:h-3 sm:w-3" strokeWidth={2.5} />}
        />
      </div>
    </motion.div>
  );
}
