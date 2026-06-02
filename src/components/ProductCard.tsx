/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Heart, ShoppingCart, Star, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../utils';

interface ProductCardProps {
  key?: string;
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onOpenDetails: (product: Product) => void;
}

export default function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  onOpenDetails,
}: ProductCardProps) {
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(product.id);
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  return (
    <div 
      onClick={() => onOpenDetails(product)}
      className="bg-white p-4 rounded-3xl kawaii-shadow border border-[#FADADD] flex flex-col group bounce-hover cursor-pointer transition-all duration-300 relative select-none w-full"
    >
      {/* Product Image Frame */}
      <div className="relative overflow-hidden rounded-2xl mb-4 bg-brand-background aspect-square border border-brand-primary-container/20">
        
        {/* Category Tag badge */}
        <span className="absolute top-2.5 left-2.5 z-10 bg-brand-primary-container/95 text-brand-on-primary-container px-3 py-1 rounded-full font-label text-[10px] font-bold tracking-wider uppercase border border-brand-primary/10">
          {product.category}
        </span>

        <img
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          src={product.image}
          referrerPolicy="no-referrer"
        />

        {/* Favorite Heart Trigger */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2.5 right-2.5 z-10 bg-white/90 backdrop-blur-md p-2 rounded-full text-brand-primary hover:text-brand-tertiary transition-all duration-200 shadow-sm hover:scale-110 focus:outline-none"
          title={isFavorite ? "Eliminar de favoritos" : "Guardar en favoritos"}
        >
          <Heart 
            className={`w-5 h-5 transition-transform duration-300 active:scale-125 ${
              isFavorite 
                ? 'fill-brand-tertiary text-brand-tertiary scale-110' 
                : 'text-brand-primary hover:text-brand-tertiary'
            }`} 
          />
        </button>
      </div>

      {/* Product Rating */}
      <div className="flex items-center gap-1 mb-1.5">
        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
        <span className="font-label text-xs font-bold text-brand-on-surface-variant">
          {product.rating}
        </span>
        <span className="text-brand-on-surface-variant/35 text-[10px]">• Reciente</span>
      </div>

      {/* Product Title */}
      <h3 className="font-headline text-base sm:text-lg font-bold text-brand-on-surface mb-1 group-hover:text-brand-primary transition-colors line-clamp-1">
        {product.name}
      </h3>

      {/* Product Price */}
      <p className="text-brand-tertiary font-bold text-lg mb-4 font-headline text-brand-tertiary">
        {formatPrice(product.price)}
      </p>

      {/* "Agregar al Carrito" Action */}
      <button
        onClick={handleAddToCartClick}
        className="mt-auto w-full bg-brand-primary-container hover:bg-brand-primary text-brand-on-primary-container hover:text-white py-3 rounded-full font-label text-sm font-bold transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 group/btn shadow-xs"
      >
        <ShoppingCart className="w-4 h-4 group-hover/btn:translate-x-0.5 tracking-tight group-hover/btn:scale-115 transition-transform" />
        <span>Agregar al carrito</span>
      </button>
    </div>
  );
}
