import type { CSSProperties } from "react";

/* Monogram FD bergaris ganda. Tekniknya: jalur yang sama digambar dua kali,
   garis tebal berwarna tinta lalu garis lebih tipis berwarna latar di atasnya,
   sehingga tersisa dua garis tepi seperti pipa. Saat dibuka, huruf tergambar
   lalu "dipahat" berongga; cahaya emas mengalir di dalam pipa saat disorot. */
// Satu jalur tak terputus: batang F naik, palang atas, lengkung D, alas D,
// naik ke batang D, lalu membelok menjadi palang tengah F.
const PATHS = ["M8 39V9H25a15 15 0 0 1 0 30H20V28a5 5 0 0 0-5-5H8"];

export function LogoMark({ className }: { className?: string }) {
  const layer = (cls: string, width: number) =>
    PATHS.map((d, i) => (
      <path
        key={i}
        d={d}
        pathLength={1}
        strokeWidth={width}
        className={cls}
        style={{ "--i": i } as CSSProperties}
      />
    ));

  return (
    <span className={`logo-mark block h-10 w-10 shrink-0 ${className ?? ""}`}>
      <svg viewBox="0 0 48 48" fill="none" aria-hidden className="h-full w-full">
        <g strokeLinejoin="round">
          {layer("logo-outer", 7.4)}
          {layer("logo-inner", 4.2)}
          {layer("logo-flow", 4.2)}
        </g>
      </svg>
    </span>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-3">
      <LogoMark />
      <span className="logo-text flex flex-col leading-none">
        <span className="text-[15px] font-semibold tracking-[-0.01em]">Fadil</span>
        <span className="mt-[3px] text-[11px] font-medium tracking-[0.01em] opacity-55">Development</span>
      </span>
    </span>
  );
}
