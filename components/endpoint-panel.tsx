"use client";

import { useState } from "react";
import type { Endpoint } from "@/lib/data";
import { Json } from "./json";

function shortPath(path: string) {
  const p = path.replace(/^https:\/\//, "").split("?")[0];
  return p.length > 34 ? `…${p.slice(-32)}` : p;
}

export function EndpointPanel({ endpoints }: { endpoints: Endpoint[] }) {
  const [i, setI] = useState(0);
  const ep = endpoints[i];

  return (
    <div className="min-w-0 overflow-hidden rounded-2xl bg-code text-code-text">
      <div className="flex items-center justify-between border-b border-code-line px-5 py-3 font-mono text-[11px] text-code-dim">
        <span>Endpoint &amp; integrasi</span>
        <span>
          {i + 1}/{endpoints.length}
        </span>
      </div>

      <div className="flex flex-col border-b border-code-line" role="tablist">
        {endpoints.map((e, n) => (
          <button
            key={e.path}
            type="button"
            role="tab"
            aria-selected={n === i}
            onClick={() => setI(n)}
            className={`group flex items-center gap-3 border-l-2 px-5 py-2.5 text-left font-mono text-xs transition-all duration-300 ${
              n === i
                ? "border-code-key bg-code-line/60 text-code-text"
                : "border-transparent text-code-dim hover:bg-code-line/30 hover:text-code-text"
            }`}
          >
            <span className={`method ${e.method === "GET" ? "method-get" : "method-post"}`}>{e.method}</span>
            <span className="truncate">{shortPath(e.path)}</span>
          </button>
        ))}
      </div>

      <div key={i} className="p-5 sm:p-6">
        <p className="code-line text-sm leading-relaxed text-code-text/85">{ep.note}</p>
        <p className="code-line mt-4 font-mono text-[11px] break-all text-code-dim">
          {ep.method} {ep.path}
        </p>

        {ep.request !== undefined && (
          <div className="mt-5">
            <p className="mb-2 font-mono text-[10px] tracking-[0.18em] text-code-dim uppercase">Request body</p>
            <div className="overflow-x-auto overflow-y-hidden">
              <Json value={ep.request} step={20} />
            </div>
          </div>
        )}

        <div className="mt-5">
          <p className="mb-2 flex items-center gap-3 font-mono text-[10px] tracking-[0.18em] text-code-dim uppercase">
            Response <span className="tracking-normal text-[#7fbf8e] normal-case">● {ep.status}</span>
          </p>
          <div className="overflow-x-auto overflow-y-hidden">
            <Json value={ep.response} step={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
