import type { Metadata } from "next";
import { Bebas_Neue, Montserrat } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "V I T A L F I T // Ropa Deportiva Pesada & Suplementación Pura",
  description: "Tienda oficial de VitalFit. Prendas pesadas de entrenamiento corte boxfit, camisetas oversize 280 GSM y suplementación de máxima pureza.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${bebasNeue.variable} ${montserrat.variable}`}
    >
      <body className="min-h-screen bg-white text-black font-sans antialiased selection:bg-black selection:text-white">
        {children}
      </body>
    </html>
  );
}
