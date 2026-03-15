import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JoeKyy",
  description: "JoeKyy - IT and WEB Solutions",
};

// Root layout — html/body são fornecidos pelo [locale]/layout.tsx
// suppressHydrationWarning evita mismatch de atributos (lang, className)
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
