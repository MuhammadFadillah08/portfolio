export const profile = {
  name: "Muhammad Fadillah",
  role: "Software Engineer · AI & Prompt Engineer",
  email: "mhdfadilah08@gmail.com",
};

export const socials = [
  { key: "instagram", label: "Instagram", handle: "@fadil18.08", href: "https://www.instagram.com/fadil18.08" },
  { key: "tiktok", label: "TikTok", handle: "@fadil18.08", href: "https://www.tiktok.com/@fadil18.08" },
  {
    key: "linkedin",
    label: "LinkedIn",
    handle: "Muhammad Fadillah",
    href: "https://www.linkedin.com/in/muhammad-fadillah-a27488382",
  },
  { key: "github", label: "GitHub", handle: "MuhammadFadillah08", href: "https://github.com/MuhammadFadillah08" },
] as const;

export type SocialKey = (typeof socials)[number]["key"];

/* Contoh panggilan API per proyek. Bentuk request/response diambil dari kode
   aslinya; nilainya contoh. */
export type Endpoint = {
  method: "GET" | "POST";
  path: string;
  note: string;
  request?: unknown;
  status: string;
  response: unknown;
};

export type Project = {
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  label: string;
  description: string;
  highlights: string[];
  stack: string[];
  url: string;
  image: string;
  endpoints: Endpoint[];
};

export const projects: Project[] = [
  {
    slug: "simpeg",
    index: "01",
    title: "SIMPEG FMIPA",
    subtitle: "Sistem Informasi Peminjaman Gedung & Ruangan, FMIPA Universitas Negeri Malang",
    label: "Sistem Pendukung Keputusan",
    description:
      "Peminjaman ruang kelas, laboratorium, aula, dan area outdoor FMIPA UM kini dilakukan online. Pengajuan, validasi berjenjang, dan pelacakan status ada dalam satu tempat, menggantikan proses yang sebelumnya serba manual.",
    highlights: [
      "Rekomendasi ruangan dengan metode AHP–SAW dari 6 kriteria",
      "Validasi berjenjang untuk 4 peran pengguna",
      "OTP login lewat Brevo Email API",
      "Cek bentrok jadwal real-time, termasuk jadwal kuliah",
      "Impor ruangan dan jadwal dari Excel, laporan siap cetak",
    ],
    stack: ["PHP", "MySQL", "JavaScript", "Brevo API", "REST/JSON"],
    url: "https://simpeg-fmipa.kesug.com",
    image: "/projects/simpeg.png",
    endpoints: [
      {
        method: "GET",
        path: "/user/check_availability.php?ruangan_id=12&tanggal_mulai=2026-11-10&jam_mulai=08:00&jam_selesai=10:00",
        note: "Dipanggil formulir peminjaman untuk mendeteksi bentrok dengan booking lain dan jadwal kuliah.",
        status: "200 OK",
        response: {
          available: false,
          conflicts: [
            {
              nama_kegiatan: "Kalkulus II",
              jam_mulai: "07:00",
              jam_selesai: "09:30",
              status: "aktif",
              sumber: "Jadwal Kuliah",
            },
          ],
        },
      },
      {
        method: "POST",
        path: "https://api.brevo.com/v3/smtp/email",
        note: "Mengirim kode OTP saat login. Lewat API HTTPS, tanpa PHP mail(), sehingga tetap jalan di hosting gratis.",
        request: {
          sender: { name: "SIMPEG FMIPA UM" },
          to: [{ email: "mahasiswa@students.um.ac.id" }],
          subject: "Kode OTP Login SIMPEG FMIPA UM — 482915",
        },
        status: "201 Created",
        response: { messageId: "<202611031540.18273@smtp-relay.mailin.fr>" },
      },
    ],
  },
  {
    slug: "kost-seruni",
    index: "02",
    title: "Kost Seruni",
    subtitle: "Sistem manajemen sewa kost multi-cabang dengan bot WhatsApp ber-AI",
    label: "Aplikasi Bisnis · AI",
    description:
      "Pengelolaan kost dari katalog kamar publik sampai laporan keuangan. Pemilik mengelola beberapa cabang dari satu panel, penyewa memesan dan membayar online, dan buku kas bisa diisi cukup dengan chat WhatsApp.",
    highlights: [
      "Status kamar real-time lewat endpoint JSON (polling 15 detik)",
      "Pengingat tagihan otomatis via Fonnte, Wablas, atau Meta Cloud API",
      "Chat bahasa bebas diurai Groq (Llama 3.3 70B) menjadi transaksi",
      "Buku kas tersinkron ke Google Sheets lewat Apps Script",
      "Denda otomatis via cron, ekspor Excel dan PDF",
    ],
    stack: ["PHP 8", "MySQL (PDO)", "Groq API", "Fonnte API", "Google Apps Script"],
    url: "https://kost-seruni.site.je",
    image: "/projects/kost.png",
    endpoints: [
      {
        method: "POST",
        path: "https://api.groq.com/openai/v1/chat/completions",
        note: "Pesan pengelola diubah menjadi JSON terstruktur. Temperature 0 dan JSON mode agar hasilnya konsisten; bila gagal, jatuh ke parser manual.",
        request: {
          model: "llama-3.3-70b-versatile",
          temperature: 0,
          response_format: { type: "json_object" },
          messages: [{ role: "user", content: "tadi beli galon 3 biji 60rb buat seruni 2" }],
        },
        status: "200 OK",
        response: {
          transaksi: true,
          jenis: "keluar",
          jumlah: 60000,
          keterangan: "beli galon 3 biji",
          kategori: "perlengkapan",
          kost: "Seruni 2",
        },
      },
      {
        method: "GET",
        path: "/api/kamar.php",
        note: "Katalog publik memanggil endpoint ini tiap 15 detik sehingga status kamar selalu terbaru.",
        status: "200 OK",
        response: {
          ok: true,
          ts: "2026-11-03T15:40:00+07:00",
          tersedia: 48,
          data: [{ id: 1, kode: "S1-01", kost: "Seruni 1", status: "tersedia" }],
        },
      },
      {
        method: "POST",
        path: "https://api.fonnte.com/send",
        note: "Pengingat H-3, jatuh tempo, dan keterlambatan dikirim oleh cron harian. Pesan gagal masuk antrean dan dicoba ulang.",
        request: { target: "6281234567890", message: "Halo, tagihan kamar S1-01 jatuh tempo 3 hari lagi." },
        status: "200 OK",
        response: { status: true, detail: "success! message in queue", process: "pending" },
      },
    ],
  },
];

