/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Mail, MessageSquare, Heart, Sparkles, Send, MapPin, Phone } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowNotification: (msg: string) => void;
}

export default function ContactModal({ isOpen, onClose, onShowNotification }: ContactModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !msg) {
      onShowNotification('Por favor, llena todos los campos obligatorios 🥰');
      return;
    }
    
    setSubmitted(true);
    onShowNotification('¡Mensaje enviado con amor! Responderemos lo más pronto posible 💌');
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMsg('');
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop custom glassblur */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-brand-on-surface/50 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden relative z-10 kawaii-shadow border-2 border-brand-primary-container p-6 sm:p-8 space-y-6">
        
        {/* Close Button top-right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white/90 p-2 rounded-full text-brand-primary hover:text-brand-tertiary transition-transform duration-200 shadow-sm active:scale-90 hover:rotate-90"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4 font-label">
            <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mx-auto text-brand-primary border-2 border-brand-primary-container">
              <Mail className="w-8 h-8 animate-bounce" />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-headline text-2xl font-black text-brand-on-surface">
                ¡Gracias por escribirnos! 💌
              </h3>
              <p className="font-body text-sm text-brand-on-surface-variant max-w-xs mx-auto">
                Hola, <b>{name}</b>. Hemos recibido tu mensaje con toda la ternura del mundo. Nuestro equipo de soporte te contestará a tu correo <b>{email}</b> en un abrir y cerrar de ojos ✨.
              </p>
            </div>

            <button
              onClick={handleReset}
              className="mt-6 px-8 py-3 bg-brand-primary text-white rounded-full font-bold text-xs select-none hover:scale-105 active:scale-95 transition-all text-center"
            >
              Cerrar cuadro
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            <div>
              <span className="inline-flex items-center gap-1.5 bg-brand-primary-container text-brand-on-primary-container px-3.5 py-1 rounded-full font-label text-xs font-bold border border-brand-primary/10 tracking-wide uppercase">
                <Heart className="w-3.5 h-3.5 text-brand-on-primary-container fill-brand-primary-container shrink-0" />
                <span>¿Tienes dudas?</span>
              </span>
              <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-brand-on-surface tracking-tight mt-2">
                Escríbenos con amor
              </h2>
              <p className="font-body text-xs text-brand-on-surface-variant mt-1 leading-relaxed">
                ¿Buscas algún peluche especial? ¿Tienes alguna consulta sobre envíos? Contáctanos y resolveremos tus dudas.
              </p>
            </div>

            {/* Quick Contacts lists */}
            <div className="grid grid-cols-3 gap-2.5 bg-brand-background border-brand-primary-container/20 border p-3 rounded-2xl text-[10px] sm:text-xs">
              <div className="flex flex-col items-center justify-center text-center">
                <Phone className="w-4 h-4 text-brand-primary mb-1 shrink-0" />
                <a href="https://wa.me/573226420298" target="_blank" rel="noreferrer noopener" className="font-bold">WhatsApp: +57 322 642 0298</a>
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                <Mail className="w-4 h-4 text-brand-primary mb-1 shrink-0" />
                <a href="mailto:hola@karolkitty.com" className="font-bold">hola@karolkitty.com</a>
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                <MapPin className="w-4 h-4 text-brand-primary mb-1 shrink-0" />
                <span className="font-bold">Cartagena, Colombia</span>
              </div>
            </div>

            {/* Main Form */}
            <form onSubmit={handleSubmit} className="space-y-4 font-label text-sm pt-2">
              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-on-surface-variant">Tu Nombre *</label>
                <input
                  required
                  type="text"
                  placeholder="Ej. Camila"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 bg-brand-background border border-brand-primary-container/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 rounded-xl text-brand-on-surface font-body font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-on-surface-variant">Tu Correo Electrónico *</label>
                <input
                  required
                  type="email"
                  placeholder="Ej. cami@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-brand-background border border-brand-primary-container/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 rounded-xl text-brand-on-surface font-body font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-on-surface-variant">Tu Mensaje *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Escribe tu consulta aquí con toda confianza..."
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  className="w-full px-4 py-3 bg-brand-background border border-brand-primary-container/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 rounded-xl text-brand-on-surface font-body font-semibold resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-tertiary text-white py-3.5 rounded-full font-label text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:scale-102 active:scale-95 transition-all select-none"
              >
                <Send className="w-4 h-4" />
                <span>Enviar mensaje 💖</span>
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
