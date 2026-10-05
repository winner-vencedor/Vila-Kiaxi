import type { Metadata } from "next";
import { Toaster } from "sonner";
import "../globals.css";


export const metadata: Metadata = {
  title: "Vila-Kiaxi admin",
  description: "admin management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <body className="min-h-full">
        {children}
        <Toaster
          position="top-right"
          richColors
          closeButton
        />
        </body>
    </>
  );
}
