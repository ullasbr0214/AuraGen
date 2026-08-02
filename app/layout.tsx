import "./globals.css";

import { AuraProvider } from "./context/AuraContext";
import { ChatProvider } from "./context/ChatContext";
import { TelemetryProvider } from "./context/TelemetryContext";

import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>

        <AuraProvider>

          <ChatProvider>

            <TelemetryProvider>

              {children}

              <Toaster position="top-right" />

            </TelemetryProvider>

          </ChatProvider>

        </AuraProvider>

      </body>
    </html>
  );
}