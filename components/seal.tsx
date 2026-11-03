// Stempel bundar dengan teks melingkar yang berputar pelan.
export function Seal({ text, className }: { text: string; className?: string }) {
  return (
    <div className={`grid place-items-center rounded-full bg-ink text-paper ${className ?? ""}`}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-[spin_22s_linear_infinite]" aria-hidden>
        <defs>
          <path id="seal-circle" d="M50 50m-37 0a37 37 0 1 1 74 0a37 37 0 1 1-74 0" />
        </defs>
        <text className="fill-current font-mono text-[8.6px] uppercase">
          {/* textLength meregangkan teks tepat satu putaran lingkaran (2π × 37). */}
          <textPath href="#seal-circle" textLength="232" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="font-serif text-2xl italic text-gold-soft md:text-3xl">{"{ }"}</span>
    </div>
  );
}
