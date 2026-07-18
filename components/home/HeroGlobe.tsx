'use client';

/**
 * HeroGlobe — sıfır dependency, native Canvas 2D + 3D projeksiyon
 *
 * Three.js / WebGL eklenmedi. Küre, orbit ve network nokta efekti tamamen
 * matematik + Canvas 2D ile üretiliyor. Bundle etkisi: 0 KB.
 *
 * Teknik yaklaşım:
 * - Lat/lon noktaları 3D küre koordinatına, sonra ekrana projeksiyon
 * - Rotasyon tek yavaş eksen üzerinde (Y rotasyonu, saniyede ~8°)
 * - Amazon, Etsy, Shopify, eBay floating label'ları
 * - Mobil (md altı, prefers-reduced-motion): bileşen render edilmez
 */

import { useEffect, useRef } from 'react';

// ───────────────────────────── sabitler ─────────────────────────────
const RADIUS = 160;
const DPR_CAP = 1.5;          // cihaz piksel oranı üst sınırı
const ROT_SPEED = 0.00012;    // rad/ms — çok yavaş, premium
const DOT_COUNT = 280;        // küre üzerindeki ağ noktaları
const LATITUDE_LINES = 6;
const LONGITUDE_LINES = 9;

// Pazaryeri label'ları — lat/lon (derece)
const LABELS = [
  { name: 'AMAZON',  lat:  35, lon:  -95, color: 'rgba(255,165,60,0.95)'  },
  { name: 'ETSY',    lat:  51, lon:   10, color: 'rgba(243,102,44,0.90)'  },
  { name: 'SHOPIFY', lat:  43, lon: -100, color: 'rgba(150,230,150,0.90)' },
  { name: 'eBay',    lat:  37, lon: -122, color: 'rgba(140,180,255,0.90)' },
];

// ─────────────────────── matematik yardımcıları ──────────────────────
function toRad(d: number) { return (d * Math.PI) / 180; }

/** lat/lon + rotasyon açısı → ekran [x, y, z] */
function project(lat: number, lon: number, rotY: number, cx: number, cy: number) {
  const phi   = toRad(90 - lat);
  const theta = toRad(lon) + rotY;
  const x3 =  Math.sin(phi) * Math.cos(theta) * RADIUS;
  const y3 = -Math.cos(phi)                   * RADIUS;
  const z3 =  Math.sin(phi) * Math.sin(theta) * RADIUS;
  return { x: cx + x3, y: cy + y3, z: z3 };
}

// Fibonacci spiral ile eşit dağılımlı küre noktaları üret
function fibonacciDots(n: number) {
  const pts: { lat: number; lon: number }[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y   = 1 - (i / (n - 1)) * 2;
    const th  = golden * i;
    pts.push({ lat: Math.asin(y) * (180 / Math.PI), lon: (th * 180) / Math.PI });
  }
  return pts;
}

const DOTS = fibonacciDots(DOT_COUNT);

