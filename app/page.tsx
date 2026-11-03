import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Header } from "@/components/header";
import { Reveal } from "@/components/reveal";
import { Magnetic } from "@/components/magnetic";
import { CopyEmail } from "@/components/copy-email";
import { ApiConsole } from "@/components/api-console";
import { EndpointPanel } from "@/components/endpoint-panel";
import { ProjectShot } from "@/components/project-shot";
import { Seal } from "@/components/seal";
import { LogoMark } from "@/components/logo";
import { ArrowRight, ArrowUpRight, SocialIcon } from "@/components/icons";
import { integrations, principles, profile, projects, skillGroups, socials } from "@/lib/data";

function Eyebrow({ index, children, dark }: { index: string; children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={`flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase ${dark ? "text-paper/50" : "text-muted"}`}
    >
      <span className="text-gold">{index}</span>
      <span className={`h-px w-10 ${dark ? "bg-paper/20" : "bg-line"}`} />
      {children}
    </p>
  );
}

/* Baris judul yang naik dari balik tirai saat masuk layar. */
function Line({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <span className="line-mask">
      <span style={{ "--delay": `${delay}ms` } as CSSProperties}>{children}</span>
    </span>
  );
}

const marqueeItems = integrations.map((i) => i.name.split(" · ")[0]);

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex-1">
        {/* ================= HERO ================= */}
        <section className="mx-auto max-w-7xl px-5 pt-28 sm:px-8 md:pt-32">
          <Reveal>
            <div className="grid grid-cols-2 gap-4 border-b border-line pb-4 font-mono text-[11px] tracking-[0.14em] text-muted uppercase lg:grid-cols-[1fr_auto_1fr]">
              <span>Portofolio</span>
              <span className="hidden whitespace-nowrap lg:block">{profile.role}</span>
              <span className="flex items-center justify-end gap-2.5">
                <span className="pulse-dot" />
                Menerima proyek
              </span>
            </div>
          </Reveal>

          <div className="grid gap-12 pt-10 md:grid-cols-12 md:gap-8 md:pt-14">
            <div className="md:col-span-7 md:pt-4">
              <Reveal>
                <h1 className="font-serif text-[clamp(4rem,11.5vw,10.5rem)] leading-[0.86] tracking-[-0.025em]">
                  <Line>Muhammad</Line>
                  <Line delay={120}>
                    <em className="pr-2">Fadillah</em>
                    <span className="text-gold">.</span>
                  </Line>
                </h1>
              </Reveal>

              <Reveal delay={250}>
                <p className="mt-9 max-w-[30rem] text-[1.08rem] leading-[1.75] text-ink-2">
                  Saya membangun aplikasi web yang menyambungkan banyak layanan, dari WhatsApp, email, dan
                  spreadsheet sampai model AI, menjadi satu sistem yang rapi dan{" "}
                  <span className="font-serif text-[1.3em] whitespace-nowrap italic">benar-benar dipakai.</span>
                </p>
              </Reveal>

              <Reveal delay={350}>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Magnetic>
                    <a href="#proyek" className="btn btn-primary">
                      Lihat karya
                      <ArrowRight className="btn-arrow" />
                    </a>
                  </Magnetic>
                  <Magnetic>
                    <a href="#kontak" className="btn btn-outline">
                      Hubungi saya
                    </a>
                  </Magnetic>
                </div>
              </Reveal>

              <Reveal delay={450}>
                <div className="mt-12 flex items-center gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.key}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      title={`${s.label} ${s.handle}`}
                      className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink-2 transition-all duration-500 hover:-translate-y-1 hover:border-ink hover:bg-ink hover:text-paper"
                    >
                      <SocialIcon name={s.key} />
                    </a>
                  ))}
                  <span className="ml-3 font-mono text-[11px] text-muted">@fadil18.08</span>
                </div>
              </Reveal>
            </div>

            <Reveal delay={150} className="relative md:col-span-5">
              <figure>
                <div className="group relative mx-auto aspect-[3/4] w-full max-w-[26rem] overflow-hidden rounded-t-full bg-[#cbcac6] md:ml-auto">
                  <Image
                    src="/foto.jpeg"
                    alt="Foto Muhammad Fadillah"
                    fill
                    preload
                    sizes="(min-width: 768px) 30rem, 90vw"
                    className="object-cover object-[50%_18%] grayscale-[0.15] transition-transform duration-[1.6s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <figcaption className="mx-auto mt-3 flex max-w-[26rem] justify-between font-mono text-[10px] tracking-[0.16em] text-muted uppercase md:mr-0">
                  <span>Gbr. 01</span>
                  <span>Muhammad Fadillah</span>
                </figcaption>
              </figure>
              <Seal
                text="Web · API · AI · Otomasi · "
                className="absolute top-4 right-0 h-24 w-24 sm:right-6 md:right-0 lg:h-28 lg:w-28"
              />
            </Reveal>
          </div>

          <div className="mt-16 grid border-t border-line sm:grid-cols-3 md:mt-20">
            {[
              ["02", "Sistem live di produksi"],
              ["06", "Layanan API terintegrasi"],
              ["01", "Model AI dalam alur kerja nyata"],
            ].map(([n, label], i) => (
              <Reveal
                key={label}
                delay={i * 100}
                className={`flex items-baseline gap-4 py-6 sm:py-8 ${i > 0 ? "border-t border-line sm:border-t-0 sm:border-l sm:pl-8" : ""}`}
              >
                <span className="font-serif text-5xl">{n}</span>
                <span className="text-sm text-muted">{label}</span>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ================= MARQUEE INTEGRASI ================= */}
        <div className="marquee border-y border-line bg-paper-2/60 py-6" aria-hidden>
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((s, i) => (
              <span key={i} className="flex items-center gap-10 pr-10 font-serif text-3xl whitespace-nowrap italic">
                {s}
                <span className="font-mono text-[11px] tracking-widest text-gold not-italic">/ API</span>
              </span>
            ))}
          </div>
        </div>

        {/* ================= KONSOL ================= */}
        <section id="konsol" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
          <div className="grid items-center gap-12 md:grid-cols-12 md:gap-10">
            <Reveal className="md:col-span-5">
              <Eyebrow index="01">Konsol</Eyebrow>
              <h2 className="mt-6 font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl">
                Portofolio ini juga
                <br />
                punya <em>API.</em>
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-muted">
                Semua proyek saya berbicara lewat API, jadi situs ini pun begitu. Konsol di samping memanggil
                endpoint sungguhan, bukan animasi rekaman. Pilih salah satu, atau buka langsung di browser.
              </p>
              <a
                href="/api/profil"
                target="_blank"
                className="link-line mt-6 inline-flex items-center gap-2 pb-0.5 font-mono text-sm"
              >
                GET /api/profil <ArrowUpRight className="h-4 w-4" />
              </a>
            </Reveal>
            <Reveal delay={150} className="min-w-0 md:col-span-7">
              <ApiConsole />
            </Reveal>
          </div>
        </section>

        {/* ================= TENTANG ================= */}
        <section id="tentang" className="border-t border-line">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:grid-cols-12 md:py-36">
            <Reveal className="md:col-span-3">
              <Eyebrow index="02">Tentang</Eyebrow>
            </Reveal>
            <div className="md:col-span-9">
              <Reveal>
                <p className="font-serif text-[clamp(1.9rem,3.6vw,3.2rem)] leading-[1.12] tracking-tight">
                  Saya senang menemukan pekerjaan yang masih manual, seperti peminjaman ruangan lewat kertas
                  atau catatan kas di buku tulis, lalu{" "}
                  <em className="text-gold">menyambungkannya</em> menjadi sistem yang rapi dan bisa diandalkan.
                </p>
              </Reveal>

              <ol className="mt-16 border-t border-line">
                {principles.map((p, i) => (
                  <li key={p.title} className="border-b border-line">
                    <Reveal delay={i * 80} className="grid gap-2 py-7 md:grid-cols-[4rem_14rem_1fr] md:gap-6">
                      <span className="font-mono text-xs text-gold">0{i + 1}</span>
                      <h3 className="text-lg font-medium">{p.title}</h3>
                      <p className="leading-relaxed text-muted">{p.body}</p>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ================= PROYEK ================= */}
        <section id="proyek" className="bg-card">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
            <Reveal className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
              <div>
                <Eyebrow index="03">Karya pilihan</Eyebrow>
                <h2 className="mt-6 font-serif text-5xl leading-[0.95] tracking-tight sm:text-7xl">
                  Proyek <em>terpilih</em>
                  <sup className="ml-2 align-super font-mono text-base tracking-normal text-gold">
                    ({String(projects.length).padStart(2, "0")})
                  </sup>
                </h2>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-muted">
                Keduanya live dan dipakai. Klik tab endpoint untuk melihat bagaimana tiap sistem berbicara
                dengan layanan lain.
              </p>
            </Reveal>

            <div className="mt-20 space-y-28 md:space-y-40">
              {projects.map((p) => (
                <article key={p.slug}>
                  <Reveal className="mb-8 grid items-end gap-4 md:grid-cols-12">
                    <div className="flex items-baseline gap-5 md:col-span-8">
                      <span className="font-mono text-sm text-gold">{p.index}</span>
                      <div>
                        <h3 className="font-serif text-5xl leading-none tracking-tight sm:text-6xl">{p.title}</h3>
                        <p className="mt-3 text-muted">{p.subtitle}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 md:col-span-4 md:justify-end">
                      <span className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">{p.label}</span>
                    </div>
                  </Reveal>

                  <Reveal delay={100}>
                    <ProjectShot url={p.url} image={p.image} title={p.title} />
                  </Reveal>

                  <div className="mt-12 grid gap-12 md:grid-cols-12 md:gap-10">
                    <Reveal className="md:col-span-5">
                      <p className="text-[1.05rem] leading-[1.8] text-ink-2">{p.description}</p>
                      <ul className="mt-8 border-t border-line">
                        {p.highlights.map((h) => (
                          <li key={h} className="flex gap-4 border-b border-line py-3.5 text-[0.95rem]">
                            <span className="mt-[0.55rem] h-px w-4 shrink-0 bg-gold" />
                            {h}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-6 font-mono text-xs leading-relaxed text-muted">{p.stack.join("  /  ")}</p>
                      <div className="mt-8">
                        <Magnetic>
                          <a href={p.url} target="_blank" rel="noreferrer" className="btn btn-primary">
                            Kunjungi situs
                            <ArrowUpRight className="btn-arrow btn-arrow-diag" />
                          </a>
                        </Magnetic>
                      </div>
                    </Reveal>
                    <Reveal delay={120} className="min-w-0 md:col-span-7">
                      <EndpointPanel endpoints={p.endpoints} />
                    </Reveal>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ================= INTEGRASI API ================= */}
        <section id="integrasi" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
          <Reveal className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-7">
              <Eyebrow index="04">Integrasi API</Eyebrow>
              <h2 className="mt-6 font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl">
                Layanan yang sudah
                <br />
                saya <em>sambungkan.</em>
              </h2>
            </div>
            <p className="self-end leading-relaxed text-muted md:col-span-5">
              Bukan sekadar daftar logo: setiap baris di bawah sudah berjalan di sistem produksi, lengkap
              dengan penanganan galat dan cadangan bila layanannya sedang bermasalah.
            </p>
          </Reveal>

          <div className="mt-16">
            <div className="hidden grid-cols-12 gap-6 border-b border-ink pb-3 font-mono text-[10px] tracking-[0.18em] text-muted uppercase md:grid">
              <span className="col-span-4">Layanan</span>
              <span className="col-span-4">Kegunaan</span>
              <span className="col-span-2">Proyek</span>
              <span className="col-span-2 text-right">Jenis</span>
            </div>
            {integrations.map((it, i) => (
              <Reveal key={it.name} delay={i * 60}>
                <div className="row-hover grid gap-1 border-b border-line px-1 py-6 md:grid-cols-12 md:items-center md:gap-6 md:px-3">
                  <span className="flex items-center gap-3 font-serif text-[1.75rem] leading-tight md:col-span-4">
                    {it.name}
                    <ArrowRight className="row-arrow hidden h-5 w-5 text-gold md:block" />
                  </span>
                  <span className="text-ink-2 md:col-span-4">{it.use}</span>
                  <span className="text-sm text-muted md:col-span-2">{it.project}</span>
                  <span className="font-mono text-xs text-gold md:col-span-2 md:text-right">{it.kind}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ================= KEAHLIAN ================= */}
        <section id="keahlian" className="border-t border-line bg-paper-2/50">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
            <Reveal>
              <Eyebrow index="05">Keahlian</Eyebrow>
            </Reveal>
            <div className="mt-12 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {skillGroups.map((g, i) => (
                <Reveal key={g.title} delay={i * 80} className="bg-paper p-7">
                  <h3 className="font-serif text-[1.7rem] leading-tight">{g.title}</h3>
                  <ul className="mt-6 space-y-2.5 text-[0.95rem] text-ink-2">
                    {g.items.map((s) => (
                      <li key={s} className="group flex items-center gap-3">
                        <span className="h-px w-3 bg-line transition-all duration-500 group-hover:w-6 group-hover:bg-gold" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= KONTAK ================= */}
        <section id="kontak" className="bg-ink text-paper">
          <div className="mx-auto max-w-7xl px-5 pt-24 pb-10 sm:px-8 md:pt-36">
            <Reveal>
              <Eyebrow index="06" dark>
                Kontak
              </Eyebrow>
              <h2 className="mt-8 font-serif text-[clamp(3.4rem,9vw,8.5rem)] leading-[0.9] tracking-[-0.02em]">
                <Line>Mari bangun</Line>
                <Line delay={120}>
                  sesuatu <em className="text-gold-soft">bersama.</em>
                </Line>
              </h2>
            </Reveal>

            <div className="mt-16 grid gap-14 md:grid-cols-12">
              <Reveal className="md:col-span-6">
                <p className="font-mono text-[11px] tracking-[0.18em] text-paper/50 uppercase">Email</p>
                <a
                  href={`mailto:${profile.email}`}
                  className="group mt-4 inline-flex items-center gap-3 font-serif text-[clamp(1.6rem,3.4vw,2.8rem)] break-all"
                >
                  <span className="link-line">{profile.email}</span>
                  <ArrowUpRight className="h-6 w-6 shrink-0 text-gold-soft transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
                <div className="mt-6">
                  <CopyEmail email={profile.email} />
                </div>
              </Reveal>

              <Reveal delay={120} className="md:col-span-6">
                <p className="font-mono text-[11px] tracking-[0.18em] text-paper/50 uppercase">Sosial media</p>
                <ul className="mt-4 border-t border-paper/15">
                  {socials.map((s) => (
                    <li key={s.key} className="border-b border-paper/15">
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center gap-4 py-4 transition-[padding] duration-500 hover:pl-3"
                      >
                        <SocialIcon name={s.key} className="text-paper/60 transition-colors group-hover:text-gold-soft" />
                        <span className="text-lg">{s.label}</span>
                        <span className="ml-auto truncate font-mono text-xs text-paper/50">{s.handle}</span>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-paper/40 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold-soft" />
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <footer className="mt-24 flex flex-col gap-3 border-t border-paper/15 pt-6 font-mono text-[11px] tracking-wide text-paper/50 sm:flex-row sm:items-center sm:justify-between">
              <p className="logo logo-invert flex items-center gap-3">
                <LogoMark className="-m-[5px] scale-75 text-paper" />© 2026 Fadil Development
              </p>
              <p>Dibangun dengan Next.js · di-host di Vercel</p>
              <a href="#" className="link-line self-start transition-colors hover:text-paper sm:self-auto">
                Kembali ke atas ↑
              </a>
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}
