import CardItem from "./components/CardItem";

export default function Home() {
  // Definimos las variaciones del producto (colores y sus imágenes)
  const imageSizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

  const cremaVariants = [
    {
      colorName: "Estilo 1",
      numberStyle: "1",
      imageSrc: "/images/crema1.png",
      sizes: imageSizes,
      loading: "eager" as const,
    },
    {
      colorName: "Estilo 2",
      numberStyle: "2",
      imageSrc: "/images/crema2.png",
      sizes: imageSizes,
      loading: "lazy" as const,
    },
    {
      colorName: "Estilo 3",
      numberStyle: "3",
      imageSrc: "/images/crema.png",
      sizes: imageSizes,
      loading: "lazy" as const,
    },
    {
      colorName: "Estilo 4",
      numberStyle: "4",
      imageSrc: "/images/crema_4.png",
      sizes: imageSizes,
      loading: "lazy" as const,
    },
    {
      colorName: "Estilo 5",
      numberStyle: "5",
      imageSrc: "/images/crema4.png",
      sizes: imageSizes,
      loading: "lazy" as const,
    },
    {
      colorName: "Estilo 6",
      numberStyle: "6",
      imageSrc: "/images/crema6.png",
      sizes: imageSizes,
      loading: "lazy" as const,
    },
  ];

  const labialesVariants = [
    {
      colorName: "Rojo Intenso",
      numberStyle: "1",
      imageSrc: "/images/labial_1.jpeg",
      sizes: imageSizes,
      loading: "eager" as const,
    },
    {
      colorName: "Rosa Suave",
      numberStyle: "2",
      imageSrc: "/images/labial_2.jpeg",
      sizes: imageSizes,
      loading: "lazy" as const,
    },
    {
      colorName: "Nude Elegante",
      numberStyle: "3",
      imageSrc: "/images/labial_3.jpeg",
      sizes: imageSizes,
      loading: "lazy" as const,
    },
    {
      colorName: "Vino Profundo",
      numberStyle: "4",
      imageSrc: "/images/labial_4.jpeg",
      sizes: imageSizes,
      loading: "lazy" as const,
    },
    {
      colorName: "Coral Vibrante",
      numberStyle: "5",
      imageSrc: "/images/labial_5.jpeg",
      sizes: imageSizes,
      loading: "lazy" as const,
    },
    {
      colorName: "Fucsia Brillante",
      numberStyle: "6",
      imageSrc: "/images/labial_6.jpeg",
      sizes: imageSizes,
      loading: "lazy" as const,
    },
  ];

  const lapizVariants = [
    {
      colorName: "Estilo 1",
      numberStyle: "1",
      imageSrc: "/images/maquillaje.jpeg",
      sizes: imageSizes,
      loading: "eager" as const,
    },
    {
      colorName: "Estilo 2",
      numberStyle: "2",
      imageSrc: "/images/maquillaje2.jpeg",
      sizes: imageSizes,
      loading: "lazy" as const,
    },
    {
      colorName: "Estilo 3",
      numberStyle: "3",
      imageSrc: "/images/maquillaje3.jpeg",
      sizes: imageSizes,
      loading: "lazy" as const,
    },
    {
      colorName: "Estilo 4",
      numberStyle: "4",
      imageSrc: "/images/maquillaje4.jpeg",
      sizes: imageSizes,
      loading: "lazy" as const,
    },
  ];

  const glossVariants = [
    {
      colorName: "Estilo 1",
      numberStyle: "1",
      imageSrc: "/images/gloss_.png",
      sizes: imageSizes,
      loading: "eager" as const,
    }
  ];

  const anillosVariants = [
    {
      colorName: "Estilo 1",
      numberStyle: "1",
      imageSrc: "/images/anillos.jpeg",
      sizes: imageSizes,
      loading: "eager" as const,
    },
  ];

  const moñoVariants = [
    {
      colorName: "Estilo 1",
      numberStyle: "1",
      imageSrc: "/images/moño.png",
      sizes: imageSizes,
      loading: "eager" as const,
    },
    {
      colorName: "Estilo 2",
      numberStyle: "2",
      imageSrc: "/images/moño_2.png",
      sizes: imageSizes,
      loading: "lazy" as const,
    },
    {
      colorName: "Estilo 3",
      numberStyle: "3",
      imageSrc: "/images/moño3.png",
      sizes: imageSizes,
      loading: "lazy" as const,
    },
  ];

  const tulipanVariants = [
    {
      colorName: "Estilo 1",
      numberStyle: "1",
      imageSrc: "/images/tulipan.jpeg",
      sizes: imageSizes,
      loading: "eager" as const,
    },
    {
      colorName: "Estilo 2",
      numberStyle: "2",
      imageSrc: "/images/tulipan2.jpeg",
      sizes: imageSizes,
      loading: "lazy" as const,
    },
  ];

  return (
    // 1. Fondo súper limpio: Blanco puro arriba que se difumina a un rosado casi imperceptible abajo.
    <main className="min-h-screen bg-gradient-to-b from-white to-pink-50/40 py-10 px-4 sm:px-6 lg:px-8 font-sans flex flex-col items-center">
      {/* 2. Contenedor más compacto (max-w-5xl) para que no se estire demasiado a los lados */}
      <div className="w-full max-w-6xl">
        {/* 3. Título Principal: Más delicado (text-3xl), sin ser gigantesco, pero manteniendo la elegancia */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-10 drop-shadow-sm tracking-tight">
          Nuestros Productos
        </h2>

        <div>
          {/* 4. Categoría 1: Letras más finas y grises, línea divisoria súper delgadita (h-[1px]) */}
          <div className="flex items-center mb-6">
            <h3 className="text-xl font-bold text-gray-700 tracking-tight">
              Belleza
            </h3>
            <div className="ml-4 flex-grow h-[1px] bg-gradient-to-r from-pink-200 to-transparent opacity-70"></div>
          </div>

          {/* 5. Gaps más proporcionados (gap-5) para que las tarjetas estén más cerca unas de otras */}
          <div className="flex flex-wrap justify-center sm:justify-center gap-4 mb-12">
            <CardItem
              title="Crema para la piel"
              description="Nuestra crema es una mezcla única de ingredientes naturales diseñada para hidratar profundamente y rejuvenecer tu piel."
              descriptionFull="Nuestra crema para la piel es una mezcla única de ingredientes naturales diseñada para hidratar profundamente y rejuvenecer tu piel. Con extractos botánicos y vitaminas esenciales, esta crema nutre tu piel, dejándola suave, radiante y revitalizada. Perfecta para todo tipo de piel, nuestra fórmula ligera se absorbe rápidamente, proporcionando una hidratación duradera sin sensación grasosa. ¡Descubre el secreto para una piel saludable y luminosa con nuestra crema para la piel!"
              precio="$2.99"
              variants={cremaVariants}
            />
            <CardItem
              title="Labiales"
              description="Nuestros labiales son una selección de tonos que destacan tu sonrisa con fórmulas hidratantes y vibrantes."
              descriptionFull="Nuestros labiales son una selección de tonos que destacan tu sonrisa. Con fórmulas hidratantes y colores vibrantes, estos labiales te hacen lucir radiante todo el día."
              precio="$2.99"
              variants={labialesVariants}
            />
            <CardItem
              title="Lapiz de ojos"
              description="Nuestro lápiz de ojos es una selección de tonos que destacan tu sonrisa con fórmulas hidratantes y vibrantes."
              descriptionFull="Nuestro lápiz de ojos es una selección de tonos que destacan tu sonrisa. Con fórmulas hidratantes y colores vibrantes, estos productos te hacen lucir radiante todo el día."
              precio="$2.99"
              variants={lapizVariants}
            />
              <CardItem
              title="Gloss"
              description="Nuestro gloss es una selección de tonos que destacan tu sonrisa con fórmulas hidratantes y vibrantes."
              descriptionFull="Nuestro gloss es una selección de tonos que destacan tu sonrisa. Con fórmulas hidratantes y colores vibrantes, estos productos te hacen lucir radiante todo el día."
              precio="$2.99"
              variants={glossVariants}
            />
          </div>

          {/* Categoría 2 */}
          <div className="flex items-center mb-6 mt-2">
            <h3 className="text-xl font-bold text-gray-700 tracking-tight">
              Accesorios
            </h3>
            <div className="ml-4 flex-grow h-[1px] bg-gradient-to-r from-pink-200 to-transparent opacity-70"></div>
          </div>

          <div className="flex flex-wrap justify-center sm:justify-start gap-5 pb-8">
            <CardItem
              title="Anillos"
              description="Nuestros accesorios de moda son el complemento perfecto para cualquier outfit, con diseños elegantes y modernos."
              descriptionFull="Nuestros accesorios de moda son el complemento perfecto para cualquier outfit. Con diseños elegantes y modernos, estos accesorios añaden un toque de estilo a tu look diario. Desde collares delicados hasta pulseras llamativas, nuestra colección ofrece opciones para cada ocasión. ¡Eleva tu estilo con nuestros accesorios de moda y haz que cada día sea una declaración de moda!"
              precio="$2.99"
              variants={anillosVariants}
            />
            <CardItem
              title="Moños"
              description="Nuestros accesorios de moda son el complemento perfecto para cualquier outfit, con diseños elegantes y modernos."
              descriptionFull="Nuestros accesorios de moda son el complemento perfecto para cualquier outfit. Con diseños elegantes y modernos, estos accesorios añaden un toque de estilo a tu look diario. Desde collares delicados hasta pulseras llamativas, nuestra colección ofrece opciones para cada ocasión. ¡Eleva tu estilo con nuestros accesorios de moda y haz que cada día sea una declaración de moda!"
              precio="$2.99"
              variants={moñoVariants}
            />
          </div>

<div className="flex items-center mb-6 mt-2">
            <h3 className="text-xl font-bold text-gray-700 tracking-tight">
              Obsequios
            </h3>
            <div className="ml-4 flex-grow h-[1px] bg-gradient-to-r from-pink-200 to-transparent opacity-70"></div>
          </div>

          <div className="flex flex-wrap justify-center sm:justify-start gap-5 pb-8">
            <CardItem
              title="Tulipanes de crochét"
              description="Nuestros accesorios de moda son el complemento perfecto para cualquier outfit, con diseños elegantes y modernos."
              descriptionFull="Nuestros accesorios de moda son el complemento perfecto para cualquier outfit. Con diseños elegantes y modernos, estos accesorios añaden un toque de estilo a tu look diario. Desde collares delicados hasta pulseras llamativas, nuestra colección ofrece opciones para cada ocasión. ¡Eleva tu estilo con nuestros accesorios de moda y haz que cada día sea una declaración de moda!"
              precio="$2.99"
              variants={tulipanVariants}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
