/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';

const heroImage = new URL('../assets/images/hello_kitty_store_banner_1780438913928.png', import.meta.url).href;

interface HeroProps {
  onExploreClick: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24 bg-gradient-to-b from-white via-brand-background to-white overflow-hidden">
      
      {/* Decorative blurred circles for dream-like background */}
      <div className="absolute -top-10 -right-10 w-72 h-72 bg-brand-primary-container/35 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-brand-tertiary-container/30 rounded-full blur-2xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        
        {/* Text Content */}
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left z-10">
          <div className="inline-flex items-center gap-2 bg-brand-primary-container text-brand-on-primary-container px-4 py-1.5 rounded-full font-label text-xs sm:text-sm font-bold tracking-wider uppercase border border-brand-primary/10 shadow-sm animate-pulse">
            <Sparkles className="w-4 h-4 text-brand-on-primary-container fill-brand-primary-container" />
            <span>Exclusivo &amp; Kawaii</span>
          </div>

          <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-black text-brand-on-surface leading-tight tracking-tight">
            Bienvenido al Mundo Kawaii de <span className="text-brand-primary italic block sm:inline">Karol Kitty</span>
          </h1>

          <p className="font-body text-base sm:text-lg lg:text-xl text-brand-on-surface-variant max-w-lg mx-auto md:mx-0 leading-relaxed font-medium">
            Descubre una colección mágica diseñada para derretir corazones. Desde peluches esponjosos hasta papelería de ensueño. Cada artículo está seleccionado con amor para llenar tu día a día de felicidad y ternura.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-2">
            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto bg-brand-tertiary text-white px-8 py-4 rounded-full font-label text-sm font-bold flex items-center justify-center gap-2 kawaii-shadow-hover hover:scale-105 active:scale-95 transition-all duration-300 group border-2 border-brand-tertiary shadow-md"
            >
              <span>Comprar Ahora</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
            
            <div className="flex items-center gap-2 text-brand-primary font-semibold text-sm">
              <Heart className="w-5 h-5 fill-brand-primary-container text-brand-primary animate-bounce shrink-0" />
              <span>+10,000 Clientes Felices</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Image */}
        <div className="w-full md:w-1/2 relative group">
          {/* Accent frame backdrops */}
          <div className="absolute inset-4 rounded-3xl bg-brand-primary-container/20 -rotate-2 group-hover:-rotate-4 transition-transform duration-500 rounded-lg"></div>
          <div className="absolute inset-4 rounded-3xl bg-brand-tertiary-container/30 rotate-2 group-hover:rotate-4 transition-transform duration-500 rounded-lg"></div>

          {/* Styled image with tilt */}
          <img
            alt="Peluches de Hello Kitty en exhibición"
            className="w-full max-h-[460px] h-auto rounded-3xl kawaii-shadow object-cover transform rotate-1 group-hover:rotate-0 transition-all duration-700 pointer-events-auto border-4 border-white cursor-pointer relative z-10"
            src={heroImage}
            referrerPolicy="no-referrer"
          />
          
          {/* Adorable hover indicator label */}
          <div className="absolute bottom-6 right-6 z-20 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-brand-primary-container/30 kawaii-shadow text-xs font-bold font-label text-brand-primary flex items-center gap-1.5 select-none hover:scale-105 transition-transform">
            <Sparkles className="w-3.5 h-3.5 text-brand-tertiary animate-spin" />
            <span>Colección Genuina Sanrio</span>
          </div>
        </div>

      </div>
    </section>
  );
}
