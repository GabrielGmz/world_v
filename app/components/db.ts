// components/db.ts

// Definimos la estructura que tendrá CADA producto
export interface Producto {
  id: number;
  name: string;
  category: string; // <-- ¡ESTO ES LO MÁS IMPORTANTE!
  price: number;
  image: string;
  description?: string; // Opcional
}

// ESTA ES TU BASE DE DATOS COMPLETA. 
// Aquí es donde agregas ABSOLUTAMENTE TODOS tus productos.
// Next.js se encargará de filtrarlos automáticamente por categoría.
export const INVENTARIO_COMPLETO: Producto[] = [
  // --- CATEGORÍA: ACCESORIOS ---
  {
    id: 1,
    name: 'Anillos',
    category: 'accesorios', // Debe coincidir con '/productos/accesorios' en tu NavBar
    price: 0.75,
    image: '/images/anillos.jpeg', // Reemplaza con tus imágenes reales
    },

  // --- CATEGORÍA: OBSQUETOS ---
  {
    id: 6,
    name: 'Tulipan de crochét rosa',
    category: 'obsequios',
    price: 15.00,
    image: '/images/tulipan.jpeg', // Reemplaza con tus imágenes reales
  },
  {
    id: 7,
    name: 'Tulipan de crochét amarillo',
    category: 'obsequios',
    price: 45.00,
    image: '/images/tulipan2.jpeg', // Reemplaza con tus imágenes reales
  },
  
  // Categoría: Cuidado Personal
    {
    id: 11,
    name: 'Crema para la piel - Stitch',
    category: 'cuidado-personal',
    price: 12.00,
    image: '/images/crema.png', // Reemplaza con tus imágenes reales
  },
    {
    id: 12,
    name: 'Crema para la piel - Snoopie',
    category: 'cuidado-personal',
    price: 12.00,
    image: '/images/crema2.png', // Reemplaza con tus imágenes reales
  },
    {
    id: 13,
    name: 'Crema para la piel - Snoopie 2',
    category: 'cuidado-personal',
    price: 12.00,
    image: '/images/crema3.png', // Reemplaza con tus imágenes reales
  },
  {
    id: 14,
    name: 'Crema para la piel - Snoopie 3',
    category: 'cuidado-personal',
    price: 12.00,
    image: '/images/crema_4.png', // Reemplaza con tus imágenes reales
  }
  // Agrega más productos aquí abajo de la misma manera...
];