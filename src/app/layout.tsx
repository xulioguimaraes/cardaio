import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cardaio - Seu Menu Digital Simples e Rápido",
  description: "Crie e gerencie seu menu digital profissional em minutos. Cadastre produtos, personalize cores, adicione seu logo e tenha um menu responsivo que impressiona seus clientes.",
  keywords: "menu digital, cardápio online, restaurante, delivery, food service, menu responsivo",
  authors: [{ name: "Cardaio" }],
  creator: "Cardaio",
  publisher: "Cardaio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://cardaio.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Cardaio - Seu Menu Digital Simples e Rápido",
    description: "Crie e gerencie seu menu digital profissional em minutos. Cadastre produtos, personalize cores, adicione seu logo e tenha um menu responsivo que impressiona seus clientes.",
    url: "https://cardaio.com",
    siteName: "Cardaio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cardaio - Menu Digital",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cardaio - Seu Menu Digital Simples e Rápido",
    description: "Crie e gerencie seu menu digital profissional em minutos.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
