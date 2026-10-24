import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Anton, Archivo, Instrument_Serif } from "next/font/google";

import { siteConfig } from "@/config/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "LOW TIDE — Independent Streetwear, Sri Lanka",
    template: "%s — LOW TIDE",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#f3efe5",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${anton.variable} ${instrumentSerif.variable}`}
    >
      <body className="bg-paper font-sans text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
