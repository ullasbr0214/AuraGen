import "./globals.css";

import { AuthProvider } from "./context/AuthContext";
import { TelemetryProvider } from "./context/TelemetryContext";
import { AuraProvider } from "./context/AuraContext";
import { ChatProvider } from "./context/ChatContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>

          <TelemetryProvider>

            <AuraProvider>

              <ChatProvider>

                {children}

              </ChatProvider>

            </AuraProvider>

          </TelemetryProvider>

        </AuthProvider>
      </body>
    </html>
  );
}