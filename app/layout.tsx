import "./globals.css";

import { AuraProvider } from "./context/AuraContext";
import { ChatProvider } from "./context/ChatContext";
import { TelemetryProvider } from "./context/TelemetryContext";
import { AuthProvider } from "./context/AuthContext";

import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AuraProvider>
            <ChatProvider>
              <TelemetryProvider>
                {children}

                <Toaster position="top-right" />
              </TelemetryProvider>
            </ChatProvider>
          </AuraProvider>
        </AuthProvider>
      </body>
    </html>
  );
}