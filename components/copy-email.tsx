"use client";

import { useState } from "react";
import { Check, Copy } from "./icons";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-full border border-paper/20 px-4 py-2 font-mono text-xs text-paper/70 transition-colors duration-300 hover:border-paper hover:text-paper"
      aria-live="polite"
    >
      <span className="relative h-3.5 w-3.5">
        <Copy
          className={`absolute inset-0 h-3.5 w-3.5 transition-all duration-300 ${copied ? "scale-50 opacity-0" : "scale-100 opacity-100"}`}
        />
        <Check
          className={`absolute inset-0 h-3.5 w-3.5 text-[#7fbf8e] transition-all duration-300 ${copied ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
        />
      </span>
      {copied ? "tersalin ✓" : "salin email"}
    </button>
  );
}
