"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Tipos de datos
type Variant = {
  colorName: string;
  numberStyle: string | number;
  imageSrc: string;
};

type CartItemType = {
  id: string;
  title: string;
  price: number;
  variant: Variant;
  quantity: number;
};

type CartContextType = {
  cart: CartItemType[];
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  addToCart: (item: CartItemType) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, amount: number) => void;
  cartTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  // 1. Inicializamos desde localStorage solo en el navegador
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

  // 2. GUARDAR EN LOCALSTORAGE CADA VEZ QUE EL CARRITO CAMBIE
  useEffect(() => {
    localStorage.setItem('worldv_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (newItem: CartItemType) => {
    setCart((prev) => {
      const existingItem = prev.find(item => item.id === newItem.id);
      if (existingItem) {
        return prev.map(item => 
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, newItem];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, amount: number) => {
    setCart((prev) => prev.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + amount;
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