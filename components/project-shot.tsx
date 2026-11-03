"use client";

import Image from "next/image";
import { useRef } from "react";

// Screenshot proyek dengan lencana "Kunjungi" yang mengikuti kursor.
export function ProjectShot({ url, image, title }: { url: string; image: string; title: string }) {
  const badge = useRef<HTMLSpanElement>(null);

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    badge.current?.style.setProperty("--x", `${e.clientX - r.left}px`);
    badge.current?.style.setProperty("--y", `${e.clientY - r.top}px`);
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      onMouseMove={onMove}
      aria-label={`Buka situs ${title}`}
      className="project-shot group relative block overflow-hidden rounded-xl bg-paper-2 ring-1 ring-line"
    >
      <div className="flex items-center justify-between border-b border-line bg-card px-4 py-2.5 font-mono text-[11px] text-muted">
        <span className="truncate">{url.replace("https://", "")}</span>
        <span className="hidden sm:inline">HTTPS · 200</span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={image}
          alt={`Tampilan halaman utama ${title}`}
          fill
          sizes="(min-width: 1024px) 1100px, 100vw"
          className="object-cover object-top"
        />
      </div>
      <span
        ref={badge}
        aria-hidden
        className="pointer-events-none absolute hidden h-24 w-24 -translate-x-1/2 -translate-y-1/2 scale-0 place-items-center rounded-full bg-ink text-center text-xs font-medium text-paper transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 md:grid"
        style={{ left: "var(--x, 50%)", top: "var(--y, 50%)" }}
      >
        Kunjungi
        <br />
        situs ↗
      </span>
    </a>
  );
}
