"use client";

// 1. Agregamos useState y useEffect aquí
import { useState, useEffect } from 'react';
import { useCart } from './CartContext';

export default function FloatingCart() {
  const { setIsCartOpen, cart } = useCart();
  
  // 2. Agregamos el estado para saber si ya cargó el navegador
  const [isMounted, setIsMounted] = useState(false);

  // 3. Le decimos que ya montó
  useEffect(() => {
    const id = requestAnimationFrame(() => setIsMounted(true));

    return () => cancelAnimationFrame(id);
  }, []);

  // Calcula el total de ítems en el carrito
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // 4. Si es el servidor de Next.js, no dibujamos nada aún para evitar el error
  if (!isMounted) return null;

  // ¡TU CÓDIGO INTACTO A PARTIR DE AQUÍ!
  return (
    <button
      onClick={() => setIsCartOpen(true)}
      className="fixed bottom-6 right-6 z-[60] p-4 bg-gradient-to-tr from-pink-500 to-purple-500 text-white rounded-full shadow-lg shadow-pink-500/40 hover:shadow-pink-500/60 hover:scale-105 hover:-translate-y-1 active:scale-95 transition-all duration-300 group"
      aria-label="Abrir carrito"
    >
      {/* Icono del carrito */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6 group-hover:animate-pulse" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>

      {/* Burbuja indicadora (Badget) - Solo se muestra si hay productos */}
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 flex items-center justify-center min-w-[24px] h-6 px-2 text-xs font-bold text-pink-500 bg-white border-2 border-pink-100 rounded-full shadow-sm animate-bounce">
          {totalItems}
        </span>
      )}
    </button>
  );
}