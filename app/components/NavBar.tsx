"use client";

import Link from 'next/link';
import { useState } from 'react';

const categories = [
  { name: 'Accesorios', href: '/productos/accesorios' },
  { name: 'Obsequios', href: '/productos/obsequios' },
  { name: 'Cuidado Personal', href: '/productos/cuidado-personal' },
];

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-white/90 backdrop-blur-md p-4 shadow-sm sticky top-0 z-[40] border-b border-pink-50 transition-all">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* --- Menú Móvil y Logo --- */}
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="p-2 -ml-2 text-gray-500 hover:text-pink-500 rounded-2xl hover:bg-pink-50 md:hidden transition-colors"
              aria-label="Abrir menú"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <Link href="/" className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 tracking-tight">
              World~V
            </Link>
          </div>

          {/* --- Menú Desktop --- */}
          <div className="hidden md:flex items-center space-x-2">
            <Link href="/" className="px-5 py-2 text-gray-600 hover:text-pink-500 rounded-full hover:bg-pink-50 transition-all">
              Inicio
            </Link>
            
            <div className="relative group">
              <button type="button" title="Categorías" className="flex items-center gap-1 px-5 py-2 text-gray-600 group-hover:text-pink-500 rounded-full group-hover:bg-pink-50 transition-all">
                Categorías
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className="absolute left-0 top-full mt-2 w-52 bg-white/95 backdrop-blur-sm border border-pink-100 rounded-2xl shadow-xl shadow-pink-100/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left scale-95 group-hover:scale-100 z-50 p-2">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-pink-50 hover:text-pink-500 rounded-xl transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/ofertas" className="px-5 py-2 text-gray-600 hover:text-pink-500 rounded-full hover:bg-pink-50 transition-all">
              Ofertas ✨
            </Link>
          </div>
          
          {/* Div vacío para mantener el logo y menú centrados correctamente al usar justify-between */}
          <div className="w-8 md:w-24"></div>
        </div>
      </nav>

      {/* --- SIDEBAR MÓVIL --- */}
      <div className={`fixed inset-0 z-[100] md:hidden transition-all duration-300 ${isMenuOpen ? 'visible' : 'invisible'}`} role="dialog" aria-modal="true">
        <div 
          className={`absolute inset-0 bg-gray-900/20 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} 
          onClick={() => setIsMenuOpen(false)} 
        />

        <div className={`absolute inset-y-0 left-0 w-full max-w-xs bg-white p-6 shadow-2xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} rounded-r-3xl`}>
          <div className="flex items-center justify-between mb-8">
            <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
              Menú
            </span>
            <button 
              type="button"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Cerrar menú"
              title="Cerrar menú"
              className="p-2 text-gray-400 hover:text-pink-500 rounded-xl bg-gray-50 hover:bg-pink-50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-2">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-gray-600 hover:bg-pink-50 hover:text-pink-500 rounded-2xl transition-colors">
              Inicio
            </Link>
            
            <div className="my-4 pt-4 border-t border-pink-50">
              <h3 className="px-4 text-xs font-bold text-pink-300 uppercase tracking-widest mb-3">Categorías</h3>
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 text-gray-600 hover:bg-pink-50 hover:text-pink-500 rounded-2xl transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}