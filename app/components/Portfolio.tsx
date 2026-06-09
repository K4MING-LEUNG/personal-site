"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { categories, works, type WorkCategory } from "../data/portfolio";

export default function Portfolio() {
  const [active, setActive] = useState<WorkCategory>("report");
  const filtered = works.filter((w) => w.category === active);
  const activeIdx = categories.findIndex((c) => c.key === active);
  const activeCat = categories[activeIdx];

  return (
    <section
      id="portfolio"
      className="relative w-full px-6 md:px-16 lg:px-24 py-24 border-t border-rule"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-10">
          <div className="font-mono text-[11px] tracking-[0.3em] text-ink-3 mb-3">
            04 / WORKS · SPECTRUM
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-ink">作品集</h2>
          <p className="mt-3 text-ink-2 max-w-2xl">
            从文字到代码，调谐到任意频段聆听不同形式的创作。
          </p>
        </div>

        {/* Spectrum tuner */}
        <div className="relative bg-paper-2/60 rounded-xl border border-rule p-6 md:p-8 mb-10 overflow-hidden">
          {/* Tuning marks */}
          <div className="relative h-12 mb-3">
            {/* Track */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-ink-3/30" />
            {/* Minor ticks */}
            {Array.from({ length: 60 }).map((_, i) => (
              <span
                key={i}
                className="absolute top-1/2 -translate-y-1/2 w-px bg-ink-3/30"
                style={{ left: `${(i / 59) * 100}%`, height: i % 5 === 0 ? "10px" : "5px" }}
              />
            ))}
            {/* Tuning needle */}
            <motion.div
              animate={{ left: `${(activeIdx / (categories.length - 1)) * 100}%` }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              className="absolute top-0 bottom-0 -translate-x-1/2 flex flex-col items-center"
            >
              <div className="w-0.5 h-full bg-vermilion shadow-[0_0_6px_rgba(185,78,61,0.5)]" />
              <span className="absolute -top-1 w-2 h-2 rotate-45 bg-vermilion" />
            </motion.div>
          </div>

          {/* Category buttons */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-1.5">
            {categories.map((cat) => {
              const isActive = active === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActive(cat.key)}
                  className={`group flex flex-col items-center text-center px-2 py-3 rounded-md transition-all ${
                    isActive
                      ? "bg-paper text-ink shadow-sm border border-rule"
                      : "text-ink-2 hover:text-ink hover:bg-paper/60"
                  }`}
                >
                  <span className="font-mono text-[9px] tracking-[0.2em] text-ink-3">
                    {cat.freq}
                  </span>
                  <span className="font-serif text-[15px] mt-1">{cat.label}</span>
                  <span className="font-mono text-[9px] tracking-wide text-ink-3 mt-0.5 truncate max-w-full">
                    {cat.sub}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Now playing strip */}
          <div className="mt-6 pt-4 border-t border-dashed border-ink-3/30 flex items-center justify-between">
            <div className="font-mono text-[10px] tracking-[0.25em] text-ink-3">
              NOW TUNING ▸ {activeCat.freq}
            </div>
            <div className="font-serif text-sm text-ink">
              {activeCat.label} <span className="text-ink-3 font-mono text-xs ml-2">/ {filtered.length} 件作品</span>
            </div>
          </div>
        </div>

        {/* Works panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, filter: "blur(8px)", y: 8 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(8px)", y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {active === "report" && <ReportView />}
            {active === "film" && <GridView cat="film" />}
            {active === "design" && <GridView cat="design" />}
            {active === "data" && <DataView />}
            {active === "game" && <GameView />}
            {active === "vibe" && <VibeView />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ---------- Report ---------- */
function ReportView() {
  const items = works.filter((w) => w.category === "report");
  return (
    <div className="bg-paper-2/40 rounded-xl border border-rule p-6 md:p-8">
      {/* Newspaper masthead */}
      <div className="text-center border-b-2 border-double border-ink/60 pb-3 mb-6">
        <div className="font-mono text-[10px] tracking-[0.4em] text-ink-2">VOL.I · 2023</div>
        <div className="font-serif text-3xl md:text-4xl text-ink mt-1">深 度 报 道</div>
        <div className="font-mono text-[10px] tracking-[0.3em] text-ink-3 mt-1">SOUTHERN METROPOLIS DAILY</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
        {items.map((w, i) => (
          <a
            key={w.id}
            href={w.url}
            target="_blank"
            rel="noreferrer"
            className="group block border-b border-dotted border-ink-3/40 pb-5"
          >
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] text-ink-3 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-lg md:text-xl text-ink leading-snug group-hover:text-bronze-d transition-colors">
                {w.title}
              </h3>
            </div>
            <div className="mt-1.5 ml-8 font-mono text-[11px] text-ink-2 flex items-center gap-2">
              {w.meta}
              <span className="text-bronze opacity-0 group-hover:opacity-100 transition-opacity">→ 阅读原文</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ---------- Film & Design (shared grid) ---------- */
function GridView({ cat }: { cat: WorkCategory }) {
  const items = works.filter((w) => w.category === cat);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((w) => (
        <WorkCard key={w.id} title={w.title} meta={w.meta} note={w.note} url={w.url} flavor={w.category} />
      ))}
    </div>
  );
}

function WorkCard({
  title,
  meta,
  note,
  url,
  flavor,
}: {
  title: string;
  meta?: string;
  note?: string;
  url?: string;
  flavor?: WorkCategory;
}) {
  const Comp = url ? "a" : "div";
  return (
    <Comp
      {...(url ? { href: url, target: "_blank", rel: "noreferrer" } : {})}
      className="group block bg-paper-2/60 rounded-lg border border-rule overflow-hidden hover:border-bronze/60 transition-all"
    >
      {/* Visual placeholder */}
      <div
        className={`aspect-[16/10] relative overflow-hidden ${
          flavor === "film" ? "bg-ink/90" : "bg-paper-3"
        }`}
      >
        {flavor === "film" ? (
          <>
            {/* Film strip */}
            <div className="absolute inset-y-0 left-0 w-3 bg-paper flex flex-col justify-around py-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="w-1.5 h-1.5 mx-auto bg-ink rounded-sm" />
              ))}
            </div>
            <div className="absolute inset-y-0 right-0 w-3 bg-paper flex flex-col justify-around py-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="w-1.5 h-1.5 mx-auto bg-ink rounded-sm" />
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center text-paper-3 font-serif text-2xl opacity-50">
              ▶
            </div>
          </>
        ) : (
          <>
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, transparent 0 6px, rgba(31,27,22,0.06) 6px 7px)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center font-serif text-3xl text-ink-3 opacity-40">
              ✦
            </div>
          </>
        )}
      </div>
      <div className="p-4">
        <div className="font-serif text-base text-ink group-hover:text-bronze-d transition-colors">{title}</div>
        {meta && <div className="mt-1 font-mono text-[11px] text-ink-2">{meta}</div>}
        {note && <div className="mt-2 text-xs text-ink-2 italic">{note}</div>}
      </div>
    </Comp>
  );
}

/* ---------- Data ---------- */
function DataView() {
  const items = works.filter((w) => w.category === "data");
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {items.map((w) => (
        <a
          key={w.id}
          href={w.url}
          target="_blank"
          rel="noreferrer"
          className="group block bg-paper-2/60 rounded-xl border border-rule p-6 hover:border-bronze/60 transition-all"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="font-mono text-[10px] tracking-[0.25em] text-ink-3">DATA · POWER BI</div>
              <h3 className="mt-2 font-serif text-2xl text-ink group-hover:text-bronze-d transition-colors">
                {w.title}
              </h3>
              {w.meta && <div className="mt-1 font-mono text-[11px] text-ink-2">{w.meta}</div>}
            </div>
            <span className="seal">数</span>
          </div>
          {/* Mock bars */}
          <div className="mt-6 grid grid-cols-12 gap-1 items-end h-24">
            {[40, 65, 30, 80, 55, 90, 45, 70, 60, 85, 35, 75].map((h, i) => (
              <div
                key={i}
                className="bg-bronze/70 group-hover:bg-bronze transition-colors rounded-sm"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          {w.note && <div className="mt-4 text-xs text-ink-2 italic">{w.note}</div>}
          <div className="mt-3 font-mono text-[11px] text-bronze-d opacity-0 group-hover:opacity-100 transition-opacity">
            VIEW REPORT →
          </div>
        </a>
      ))}
    </div>
  );
}

/* ---------- Game ---------- */
function GameView() {
  const game = works.find((w) => w.category === "game");
  if (!game) return null;
  return (
    <div className="bg-paper-2/40 rounded-xl border border-rule p-6 md:p-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-serif text-2xl text-ink">{game.title}</h3>
          {game.meta && <div className="font-mono text-[11px] text-ink-2 mt-1">{game.meta}</div>}
        </div>
        <a
          href={game.embed}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[11px] tracking-wider text-bronze-d hover:text-vermilion transition-colors"
        >
          OPEN FULLSCREEN →
        </a>
      </div>
      <div className="rounded-lg overflow-hidden border border-rule bg-ink shadow-inner">
        <iframe
          src={game.embed}
          title={game.title}
          className="w-full"
          style={{ height: "640px", border: 0 }}
        />
      </div>
      {game.note && (
        <div className="mt-4 text-sm text-ink-2 italic max-w-2xl">{game.note}</div>
      )}
    </div>
  );
}

/* ---------- Vibe ---------- */
function VibeView() {
  const vibe = works.find((w) => w.category === "vibe");
  if (!vibe) return null;
  return (
    <div className="bg-ink text-paper rounded-xl border border-rule p-8 md:p-12 font-mono">
      <div className="flex items-center gap-2 mb-6">
        <span className="w-3 h-3 rounded-full bg-vermilion/80" />
        <span className="w-3 h-3 rounded-full bg-bronze/80" />
        <span className="w-3 h-3 rounded-full bg-moss" />
        <span className="ml-3 text-[10px] tracking-[0.25em] text-paper-3">~/leungkaming.dev</span>
      </div>
      <div className="space-y-2 text-sm leading-relaxed">
        <div><span className="text-bronze">$</span> whoami</div>
        <div className="text-paper-3 pl-4">梁家铭 / Leung Ka Ming · sociology × journalism</div>
        <div className="mt-3"><span className="text-bronze">$</span> cat ./about-this-site.md</div>
        <div className="text-paper-3 pl-4">
          {vibe.title} · {vibe.meta}
        </div>
        <div className="text-paper-3 pl-4 max-w-2xl">{vibe.note}</div>
        <div className="mt-3"><span className="text-bronze">$</span> ls ./tech-stack/</div>
        <div className="text-paper-3 pl-4 grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-1">
          <span>next@16</span>
          <span>tailwind@4</span>
          <span>framer-motion@12</span>
          <span>react@19</span>
          <span>typescript@5</span>
          <span>ai-pair-coding</span>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-bronze">$</span>
          <span className="inline-block w-2 h-4 bg-paper animate-pulse" />
        </div>
      </div>
    </div>
  );
}
