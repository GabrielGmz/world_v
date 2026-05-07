"use client";

import Image from 'next/image';
import { useState } from 'react';
import { useCart } from './CartContext'; // Asegúrate de importar el contexto

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
};

export default function CardItem({ 
  title, 
  description, 
  descriptionFull,
  precio, 
  variants = [] 
}: CardItemProps) {
  
  // Guardamos LA VARIANTE ENTERA, no solo la imagen, para poder mandarla al carrito
  const [activeVariant, setActiveVariant] = useState<Variant>(variants?.[0] || null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Usamos la función de añadir al carrito que viene del contexto global
  const { addToCart } = useCart();

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleAddToCart = () => {
    // Limpiamos el precio (quitar el "$" y pasarlo a número)
    const numericPrice = parseFloat(precio.replace('$', ''));
    const numericId = Array.from(`${title}-${activeVariant.colorName}`).reduce(
      (acc, char) => acc + char.charCodeAt(0),
      0
    );
    
    addToCart({
      id: numericId, // ID único por producto y estilo
      name: title,
      price: numericPrice,
      quantity: 1,
      category: title,
      image: activeVariant.imageSrc
    });
    setIsModalOpen(false); // Cerramos el modal de detalles
  };

  if (!variants || variants.length === 0 || !activeVariant) {
    return <div className="p-4 text-red-400 bg-red-50 rounded-lg">Faltan las variantes</div>;
  }

  return (
    <>
      {/* TARJETA PRINCIPAL INMERSIVA */}
      <div 
        onClick={toggleModal}
        className="relative w-[360px] sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1.25rem)] lg:w-[calc(25%-1.25rem)] aspect-[4/5] min-w-[250px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group"
      >
        <Image 
          src={activeVariant.imageSrc} 
          alt={title} 
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:from-black/95 transition-colors duration-500"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end">
          <h2 className="text-2xl font-bold text-white tracking-tight mb-2 drop-shadow-lg group-hover:-translate-y-1 transition-transform duration-300">
            {title}
          </h2>
          <div className="flex items-center justify-between group-hover:-translate-y-1 transition-transform duration-300 delay-75">
            <span className="text-xl font-extrabold text-pink-300 drop-shadow-md">
              {precio}
            </span>
            <span className="text-xs font-semibold text-white/90 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full uppercase tracking-wider border border-white/30 group-hover:bg-pink-500 group-hover:border-pink-500 transition-all duration-300 shadow-sm">
              Ver opciones
            </span>
          </div>
        </div>
      </div>

      {/* MODAL RESPONSIVO (Bottom Sheet en móviles, Centrado en Desktop) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end md:items-center justify-center sm:p-4 animate-in fade-in duration-300">
          
          <div className="bg-white w-full sm:max-w-4xl sm:rounded-3xl rounded-t-3xl shadow-2xl relative flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh] overflow-hidden animate-in slide-in-from-bottom-8 md:slide-in-from-bottom-0 md:zoom-in-95 duration-300">
            
            {/* Botón Cerrar */}
            <button onClick={toggleModal} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 md:bg-gray-100 backdrop-blur-md text-gray-800 md:text-gray-500 hover:bg-pink-100 hover:text-pink-500 transition-colors z-10 shadow-sm md:shadow-none">
              ✕
            </button>

            {/* Columna Imagen (40% pantalla en móvil, 50% en desktop) */}
            <div className="relative w-full md:w-1/2 h-[40vh] md:h-auto bg-gray-100 shrink-0">
              <Image src={activeVariant.imageSrc} alt={title} fill className="object-cover " />
            </div>

            {/* Columna Contenido (Scrollable) */}
            <div className="w-full md:w-1/2 flex flex-col p-6 md:p-8 overflow-y-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{title}</h3>
              <p className="text-2xl text-emerald-500 font-extrabold mb-4">{precio}</p>
              
              <div className="text-sm text-gray-600 mb-6 leading-relaxed">
                {descriptionFull || description}
              </div>

              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-800 mb-3 flex items-center justify-between">
                  <span>Selecciona tu estilo:</span>
                  <span className="text-pink-500 font-bold">{activeVariant.colorName}</span>
                </p>
                <div className="flex flex-wrap gap-3">
                  {variants.map((variant, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveVariant(variant)}
                      className={`w-12 h-12 flex items-center justify-center rounded-full text-sm font-bold transition-all duration-300 focus:outline-none ${
                        activeVariant.imageSrc === variant.imageSrc 
                          ? 'bg-pink-400 text-white shadow-lg shadow-pink-200 scale-110 ring-4 ring-pink-50' 
                          : 'bg-gray-50 text-gray-500 border-2 border-gray-100 hover:bg-gray-100 hover:border-pink-200'
                      }`}
                      title={variant.colorName}
                    >
                      {variant.numberStyle}
                    </button>
                  ))}
                </div>
              </div>

              {/* Botón flotante al final del contenido */}
              <div className="mt-auto pt-4 border-t border-gray-100 sticky bottom-0 bg-white">
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-pink-400 to-pink-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  Añadir al carrito
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}