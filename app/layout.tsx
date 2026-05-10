import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { CartProvider } from "./components/CartContext";
import FloatingCart from "./components/FloatingCart";
import CartModal from "./components/CartModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "World Of Varieties",
  description: "Tienda de ropa personalizada con diseños únicos y estilos variados. ¡Explora nuestra colección y encuentra tu estilo perfecto!",
  openGraph: {
    images: ["./logo.png"],
  },
  metadataBase: new URL("https://world-v.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
          <CartProvider>
        <NavBar />
        {children}
        <FloatingCart />
        <CartModal />
        < Footer />
        </CartProvider>
      </body>
    </html>
  );
}
