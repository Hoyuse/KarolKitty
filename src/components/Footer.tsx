/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Share2, Heart, Sparkles, X, Shield, BookOpen, Truck, RotateCcw } from 'lucide-react';

interface FooterProps {
  onShowNotification: (msg: string) => void;
}

type ModalType = 'privacidad' | 'terminos' | 'envios' | 'devoluciones' | null;

export default function Footer({ onShowNotification }: FooterProps) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const handleShareClick = () => {
    // Copy fake store link to clipboard and notify
    navigator.clipboard.writeText(window.location.href);
    onShowNotification('¡Enlace de Karol Kitty copiado al portapapeles! Compártelo con tus amigos 🌸');
  };

  const handleLikeClick = () => {
    onShowNotification('¡Gracias por amar a Karol Kitty! Tu apoyo nos llena el corazón ✨💕');
  };

  // Static content details to show inside nice popups
  const modalContent: Record<Exclude<ModalType, null>, { title: string; icon: React.ReactNode; body: string[] }> = {
    privacidad: {
      title: 'Política de Privacidad',
      icon: <Shield className="w-8 h-8 text-brand-primary" />,
      body: [
        'En Karol Kitty protegemos tus datos personales tal como lo haríamos con nuestros peluches favoritos. Tu información está 100% segura con nosotros.',
        'Solo usamos tu dirección de correo electrónico para enviarte las novedades del Kitty Club (cuando te suscribes) y para tramitar tus órdenes.',
        'Jamás alquilaremos, venderemos ni revelaremos tus datos a terceros sin tu consentimiento explícito.',
        'Puedes solicitar en cualquier momento la rectificación o eliminación total de tus datos de nuestros sistemas escribiéndonos un correo.'
      ]
    },
    terminos: {
      title: 'Términos del Servicio',
      icon: <BookOpen className="w-8 h-8 text-brand-primary" />,
      body: [
        'Al navegar y comprar en Karol Kitty, aceptas complacerte con el rincón más cute del mundo de forma feliz y respetuosa.',
        'Todos los productos de exhibición y el catálogo son representativos. Trabajamos rigurosamente para que te lleguen exactamente de esa forma y color.',
        'Cualquier intento de suplantar la identidad de Hello Kitty o de cometer fraude en los pagos está estrictamente denegado.',
        'Nos reservamos el derecho de limitar o declinar pedidos cuando consideremos que no cumplen con nuestras directrices éticas.'
      ]
    },
    envios: {
      title: 'Políticas de Envío',
      icon: <Truck className="w-8 h-8 text-brand-primary" />,
      body: [
        'Nuestros envíos estándar son completamente gratuitos para compras de cualquier importe en todo el país.',
        'Los pedidos de Envío Normal tardan de 3 a 5 días hábiles en llegar a tu hogar, empacados con la máxima protección y mimos.',
        'Para antojos de máxima prioridad, ofrecemos Envío Express por solo $5.99 garantizando la entrega en tan solo 1 a 2 días hábiles.',
        'Te proveeremos un enlace de seguimiento interactivo en cuanto tu paquete deje nuestros centros de distribución.'
      ]
    },
    devoluciones: {
      title: 'Políticas de Devolución',
      icon: <RotateCcw className="w-8 h-8 text-brand-primary" />,
      body: [
        '¿No estás 100% enamorado de tu compra? No pasa nada, queremos que seas inmensamente feliz.',
        'Tienes un plazo de hasta 30 días continuos desde que recibes el paquete para solicitar un reembolso o cambio gratuito.',
        'El artículo coleccionable debe estar intacto, en su empaque original de regalo y libre de manchas o roturas.',
        'Una vez verificado el estado de la devolución, reembolsaremos la totalidad de tu pago en un plazo de 3 días laborables.'
      ]
    },
  };

  return (
    <footer className="w-full bg-brand-background/80 px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-brand-primary-container/20 rounded-t-3xl mt-12 max-w-7xl mx-auto">
      
      {/* Footer Title Brand & Copyright */}
      <div className="flex flex-col items-center md:items-start gap-2">
        <span className="font-headline text-xl sm:text-2xl font-black italic tracking-wide text-brand-primary">
          Karol Kitty
        </span>
        <p className="font-body text-xs sm:text-sm text-brand-on-surface-variant text-center md:text-left font-medium">
          © 2026 Karol Kitty - El rincón más cute del mundo.
        </p>
        <p className="font-body text-[10px] sm:text-xs text-brand-on-surface-variant text-center md:text-left leading-snug max-w-sm">
          <a href="https://karol-kitty-smpz.vercel.app/" className="font-semibold text-brand-primary hover:underline" target="_blank" rel="noreferrer noopener">Karol Kitty</a> por <a href="https://github.com/Hoyuse" className="font-semibold text-brand-primary hover:underline" target="_blank" rel="noreferrer noopener">Karol Vivanco</a> está marcado <a href="https://creativecommons.org/publicdomain/zero/1.0/" className="font-semibold text-brand-primary hover:underline" target="_blank" rel="noreferrer noopener">CC0 1.0</a>
          <span className="inline-flex items-center gap-1 ml-1">
            <img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="Creative Commons" style={{ maxWidth: '1em', maxHeight: '1em', marginLeft: '.2em' }} />
            <img src="https://mirrors.creativecommons.org/presskit/icons/zero.svg" alt="Public Domain" style={{ maxWidth: '1em', maxHeight: '1em', marginLeft: '.2em' }} />
          </span>
        </p>
      </div>

      {/* Navigation Footer links with modals */}
      <div className="flex flex-wrap justify-center gap-5 sm:gap-8 font-label text-xs sm:text-sm">
        {(['privacidad', 'terminos', 'envios', 'devoluciones'] as const).map((type) => {
          const labels: Record<string, string> = {
            privacidad: 'Privacidad',
            terminos: 'Términos',
            envios: 'Envíos',
            devoluciones: 'Devoluciones'
          };
          return (
            <button
              key={type}
              onClick={() => setActiveModal(type)}
              className="font-bold text-brand-on-surface-variant hover:text-brand-tertiary hover:underline decoration-brand-tertiary underline-offset-4 transition-all duration-300"
            >
              {labels[type]}
            </button>
          );
        })}
      </div>

      {/* Action buttons triggers */}
      <div className="flex items-center gap-3">
        {/* Share Button */}
        <button
          onClick={handleShareClick}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-brand-primary-container/20 text-brand-primary hover:text-white hover:bg-brand-primary hover:scale-110 active:scale-95 transition-all shadow-xs"
          title="Compartir Karol Kitty Store"
        >
          <Share2 className="w-4 h-4" />
        </button>

        {/* Favorite heart Button */}
        <button
          onClick={handleLikeClick}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-brand-primary-container/20 text-brand-primary hover:text-white hover:bg-brand-primary hover:scale-110 active:scale-95 transition-all shadow-xs"
          title="Amar Karol Kitty"
        >
          <Heart className="w-4 h-4 fill-brand-primary-container text-brand-primary hover:fill-white hover:text-white" />
        </button>
      </div>

      {/* Interactive Information modal popover */}
      {activeModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div 
            onClick={() => setActiveModal(null)}
            className="fixed inset-0 bg-brand-on-surface/40 backdrop-blur-xs"
          ></div>
          
          <div className="bg-white rounded-3xl w-full max-w-md p-6 relative z-10 kawaii-shadow border-2 border-brand-primary-container space-y-4">
            
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 bg-brand-background p-1.5 rounded-full text-brand-primary hover:text-brand-tertiary active:scale-90"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 pb-2 border-b border-brand-primary-container/20">
              {modalContent[activeModal].icon}
              <h3 className="font-headline text-lg sm:text-xl font-bold text-brand-on-surface">
                {modalContent[activeModal].title}
              </h3>
            </div>

            <div className="space-y-3 pt-1">
              {modalContent[activeModal].body.map((paragraph, index) => (
                <p 
                  key={index} 
                  className="font-body text-xs sm:text-sm text-brand-on-surface-variant leading-relaxed font-semibold"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="pt-4 text-center">
              <button
                onClick={() => setActiveModal(null)}
                className="px-6 py-2 bg-brand-primary text-white font-label text-xs font-bold rounded-full hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1.5 mx-auto"
              >
                <Sparkles className="w-3.5 h-3.5 fill-brand-primary-container text-white" />
                <span>Entendido con Amor</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </footer>
  );
}
