/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShoppingCart, Heart, Search, Menu, X, Sparkles } from 'lucide-react';
import { Category } from '../types';

interface HeaderProps {
  cartCount: number;
  favoriteCount: number;
  currentCategory: Category | null;
  onSelectCategory: (category: Category | null) => void;
  onToggleCart: () => void;
  onToggleFavorites: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onOpenContact: () => void;
  onOpenMissionVision: () => void;
}

export default function Header({
  cartCount,
  favoriteCount,
  currentCategory,
  onSelectCategory,
  onToggleCart,
  onToggleFavorites,
  searchTerm,
  onSearchChange,
  onOpenContact,
  onOpenMissionVision,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  // Available tabs
  const tabs: { label: string; category: Category | null; isContact?: boolean; isMissionVision?: boolean }[] = [
    { label: 'Inicio', category: null },
    { label: 'Peluches', category: 'Peluches' },
    { label: 'Bolsos', category: 'Bolsos' },
    { label: 'Papelería', category: 'Papelería' },
    { label: 'Hogar', category: 'Hogar' },
    { label: 'Misión y Visión', category: null, isMissionVision: true },
    { label: 'Contacto', category: null, isContact: true }
  ];

  const handleTabClick = (tab: typeof tabs[0]) => {
    if (tab.isContact) {
      onOpenContact();
    } else if (tab.isMissionVision) {
      onOpenMissionVision();
    } else {
      onSelectCategory(tab.category);
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-[0_4px_20px_-5px_rgba(120,85,94,0.12)] border-b border-brand-primary-container/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
        
        {/* Left: Brand Name */}
        <button
          onClick={() => onSelectCategory(null)}
          className="flex items-center gap-2 group cursor-pointer text-left focus:outline-none"
        >
          <span className="font-headline text-2xl sm:text-3xl font-black italic tracking-tight text-brand-primary group-hover:scale-105 transition-transform duration-300">
            Karol Kitty
          </span>
          <Sparkles className="w-5 h-5 text-brand-tertiary-container animate-pulse fill-brand-primary-container group-hover:rotate-12 transition-transform hidden sm:inline" />
        </button>

        {/* Center: Search and Navigation (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className={`relative w-full flex items-center transition-all duration-300 rounded-full px-4 py-2 ${
            searchFocused 
              ? 'bg-white ring-2 ring-brand-primary-container shadow-sm border-brand-primary' 
              : 'bg-brand-background border border-brand-primary-container/40'
          }`}>
            <Search className="w-5 h-5 text-brand-on-primary-container/60 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Buscar peluches, bolsos y más..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="bg-transparent text-brand-on-surface placeholder-brand-on-surface-variant/50 outline-none w-full text-sm font-label"
            />
            {searchTerm && (
              <button 
                onClick={() => onSearchChange('')} 
                className="text-brand-on-surface-variant hover:text-brand-primary shrink-0 transition-colors"
                title="Clerar search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Center-Right tabs */}
        <div className="hidden lg:flex items-center gap-6">
          {tabs.map((tab) => {
            const isTabActive = (tab.isContact || tab.isMissionVision)
              ? false 
              : currentCategory === tab.category;
            
            return (
              <button
                key={tab.label}
                onClick={() => handleTabClick(tab)}
                className={`text-sm font-semibold tracking-wide font-label transition-all duration-200 hover:scale-105 ${
                  isTabActive
                    ? 'text-brand-tertiary border-b-2 border-brand-tertiary pb-1 font-extrabold'
                    : 'text-brand-on-surface-variant hover:text-brand-primary'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Right Buttons: Favorite, Cart, Mobile Menu */}
        <div className="flex items-center gap-3">
          
          {/* Favorites heart */}
          <button
            onClick={onToggleFavorites}
            className="p-2 sm:p-2.5 rounded-full hover:bg-brand-primary-container/20 group relative transition-all active:scale-90"
            title="Tus Favoritos"
          >
            <Heart className={`w-6 h-6 text-brand-primary hover:fill-brand-tertiary-container group-hover:text-brand-tertiary transition-colors ${favoriteCount > 0 ? 'fill-brand-primary-container' : ''}`} />
            {favoriteCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-primary text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold animate-bounce shadow-sm">
                {favoriteCount}
              </span>
            )}
          </button>

          {/* Cart button */}
          <button
            onClick={onToggleCart}
            className="p-2 sm:p-2.5 rounded-full hover:bg-brand-primary-container/20 group relative transition-all active:scale-95 border border-brand-primary-container/35 bg-brand-background/40"
            title="Carrito de compras"
          >
            <ShoppingCart className="w-6 h-6 text-brand-primary group-hover:scale-105 transition-transform" />
            <span className="absolute -top-1 -right-1 bg-brand-tertiary text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-sm">
              {cartCount}
            </span>
          </button>

          {/* Mobile Hamburguer Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 lg:hidden text-brand-primary hover:bg-brand-primary-container/20 rounded-full transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-brand-primary-container/20 bg-white shadow-lg py-4 px-4 space-y-4">
          
          {/* Mobile search bar */}
          <div className="flex xl:hidden items-center transition-all duration-300 rounded-full px-4 py-2 bg-brand-background border border-brand-primary-container/40">
            <Search className="w-5 h-5 text-brand-on-primary-container/60 mr-2" />
            <input
              type="text"
              placeholder="Buscar en Karol Kitty..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="bg-transparent text-brand-on-surface placeholder-brand-on-surface-variant/50 outline-none w-full text-sm font-label"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            {tabs.map((tab) => {
              const isActive = (tab.isContact || tab.isMissionVision) ? false : currentCategory === tab.category;
              return (
                <button
                  key={tab.label}
                  onClick={() => handleTabClick(tab)}
                  className={`px-4 py-3 rounded-xl font-label text-sm text-center font-bold tracking-wide transition-all ${
                    isActive
                      ? 'bg-brand-primary-container text-brand-on-primary-container shadow-sm'
                      : 'bg-brand-background text-brand-on-surface hover:bg-brand-primary-container/10'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
