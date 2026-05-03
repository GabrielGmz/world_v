"use client";

import Image from 'next/image';
import { useState } from 'react';
import { useCart } from './CartContext'; // Ajusta la ruta si es necesario

export default function CartSidebar() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [userName, setUserName] = useState('');

  const handleWhatsAppOrder = () => {
    if (!userName.trim()) return alert("Por favor, ingresa tu nombre.");

    // Construimos el mensaje para WhatsApp
    let message = `*¡Hola! Soy ${userName.trim()} y quiero hacer un pedido:*\n\n`;
    
    cart.forEach(item => {
      message += `▪ ${item.quantity}x ${item.title} (Estilo: ${item.variant.colorName}) - $${(item.price * item.quantity).toFixed(2)}\n`;
    });
    
    message += `\n*Total a pagar: $${cartTotal.toFixed(2)}*`;

    // Reemplaza con tu número (El 503 es el código de país, ajústalo si es necesario)
    const phoneNumber = "503 64427053"; 
    const whatsappUrl = `https://wa.me/?text=urlencodedtext.${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  };

  if (!isCartOpen && !isCheckoutOpen) return null;

  return (
    <>
      {/* Fondo oscuro para cerrar el carrito al hacer clic fuera */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Panel del Carrito (Deslizable desde la derecha) */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Tu Carrito</h2>
          <button onClick={() => setIsCartOpen(false)} className="p-2 text-gray-400 hover:text-pink-500 rounded-full hover:bg-pink-50 transition-colors">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">Tu carrito está vacío.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 bg-gray-50 p-3 rounded-2xl relative">
                  {/* Botón Eliminar */}
                  <button onClick={() => removeFromCart(item.id)} className="absolute top-2 right-2 text-gray-300 hover:text-red-500 transition-colors">✕</button>
                  
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                    <Image src={item.variant.imageSrc} alt={item.title} fill className="object-cover" />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h3 className="font-bold text-gray-800 text-sm">{item.title}</h3>
                      <p className="text-xs text-pink-500 font-medium">Estilo: {item.variant.colorName}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <p className="font-bold text-emerald-500">${item.price.toFixed(2)}</p>
                      
                      {/* Controles de Cantidad */}
                      <div className="flex items-center gap-3 bg-white px-2 py-1 rounded-lg border border-gray-100 shadow-sm">
                        <button onClick={() => updateQuantity(item.id, -1)} className="text-gray-400 hover:text-pink-500 font-bold px-1">−</button>
                        <span className="text-xs font-bold text-gray-700 w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="text-gray-400 hover:text-pink-500 font-bold px-1">+</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-5 bg-white border-t border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600 font-medium">Total</span>
              <span className="text-2xl font-extrabold text-emerald-500">${cartTotal.toFixed(2)}</span>
            </div>
            <button 
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full bg-gradient-to-r from-pink-400 to-pink-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300 hover:-translate-y-0.5 transition-all"
            >
              Pedir
            </button>
          </div>
        )}
      </div>

      {/* Mini Modal de Checkout (Nombre del usuario) */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl relative">
            <button onClick={() => setIsCheckoutOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-pink-500">✕</button>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Ya casi está listo</h3>
            <p className="text-sm text-gray-500 mb-5">¿A qué nombre prepararemos este pedido?</p>
            
            <input 
              type="text" 
              placeholder="Ej. Gabriel" 
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all"
            />
            
            <button 
              onClick={handleWhatsAppOrder}
              className="w-full bg-[#25D366] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-green-200 hover:shadow-xl hover:shadow-green-300 hover:-translate-y-0.5 transition-all flex justify-center items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              Confirmar pedido
            </button>
          </div>
        </div>
      )}
    </>
  );
}