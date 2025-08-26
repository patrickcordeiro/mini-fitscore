import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mini FitScore",
  description: "Desafio técnico LEGAL - FitScore",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <div className="max-w-4xl mx-auto p-6">{children}</div>
      </body>
    </html>
  );
}
