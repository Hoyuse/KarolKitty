/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Gift, ShoppingBag, PenTool, Home, LucideIcon } from 'lucide-react';
import { Category } from '../types';

interface CategoriesProps {
  currentCategory: Category | null;
  onSelectCategory: (category: Category | null) => void;
}

export default function Categories({ currentCategory, onSelectCategory }: CategoriesProps) {
  const categoriesList: { name: Category; icon: LucideIcon; label: string; color: string }[] = [
    { name: 'Peluches', icon: Gift, label: 'Peluches', color: 'bg-rose-50 text-rose-500' },
    { name: 'Bolsos', icon: ShoppingBag, label: 'Bolsos', color: 'bg-amber-55 text-amber-600' },
    { name: 'Papelería', icon: PenTool, label: 'Papelería', color: 'bg-emerald-50 text-emerald-600' },
    { name: 'Hogar', icon: Home, label: 'Hogar', color: 'bg-pink-50 text-pink-500' }
  ];

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-brand-background/60 border-y border-brand-primary-container/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-brand-on-surface">
            Explora por Categoría
          </h2>
          <div className="w-16 h-1.5 bg-brand-primary-container mx-auto mt-2 rounded-full"></div>
          <p className="font-body text-sm sm:text-base text-brand-on-surface-variant max-w-md mx-auto mt-3">
            Filtra nuestro catálogo y encuentra exactamente el producto de tus sueños.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 justify-items-center">
          {categoriesList.map((cat) => {
            const IconComponent = cat.icon;
            const isSelected = currentCategory === cat.name;

            return (
              <button
                key={cat.name}
                onClick={() => onSelectCategory(isSelected ? null : cat.name)}
                className="flex flex-col items-center gap-4 group cursor-pointer focus:outline-none w-full max-w-[180px]"
              >
                {/* Rounded Button Icon Container */}
                <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center transition-all duration-300 relative ${
                  isSelected 
                    ? 'bg-brand-primary text-white scale-105 shadow-md border-4 border-brand-primary-container' 
                    : 'bg-white text-brand-primary kawaii-shadow hover:scale-110 border border-brand-primary-container/30 group-hover:border-brand-primary/20'
                }`}>
                  <IconComponent className="w-10 h-10 md:w-12 md:h-12 group-hover:rotate-12 transition-transform duration-350 shrink-0" />
                  
                  {/* Small Active Badge */}
                  {isSelected && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-tertiary-container opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-brand-tertiary"></span>
                    </span>
                  )}
                </div>

                {/* Category Label */}
                <span className={`font-label text-sm sm:text-base font-bold transition-all ${
                  isSelected 
                    ? 'text-brand-primary font-black scale-105' 
                    : 'text-brand-on-surface-variant group-hover:text-brand-primary'
                }`}>
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Clear Filter / View All */}
        {currentCategory && (
          <div className="text-center mt-10">
            <button
              onClick={() => onSelectCategory(null)}
              className="text-xs sm:text-sm font-label font-extrabold text-brand-tertiary hover:underline underline-offset-4 bg-white/90 border border-brand-primary-container/35 px-4 py-2 rounded-full kawaii-shadow hover:scale-105 active:scale-95 transition-all"
            >
              Mostrar todo el catálogo de vuelta 💖
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
