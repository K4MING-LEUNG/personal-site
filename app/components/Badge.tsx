"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { profile } from "../data/resume";

export default function Badge() {
  const ref = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 120, damping: 15 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 120, damping: 15 });
  const swing = useSpring(useTransform(mx, [-0.5, 0.5], [-3, 3]), { stiffness: 80, damping: 12 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div className="relative flex flex-col items-center select-none" style={{ perspective: 1400 }}>
      <div className="w-1.5 h-3 bg-ink-2/70 rounded-b-sm" />

      <motion.div
        style={{ rotate: swing, transformOrigin: "top center" }}
        className="relative flex flex-col items-center"
      >
        <div className="w-2.5 h-32 bg-gradient-to-b from-bronze-d/80 to-bronze/70 rounded-sm shadow-[inset_0_0_2px_rgba(0,0,0,0.2)]" />
        <div className="w-3 h-3 -mt-1 rounded-full bg-paper-3 ring-2 ring-bronze-d/70" />

        <motion.div
          ref={ref}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          onClick={() => setFlipped((f) => !f)}
          style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
          className="mt-1 w-[280px] h-[460px] cursor-pointer"
        >
          <motion.div
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative w-full h-full"
          >
            {/* FRONT */}
            <div
              className="absolute inset-0 rounded-2xl bg-paper-2 border border-rule shadow-[0_30px_60px_-20px_rgba(31,27,22,0.25),0_8px_16px_-8px_rgba(31,27,22,0.15)] overflow-hidden flex flex-col"
              style={{ backfaceVisibility: "hidden" }}
            >
              <div className="h-2 shrink-0 bg-gradient-to-r from-bronze-d via-bronze to-bronze-d" />

              {/* Header row */}
              <div className="px-5 pt-3 pb-2 flex items-center justify-between shrink-0">
                <div className="text-[10px] font-mono tracking-[0.2em] text-ink-2">CUHK · JNU</div>
                <div className="seal">铭</div>
              </div>

              {/* Photo — square */}
              <div className="mx-5 aspect-square rounded-md bg-paper-3 border border-rule overflow-hidden relative shrink-0">
                <div className="absolute inset-0 flex items-center justify-center text-ink-3 text-xs font-mono">
                  PHOTO · 工牌正面
                </div>
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(31,27,22,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(31,27,22,0.06) 1px, transparent 1px)",
                    backgroundSize: "16px 16px",
                  }}
                />
              </div>

              {/* Name section */}
              <div className="px-5 pt-3 flex-1 min-h-0 flex flex-col justify-center">
                <div className="font-serif text-[24px] leading-none text-ink">{profile.nameZh}</div>
                <div className="font-mono text-[10px] tracking-[0.18em] text-ink-2 mt-1.5">
                  {profile.nameEn.toUpperCase()}
                </div>
                <div className="mt-2 h-px bg-rule" />
                <div className="mt-1.5 text-[10.5px] text-ink-2 leading-snug">
                  社会学硕士（在读） · 新闻学学士
                </div>
              </div>

              {/* Bottom bar */}
              <div className="px-5 pb-3 flex items-end justify-between shrink-0">
                <div className="flex items-end gap-[2px] h-4">
                  {Array.from({ length: 22 }).map((_, i) => (
                    <span
                      key={i}
                      className="w-[2px] bg-ink/80"
                      style={{ height: `${30 + ((i * 73) % 70)}%` }}
                    />
                  ))}
                </div>
                <div className="font-mono text-[9px] text-ink-3">No. 2026-LKM</div>
              </div>
            </div>

            {/* BACK */}
            <div
              className="absolute inset-0 rounded-2xl bg-paper-2 border border-rule shadow-[0_30px_60px_-20px_rgba(31,27,22,0.25)] overflow-hidden flex flex-col"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              <div className="h-2 shrink-0 bg-gradient-to-r from-moss/80 via-moss to-moss/80" />
              <div className="p-5 flex-1 flex flex-col">
                <div className="font-mono text-[10px] tracking-[0.2em] text-ink-2">SCAN TO CONNECT</div>
                <div className="mt-4 mx-auto w-44 h-44 rounded-md bg-paper-3 border border-rule grid place-items-center text-ink-3 text-[11px] font-mono shrink-0">
                  WeChat QR · 占位
                </div>
                <div className="mt-4 text-center font-serif text-[13px] text-ink leading-relaxed px-2">
                  &ldquo;{profile.tagline}&rdquo;
                </div>
                <div className="mt-auto text-center font-mono text-[10px] text-ink-2 leading-5">
                  {profile.email}
                  <br />
                  {profile.linkedin}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="mt-5 font-mono text-[10px] tracking-[0.2em] text-ink-3">
        CLICK TO FLIP · MOVE TO TILT
      </div>
    </div>
  );
}
