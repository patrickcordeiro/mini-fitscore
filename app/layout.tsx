import type { Metadata } from "next";
import { Bounce, ToastContainer } from "react-toastify";
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
      <body className="min-h-screen bg-[#F5F7FA] text-gray-900">
        <div className="flex items-center justify-center">{children}</div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </body>
    </html>
  );
}
