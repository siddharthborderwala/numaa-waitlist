import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const souvenirStdDemi = localFont({
  src: "./fonts/souvenirstd-demi.woff2",
  variable: "--font-souvenir-std-demi",
});

export const metadata: Metadata = {
  title: "Waitlist | Numaa Design",
  description:
    "Join the waitlist to get early access to premium stationery products from Numaa Design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${instrumentSans.variable} ${souvenirStdDemi.variable} antialiased bg-[#113055] font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
