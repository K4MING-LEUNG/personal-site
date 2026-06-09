"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { internships, schools, type Internship } from "../data/internships";
import "maplibre-gl/dist/maplibre-gl.css";

// Overview camera that comfortably frames Shanghai → HK
const OVERVIEW = { center: [117.5, 26.5] as [number, number], zoom: 4.8, pitch: 35, bearing: -8 };
// Tight bounds around east-coast China — hides Japan/Korea/SE Asia
const CHINA_BOUNDS: [[number, number], [number, number]] = [
  [104, 17], // SW
  [126, 36], // NE
];

// Route in chronological order (oldest → newest internship)
const ROUTE_ORDER = ["tecdo", "publicis", "wondershare", "futu"];

// Quadratic bezier arc between two lng-lat points
function arc(a: [number, number], b: [number, number], n = 64): [number, number][] {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const dist = Math.hypot(dx, dy);
  if (dist === 0) return [a, b];
  const mid: [number, number] = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const perp: [number, number] = [-dy / dist, dx / dist];
  const lift = dist * 0.22;
  const ctrl: [number, number] = [mid[0] + perp[0] * lift, mid[1] + perp[1] * lift];
  const pts: [number, number][] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const u = 1 - t;
    pts.push([
      u * u * a[0] + 2 * u * t * ctrl[0] + t * t * b[0],
      u * u * a[1] + 2 * u * t * ctrl[1] + t * t * b[1],
    ]);
  }
  return pts;
}

