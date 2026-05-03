import Link from 'next/link';

export default function Footer() {
  return (
    // 1. Contenedor principal: Fondo blanco puro con una línea superior muy fina
    <footer className="bg-white border-t border-pink-100/50 pt-16 pb-8 mt-auto">
      
      {/* 2. Alineación: max-w-5xl mantiene la consistencia con el NavBar y el catálogo */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 3. Grid de 3 columnas para organizar la información */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          
          {/* Columna 1: Marca y descripción */}
          <div>
            <Link 
              href="/" 
              className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 tracking-tight inline-block mb-4"
            >
              World~V
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed pr-4">
              Descubre tu propio estilo. Ofrecemos los mejores productos para el cuidado de tu piel y accesorios que te harán brillar cada día.
            </p>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div>
            <h4 className="text-gray-800 font-bold mb-5 tracking-wide">Explorar</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-gray-500 hover:text-pink-500 transition-colors duration-200">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-500 hover:text-pink-500 transition-colors duration-200">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-500 hover:text-pink-500 transition-colors duration-200">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-500 hover:text-pink-500 transition-colors duration-200">
                  Políticas de Envío
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Redes Sociales (Botón de Instagram) */}
          <div>
            <h4 className="text-gray-800 font-bold mb-5 tracking-wide">Síguenos</h4>
            <p className="text-sm text-gray-500 mb-4">
              Únete a nuestra comunidad y entérate de las últimas novedades.
            </p>
            <div className="flex space-x-4">
              
              {/* Botón de Instagram */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                // Efecto mágico: Fondo rosa pastel normal, pero al hacer hover se pinta del degradado de Instagram
                className="w-11 h-11 flex items-center justify-center rounded-full bg-pink-50 text-pink-400 hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600 hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-pink-200 transition-all duration-300"
                aria-label="Síguenos en Instagram"
              >
                {/* SVG del logo de Instagram */}
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              
            </div>
          </div>
        </div>

        {/* 4. Barra inferior de copyright */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400 font-medium">
            &copy; {new Date().getFullYear()} World~V. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-xs text-gray-400 hover:text-pink-400 transition-colors">
              Privacidad
            </Link>
            <Link href="#" className="text-xs text-gray-400 hover:text-pink-400 transition-colors">
              Términos
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}