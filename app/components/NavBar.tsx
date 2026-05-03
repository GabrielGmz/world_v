"use client"; // Muy importante: permite usar hooks como useCart

import Link from 'next/link';
import { useCart } from './CartContext'; // Asegúrate de que la ruta sea correcta según tus carpetas

export default function NavBar() {
  // 1. Nos traemos la función para abrir el carrito y los productos desde el contexto global
  const { setIsCartOpen, cart } = useCart();

  // 2. Calculamos cuántos productos hay en total para ponerlo en la burbujita
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white/90 backdrop-blur-md p-4 shadow-sm sticky top-0 z-[40] shadow-pink-100 flex justify-between items-center transition-all">
      
      {/* Logo */}
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 tracking-tight">
            World~V
          </Link>
        </li>
      </ul>

      {/* Botón del Carrito */}
      <div className="flex items-center">
        <button 
          onClick={() => setIsCartOpen(true)} // ¡Aquí ocurre la magia que abre el sidebar!
          className="relative p-2 text-gray-400 hover:text-pink-500 hover:bg-pink-50 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
          aria-label="Ver carrito"
        >
          {/* Icono de bolsita de compras (SVG) */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          
          {/* Burbujita indicadora (solo aparece si hay cosas en el carrito) */}
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-pink-500 rounded-full shadow-md">
              {totalItems}
            </span>
          )}
        </button>
      </div>

    </nav>
  );
}