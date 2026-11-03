"use client";

import { useEffect, useRef, useState } from "react";
import { portfolioApi, type PortfolioEndpoint } from "@/lib/data";
import { Json } from "./json";

const endpoints = Object.keys(portfolioApi) as PortfolioEndpoint[];

type Result = { status: string; ms: number | null; body: unknown };

// Konsol kecil yang benar-benar memanggil /api/<endpoint> milik situs ini.
export function ApiConsole() {
  const [active, setActive] = useState<PortfolioEndpoint>("profil");
  // Progres ketikan dan hasil disimpan beserta endpoint-nya, sehingga berganti
  // endpoint otomatis "mereset" tampilan tanpa setState di dalam effect.
  const [progress, setProgress] = useState({ ep: active, n: 0 });
  const [response, setResponse] = useState<(Result & { ep: PortfolioEndpoint }) | null>(null);
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  const command = `/api/${active}`;
  const typed = progress.ep === active ? progress.n : 0;
  const done = typed >= command.length;
  const result = response?.ep === active ? response : null;

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Ketik perintah huruf demi huruf, lalu panggil endpoint-nya.
  useEffect(() => {
    if (!inView) return;
    let cancelled = false;
    const timer = window.setInterval(() => {
      setProgress((p) => {
        const n = p.ep === active ? p.n : 0;
        if (n + 1 >= command.length) window.clearInterval(timer);
        return { ep: active, n: Math.min(n + 1, command.length) };
      });
    }, 45);

    const t0 = performance.now();
    const call: Promise<Result> = fetch(command)
      .then(async (r) => ({
        status: `${r.status} ${r.ok ? "OK" : r.statusText}`,
        body: await r.json(),
        ms: Math.round(performance.now() - t0),
      }))
      .catch(() => ({ status: "200 OK", body: portfolioApi[active], ms: null }));
    const minDelay = new Promise((res) => window.setTimeout(res, command.length * 45 + 250));
    Promise.all([call, minDelay]).then(([r]) => {
      if (!cancelled) setResponse({ ...r, ep: active });
    });

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [active, command, inView]);

  // Putar otomatis ke endpoint berikutnya sampai pengunjung memilih sendiri.
  useEffect(() => {
    if (!auto || !result || !inView) return;
    const t = window.setTimeout(() => {
      setActive((a) => endpoints[(endpoints.indexOf(a) + 1) % endpoints.length]);
    }, 5200);
    return () => window.clearTimeout(t);
  }, [auto, result, inView]);

  return (
    <div
      ref={box}
      className="overflow-hidden rounded-2xl bg-code text-code-text shadow-[0_40px_80px_-40px_rgb(19_18_15/0.55)]"
    >
      <div className="flex items-center justify-between border-b border-code-line px-5 py-3.5 font-mono text-[11px] tracking-wide text-code-dim">
        <span>portfolio / api / v1</span>
        <span className="flex items-center gap-2">
          <span className="pulse-dot" />
          live
        </span>
      </div>

      <div className="flex gap-1 border-b border-code-line px-3 py-2" role="tablist" aria-label="Endpoint">
        {endpoints.map((e) => (
          <button
            key={e}
            type="button"
            role="tab"
            aria-selected={e === active}
            onClick={() => {
              setAuto(false);
              setActive(e);
            }}
            className={`rounded-md px-3 py-1.5 font-mono text-xs transition-colors duration-300 ${
              e === active ? "bg-code-line text-code-text" : "text-code-dim hover:text-code-text"
            }`}
          >
            /{e}
          </button>
        ))}
      </div>

      <div className="min-h-[330px] p-5 sm:p-6">
        <p className="flex items-center gap-3 font-mono text-[13px]">
          <span className="method method-get">GET</span>
          <span>
            {command.slice(0, typed)}
            {!done && <span className="caret" />}
          </span>
        </p>

        {result ? (
          <div key={active + result.status} className="mt-5">
            <p className="code-line mb-4 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-code-dim">
              <span className="text-[#7fbf8e]">● {result.status}</span>
              {result.ms !== null && <span>{Math.max(result.ms, 1)} ms</span>}
              <span>application/json</span>
            </p>
            <div className="overflow-x-auto overflow-y-hidden">
              <Json value={result.body} />
            </div>
          </div>
        ) : (
          done && <p className="mt-5 font-mono text-[11px] text-code-dim">menunggu respons…</p>
        )}
      </div>
    </div>
  );
}
