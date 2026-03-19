import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Fridge MVP",
  description: "One clear food suggestion."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

