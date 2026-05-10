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
    name: "Anillos",
    category: "accesorios", // Debe coincidir con '/productos/accesorios' en tu NavBar
    price: 0.75,
    image: "/images/accesorios/anillos.jpeg", // Reemplaza con tus imágenes reales
  },
  {
    id: 2,
    name: "Moño Blanco",
    category: "accesorios",
    price: 1.0,
    image: "/images/accesorios/moño.png",
  },
  {
    id: 3,
    name: "Moño Rosa",
    category: "accesorios",
    price: 1.0,
    image: "/images/accesorios/moño_2.png",
  },
  {
    id: 4,
    name: "Moño Dorado",
    category: "accesorios",
    price: 1.0,
    image: "/images/accesorios/moño3.png",
  },
  {
    id: 5,
    name: "Gancho 1",
    category: "accesorios",
    price: 15.0,
    image: "/images/accesorios/gancho_1.png", // Reemplaza con tus imágenes reales
  },
  {
    id: 6,
    name: "Gancho 2",
    category: "accesorios",
    price: 15.0,
    image: "/images/accesorios/gancho__2.png", // Reemplaza con tus imágenes reales
  },
  {
    id: 7,
    name: "Gancho 3",
    category: "accesorios",
    price: 15.0,
    image: "/images/accesorios/gancho___3.png", // Reemplaza con tus imágenes reales
  },
  {
    id: 8,
    name: "Gancho 4",
    category: "accesorios",
    price: 15.0,
    image: "/images/accesorios/gancho____4.png", // Reemplaza con tus imágenes reales
  },
  {
    id: 9,
    name: "Gancho 5",
    category: "accesorios",
    price: 15.0,
    image: "/images/accesorios/gancho_____5.png", // Reemplaza con tus imágenes reales
  },

  // Categoría: Obsequios
  {
    id: 10,
    name: "Tulipan de crochét rosa",
    category: "obsequios",
    price: 15.0,
    image: "/images/obsequios/tulipan.jpeg", // Reemplaza con tus imágenes reales
  },
  {
    id: 11,
    name: "Tulipan de crochét amarillo",
    category: "obsequios",
    price: 45.0,
    image: "/images/obsequios/tulipan2.jpeg", // Reemplaza con tus imágenes reales
  },

  // Categoría: Cuidado Personal
  {
    id: 12,
    name: "Crema para la piel - Stitch",
    category: "cuidado-personal",
    price: 12.0,
    image: "/images/cuidado_personal/crema.png", // Reemplaza con tus imágenes reales
  },
  {
    id: 13,
    name: "Crema para la piel - Stich 2",
    category: "cuidado-personal",
    price: 12.0,
    image: "/images/cuidado_personal/crema6.png", // Reemplaza con tus imágenes reales
  },
  {
    id: 14,
    name: "Crema para la piel - Stich 3",
    category: "cuidado-personal",
    price: 12.0,
    image: "/images/cuidado_personal/crema1.png", // Reemplaza con tus imágenes reales
  },
  {
    id: 15,
    name: "Crema para la piel - Snoopie",
    category: "cuidado-personal",
    price: 12.0,
    image: "/images/cuidado_personal/crema2.png", // Reemplaza con tus imágenes reales
  },
  {
    id: 16,
    name: "Crema para la piel - Snoopie 2",
    category: "cuidado-personal",
    price: 12.0,
    image: "/images/cuidado_personal/crema3.png", // Reemplaza con tus imágenes reales
  },
  {
    id: 17,
    name: "Crema para la piel - Snoopie 3",
    category: "cuidado-personal",
    price: 12.0,
    image: "/images/cuidado_personal/crema_4.png", // Reemplaza con tus imágenes reales
  },
  {
    id: 18,
    name: "Labial Gloss 1",
    category: "cuidado-personal",
    price: 8.0,
    image: "/images/cuidado_personal/L_1.png", // Reemplaza con tus imágenes reales
  },
  {
    id: 19,
    name: "Labial Gloss 2",
    category: "cuidado-personal",
    price: 8.0,
    image: "/images/cuidado_personal/L__2.png",
  },
  {
    id: 20,
    name: "Labial Gloss 3",
    category: "cuidado-personal",
    price: 8.0,
    image: "/images/cuidado_personal/L___3.png",
  },
  {
    id: 21,
    name: "Labial Gloss 4",
    category: "cuidado-personal",
    price: 8.0,
    image: "/images/cuidado_personal/L____4.png",
  },
  {
    id: 22,
    name: "Labial Gloss 5",
    category: "cuidado-personal",
    price: 8.0,
    image: "/images/cuidado_personal/L______5.png",
  },
  {
    id: 23,
    name: "Labial Gloss 6",
    category: "cuidado-personal",
    price: 8.0,
    image: "/images/cuidado_personal/L______6.png",
  },
  {
    id: 24,
    name: "Labial Gloss 7",
    category: "cuidado-personal",
    price: 8.0,
    image: "/images/cuidado_personal/L2_1.png",
  },
  {
    id: 25,
    name: "Labial Gloss 8",
    category: "cuidado-personal",
    price: 8.0,
    image: "/images/cuidado_personal/L2__2.png",
  },
  {
    id: 26,
    name: "Labial Gloss 9",
    category: "cuidado-personal",
    price: 8.0,
    image: "/images/cuidado_personal/L2___3.png",
  },
  {
    id: 27,
    name: "Labial Gloss 10",
    category: "cuidado-personal",
    price: 8.0,
    image: "/images/cuidado_personal/L2____4.png",
  },
  {
    id: 28,
    name: "Lapiz para ojos",
    category: "cuidado-personal",
    price: 8.0,
    image: "/images/cuidado_personal/maquillaje.jpeg",
  },
  {
    id: 29,
    name: "Lapiz para ojos 2",
    category: "cuidado-personal",
    price: 8.0,
    image: "/images/cuidado_personal/maquillaje2.jpeg",
  },
  {
    id: 30,
    name: "Lapiz para ojos 3",
    category: "cuidado-personal",
    price: 8.0,
    image: "/images/cuidado_personal/maquillaje3.jpeg",
  },
  {
    id: 31,
    name: "Lapiz para ojos 4",
    category: "cuidado-personal",
    price: 8.0,
    image: "/images/cuidado_personal/maquillaje4.jpeg",
  },
  {
    id: 32,
    name: "Gloss Labial",
    category: "cuidado-personal",
    price: 8.0,
    image: "/images/cuidado_personal/gloss_1.png",
  },
  {
    id: 33,
    name: "Gloss Labial 2",
    category: "cuidado-personal",
    price: 8.0,
    image: "/images/cuidado_personal/gloss__2.png",
  },
  {
    id: 34,
    name: "Gloss Labial 3",
    category: "cuidado-personal",
    price: 8.0,
    image: "/images/cuidado_personal/gloss___3.png",
  },
  {
    id: 35,
    name: "Gloss Labial 4",
    category: "cuidado-personal",
    price: 8.0,
    image: "/images/cuidado_personal/gloss____4.png",
  },
  {
    id: 36,
    name: "Gloss Labial 5",
    category: "cuidado-personal",
    price: 8.0,
    image: "/images/cuidado_personal/gloss_____5.png",
  },
  {
    id: 37,
    name: "Gloss Labial 6",
    category: "cuidado-personal",
    price: 8.0,
    image: "/images/cuidado_personal/gloss______6.png",
  },
  // Reemplaza con tus imágenes reales
  // Agrega más productos aquí abajo de la misma manera...
];
