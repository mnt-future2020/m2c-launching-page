"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import {
  BadgePercent,
  BarChart3,
  Coins,
  Globe2,
  Headphones,
  Percent,
  ShieldCheck,
  Truck,
} from "lucide-react";
import MakerToCustomer from "./MakerToCustomer";

const ease = [0.22, 1, 0.36, 1] as const;

const shoppers = [
  { Icon: BadgePercent, text: "Factory-direct prices — no middleman markups" },
  { Icon: Coins, text: "Daily offers, markdowns & reward coins on every order" },
  { Icon: Truck, text: "Worldwide delivery with live tracking" },
  { Icon: ShieldCheck, text: "Verified makers & secure checkout" },
];

const makers = [
  { Icon: Globe2, text: "Sell directly to customers worldwide" },
  { Icon: Percent, text: "Keep your margin — zero middleman cuts" },
  { Icon: BarChart3, text: "Advanced seller dashboard & growth tools" },
  { Icon: Headphones, text: "Integrated logistics & 24×7 seller support" },
];

function ComingCard({
  title,
  tag,
  items,
  dark = false,
  delay,
}: {
  title: string;
  tag: string;
  items: typeof shoppers;
  dark?: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease }}
      whileHover={{ y: -6 }}
      className={`relative overflow-hidden rounded-3xl p-6 sm:p-7 ${
        dark
          ? "bg-ink text-white shadow-[0_30px_70px_-30px_rgba(18,13,13,0.6)]"
          : "border border-black/5 bg-white/80 shadow-[0_20px_60px_-30px_rgba(18,13,13,0.3)] backdrop-blur"
      }`}
    >
      {dark && <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold/25 blur-3xl" />}
      <p className={`relative text-xs font-semibold uppercase tracking-[0.25em] ${dark ? "text-gold-soft" : "text-brand"}`}>
        {tag}
      </p>
      <h3 className="relative mt-2 font-display text-[26px] font-semibold leading-tight">{title}</h3>
      <ul className="relative mt-5 space-y-3.5">
        {items.map(({ Icon, text }, i) => (
          <motion.li
            key={text}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.3 + i * 0.1, duration: 0.6, ease }}
            className="flex items-center gap-3"
          >
            <span
              className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${
                dark ? "border border-white/10 bg-white/5 text-gold-soft" : "bg-gradient-to-br from-brand/10 to-gold/20 text-brand"
              }`}
            >
              <Icon className="h-[18px] w-[18px]" />
            </span>
            <span className={`text-[15px] leading-snug ${dark ? "text-white/80" : "text-ink/75"}`}>{text}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function ComingSoon() {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 50, damping: 20 });
  const my = useSpring(rawY, { stiffness: 50, damping: 20 });
  const emblemX = useTransform(mx, (v) => v * 0.6);
  const emblemY = useTransform(my, (v) => v * 0.6);
  const blobX = useTransform(mx, (v) => v * -1.5);
  const blobY = useTransform(my, (v) => v * -1.5);

  return (
    <main
      onMouseMove={(e) => {
        rawX.set((e.clientX / window.innerWidth - 0.5) * 30);
        rawY.set((e.clientY / window.innerHeight - 0.5) * 30);
      }}
      className="relative flex min-h-screen flex-col overflow-hidden"
    >
      {/* Ambient background */}
      <motion.div style={{ x: blobX, y: blobY }} className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -left-40 -top-20 h-[560px] w-[560px] rounded-full bg-brand-bright/25 blur-[130px]"
          animate={{ x: [0, 90, 0], y: [0, 50, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-40 top-1/4 h-[520px] w-[520px] rounded-full bg-gold/30 blur-[130px]"
          animate={{ x: [0, -70, 0], y: [0, 70, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(18,13,13,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(18,13,13,0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_70%)]" />

      {/* Top bar */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
        className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-5 pt-6"
      >
        <Image src="/brand/logo.png" alt="M2C Markdowns" width={1400} height={440} priority className="h-14 w-auto sm:h-20 lg:h-24" />
        <span className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white/70 whitespace-nowrap px-3 py-1.5 text-[11px] font-semibold text-ink/70 backdrop-blur sm:px-3.5 sm:text-xs">
          <span className="relative flex h-2 w-2">
            <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span><span className="hidden sm:inline">Building</span><span className="sm:hidden">Work</span> in progress</span>
        </span>
      </motion.header>

      {/* Hero */}
      <section className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 grid-cols-[minmax(0,1fr)] items-center gap-12 px-5 pb-10 pt-4 lg:grid-cols-[1.25fr_1fr] lg:items-start lg:pt-6">
        <div className="min-w-0 lg:pt-10">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-bright px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-white shadow-lg shadow-brand/30"
          >
            Launching soon
          </motion.span>

          <h1 className="mt-7 font-display text-[clamp(2.5rem,5.6vw,4.6rem)] font-semibold leading-[1.04] tracking-[-0.02em]">
            {["Something big is", "being woven for"].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.12, ease }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden whitespace-nowrap pb-2 text-[0.8em]">
              <motion.span
                className="block"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.45, ease }}
              >
                <span className="font-display font-bold text-shimmer">Makers</span>
                <span className="mx-[0.2em] font-normal text-ink/25">&amp;</span>
                <span className="font-display font-bold text-shimmer">Customers.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease }}
            className="mt-5 max-w-lg text-[15px] leading-relaxed text-ink/60 sm:text-base"
          >
            <b className="text-ink">M2C Markdowns</b> connects manufacturers directly to customers worldwide — textile-first,
            open to every sector, with no middlemen in between.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease }}
            className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            {[
              ["0%", "Middleman markup"],
              ["Worldwide", "Delivery"],
              ["24×7", "Support"],
            ].map(([k, v], i) => (
              <div key={v} className="flex items-center gap-6">
                {i > 0 && <span className="hidden h-8 w-px bg-ink/10 sm:block" />}
                <div>
                  <p className="text-2xl font-extrabold tracking-tight lining-nums text-ink">{k}</p>
                  <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/45">{v}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease }}
          className="relative mx-auto w-full max-w-[420px]"
        >
          <div className="relative mx-auto aspect-square w-full max-w-[340px]">
            <motion.svg
              viewBox="0 0 400 400"
              className="absolute inset-0 h-full w-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            >
              <defs>
                <path id="cs-ring" d="M200,200 m-180,0 a180,180 0 1,1 360,0 a180,180 0 1,1 -360,0" />
              </defs>
              <circle cx="200" cy="200" r="196" fill="none" stroke="#e8a317" strokeOpacity="0.5" strokeDasharray="2 8" />
              <text className="fill-ink/40 font-sans text-[12px] font-semibold uppercase tracking-[0.45em]">
                <textPath href="#cs-ring">
                  Launching soon · Maker to Consumer · Worldwide · No middlemen ·
                </textPath>
              </text>
            </motion.svg>
            <motion.div
              style={{ x: emblemX, y: emblemY }}
              className="absolute inset-[16%] rounded-full bg-white shadow-[0_40px_90px_-25px_rgba(181,18,27,0.5)]"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative h-full w-full"
              >
                <Image src="/brand/emblem.png" alt="M2C emblem" fill sizes="300px" priority className="rounded-full p-4" />
              </motion.div>
            </motion.div>
          </div>
          <MakerToCustomer />
        </motion.div>
      </section>

      {/* What's coming */}
      <section className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-12">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mb-5 text-center text-sm font-semibold uppercase tracking-[0.3em] text-ink/45"
        >
          What&apos;s coming for you
        </motion.p>
        <div className="grid gap-5 md:grid-cols-2">
          <ComingCard tag="For shoppers" title="A super shopping experience" items={shoppers} delay={1.05} />
          <ComingCard tag="For vendors & makers" title="Grow your sales worldwide" items={makers} dark delay={1.2} />
        </div>
      </section>

      <footer className="relative z-10 py-6 text-center text-sm text-ink/45">
        © 2026 M2C Markdowns · The shortest distance between Maker and Consumer
      </footer>
    </main>
  );
}
