"use client";

import Image from 'next/image';
import { useCart } from './CartContext'; 
import { useState } from 'react'; // <-- IMPORTAMOS useState

export default function CartModal() {
  const { isCartOpen, setIsCartOpen, cart, removeFromCart, updateQuantity } = useCart();
  
  // NUEVO ESTADO: Controla si mostramos el carrito o la pantalla de "Copiado"
  const [checkoutStatus, setCheckoutStatus] = useState<'cart' | 'copied'>('cart');

  if (!isCartOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const instagramUser = "world.of_varieties"; 

  // --- FUNCIÓN ACTUALIZADA ---
  const handleInstagramCheckout = async () => {
    let mensaje = "¡Hola! ✨ Me gustaría pedir lo siguiente en World of Varieties:\n\n";
    
    cart.forEach(item => {
      mensaje += `🛍️ ${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}\n`;
    });
    
    mensaje += `\n💰 Total a pagar: $${totalAmount.toFixed(2)}\n\n`;
    mensaje += "¿Me podrían confirmar disponibilidad y métodos de pago, por favor? 🎀";

    try {
      // Copiamos al portapapeles
      await navigator.clipboard.writeText(mensaje);
      // Cambiamos la vista del modal a la pantalla de éxito
      setCheckoutStatus('copied');
    } catch (err) {
      console.error('Error al copiar el texto: ', err);
      // Si falla algo raro, los mandamos directo
      window.open(`https://ig.me/m/${instagramUser}`, '_blank');
    }
  };

  // Función para cerrar el modal y resetear la vista para la próxima vez
  const handleCloseModal = () => {
    setIsCartOpen(false);
    // Esperamos a que termine la animación de cerrado para resetear el estado
    setTimeout(() => setCheckoutStatus('cart'), 300);
  };

  // Función final que los lleva a IG
  const handleGoToInstagram = () => {
    window.open(`https://ig.me/m/${instagramUser}`, '_blank');
    handleCloseModal();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      
      {/* Fondo Oscuro / Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={handleCloseModal}
      ></div>

      {/* Modal Central */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Cabecera */}
        <div className="flex items-center justify-between p-6 border-b border-pink-50">
          <h2 className="text-2xl font-bold text-gray-800">
            {checkoutStatus === 'cart' ? (
              <>Tu Carrito <span className="text-pink-500">✨</span></>
            ) : (
              <>¡Casi listo! <span className="text-pink-500">🎀</span></>
            )}
          </h2>
          <button 
            type="button"
            onClick={handleCloseModal}
            aria-label="Cerrar carrito"
            title="Cerrar carrito"
            className="p-2 text-gray-400 hover:text-pink-500 bg-gray-50 hover:bg-pink-50 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* CONTENIDO DINÁMICO: Carrito o Pantalla de Éxito */}
        {checkoutStatus === 'copied' ? (
          
          /* --- PANTALLA AESTHETIC DE "COPIADO" --- */
          <div className="flex-1 overflow-y-auto p-10 flex flex-col items-center justify-center text-center animate-in zoom-in duration-300">
            <div className="w-24 h-24 bg-pink-50 text-pink-500 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-2xl font-extrabold text-gray-800 mb-3">¡Pedido Copiado! 📋</h3>
            <p className="text-gray-500 mb-8 leading-relaxed">
              El resumen de tu compra está listo. Ahora te llevaremos a nuestro Instagram.<br/><br/>
              Solo dale <strong className="text-pink-500">Pegar</strong> en el chat y envíanos el mensaje para coordinar la entrega.
            </p>
            <button
              onClick={handleGoToInstagram}
              className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-4 text-base font-bold text-white shadow-lg shadow-pink-200 hover:shadow-pink-300 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Ir a Instagram 🚀
            </button>
          </div>

        ) : (

          /* --- EL CARRITO NORMAL QUE YA TENÍAMOS --- */
          <>
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
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-100 border border-pink-50">
                        <Image
                          src={item.image} 
                          alt={item.name}
                          fill
                          unoptimized
                          className="object-cover object-center"
                        />
                      </div>

                      {/* Detalles */}
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between text-base font-medium text-gray-800">
                          <h3 className="line-clamp-1">{item.name}</h3>
                          <p className="ml-4 text-pink-600 font-bold">${item.price.toFixed(2)}</p>
                        </div>
                        
                        <div className="flex flex-1 items-end justify-between text-sm mt-2">
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

            {/* Pie del Modal (Resumen y Botón de Pago) */}
            {cart.length > 0 && (
              <div className="border-t border-pink-50 p-6 bg-gray-50/50">
                <div className="flex justify-between text-lg font-bold text-gray-800 mb-4">
                  <p>Total</p>
                  <p className="text-pink-600 text-xl">${totalAmount.toFixed(2)}</p>
                </div>
                
                <button
                  onClick={handleInstagramCheckout}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-4 text-base font-bold text-white shadow-lg shadow-pink-200 hover:shadow-pink-300 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>Pedir por Instagram</span>
                </button>
                
                <div className="mt-4 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    o{' '}
                    <button
                      type="button"
                      className="font-medium text-pink-500 hover:text-pink-600 underline"
                      onClick={handleCloseModal}
                    >
                      Seguir comprando
                    </button>
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}