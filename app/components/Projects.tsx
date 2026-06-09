"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "../data/projects";

// Convert "2023.10" → fractional year
function toFloat(ym: string) {
  const [y, m] = ym.split(".").map(Number);
  return y + (m - 1) / 12;
}

// Compute Gantt range
const allMonths = projects.flatMap((p) => [toFloat(p.start), toFloat(p.end)]);
const minT = Math.min(...allMonths);
const maxT = Math.max(...allMonths);
const span = maxT - minT;

// Tick marks for the timeline
const ticks = [
  { label: "2023.03", t: toFloat("2023.03") },
  { label: "2023.07", t: toFloat("2023.07") },
  { label: "2024.01", t: toFloat("2024.01") },
  { label: "2024.06", t: toFloat("2024.06") },
];

export default function Projects() {
  const [active, setActive] = useState<string>(projects[0].id);
  const activeProject = projects.find((p) => p.id === active)!;

  return (
    <section
      id="projects"
      className="relative w-full px-6 md:px-16 lg:px-24 py-24 border-t border-rule"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-12">
          <div className="font-mono text-[11px] tracking-[0.3em] text-ink-3 mb-3">
            03 / RESEARCH & PROJECTS
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-ink">研究与项目</h2>
          <p className="mt-3 text-ink-2 max-w-2xl">
            学术研究与跨学科实践，从结构方程模型到国家级双创项目。
          </p>
        </div>

        {/* Gantt-style timeline */}
        <div className="relative bg-paper-2/50 rounded-xl border border-rule p-6 md:p-10 mb-10">
          {/* Tick marks */}
          <div className="relative h-6 mb-2">
            {ticks.map((tk) => {
              const left = ((tk.t - minT) / span) * 100;
              return (
                <div
                  key={tk.label}
                  className="absolute -translate-x-1/2 font-mono text-[10px] tracking-wider text-ink-3"
                  style={{ left: `${left}%` }}
                >
                  {tk.label}
                </div>
              );
            })}
          </div>

          {/* Stitched baseline */}
          <div className="relative h-px w-full">
            <div
              className="absolute inset-0 border-t border-dashed border-ink-3/40"
              style={{ borderTopWidth: "1px" }}
            />
            {ticks.map((tk) => {
              const left = ((tk.t - minT) / span) * 100;
              return (
                <span
                  key={tk.label}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-ink-3/60"
                  style={{ left: `${left}%` }}
                />
              );
            })}
          </div>

          {/* Project bars */}
          <div className="mt-8 space-y-7">
            {projects.map((p, i) => {
              const left = ((toFloat(p.start) - minT) / span) * 100;
              const width = ((toFloat(p.end) - toFloat(p.start)) / span) * 100;
              const isActive = active === p.id;
              return (
                <div key={p.id} className="relative">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="seal text-[10px]">{i + 1}</span>
                    <button
                      onClick={() => setActive(p.id)}
                      className={`font-serif text-base md:text-lg text-left transition-colors ${
                        isActive ? "text-ink" : "text-ink-2 hover:text-ink"
                      }`}
                    >
                      {p.title}
                    </button>
                  </div>
                  <div className="relative h-6">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${width}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                      onClick={() => setActive(p.id)}
                      className={`absolute h-full rounded-full cursor-pointer transition-all ${
                        isActive
                          ? "bg-bronze/85 shadow-[0_0_0_3px_rgba(201,169,97,0.18)]"
                          : "bg-bronze/40 hover:bg-bronze/60"
                      }`}
                      style={{ left: `${left}%` }}
                    >
                      {/* End-cap dots */}
                      <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-paper border-2 border-bronze-d" />
                      <span className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-paper border-2 border-bronze-d" />
                    </motion.div>
                  </div>
                  <div className="mt-1 font-mono text-[10px] text-ink-3">
                    {p.start} – {p.end}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Hint */}
          <div className="mt-6 font-mono text-[10px] tracking-[0.2em] text-ink-3 text-right">
            CLICK TO EXPAND ↓
          </div>
        </div>

        {/* Detail panel */}
        <motion.div
          key={activeProject.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 bg-paper-2/40 rounded-xl border border-rule p-6 md:p-10"
        >
          {/* Left: title + meta */}
          <div>
            <div className="font-mono text-[10px] tracking-[0.25em] text-ink-3">
              {activeProject.start} → {activeProject.end}
            </div>
            <h3 className="mt-2 font-serif text-2xl md:text-3xl text-ink leading-tight">
              {activeProject.title}
            </h3>
            {activeProject.subtitle && (
              <div className="mt-2 font-serif text-base text-ink-2 italic">
                {activeProject.subtitle}
              </div>
            )}
            <div className="mt-5 flex flex-wrap gap-2">
              {activeProject.tags.map((t) => (
                <span
                  key={t}
                  className="text-[11px] px-2.5 py-1 rounded-full border border-rule bg-paper text-ink-2"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right: bullets */}
          <div className="space-y-6">
            {activeProject.body.map((b, i) => (
              <div key={i} className="relative pl-6">
                <span className="absolute left-0 top-2 w-2 h-2 rounded-full bg-vermilion/80" />
                <span
                  aria-hidden
                  className="absolute left-[3px] top-5 bottom-0 w-px border-l border-dashed border-ink-3/30"
                />
                <h4 className="font-serif text-lg text-ink">{b.title}</h4>
                <p className="mt-2 text-sm text-ink-2 leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
