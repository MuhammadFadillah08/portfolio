"use client";

import { useEffect, useState } from "react";
import { socials } from "@/lib/data";
import { SocialIcon } from "./icons";
import { Logo } from "./logo";

const links = [
  { href: "#tentang", label: "Tentang" },
  { href: "#proyek", label: "Proyek" },
  { href: "#integrasi", label: "Integrasi API" },
  { href: "#keahlian", label: "Keahlian" },
  { href: "#kontak", label: "Kontak" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled && !open ? "border-b border-line bg-paper/80 backdrop-blur-md" : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-8">
          <a
            href="#"
            aria-label="Fadil Development, ke atas"
            className={`logo transition-colors duration-500 ${open ? "logo-invert text-paper" : ""}`}
          >
            <Logo />
          </a>

          <nav className="hidden items-center gap-7 text-[0.9rem] lg:flex xl:gap-9">
            {links.map((l) => (
              <a key={l.href} href={l.href}>
                <span className="roll">
                  <span>{l.label}</span>
                  <span aria-hidden className="text-gold">
                    {l.label}
                  </span>
                </span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="#kontak" className="btn btn-primary hidden !h-11 !px-5 !text-[0.85rem] lg:inline-flex">
              <span className="roll">
                <span>Mulai proyek</span>
                <span aria-hidden>Mulai proyek</span>
              </span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-seluler"
              className={`flex h-11 items-center gap-2.5 rounded-full border px-4 text-sm transition-colors duration-500 lg:hidden ${
                open ? "border-paper/30 text-paper" : "border-ink/20"
              }`}
            >
              {open ? "Tutup" : "Menu"}
              <span className="relative block h-2 w-4">
                <span
                  className={`absolute left-0 h-px w-4 bg-current transition-all duration-500 ${open ? "top-1 rotate-45" : "top-0"}`}
                />
                <span
                  className={`absolute left-0 h-px w-4 bg-current transition-all duration-500 ${open ? "top-1 -rotate-45" : "top-2"}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Menu seluler layar penuh */}
      <div
        id="menu-seluler"
        className={`fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink px-5 pt-24 pb-8 text-paper transition-[clip-path] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-8 lg:hidden ${
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
        aria-hidden={!open}
      >
        <nav className="flex-1">
          <ul>
            {links.map((l) => (
              <li key={l.href} className="border-b border-paper/10">
                <a
                  href={l.href}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                  className="block py-[min(1rem,2vh)] font-serif text-[clamp(1.8rem,6.5vh,2.6rem)] leading-none transition-colors hover:text-gold-soft"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-8 flex gap-3">
          {socials.map((s) => (
            <a
              key={s.key}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              tabIndex={open ? 0 : -1}
              aria-label={s.label}
              className="grid h-12 w-12 place-items-center rounded-full border border-paper/20 transition-colors hover:bg-paper hover:text-ink"
            >
              <SocialIcon name={s.key} />
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
