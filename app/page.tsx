"use client";

import CardItem from "./components/CardItem";
import { INVENTARIO_COMPLETO } from "./components/db"; // Ajusta la ruta si es necesario

type ProductoInventario = (typeof INVENTARIO_COMPLETO)[number];

export default function Home() {
  
  // 1. SELECCIONAMOS LOS PRODUCTOS DESTACADOS
  // Aquí puedes elegir los IDs específicos que quieres que aparezcan en el Inicio
  // Por ejemplo, elegiremos uno de cada tipo para que se vea variado:
  const idsDestacados = [12, 18, 28, 32, 1, 2, 10]; // IDs de Crema, Labial, Lapiz, Gloss, Anillos, Moño y Tulipan
  
  const productosDestacados = INVENTARIO_COMPLETO.filter((p: ProductoInventario) => 
    idsDestacados.includes(p.id)
  );

  return (
    <main className="min-h-screen bg-linear-to-b from-white to-pink-50/40 py-10 px-4 sm:px-6 lg:px-8 font-sans flex flex-col items-center">
      <div className="w-full max-w-6xl">
        
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-purple-400 mb-10 drop-shadow-sm tracking-tight">
          Productos Destacados
        </h2>

        <div>
          <div className="flex items-center mb-6">
            <div className="ml-4 grow h-px bg-linear-to-r from-pink-200 to-transparent opacity-70"></div>
          </div>

          {/* CONTENEDOR FLEX: Ahora mapeamos la base de datos */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            
            {productosDestacados.map((producto: ProductoInventario, index: number) => (
              <CardItem
                key={producto.id}
                title={producto.name}
                description={producto.description || "Producto exclusivo de nuestra colección aesthetic."}
                precio={`$${producto.price.toFixed(2)}`}
                // Optimizamos la carga: las primeras 4 fotos cargan rápido
                priority={index < 4}
                // Adaptamos el formato de la DB al formato de variantes que pide CardItem
                variants={[
                  {
                    colorName: "Original",
                    numberStyle: "1",
                    imageSrc: producto.image,
                  }
                ]}
              />
            ))}

          </div>
        </div>
      </div>
    </main>
  );
}