export default function InternshipMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("maplibre-gl").Map | null>(null);
  const [selected, setSelected] = useState<Internship | null>(null);
  const [ready, setReady] = useState(false);

  // Init map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    let cancelled = false;
    (async () => {
      const maplibregl = (await import("maplibre-gl")).default;
      if (cancelled || !containerRef.current) return;

      const map = new maplibregl.Map({
        container: containerRef.current,
        style: "https://tiles.openfreemap.org/styles/positron",
        center: OVERVIEW.center,
        zoom: OVERVIEW.zoom,
        pitch: OVERVIEW.pitch,
        bearing: OVERVIEW.bearing,
        attributionControl: { compact: true },
        maxPitch: 70,
        minZoom: 4,
        maxZoom: 14,
        maxBounds: CHINA_BOUNDS,
      });

      map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "top-right");

      map.on("load", () => {
        // Cream paper tint + hide non-China clutter
        applyPaperTint(map);

        // Add dashed flight-route arcs + numbered segment labels
        const midpoints = addRoute(map);
        midpoints.forEach((mp, i) => {
          const el = document.createElement("div");
          el.className = "route-num";
          el.textContent = String(i + 1);
          new maplibregl.Marker({ element: el, anchor: "center" })
            .setLngLat(mp)
            .addTo(map);
        });

        // School pins (subtle, moss color, smaller)
        schools.forEach((s) => {
          const el = document.createElement("div");
          el.className = "school-pin";
          el.innerHTML = `<span class="dot"></span><span class="lbl">${s.name}</span>`;
          new maplibregl.Marker({ element: el, anchor: "bottom" })
            .setLngLat(s.coords)
            .addTo(map);
        });

        // Internship pins (interactive)
        internships.forEach((it, idx) => {
          const el = document.createElement("div");
          el.className = `intern-pin${it.current ? " current" : ""}`;
          el.style.animationDelay = `${idx * 0.4}s`;
          el.innerHTML = `
            <span class="ring"></span>
            <span class="core"></span>
            <span class="lbl">
              ${it.current ? '<em class="cur">CURRENT</em>' : ""}
              <strong>${it.company}</strong>
            </span>
          `;
          el.addEventListener("click", (e) => {
            e.stopPropagation();
            handleSelect(it);
          });
          new maplibregl.Marker({ element: el, anchor: "bottom" })
            .setLngLat(it.coords)
            .addTo(map);
        });

        setReady(true);
      });

      mapRef.current = map;
    })();
    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  function handleSelect(it: Internship) {
    setSelected(it);
    mapRef.current?.flyTo({
      center: it.coords,
      zoom: 12.2,
      pitch: 55,
      bearing: -12,
      duration: 1800,
      essential: true,
    });
  }

  function resetView() {
    setSelected(null);
    mapRef.current?.flyTo({ ...OVERVIEW, duration: 1400, essential: true });
  }

  return (
    <section
      id="map"
      className="relative w-full px-6 md:px-16 lg:px-24 py-24 border-t border-rule"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 flex items-end justify-between flex-wrap gap-4">
          <div>
            <div className="font-mono text-[11px] tracking-[0.3em] text-ink-3 mb-3">
              02 / EXPERIENCE
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-ink">实习地图</h2>
            <p className="mt-3 text-ink-2 max-w-2xl">
              拖拽探索 · 滚轮缩放 · 点击钉子或下方卡片飞越四城。
            </p>
          </div>
          <button
            onClick={resetView}
            className="font-mono text-[11px] tracking-[0.2em] text-ink-2 hover:text-ink border border-rule rounded-full px-4 py-1.5 hover:border-bronze/60 transition-colors"
          >
            ◎ RESET VIEW
          </button>
        </div>

        {/* Map */}
        <div className="relative rounded-xl border border-rule overflow-hidden bg-paper-2">
          <div
            ref={containerRef}
            className="w-full"
            style={{ height: "min(72vh, 640px)" }}
          />

          {/* Loading curtain */}
          {!ready && (
            <div className="absolute inset-0 grid place-items-center bg-paper-2/80 backdrop-blur-sm">
              <div className="font-mono text-[11px] tracking-[0.25em] text-ink-3 animate-pulse">
                LOADING MAP TILES…
              </div>
            </div>
          )}

          {/* Paper grain overlay */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(rgba(31,27,22,0.04) 1px, transparent 1px)",
              backgroundSize: "8px 8px",
            }}
          />

          {/* Stats */}
          <div className="absolute top-4 left-4 bg-paper/90 backdrop-blur border border-rule rounded-md px-3 py-2 text-[11px] font-mono text-ink-2">
            <div>4 CITIES · {internships.length} INTERNSHIPS</div>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 flex items-center gap-4 text-[11px] font-mono text-ink-2 bg-paper/90 backdrop-blur border border-rule rounded-md px-3 py-2">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-vermilion" /> 当前
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-bronze" /> 历史
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-moss/80" /> 学校
            </span>
          </div>
        </div>

        {/* Quick list */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {internships.map((it) => {
            const active = selected?.id === it.id;
            return (
              <button
                key={it.id}
                onClick={() => handleSelect(it)}
                className={`group text-left p-4 rounded-lg border transition-all ${
                  active
                    ? "border-bronze bg-paper shadow-sm"
                    : "border-rule bg-paper-2/50 hover:bg-paper-2 hover:border-bronze/60"
                }`}
              >
                <div className="font-mono text-[10px] tracking-[0.2em] text-ink-3">
                  {it.start} – {it.end}
                </div>
                <div className="mt-1 font-serif text-lg text-ink group-hover:text-bronze-d transition-colors">
                  {it.company}
                </div>
                <div className="text-xs text-ink-2 mt-0.5">
                  {it.role} · {it.city}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Side drawer */}
      <AnimatePresence>
        {selected && <Drawer it={selected} onClose={resetView} />}
      </AnimatePresence>

      {/* Marker styles */}
      <style jsx global>{`
        .maplibregl-canvas { outline: none; }
        .maplibregl-ctrl-attrib { background: rgba(245,241,235,0.8) !important; font-size: 10px; }

        .school-pin { display: flex; flex-direction: column; align-items: center; pointer-events: none; }
        .school-pin .dot { width: 8px; height: 8px; border-radius: 50%; background: #2b4c3f; opacity: 0.7; }
        .school-pin .lbl { font-family: var(--font-serif); font-size: 11px; color: #2b4c3f; margin-top: 2px;
          background: rgba(245,241,235,0.85); padding: 1px 5px; border-radius: 3px; white-space: nowrap; }

        .intern-pin {
          position: relative; width: 22px; height: 22px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
        }
        .intern-pin .core {
          position: relative; z-index: 2; width: 12px; height: 12px; border-radius: 50%;
          background: #c9a961; border: 2px solid #f5f1eb;
          box-shadow: 0 2px 6px rgba(31,27,22,0.25);
        }
        .intern-pin .ring {
          position: absolute; left: 50%; top: 50%; width: 14px; height: 14px;
          margin-left: -7px; margin-top: -7px; border-radius: 50%;
          border: 1.4px solid #c9a961;
          animation: pulse 2.4s ease-out infinite;
        }
        .intern-pin.current .core { background: #b94e3d; }
        .intern-pin.current .ring { border-color: #b94e3d; }
        .intern-pin .lbl {
          position: absolute; left: 50%; bottom: 110%; transform: translateX(-50%);
          font-family: var(--font-serif); font-size: 12px; color: #1f1b16; white-space: nowrap;
          background: rgba(245,241,235,0.92); padding: 2px 7px; border-radius: 4px;
          border: 1px solid rgba(217,210,197,0.9); box-shadow: 0 2px 5px rgba(31,27,22,0.08);
          display: flex; flex-direction: column; align-items: center; gap: 0;
        }
        .intern-pin .lbl strong { font-weight: 600; }
        .intern-pin .lbl .cur {
          font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.2em;
          color: #b94e3d; font-style: normal;
        }
        .intern-pin:hover .core { transform: scale(1.15); transition: transform 0.2s; }

        .route-num {
          width: 20px; height: 20px; border-radius: 50%;
          background: #f5f1eb; border: 1.4px solid #a88940; color: #a88940;
          font-family: var(--font-mono); font-size: 11px; font-weight: 600;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 5px rgba(31,27,22,0.12);
          pointer-events: none;
        }

        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 0.7; }
          100% { transform: scale(2.6); opacity: 0; }
        }
      `}</style>
    </section>
  );
}

function applyPaperTint(map: import("maplibre-gl").Map) {
  const trySet = (id: string, prop: string, value: unknown) => {
    if (map.getLayer(id)) {
      try {
        map.setPaintProperty(id, prop, value as never);
      } catch {}
    }
  };
  const tryLayout = (id: string, prop: string, value: unknown) => {
    if (map.getLayer(id)) {
      try {
        map.setLayoutProperty(id, prop, value as never);
      } catch {}
    }
  };

  // Cream tint
  trySet("background", "background-color", "#f5f1eb");
  trySet("water", "fill-color", "#e8e1d2");
  trySet("park", "fill-color", "#ebe5d6");
  trySet("landcover", "fill-color", "#ede8e0");
  ["road", "road_motorway", "road_trunk", "road_primary"].forEach((id) => {
    trySet(id, "line-color", "#c9a961");
    trySet(id, "line-opacity", 0.35);
  });
  // Reduce all road clutter further (lots of layer name variants)
  map.getStyle().layers?.forEach((layer) => {
    const id = layer.id;
    if (/road|street|highway|tunnel|bridge|transit|rail/i.test(id)) {
      trySet(id, "line-opacity", 0.2);
    }
    // Hide ALL labels — we'll use our own paper-style markers
    if (layer.type === "symbol") {
      tryLayout(id, "visibility", "none");
    }
    // Mute non-China country fills via overall fade
    if (/admin|boundary/i.test(id)) {
      trySet(id, "line-opacity", 0.15);
      trySet(id, "line-color", "#9a9082");
    }
  });
}

function addRoute(map: import("maplibre-gl").Map): [number, number][] {
  // Build chronological route — dedupe consecutive identical coords
  const coordsSeq: [number, number][] = [];
  ROUTE_ORDER.forEach((id) => {
    const it = internships.find((x) => x.id === id);
    if (!it) return;
    const last = coordsSeq[coordsSeq.length - 1];
    if (!last || last[0] !== it.coords[0] || last[1] !== it.coords[1]) {
      coordsSeq.push(it.coords);
    }
  });

  // Build per-segment arcs; capture mid-curve point for numbered labels
  const arcPath: [number, number][] = [];
  const midpoints: [number, number][] = [];
  for (let i = 0; i < coordsSeq.length - 1; i++) {
    const seg = arc(coordsSeq[i], coordsSeq[i + 1], 64);
    midpoints.push(seg[Math.floor(seg.length / 2)]);
    if (i > 0) seg.shift(); // avoid duplicate joint
    arcPath.push(...seg);
  }

  map.addSource("route", {
    type: "geojson",
    data: {
      type: "Feature",
      properties: {},
      geometry: { type: "LineString", coordinates: arcPath },
    },
  });

  // Soft underlay glow
  map.addLayer({
    id: "route-glow",
    type: "line",
    source: "route",
    layout: { "line-cap": "round", "line-join": "round" },
    paint: {
      "line-color": "#c9a961",
      "line-width": 6,
      "line-opacity": 0.18,
      "line-blur": 2,
    },
  });

  // Dashed top line
  map.addLayer({
    id: "route-dash",
    type: "line",
    source: "route",
    layout: { "line-cap": "round", "line-join": "round" },
    paint: {
      "line-color": "#a88940",
      "line-width": 1.6,
      "line-dasharray": [0.4, 2.4],
      "line-opacity": 0.85,
    },
  });

  return midpoints;
}

function Drawer({ it, onClose }: { it: Internship; onClose: () => void }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-ink/30 backdrop-blur-sm z-40"
      />
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 280 }}
        className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-paper z-50 border-l border-rule overflow-y-auto"
      >
        <div className="sticky top-0 bg-paper/95 backdrop-blur border-b border-rule px-6 py-4 flex items-center justify-between">
          <div className="font-mono text-[10px] tracking-[0.25em] text-ink-3">EXPERIENCE</div>
          <button onClick={onClose} className="text-ink-2 hover:text-ink text-xl leading-none" aria-label="关闭">
            ×
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] tracking-[0.2em] text-ink-3">{it.city}</span>
            {it.current && (
              <span className="font-mono text-[10px] tracking-[0.2em] text-vermilion border border-vermilion/40 px-1.5 py-0.5 rounded">
                CURRENT
              </span>
            )}
          </div>
          <h3 className="font-serif text-3xl text-ink mt-2">{it.company}</h3>
          {it.companyEn && (
            <div className="font-mono text-xs text-ink-2 mt-1 tracking-wide">{it.companyEn}</div>
          )}
          <div className="mt-3 text-sm text-ink">
            {it.role}
            {it.team && <span className="text-ink-2"> · {it.team}</span>}
          </div>
          <div className="mt-1 font-mono text-xs text-ink-2">
            {it.start} → {it.end}
          </div>

          {it.highlights.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {it.highlights.map((h, i) => (
                <span key={i} className="text-[11px] px-2 py-1 rounded-full bg-paper-3 text-ink-2 border border-rule">
                  {h}
                </span>
              ))}
            </div>
          )}

          <div className="mt-6 h-px bg-rule" />

          <div className="mt-6 space-y-5">
            {it.bullets.map((b, i) => (
              <div key={i}>
                <div className="font-serif text-base text-ink flex items-center gap-2">
                  <span className="seal text-[10px]">{i + 1}</span>
                  {b.title}
                </div>
                <p className="mt-2 text-sm text-ink-2 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.aside>
    </>
  );
}