// ─────────────────────────── component ───────────────────────────────
export default function HeroGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const rotRef    = useRef<number>(0.4);  // başlangıç rotasyonu

  useEffect(() => {
    const canvas  = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas boyutunu parent'a göre ayarla
    function resize() {
      const parent = canvas!.parentElement!;
      const dpr    = Math.min(window.devicePixelRatio || 1, DPR_CAP);
      const w = parent.offsetWidth;
      const h = parent.offsetHeight;
      canvas!.width  = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width  = w + 'px';
      canvas!.style.height = h + 'px';
      ctx!.scale(dpr, dpr);
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    let last = performance.now();

    function draw(now: number) {
      const dt = now - last;
      last = now;
      rotRef.current += ROT_SPEED * dt;

      const W   = canvas!.offsetWidth;
      const H   = canvas!.offsetHeight;
      const cx  = W * 0.5;
      const cy  = H * 0.5;
      const rot = rotRef.current;

      ctx!.clearRect(0, 0, W, H);

      // ── 1. Küre dış halesi (soft glow) ───────────────────────────
      const halo = ctx!.createRadialGradient(cx, cy, RADIUS * 0.6, cx, cy, RADIUS * 1.25);
      halo.addColorStop(0,   'rgba(59,130,246,0.10)');
      halo.addColorStop(0.6, 'rgba(59,130,246,0.05)');
      halo.addColorStop(1,   'rgba(59,130,246,0)');
      ctx!.fillStyle = halo;
      ctx!.beginPath();
      ctx!.arc(cx, cy, RADIUS * 1.25, 0, Math.PI * 2);
      ctx!.fill();

      // ── 2. Küre yüzeyi ───────────────────────────────────────────
      const sphereGrad = ctx!.createRadialGradient(cx - 40, cy - 40, 0, cx, cy, RADIUS);
      sphereGrad.addColorStop(0,   'rgba(30,60,120,0.22)');
      sphereGrad.addColorStop(0.7, 'rgba(10,25,60,0.30)');
      sphereGrad.addColorStop(1,   'rgba(5,10,30,0.45)');
      ctx!.fillStyle = sphereGrad;
      ctx!.beginPath();
      ctx!.arc(cx, cy, RADIUS, 0, Math.PI * 2);
      ctx!.fill();

      // ── 3. Enlem çizgileri ───────────────────────────────────────
      for (let li = 1; li < LATITUDE_LINES; li++) {
        const lat = -90 + (180 / LATITUDE_LINES) * li;
        const phi = toRad(90 - lat);
        const r2d = Math.sin(phi) * RADIUS;
        const yy  = cy - Math.cos(phi) * RADIUS;
        // Ön/arka z kontrolü: yy > cy → arka yarım daha az belirgin
        const alpha = lat >= 0 ? 0.18 : 0.12;
        ctx!.beginPath();
        ctx!.ellipse(cx, yy, r2d, r2d * 0.18, 0, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(100,160,255,${alpha})`;
        ctx!.lineWidth = 0.6;
        ctx!.stroke();
      }

      // ── 4. Boylam yay çizgileri ───────────────────────────────────
      for (let li = 0; li < LONGITUDE_LINES; li++) {
        const lon  = (360 / LONGITUDE_LINES) * li;
        const pts: { x: number; y: number; z: number }[] = [];
        for (let step = 0; step <= 36; step++) {
          const lat = -90 + (180 / 36) * step;
          pts.push(project(lat, lon, rot, cx, cy));
        }
        ctx!.beginPath();
        pts.forEach((p, i) => {
          const alpha = Math.max(0, (p.z / RADIUS) * 0.20 + 0.06);
          if (i === 0) { ctx!.moveTo(p.x, p.y); return; }
          ctx!.strokeStyle = `rgba(100,160,255,${alpha.toFixed(2)})`;
          ctx!.lineWidth = 0.55;
          ctx!.lineTo(p.x, p.y);
          ctx!.stroke();
          ctx!.beginPath();
          ctx!.moveTo(p.x, p.y);
        });
      }

      // ── 5. Network noktaları ─────────────────────────────────────
      for (const dot of DOTS) {
        const p = project(dot.lat, dot.lon, rot, cx, cy);
        if (p.z < -RADIUS * 0.1) continue;   // arka yarıyı kırp
        const vis = (p.z / RADIUS) * 0.5 + 0.15;
        const r   = vis * 1.8 + 0.3;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(150,200,255,${(vis * 0.9).toFixed(2)})`;
        ctx!.fill();
      }

      // ── 6. Orbital halka (eğik) ───────────────────────────────────
      ctx!.save();
      ctx!.translate(cx, cy);
      ctx!.rotate(-0.38);
      ctx!.beginPath();
      ctx!.ellipse(0, 0, RADIUS * 1.30, RADIUS * 0.26, 0, 0, Math.PI * 2);
      const orbitGrad = ctx!.createConicGradient(0, 0, 0);
      orbitGrad.addColorStop(0,    'rgba(100,180,255,0.0)');
      orbitGrad.addColorStop(0.25, 'rgba(100,180,255,0.18)');
      orbitGrad.addColorStop(0.5,  'rgba(100,180,255,0.0)');
      orbitGrad.addColorStop(0.75, 'rgba(180,140,255,0.12)');
      orbitGrad.addColorStop(1,    'rgba(100,180,255,0.0)');
      ctx!.strokeStyle = orbitGrad;
      ctx!.lineWidth = 1.0;
      ctx!.stroke();
      ctx!.restore();

      // ── 7. Pazaryeri label'ları ───────────────────────────────────
      for (const lbl of LABELS) {
        const p = project(lbl.lat, lbl.lon, rot, cx, cy);
        if (p.z < 10) continue;   // arka yüzde gösterme
        const vis  = (p.z / RADIUS);
        const pad  = 6;
        const fSize = 9 + vis * 2;
        ctx!.font = `700 ${fSize.toFixed(1)}px 'Geist', system-ui, sans-serif`;
        const tw   = ctx!.measureText(lbl.name).width;
        const bw   = tw + pad * 2;
        const bh   = fSize + pad * 1.6;
        const bx   = p.x - bw / 2;
        const by   = p.y - bh / 2;

        // Kapsül arka plan
        ctx!.beginPath();
        ctx!.roundRect(bx, by, bw, bh, 5);
        ctx!.fillStyle   = `rgba(6,16,35,${(vis * 0.78).toFixed(2)})`;
        ctx!.strokeStyle = `rgba(100,160,255,${(vis * 0.35).toFixed(2)})`;
        ctx!.lineWidth   = 0.8;
        ctx!.fill();
        ctx!.stroke();

        // Label metni
        ctx!.fillStyle   = lbl.color.replace(')', `,${(vis * 0.92).toFixed(2)})`).replace('rgba(', 'rgba(');
        ctx!.textAlign   = 'center';
        ctx!.textBaseline = 'middle';
        ctx!.fillText(lbl.name, p.x, p.y);
      }

      // ── 8. Küre kenar parlaklığı ──────────────────────────────────
      const edgeGrad = ctx!.createRadialGradient(cx, cy, RADIUS * 0.70, cx, cy, RADIUS * 1.0);
      edgeGrad.addColorStop(0, 'rgba(59,130,246,0)');
      edgeGrad.addColorStop(1, 'rgba(59,130,246,0.12)');
      ctx!.fillStyle = edgeGrad;
      ctx!.beginPath();
      ctx!.arc(cx, cy, RADIUS, 0, Math.PI * 2);
      ctx!.fill();

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}