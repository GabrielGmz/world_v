"use client";

import { use } from 'react'; 
import Image from 'next/image';
import { INVENTARIO_COMPLETO } from '../../components/db'; 
import { useCart } from '../../components/CartContext'; 

export default function CategoriaPage({ params }: { params: Promise<{ categoria: string }> }) {
  const unwrappedParams = use(params);
  const categoria = unwrappedParams.categoria;
  
  const { addToCart } = useCart(); 
  type Producto = (typeof INVENTARIO_COMPLETO)[number];

  const productosFiltrados = INVENTARIO_COMPLETO.filter(
    (producto: Producto) => producto.category === categoria 
  );

  return (
    <div className="max-w-[1400px] mx-auto p-4 sm:p-8">
      
      {/* Título dinámico centrado */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 capitalize mb-10 tracking-tight text-center">
        {categoria.replace('-', ' ')} <span className="text-pink-300">🎀</span>
      </h1>

      {productosFiltrados.length === 0 ? (
        <div className="p-10 text-center text-gray-500 border border-dashed border-pink-100 rounded-3xl bg-white">
            <p className="font-medium">No hay productos en esta categoría por ahora.</p>
            <p className="text-sm mt-1">¡Vuelve pronto para ver nuestras novedades aesthetic!</p>
        </div>
      ) : (
        // CONTENEDOR FLEX: Centrado en móviles, alineado a la izquierda en PC
        <div className="flex flex-wrap justify-center md:justify-start gap-6">
          
          {/* MAPEAMOS LOS PRODUCTOS FILTRADOS (Agregamos el index aquí) */}
          {productosFiltrados.map((producto: Producto, index: number) => (
            
            // TARJETA STRICTA: 
            // w-[360px] h-[420px] sin prefijos (sm:, md:). Siempre medirá eso.
            // flex-none: Bloquea cualquier intento del navegador de encogerla.
            <div key={producto.id} className="relative flex-none w-[275px] h-[375px] rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
              
              {/* Imagen de fondo */}
              <Image 
                src={producto.image} 
                alt={producto.name} 
                fill
                unoptimized
                priority={index < 4} // <-- AQUÍ ESTÁ LA OPTIMIZACIÓN LCP
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-in-out" 
              />
              
              {/* Degradado oscuro estricto de abajo hacia arriba */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none"></div>
              
              {/* Contenedor anclado estrictamente al fondo */}
              <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end">
                
                {/* Título */}
                <h3 className="font-bold text-white text-xl line-clamp-2 leading-tight mb-3 drop-shadow-md">
                  {producto.name}
                </h3>
                
                {/* Contenedor flex para alinear Precio (Izquierda) y Botón (Derecha) */}
                <div className="flex items-center justify-between w-full">
                  
                  {/* Precio */}
                  <p className="text-[#ff66c4] font-extrabold text-md drop-shadow-md">
                    ${producto.price.toFixed(2)}
                  </p>
                  
                  {/* Botón */}
                  <button 
                    type="button"
                    onClick={() => addToCart({ ...producto, quantity: 1 })} 
                    aria-label={`Agregar ${producto.name} al carrito`}
                    className="px-8 py-2 bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white text-xs font-bold tracking-widest rounded-full uppercase transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      {/* Corregimos fill-rule por fillRule para evitar el warning de React */}
                      <path fillRule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5z"/>
                    </svg>
                  </button>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}