import React from 'react';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/helpers';

const CartDrawer: React.FC = () => {
  const { isCartOpen, closeCart, items, updateQuantity, removeFromCart, subtotal } = useCart();

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-slate-900">Your Cart ({items.length})</h2>
          <button onClick={closeCart} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-slate-500">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center text-slate-500 mt-10">
              <p>Your cart is currently empty.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 border-b border-gray-50 pb-6 last:border-0">
                {/* Image */}
                <div className="w-20 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-medium text-slate-900 line-clamp-2">{item.name}</h3>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Size: {item.size} | Color: {item.color}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity Control */}
                    <div className="flex items-center border border-gray-200 rounded-md">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 px-2 text-gray-500 hover:bg-gray-50"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-sm px-2 font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 px-2 text-gray-500 hover:bg-gray-50"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    {/* Price */}
                    <p className="font-semibold text-sm text-slate-900">{formatCurrency(item.price)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-6 bg-gray-50">
            <div className="flex justify-between items-center mb-4 text-slate-900">
              <span className="font-medium">Subtotal</span>
              <span className="font-bold text-lg">{formatCurrency(subtotal)}</span>
            </div>
            <p className="text-xs text-gray-500 mb-6">Taxes and shipping calculated at checkout</p>
            <button className="w-full bg-slate-900 text-white font-semibold py-4 rounded-lg hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl active:scale-[0.98]">
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
