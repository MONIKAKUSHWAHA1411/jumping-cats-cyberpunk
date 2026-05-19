import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JUMPING CATS — The Internet Is Our Playground",
  description: "A hyper-animated cyberpunk arcade experience. Cats have taken the internet. Are you ready?",
  keywords: ["jumping cats", "arcade game", "cyberpunk", "cat game", "neon"],
  openGraph: {
    title: "JUMPING CATS",
    description: "The Internet Is Our Playground",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full bg-[#060010] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
