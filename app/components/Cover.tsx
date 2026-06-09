"use client";

import { motion } from "framer-motion";
import Badge from "./Badge";
import { profile } from "../data/resume";

export default function Cover() {
  return (
    <section className="relative min-h-screen w-full flex items-center px-6 md:px-16 lg:px-24 py-20">
      {/* Subtle grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--rule) 1px, transparent 1px), linear-gradient(90deg, var(--rule) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-24 w-full max-w-7xl mx-auto items-center">
        {/* LEFT — text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="font-mono text-[11px] tracking-[0.3em] text-ink-2 mb-6">
            ── PORTFOLIO · 2026 ──
          </div>

          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-ink">
            {profile.nameZh}
            <span className="block mt-2 text-3xl md:text-4xl text-ink-2 font-normal">
              {profile.nameEn}
            </span>
          </h1>

          <div className="mt-10 max-w-xl">
            <div className="font-serif text-xl md:text-2xl text-ink leading-relaxed">
              {profile.tagline}
            </div>
            <div className="mt-3 font-mono text-sm text-ink-2 italic">
              {profile.taglineEn}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <Tag label="社会学硕士" sub="香港中文大学" />
            <Tag label="新闻学学士" sub="暨南大学" />
            <Tag label="目前在职" sub="富途 · 深圳" highlight />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-14 flex items-center gap-6 text-sm font-mono text-ink-2"
          >
            <a href="#map" className="group inline-flex items-center gap-2 hover:text-ink transition-colors">
              <span>开始浏览</span>
              <span className="inline-block transition-transform group-hover:translate-y-0.5">↓</span>
            </a>
            <span className="text-rule">|</span>
            <a href={`mailto:${profile.email}`} className="hover:text-ink transition-colors">
              {profile.email}
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT — badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center lg:justify-end"
        >
          <Badge />
        </motion.div>
      </div>

      {/* Bottom corner timestamp */}
      <div className="absolute bottom-6 left-6 md:left-16 font-mono text-[10px] tracking-[0.25em] text-ink-3">
        GUANGZHOU · SHENZHEN · SHANGHAI · HONG KONG
      </div>
    </section>
  );
}

function Tag({ label, sub, highlight }: { label: string; sub: string; highlight?: boolean }) {
  return (
    <div className="flex flex-col">
      <span
        className={`font-serif text-base ${highlight ? "text-vermilion" : "text-ink"}`}
      >
        {label}
      </span>
      <span className="font-mono text-[11px] tracking-wide text-ink-3 mt-0.5">{sub}</span>
    </div>
  );
}
