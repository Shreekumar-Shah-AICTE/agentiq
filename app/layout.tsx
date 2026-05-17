import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgentIQ — AI Agent Effectiveness Platform",
  description: "Audit, heal, and prove how effective AI coding agents are on your codebase. Built with IBM Granite & IBM Bob for IBM Bob Hackathon 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="page-bg" />
        <div className="dot-grid" />
        {children}
      </body>
    </html>
  );
}
