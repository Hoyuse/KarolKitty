/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Star, Heart, ShoppingCart, ShieldCheck, Undo2, Truck, Sparkles, Check } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../utils';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductModal({
  product,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
}: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  if (!isOpen || !product) return null;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      
      {/* Backdrop custom glassblur */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-brand-on-surface/50 backdrop-blur-sm transition-opacity"
      ></div>

      {/* Modal Container */}
      <div className="bg-white rounded-3xl w-full max-w-3xl overflow-hidden relative z-10 kawaii-shadow max-h-[90vh] md:max-h-none overflow-y-auto flex flex-col md:flex-row border-2 border-brand-primary-container">
        
        {/* Close Button top-right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white/90 p-2 rounded-full text-brand-primary hover:text-brand-tertiary transition-transform duration-200 shadow-sm active:scale-90 hover:rotate-90 border border-brand-primary-container/20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Aspect: Big Product Image */}
        <div className="w-full md:w-1/2 bg-brand-background relative p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-brand-primary-container/20 min-h-[300px]">
          
          {/* Favorite trigger on image top-left */}
          <button
            onClick={() => onToggleFavorite(product.id)}
            className="absolute top-4 left-4 z-10 bg-white p-2.5 rounded-full text-brand-primary hover:text-brand-tertiary transition-all duration-200 shadow-sm hover:scale-110 border border-brand-primary-container/20"
            title="Añadir a deseos"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-brand-tertiary text-brand-tertiary' : ''}`} />
          </button>

          <img
            alt={product.name}
            className="w-full max-h-[380px] h-auto object-contain rounded-2xl drop-shadow-md transform hover:rotate-1 transition-transform duration-500"
            src={product.image}
            referrerPolicy="no-referrer"
          />

          <span className="absolute bottom-4 left-4 bg-white/95 px-3 py-1.5 rounded-full text-xs font-bold font-label text-brand-primary-fixed-dim bg-brand-primary text-white border border-brand-primary-container/30">
            {product.category}
          </span>
        </div>

        {/* Right Aspect: Context details */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[60vh] md:max-h-[500px]">
          
          <div className="space-y-4">
            
            {/* Title */}
            <div>
              <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-brand-on-surface tracking-tight pr-8">
                {product.name}
              </h2>

              <div className="flex items-center gap-1.5 mt-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-gray-200'}`} 
                    />
                  ))}
                </div>
                <span className="font-label text-xs font-bold text-brand-on-surface-variant">
                  {product.rating} / 5.0
                </span>
                <span className="text-gray-300 text-xs">|</span>
                <span className="font-label text-xs text-brand-on-primary-container/70 bg-brand-primary-container px-2 py-0.5 rounded-md font-semibold">
                  Disponible
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="text-3xl font-black font-headline text-brand-tertiary">
              {formatPrice(product.price * quantity)}
              {quantity > 1 && (
                <span className="text-xs font-medium text-brand-on-surface-variant ml-2">
                  ({formatPrice(product.price)} c/u)
                </span>
              )}
            </div>

            {/* Description */}
            <p className="font-body text-sm text-brand-on-surface-variant leading-relaxed font-semibold">
              {product.description}
            </p>

            {/* Features bullet checklist */}
            <div className="space-y-2 pt-2 border-t border-brand-primary-container/20">
              <span className="font-label text-xs font-bold uppercase tracking-wider text-brand-on-primary-fixed-variant">
                Detalles del Producto:
              </span>
              <ul className="text-xs text-brand-on-surface-variant space-y-1.5 font-medium font-body list-disc pl-4 decoration-brand-primary">
                {product.details.map((detail, idx) => (
                  <li key={idx} className="marker:text-brand-primary">
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Guarantees row */}
            <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-brand-primary-container/20 text-[10px] sm:text-xs">
              <div className="flex flex-col items-center text-center p-1 bg-brand-background rounded-xl">
                <Truck className="w-5 h-5 text-brand-primary mb-1" />
                <span className="font-bold">Envío Seguro</span>
              </div>
              <div className="flex flex-col items-center text-center p-1 bg-brand-background rounded-xl">
                <ShieldCheck className="w-5 h-5 text-brand-primary mb-1" />
                <span className="font-bold">Original</span>
              </div>
              <div className="flex flex-col items-center text-center p-1 bg-brand-background rounded-xl">
                <Undo2 className="w-5 h-5 text-brand-primary mb-1" />
                <span className="font-bold">Devolución</span>
              </div>
            </div>

          </div>

          {/* Sizer and Add button controls */}
          <div className="pt-6 space-y-4">
            
            {/* Quantity adjustment */}
            <div className="flex items-center justify-between bg-brand-background p-2 rounded-2xl border border-brand-primary-container/20">
              <span className="font-label text-xs font-bold text-brand-on-surface ml-2">
                Cantidad:
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDecrease}
                  className="w-8 h-8 rounded-full bg-white border border-brand-primary-container/30 flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white font-bold transition-all disabled:opacity-40"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="font-headline font-bold text-base text-brand-on-surface min-w-[20px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrease}
                  className="w-8 h-8 rounded-full bg-white border border-brand-primary-container/30 flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white font-bold transition-all"
                >
                  +
                </button>
              </div>
            </div>

            {/* Main Action buttons */}
            <button
              onClick={handleAdd}
              disabled={justAdded}
              className={`w-full py-4 rounded-full font-label text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
                justAdded 
                  ? 'bg-emerald-500 text-white cursor-default' 
                  : 'bg-brand-tertiary hover:bg-brand-tertiary/90 text-white'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-5 h-5 animate-scale" />
                  <span>¡Añadido con éxito! 💖</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  <span>Agregar {quantity} al carrito</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
