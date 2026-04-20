import type { Metadata, Viewport } from "next";
import type { CSSProperties } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@multica/ui/components/ui/sonner";
import { cn } from "@multica/ui/lib/utils";
import { WebProviders } from "@/components/web-providers";
import { LocaleSync } from "@/components/locale-sync";
import "./globals.css";

// Font stack: Inter for Latin UI text + system Chinese fonts for zh content.
// Desktop app uses the same stack via apps/desktop/src/renderer/src/globals.css —
// keep the CJK fallback tail in sync across both files. The Inter primary family
// differs by design: next/font produces `__Inter_xxx` (with a synthetic size-adjusted
// fallback face to prevent FOUT layout shift); desktop uses fontsource's "Inter Variable".
// Both resolve to Inter glyphs, so rendering is identical in practice.
// Currently covers English + Simplified Chinese. When ja/ko i18n lands, extend
// the tail with Hiragino Kaku Gothic ProN / Yu Gothic / Apple SD Gothic Neo / Malgun Gothic.
// Per-character fallback: Latin chars render with Inter, Chinese chars with
// PingFang SC (macOS) / Microsoft YaHei (Windows) / Noto Sans CJK SC (Linux).
const fontVariables = {
  "--font-sans": [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Inter",
    '"PingFang SC"',
    '"Microsoft YaHei"',
    '"Noto Sans CJK SC"',
    "sans-serif",
  ].join(", "),
  "--font-mono": [
    "ui-monospace",
    '"SFMono-Regular"',
    "Menlo",
    "Consolas",
    "monospace",
  ].join(", "),
} as CSSProperties;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#05070b" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.multica.ai"),
  title: {
    default: "Multica — Project Management for Human + Agent Teams",
    template: "%s | Multica",
  },
  description:
    "Open-source platform that turns coding agents into real teammates. Assign tasks, track progress, compound skills.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: ["/favicon.svg"],
  },
  openGraph: {
    type: "website",
    siteName: "Multica",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@multica_hq",
    creator: "@multica_hq",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased font-sans h-full")}
      style={fontVariables}
    >
      <body className="h-full overflow-hidden">
        <LocaleSync />
        <ThemeProvider>
          <WebProviders>
            {children}
          </WebProviders>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
