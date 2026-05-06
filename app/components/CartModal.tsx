"use client";

import Image from 'next/image';
import { useCart } from './CartContext'; 

export default function CartModal() {
  const { isCartOpen, setIsCartOpen, cart, removeFromCart, updateQuantity } = useCart();

  if (!isCartOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      ></div>

      {/* Modal Central */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Cabecera */}
        <div className="flex items-center justify-between p-6 border-b border-pink-50">
          <h2 className="text-2xl font-bold text-gray-800">
            Tu Carrito <span className="text-pink-500">✨</span>
          </h2>
          <button 
            type="button"
            aria-label="Cerrar carrito"
            title="Cerrar carrito"
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-gray-400 hover:text-pink-500 bg-gray-50 hover:bg-pink-50 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cuerpo del Modal */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-10">
              <div className="text-gray-300 mb-4 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="text-gray-500 font-medium">Tu carrito está vacío</p>
              <p className="text-sm text-gray-400 mt-1">¡Agrega algunos accesorios hermosos!</p>
            </div>
          ) : (
            <ul className="space-y-6">
              {cart.map((item) => (
                <li key={item.id} className="flex items-center gap-4">
                  
                  {/* AQUÍ ESTÁ LA CORRECCIÓN: Contenedor relative y la imagen real */}
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-100 border border-pink-50">
                    <Image
                      src={item.image} 
                      alt={item.name}
                      fill
                      unoptimized
                      className="object-cover object-center"
                    />
                  </div>

                  {/* Detalles del producto */}
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between text-base font-medium text-gray-800">
                      {/* AQUÍ ESTÁ LA OTRA CORRECCIÓN: Muestra el nombre real del producto */}
                      <h3 className="line-clamp-1">{item.name}</h3>
                      <p className="ml-4 text-pink-600 font-bold">${item.price.toFixed(2)}</p>
                    </div>
                    
                    <div className="flex flex-1 items-end justify-between text-sm mt-2">
                      {/* Controles de cantidad */}
                      <div className="flex items-center border border-gray-200 rounded-full px-2 py-1">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-gray-500 hover:text-pink-500 px-2 font-bold"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-2 font-medium text-gray-700">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-gray-500 hover:text-pink-500 px-2 font-bold"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="font-medium text-red-400 hover:text-red-500 transition-colors bg-red-50 px-3 py-1.5 rounded-full"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Pie del Modal */}
        {cart.length > 0 && (
          <div className="border-t border-pink-50 p-6 bg-gray-50/50">
            <div className="flex justify-between text-lg font-bold text-gray-800 mb-4">
              <p>Total</p>
              <p className="text-pink-600 text-xl">${totalAmount.toFixed(2)}</p>
            </div>
            <button
              className="w-full flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-4 text-base font-bold text-white shadow-lg shadow-pink-200 hover:shadow-pink-300 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Proceder al pago
            </button>
            <div className="mt-4 flex justify-center text-center text-sm text-gray-500">
              <p>
                o{' '}
                <button
                  type="button"
                  className="font-medium text-pink-500 hover:text-pink-600 underline"
                  onClick={() => setIsCartOpen(false)}
                >
                  Continuar comprando
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}