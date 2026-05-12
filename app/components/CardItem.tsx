"use client";

import Image from 'next/image';
import { useState } from 'react';
import { useCart } from './CartContext'; 

type Variant = {
  colorName: string;
  numberStyle: string | number;
  imageSrc: string;
  sizes?: string;
  loading?: 'eager' | 'lazy';
};

type CardItemProps = {
  title: string;
  description: string;
  descriptionFull?: string;
  precio: string;
  variants: Variant[];
  priority?: boolean; // Añadimos priority por si quieres optimizar el LCP desde donde lo llames
};

export default function CardItem({ 
  title, 
  precio, 
  variants = [],
  priority = false 
}: CardItemProps) {
  // Guardamos la primera variante por defecto para extraer su imagen y datos
  const [activeVariant] = useState<Variant | null>(variants?.[0] || null);
  
  // Usamos la función de añadir al carrito que viene del contexto global
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    // Evitamos que el clic haga cosas raras en la página
    e.preventDefault(); 
    e.stopPropagation();

    if (!activeVariant) return;

    // Limpiamos el precio (quitar el "$" y pasarlo a número)
    const numericPrice = parseFloat(precio.replace('$', ''));
    // Creamos un ID único numérico basado en el nombre y color
    const numericId = Array.from(`${title}-${activeVariant.colorName}`).reduce(
      (acc, char) => acc + char.charCodeAt(0),
      0
    );
    
    addToCart({
      id: numericId, 
      name: title,
      price: numericPrice,
      quantity: 1,
      category: title,
      image: activeVariant.imageSrc
    });
  };

  if (!variants || variants.length === 0 || !activeVariant) {
    return <div className="p-4 text-red-400 bg-red-50 rounded-lg">Faltan las variantes</div>;
  }

  return (
    <div className="relative flex-none w-68.75 h-93.75 rounded-4xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
      
      {/* Imagen de fondo */}
      <Image 
        src={activeVariant.imageSrc} 
        alt={title} 
        fill
        unoptimized
        priority={priority} 
        className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-in-out" 
      />
      
      {/* Degradado oscuro estricto de abajo hacia arriba */}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/5 to-transparent pointer-events-none"></div>
      
      {/* Contenedor anclado estrictamente al fondo */}
      <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end">
        
        {/* Título */}
        <h3 className="font-bold text-white text-xl line-clamp-2 leading-tight mb-3 drop-shadow-md">
          {title}
        </h3>
        
        {/* Contenedor flex para alinear Precio (Izquierda) y Botón (Derecha) */}
        <div className="flex items-center justify-between w-full">
          
          {/* Precio */}
          <p className="text-[#ff66c4] font-extrabold text-md drop-shadow-md">
            {precio}
          </p>
          
          {/* Botón con Icono SVG */}
          <button 
            type="button"
            onClick={handleAddToCart}
            aria-label={`Agregar ${title} al carrito`}
            className="px-8 py-2 bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white text-xs font-bold tracking-widest rounded-full uppercase transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5z"/>
            </svg>
          </button>
          
        </div>
      </div>
    </div>
  );
}