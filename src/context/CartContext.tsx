import React, { createContext, useContext, useState, useMemo } from 'react';
import type { CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (newItem: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === newItem.id
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === existingItem.id ? { ...item, quantity: item.quantity + newItem.quantity } : item
        );
      }
      return [...prevItems, newItem];
    });
    openCart();
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) => prev.map((item) => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const subtotal = useMemo(() => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [items]);

  return (
    <CartContext.Provider value={{ items, isCartOpen, openCart, closeCart, addToCart, removeFromCart, updateQuantity, subtotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
