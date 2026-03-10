import type { Metadata } from "next";
import { Montserrat, Raleway } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500"],
});

const raleway = Raleway({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Novelty Design System",
  description: "Portable design system — components and themes",
};

import { Sidebar } from "@/components/docs/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${raleway.variable} antialiased`}>
        <div className="flex min-h-screen bg-[var(--color-surface)]">
          <Sidebar />
          <main className="min-w-0 flex-1 p-8 lg:p-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
