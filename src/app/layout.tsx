import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SporeLife Dashboard - 60 Days Challenge",
  description: "Dashboard pour le lancement des poudres SporeLife",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body className={`${inter.className} antialiased bg-[#0a0a0a] text-white`}>
        <div className="flex flex-col lg:flex-row min-h-screen">
          <Sidebar />
          <main className="flex-1 overflow-auto p-4 lg:p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
