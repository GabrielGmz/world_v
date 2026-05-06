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
        // Grid estricto: 1 en móviles pequeños, 2 en móviles grandes/tablets, 4 en PC
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* MAPEAMOS LOS PRODUCTOS FILTRADOS */}
          {productosFiltrados.map((producto: Producto) => (
            
            // CORRECCIÓN RADICAL: Altura fija (h-[350px] en móvil, h-[420px] en PC)
            // Esto evita que se aplasten y asegura que parezcan tarjetas de verdad
            <div key={producto.id} className="relative w-full h-[350px] sm:h-[420px] rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
              
              {/* Imagen de fondo */}
              <Image 
                src={producto.image} 
                alt={producto.name} 
                fill
                unoptimized
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-in-out" 
              />
              
              {/* Degradado oscuro estricto de abajo hacia arriba */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none"></div>
              
              {/* Contenedor anclado estrictamente al fondo */}
              <div className="absolute bottom-0 left-0 w-full p-5 sm:p-6 flex flex-col justify-end">
                
                {/* Título */}
                <h3 className="font-bold text-white text-xl sm:text-2xl line-clamp-2 leading-tight mb-3 drop-shadow-md">
                  {producto.name}
                </h3>
                
                {/* Contenedor flex para alinear Precio (Izquierda) y Botón (Derecha) */}
                <div className="flex items-center justify-between w-full">
                  
                  {/* Precio */}
                  <p className="text-[#ff66c4] font-extrabold text-xl sm:text-2xl drop-shadow-md">
                    ${producto.price.toFixed(2)}
                  </p>
                  
                  {/* Botón Ver Opciones */}
                  <button 
                    type="button"
                    onClick={() => addToCart({ ...producto, quantity: 1 })} 
                    className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white text-[10px] sm:text-xs font-bold tracking-widest rounded-full uppercase transition-colors"
                  >
                    Agregar al Carrito
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