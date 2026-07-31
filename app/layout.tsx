import type { Metadata } from "next";
import "./globals.css";

import { AuraProvider } from "./context/AuraContext";
import { TelemetryProvider } from "./context/TelemetryContext";
import { ChatProvider } from "./context/ChatContext";
import { ProjectProvider } from "./context/ProjectContext";

export const metadata: Metadata = {
  title: "AuraGen",
  description: "Self-Healing Generative UI via Cognitive Load",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ChatProvider>
          <TelemetryProvider>
            <AuraProvider>
              <ProjectProvider>
  {children}
</ProjectProvider>
            </AuraProvider>
          </TelemetryProvider>
        </ChatProvider>
      </body>
    </html>
  );
}