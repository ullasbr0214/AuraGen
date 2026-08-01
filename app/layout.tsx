import "./globals.css";

import { AuthProvider } from "./context/AuthContext";
import { TelemetryProvider } from "./context/TelemetryContext";
import { AuraProvider } from "./context/AuraContext";
import { ChatProvider } from "./context/ChatContext";
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
    <TelemetryProvider>
      <AuraProvider>

        {children}

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#0f172a",
              color: "#fff",
              border: "1px solid #06b6d4",
            },
          }}
        />

      </AuraProvider>
    </TelemetryProvider>
  </AuthProvider>
</body>
    </html>
  );
}