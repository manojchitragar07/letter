import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dearly — A Digital Letter Experience",
  description:
    "Some feelings deserve more than a text. Write, design, and send emotional digital handwritten letters with vintage stationery, artistic illustrations, wax seals, and shareable links.",
  keywords: [
    "digital letter",
    "handwritten letters",
    "love letter",
    "vintage stationery",
    "wax seal",
    "letter writing",
    "keepsake",
  ],
  openGraph: {
    title: "Dearly — A Digital Letter Experience",
    description:
      "Turn your thoughts into beautiful letters. Write, design, and send something that stays.",
    siteName: "Dearly",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
