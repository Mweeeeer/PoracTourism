import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Private Resorts in Porac | Premium Staycation Booking",
  description: "Book the most exclusive and beautiful private resorts in Porac, Pampanga. Experience luxury and comfort in the heart of nature.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="font-sans text-slate-900 bg-slate-50">{children}</body>
    </html>
  );
}
