/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Heart, Sparkles, Compass, Eye, Star, Stars } from 'lucide-react';

interface MissionVisionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MissionVisionModal({ isOpen, onClose }: MissionVisionModalProps) {
  if (!isOpen) return null;

  return (
    <div id="mission-vision-overlay" className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop custom glassblur */}
      <div 
        id="mission-vision-backdrop"
        onClick={onClose}
        className="fixed inset-0 bg-brand-on-surface/50 backdrop-blur-sm transition-opacity"
      ></div>

      <div 
        id="mission-vision-container"
        className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden relative z-10 kawaii-shadow border-2 border-brand-primary-container p-6 sm:p-8 space-y-6 animate-fade-in"
      >
        
        {/* Close Button top-right */}
        <button
          id="mission-vision-close-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white/90 p-2 rounded-full text-brand-primary hover:text-brand-tertiary transition-transform duration-200 shadow-sm active:scale-90 hover:rotate-90"
          title="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Title */}
        <div id="mission-vision-header" className="text-center pb-4 border-b border-brand-primary-container/20">
          <span className="inline-flex items-center gap-1.5 bg-brand-primary-container text-brand-on-primary-container px-4 py-1.5 rounded-full font-label text-xs font-bold border border-brand-primary/10 tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-brand-primary animate-pulse fill-brand-primary-container" />
            <span>Nuestra Filosofía Kawaii</span>
          </span>
          <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-brand-on-surface tracking-tight mt-2 flex items-center justify-center gap-2">
            Misión & Visión <Stars className="w-6 h-6 text-brand-tertiary-container text-yellow-400" />
          </h2>
          <p className="font-body text-xs sm:text-sm text-brand-on-surface-variant max-w-md mx-auto mt-1 leading-relaxed">
            Descubre el tierno motor que impulsa cada rincón de <b>Karol Kitty</b>. ¡Unidos por la magia y la dulzura! Let's fill the world with smiles! 💖
          </p>
        </div>

        {/* Content body split in Mission and Vision cards */}
        <div id="mission-vision-content-grid" className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          {/* MISIÓN Card */}
          <div 
            id="mission-card"
            className="bg-brand-background/60 border border-brand-primary-container/30 p-5 sm:p-6 rounded-2xl flex flex-col space-y-4 shadow-xs hover:border-brand-primary/40 hover:bg-white transition-all duration-300 relative overflow-hidden group"
          >
            {/* Background floating heart highlight */}
            <div className="absolute right-[-10px] top-[-10px] opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-300 pointer-events-none">
              <Compass className="w-24 h-24 text-brand-primary shrink-0" />
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-primary-container/70 rounded-full flex items-center justify-center text-brand-primary shadow-xs">
                <Compass className="w-6 h-6 animate-spin-slow" />
              </div>
              <h3 className="font-headline text-xl font-bold text-brand-on-surface">
                Nuestra Misión 🌸
              </h3>
            </div>

            <p className="font-body text-xs sm:text-sm text-brand-on-surface-variant leading-relaxed font-semibold">
              Compartir dulzura, amor y felicidad infinita a través de los artículos coleccionables más adorables y mágicos del universo de Hello Kitty y sus amigos. Queremos sanar corazones con abrazos de felpa premium, llenar de ternura los pequeños espacios diarios y recordar que vivir con amabilidad hace del mundo un lugar más cálido y luminoso.
            </p>
          </div>

          {/* VISIÓN Card */}
          <div 
            id="vision-card"
            className="bg-brand-background/60 border border-brand-primary-container/30 p-5 sm:p-6 rounded-2xl flex flex-col space-y-4 shadow-xs hover:border-brand-primary/40 hover:bg-white transition-all duration-300 relative overflow-hidden group"
          >
            {/* Background floating star highlight */}
            <div className="absolute right-[-10px] top-[-10px] opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-300 pointer-events-none">
              <Eye className="w-24 h-24 text-brand-primary shrink-0" />
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-primary-container/70 rounded-full flex items-center justify-center text-brand-primary shadow-xs">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="font-headline text-xl font-bold text-brand-on-surface">
                Nuestra Visión ✨
              </h3>
            </div>

            <p className="font-body text-xs sm:text-sm text-brand-on-surface-variant leading-relaxed font-semibold">
              Convertirnos en el rincón Kawaii de ensueño definitivo a nivel global, siendo reconocidos por seleccionar colecciones exclusivas de la más alta calidad que provoquen sonrisas genuinas en todas las generaciones. Aspiramos a sembrar millones de momentos de ternura pura, consolidando un club donde cada visita sea un viaje feliz de regreso a la infancia.
            </p>
          </div>

        </div>

        {/* Adorable Values / Slogan pill */}
        <div 
          id="values-slogan-pills"
          className="bg-brand-primary-fixed/5 rounded-2xl p-4 border border-brand-primary-container/20 flex flex-wrap gap-2.5 items-center justify-center text-xs text-brand-on-surface"
        >
          <div className="flex items-center gap-1 bg-white border border-brand-primary-container/30 py-1.5 px-3 rounded-full cursor-default select-none font-bold shadow-2xs">
            <Heart className="w-3.5 h-3.5 text-brand-primary fill-brand-primary" />
            <span>Amor Genuino</span>
          </div>
          <div className="flex items-center gap-1 bg-white border border-brand-primary-container/30 py-1.5 px-3 rounded-full cursor-default select-none font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#FADADD] fill-[#FADADD] animate-pulse" />
            <span>Magia Colectiva</span>
          </div>
          <div className="flex items-center gap-1 bg-white border border-brand-primary-container/30 py-1.5 px-3 rounded-full cursor-default select-none font-bold shadow-2xs">
            <Star className="w-3.5 h-3.5 text-brand-primary fill-brand-primary" />
            <span>Calidad Premium</span>
          </div>
        </div>

        {/* Footer info button */}
        <div id="mission-vision-footer" className="flex justify-center pt-2">
          <button
            id="mission-vision-dismiss-btn"
            onClick={onClose}
            className="px-8 py-3 bg-brand-primary hover:bg-brand-tertiary text-white rounded-full font-bold text-xs select-none hover:scale-105 active:scale-95 transition-all text-center cursor-pointer shadow-md"
          >
            ¡Entiendo y comparto la dulzura! 🥰💖
          </button>
        </div>

      </div>
    </div>
  );
}
