import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TemplateOS Starter",
  description: "Build and preview your TemplateOS component library",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
