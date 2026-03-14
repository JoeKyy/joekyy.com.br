import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'JoeKyy',
  description: 'JoeKyy - IT and WEB Solutions',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
