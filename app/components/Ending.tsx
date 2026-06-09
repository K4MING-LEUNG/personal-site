"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "../data/resume";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

export default function Ending() {
  const [easter, setEaster] = useState(false);

  useEffect(() => {
    let buffer: string[] = [];
    function onKey(e: KeyboardEvent) {
      buffer = [...buffer, e.key].slice(-KONAMI.length);
      if (buffer.join(",").toLowerCase() === KONAMI.join(",").toLowerCase()) {
        setEaster(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Generate falling characters
  const cols = 28;
  const characters = "梁家铭社新闻闻学社会方法工具创造价值";

  return (
    <section
      id="end"
      className="relative w-full px-6 md:px-16 lg:px-24 py-32 border-t border-rule overflow-hidden"
    >
      {/* Falling characters background */}
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-50">
        {Array.from({ length: cols }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: "120%", opacity: [0, 0.4, 0] }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{
              duration: 4 + (i % 5),
              delay: (i % 9) * 0.2,
              ease: "linear",
            }}
            className="absolute top-0 font-serif text-ink-3"
            style={{ left: `${(i / cols) * 100}%`, fontSize: `${12 + (i % 4) * 3}px` }}
          >
            {characters[i % characters.length]}
          </motion.div>
        ))}
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Big serif thanks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="font-mono text-[11px] tracking-[0.3em] text-ink-3 mb-6">
            06 / END
          </div>
          <h2 className="font-serif text-5xl md:text-7xl text-ink leading-none">
            谢 幕
          </h2>
          <div className="mt-3 font-mono text-sm tracking-[0.3em] text-ink-2">
            THANKS · FOR · WATCHING
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-12 max-w-xl mx-auto font-serif text-base md:text-lg text-ink-2 leading-loose"
        >
          如果这些片段让你感到有趣，
          <br />
          或者你也在做相关的事情，
          <br />
          欢迎随时联系。
        </motion.p>

        {/* Contact card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-14 inline-grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 text-left bg-paper-2/60 border border-rule rounded-xl px-8 py-6"
        >
          <ContactRow label="EMAIL" value={profile.email} href={`mailto:${profile.email}`} />
          <ContactRow label="WECHAT" value={profile.wechat} />
          <ContactRow label="LINKEDIN" value={profile.linkedin} href={`https://${profile.linkedin}`} />
          <ContactRow label="PHONE · CN" value={profile.phoneCN} />
          <ContactRow label="PHONE · HK" value={profile.phoneHK} />
        </motion.div>

        {/* Easter egg hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-16 font-mono text-[10px] tracking-[0.25em] text-ink-3"
        >
          ↑ ↑ ↓ ↓ ← → ← → B A
        </motion.div>

        {/* Footer */}
        <div className="mt-20 pt-6 border-t border-dashed border-ink-3/30 flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] font-mono text-ink-3">
          <span>© 2026 LEUNG KA MING · 梁家铭</span>
          <span>BUILT WITH NEXT.JS · TAILWIND · FRAMER MOTION · ☕</span>
        </div>
      </div>

      {/* Konami easter egg overlay */}
      {easter && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-ink/90 backdrop-blur-md cursor-pointer"
          onClick={() => setEaster(false)}
        >
          <div className="text-center">
            <div className="font-serif text-paper text-6xl md:text-8xl">铭</div>
            <div className="mt-6 font-mono text-paper-3 text-xs tracking-[0.3em]">
              YOU FOUND THE SEAL
            </div>
            <div className="mt-2 font-serif text-paper-3 text-base">
              感谢你的好奇心
            </div>
            <div className="mt-8 font-mono text-paper-3/60 text-[10px] tracking-widest">
              click anywhere to dismiss
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}

function ContactRow({ label, value, href }: { label: string; value: string; href?: string }) {
  const Comp = href ? "a" : "div";
  return (
    <Comp
      {...(href ? { href, target: href.startsWith("http") ? "_blank" : undefined, rel: "noreferrer" } : {})}
      className="group block"
    >
      <div className="font-mono text-[10px] tracking-[0.25em] text-ink-3">{label}</div>
      <div className="font-serif text-base text-ink group-hover:text-bronze-d transition-colors">
        {value}
      </div>
    </Comp>
  );
}
