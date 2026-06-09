"use client";

import { motion } from "framer-motion";
import { awards, skills } from "../data/meta";

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative w-full px-6 md:px-16 lg:px-24 py-24 border-t border-rule"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-12">
          <div className="font-mono text-[11px] tracking-[0.3em] text-ink-3 mb-3">
            05 / SKILLS & AWARDS
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-ink">技能与荣誉</h2>
          <p className="mt-3 text-ink-2 max-w-2xl">
            工具与认可，是过程留下的两种痕迹。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10">
          {/* Skills */}
          <div className="bg-paper-2/40 rounded-xl border border-rule p-6 md:p-8">
            <div className="font-mono text-[10px] tracking-[0.25em] text-ink-3 mb-5">TOOLBOX</div>
            <div className="space-y-8">
              {skills.map((g) => (
                <div key={g.group}>
                  <div className="font-serif text-lg text-ink mb-3 flex items-center gap-2">
                    <span className="seal text-[10px]">{g.group[0]}</span>
                    {g.group}
                  </div>
                  <div className="space-y-2.5">
                    {g.items.map((s, i) => (
                      <div key={s.name} className="grid grid-cols-[1fr_auto] gap-4 items-center">
                        <div className="text-sm text-ink">{s.name}</div>
                        <div className="flex items-center gap-1.5">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <motion.span
                              key={idx}
                              initial={{ scale: 0, opacity: 0 }}
                              whileInView={{ scale: 1, opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.05 + idx * 0.05, duration: 0.3 }}
                              className={`w-2 h-2 rounded-full ${
                                idx < s.level ? "bg-bronze" : "bg-rule"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Awards */}
          <div className="bg-paper-2/40 rounded-xl border border-rule p-6 md:p-8">
            <div className="font-mono text-[10px] tracking-[0.25em] text-ink-3 mb-5">RECOGNITION</div>
            <div className="relative pl-5">
              {/* Vertical stitched line */}
              <div className="absolute left-1.5 top-2 bottom-2 border-l border-dashed border-ink-3/40" />
              <div className="space-y-5">
                {awards.map((a, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className="relative"
                  >
                    <span className="absolute -left-[18px] top-1.5 w-2.5 h-2.5 rounded-full bg-vermilion/85 ring-2 ring-paper" />
                    <div className="font-mono text-[10px] tracking-[0.2em] text-ink-3">{a.year}</div>
                    <div className="font-serif text-base text-ink leading-snug">{a.title}</div>
                    <div className="font-mono text-[11px] text-ink-2 mt-0.5">{a.org}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
