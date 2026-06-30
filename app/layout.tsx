import "./globals.css";
import type { Metadata } from "next";
import { AuraProvider } from "./context/AuraContext";

export const metadata: Metadata = {
  title: "AuraGen",
  description: "Self-Healing Generative UI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuraProvider>
          {children}
        </AuraProvider>
      </body>
    </html>
  );
}