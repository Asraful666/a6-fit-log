import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { PlanProvider } from "@/context/PlanContext";
import Navbar from "@/components/Navbar";

import "./globals.css";

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description:
    "A dark, no-nonsense workout companion for planning and tracking your training.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-white antialiased">
        <PlanProvider>
          <Navbar />

          <main className="min-h-screen">
            {children}
          </main>

          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#1a1a1a",
                color: "#ffffff",
                border: "1px solid #2a2a2a",
              },
            }}
          />
        </PlanProvider>
      </body>
    </html>
  );
}