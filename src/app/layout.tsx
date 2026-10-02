import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { PlanProvider } from "@/context/PlanContext";
import Navbar from "@/components/Navbar";

import "./globals.css";

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PlanProvider>
          <Navbar />

          <main>{children}</main>

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 2500,
              style: {
                background: "#111214",
                color: "#ffffff",
                border: "1px solid #292b2f",
                borderRadius: "6px",
              },
            }}
          />
        </PlanProvider>
      </body>
    </html>
  );
}