export const integrations = [
  {
    name: "Groq · Llama 3.3 70B",
    use: "Mengurai chat bahasa bebas menjadi transaksi JSON",
    project: "Kost Seruni",
    kind: "LLM · JSON mode",
  },
  {
    name: "Fonnte / Wablas",
    use: "Kirim dan terima WhatsApp, pengingat tagihan",
    project: "Kost Seruni",
    kind: "REST · Webhook",
  },
  {
    name: "WhatsApp Cloud API",
    use: "Driver WhatsApp resmi Meta sebagai alternatif",
    project: "Kost Seruni",
    kind: "Graph API",
  },
  {
    name: "Google Apps Script + Sheets",
    use: "Bot WhatsApp dan buku kas di spreadsheet",
    project: "Kost Seruni",
    kind: "Web App",
  },
  {
    name: "Brevo Transactional Email",
    use: "Kirim kode OTP dan notifikasi email",
    project: "SIMPEG FMIPA",
    kind: "REST · POST",
  },
  {
    name: "REST JSON internal",
    use: "Status kamar real-time dan cek bentrok jadwal",
    project: "Keduanya",
    kind: "GET · JSON",
  },
];

export const skillGroups = [
  {
    title: "Pengembangan Web",
    items: ["PHP", "Laravel", "JavaScript", "TypeScript", "React & Next.js", "Tailwind CSS"],
  },
  {
    title: "API & Backend",
    items: ["REST API", "Webhook", "MySQL", "Integrasi pihak ketiga", "Cron & otomasi"],
  },
  {
    title: "AI & Prompt",
    items: ["Prompt engineering", "LLM JSON mode", "Groq / Llama", "Claude Code", "AHP & SAW"],
  },
  {
    title: "Tools",
    items: ["Git & GitHub", "Vercel", "Google Apps Script", "XAMPP & Laragon", "VS Code"],
  },
];

export const principles = [
  {
    title: "Pahami masalahnya",
    body: "Mulai dari cara orang bekerja hari ini: siapa yang mengajukan, siapa yang menyetujui, di mana prosesnya macet.",
  },
  {
    title: "Sambungkan yang sudah ada",
    body: "WhatsApp, email, spreadsheet: orang sudah memakainya. Saya menyambungkan sistem ke sana lewat API, bukan memaksa pindah kebiasaan.",
  },
  {
    title: "AI sebagai alat, bukan tempelan",
    body: "Model bahasa dipakai di titik yang tepat, dengan keluaran terstruktur dan cadangan bila gagal.",
  },
];

/* Respons "API" milik portofolio ini sendiri, dilayani oleh app/api/[endpoint]/route.ts. */
export const portfolioApi = {
  profil: {
    nama: profile.name,
    peran: ["Software Engineer", "AI & Prompt Engineer"],
    fokus: ["aplikasi web", "integrasi API", "otomasi dengan AI"],
    tersedia: true,
  },
  proyek: {
    total: projects.length,
    data: projects.map((p) => ({ nama: p.title, status: "live", url: p.url })),
  },
  kontak: {
    email: profile.email,
    ...Object.fromEntries(socials.map((s) => [s.key, s.handle])),
  },
} as const;

export type PortfolioEndpoint = keyof typeof portfolioApi;
