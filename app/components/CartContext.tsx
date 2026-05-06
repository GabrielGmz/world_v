"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 1. NUEVA ESTRUCTURA LIMPIA
// Es idéntica a los productos de tu db.ts, pero le sumamos la propiedad "quantity"
export type CartItemType = {
  id: number; // Ahora es number, igual que en tu db.ts
  name: string; // Cambiamos title por name
  category: string; // Reemplazamos el complejo Variant por category
  price: number;
  image: string; // La imagen directa en la raíz del objeto
  quantity: number;
};

type CartContextType = {
  cart: CartItemType[];
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  addToCart: (item: CartItemType) => void;
  removeFromCart: (id: number) => void; // Actualizado a number
  updateQuantity: (id: number, amount: number) => void; // Actualizado a number
  cartTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  // Inicializamos desde localStorage solo en el navegador
  const [cart, setCart] = useState<CartItemType[]>(() => {
    if (typeof window === 'undefined') return [];

    const savedCart = localStorage.getItem('worldv_cart');
    if (!savedCart) return [];

    try {
      return JSON.parse(savedCart);
    } catch (error) {
      console.error('Error al leer el carrito guardado:', error);
      return [];
    }
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  // GUARDAR EN LOCALSTORAGE CADA VEZ QUE EL CARRITO CAMBIE
  useEffect(() => {
    localStorage.setItem('worldv_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (newItem: CartItemType) => {
    setCart((prev) => {
      const existingItem = prev.find(item => item.id === newItem.id);
      if (existingItem) {
        return prev.map(item => 
          item.id === newItem.id ? { ...item, quantity: item.quantity + newItem.quantity } : item
        );
      }
      return [...prev, newItem];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, amount: number) => {
    setCart((prev) => prev.map(item => {
      if (item.id === id) {
        // En lugar de sumar o restar por amount, establecemos la cantidad exacta
        // Esto evita bugs si el usuario le da clics muy rápido
        const newQuantity = amount; 
        return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, isCartOpen, setIsCartOpen, addToCart, removeFromCart, updateQuantity, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de un CartProvider");
  return context;
};