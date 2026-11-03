import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Muhammad Fadillah — Software Engineer & AI Prompt Engineer",
  description:
    "Portofolio Muhammad Fadillah, software engineer yang membangun aplikasi web dan memanfaatkan AI dalam proses pengembangan.",
  openGraph: {
    title: "Muhammad Fadillah — Software Engineer & AI Prompt Engineer",
    description:
      "Aplikasi web yang benar-benar dipakai: SIMPEG FMIPA UM, Kost Seruni, dan lainnya.",
    images: ["/foto.jpeg"],
    locale: "id_ID",
    type: "website",
  },
};

// Warna bilah alamat browser di HP mengikuti latar krem situs.
export const viewport: Viewport = {
  themeColor: "#f3eee5",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
