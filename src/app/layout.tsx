import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { Navbar } from "@/components/layout/Navbar";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

const defaultDescription =
  "Buy used 48×40 composite pallets from $15 in Phoenix & Gilbert. Value & Industrial Grade. Pickup by appointment; delivery by quote. Call 602-644-0600.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Used 48×40 Plastic Pallets in Phoenix & Gilbert, AZ | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: defaultDescription,
  keywords: [
    "used pallets Phoenix",
    "pallets Gilbert AZ",
    "48x40 pallets",
    "composite pallets",
    "buy pallets Phoenix",
    "cheap pallets Phoenix",
    "pallet pickup Gilbert",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    images: ["/images/pallet-4.jpg"],
  },
  twitter: { card: "summary_large_image", images: ["/images/pallet-4.jpg"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      {/* Bottom padding on small screens clears the fixed MobileActionBar. */}
      <body className="flex min-h-dvh flex-col bg-slate-50 pb-[calc(76px+env(safe-area-inset-bottom))] font-sans text-slate-900 md:pb-0">
        <a
          href="#main"
          className="sr-only z-50 rounded-lg bg-white px-4 py-2 font-semibold focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        {/* Collects MUI (Emotion) styles during server rendering, e.g. for @mui/icons-material. */}
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <MobileActionBar />
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
