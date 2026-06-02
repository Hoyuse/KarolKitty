/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Trash2, ShoppingCart, Sparkles, Plus, Minus, CreditCard, Tag, Truck, CheckCircle, Mail, MapPin, User, Phone, Copy, ExternalLink } from 'lucide-react';
import { CartItem, Product } from '../types';
import { formatPrice } from '../utils';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onShowNotification: (msg: string) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onShowNotification,
}: CartDrawerProps) {
  
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // decimal ratio, e.g. 0.10
  const [promoApplied, setPromoApplied] = useState(false);
  
  // Checkout flow states
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [checkoutFinished, setCheckoutFinished] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
  });

  const [orderId, setOrderId] = useState('');
  const [copiedNequi, setCopiedNequi] = useState(false);

  const handleCopyNequi = () => {
    navigator.clipboard.writeText('3226420298');
    setCopiedNequi(true);
    onShowNotification('¡Número de Nequi copiado! 📱💜');
    setTimeout(() => setCopiedNequi(false), 2000);
  };

  const handleFinalizeWhatsApp = () => {
    const orderDetails = cartItems.map(item => `• ${item.product.name} (x${item.quantity})`).join('\n');
    const messageText = `¡Hola Karol Kitty! 💖 Acabo de realizar mi pedido en la tienda online:

🆔 Código de Orden: ${orderId}
👤 Cliente: ${formData.name}
📞 Teléfono: ${formData.phone || 'No especificado'}
📍 Dirección: ${formData.address}${formData.city ? `, ${formData.city}` : ''}

🛍️ Productos:
${orderDetails}

🚚 Envío: ${shippingMethod === 'express' ? 'Express (1-2 días hábiles)' : 'Estándar Gratis (3-5 días hábiles)'}
💵 Total a pagar: ${formatPrice(total)}

📱 Pago solicitado: Nequi al celular +57 322 6420298.

¡Aquí tienes mis datos para verificar la transferencia y el despacho! ✨`;

    const encoded = encodeURIComponent(messageText);
    const waUrl = `https://wa.me/573226420298?text=${encoded}`;
    window.open(waUrl, '_blank');
  };

  if (!isOpen) return null;

  // Calculators
  const subtotal = cartItems.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0);
  const discountAmount = subtotal * appliedDiscount;
  const shippingCost = shippingMethod === 'express' ? 12000 : 0;
  const total = subtotal - discountAmount + shippingCost;
  
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = promoCode.trim().toUpperCase();
    if (normalized === 'KITTY10') {
      setAppliedDiscount(0.10);
      setPromoApplied(true);
      onShowNotification('¡Cupón KITTY10 aplicado! Descuento del 10% 💖');
    } else if (normalized === 'ENVIOFREE') {
      setShippingMethod('standard');
      onShowNotification('¡Cupón ENVIOFREE aplicado! Envío estándar gratis ✨');
    } else {
      onShowNotification('Código inválido. ¡Intenta con el cupón KITTY10! 🌸');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleStartCheckout = () => {
    if (cartItems.length === 0) return;
    setIsCheckingOut(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city) {
      onShowNotification('Por favor completa todos los campos para coordinar tu entrega 💖');
      return;
    }

    // Generate random order ID
    const sampleId = 'KK-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(sampleId);
    setCheckoutFinished(true);
    onShowNotification('¡Pedido registrado! Completa la transferencia Nequi ✨');
  };

  const handleResetCheckout = () => {
    // Reset all parameters
    setCheckoutFinished(false);
    setIsCheckingOut(false);
    onClearCart();
    setFormData({ name: '', email: '', phone: '', address: '', city: '' });
    setAppliedDiscount(0);
    setPromoApplied(false);
    setPromoCode('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      
      {/* Semi-transparent Backdrop with ease-out */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-brand-on-surface/55 backdrop-blur-xs transition-opacity duration-300"
      ></div>

      {/* Slide Drawer container */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        
        <div className="w-screen max-w-md bg-white flex flex-col shadow-2xl relative border-l border-brand-primary-container/30">
          
          {/* Header */}
          <div className="px-6 py-5 bg-brand-background border-b border-brand-primary-container/30 flex items-center justify-between">
            <div className="flex items-center gap-2 text-brand-primary">
              <ShoppingCart className="w-5 h-5" />
              <h2 className="font-headline text-lg sm:text-xl font-extrabold">
                {checkoutFinished ? 'Resumen del Pedido' : 'Tu Carrito de Compras'}
              </h2>
            </div>
            
            <button
              onClick={onClose}
              className="p-1 rounded-full text-brand-primary hover:bg-brand-primary-container/20 hover:text-brand-tertiary transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Core Body Container */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            
            {/* 1. CHECKOUT ACCORDION: SUCCESS RECEIPT */}
            {checkoutFinished ? (
              <div className="space-y-6 text-center py-4">
                <div className="w-16 h-16 bg-brand-primary-container/30 rounded-full flex items-center justify-center mx-auto text-brand-primary border-2 border-brand-primary-container">
                  <Sparkles className="w-8 h-8 animate-pulse text-brand-primary" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-headline text-xl sm:text-2xl font-black text-brand-on-surface">
                    ¡Pedido Registrado con Éxito! 🌸
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-brand-on-surface-variant max-w-xs mx-auto font-semibold">
                    Para finalizar tu orden, por favor realiza la transferencia a nuestra cuenta Nequi y envíanos el comprobante por WhatsApp.
                  </p>
                </div>

                {/* NEQUI BANNER DETAILS */}
                <div className="bg-[#f0e8f3] border-2 border-[#d0b0df] rounded-2xl p-4 text-left space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs uppercase bg-[#da1259] text-white px-2.5 py-1 rounded-full font-label tracking-wide">
                      MÉTODO DE PAGO ÚNICO
                    </span>
                    <span className="text-[#3c004a] font-black text-xs font-headline">NEQUI 📱💜</span>
                  </div>
                  
                  <div className="bg-white/80 p-3 rounded-xl border border-[#d5bbdf] flex items-center justify-between gap-2">
                    <div>
                      <p className="text-[10px] text-gray-500 font-semibold font-label">NÚMERO DE CUENTA NEQUI</p>
                      <p className="text-base font-black text-[#2e003a] font-headline">322 6420298</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyNequi}
                      className="inline-flex items-center gap-1 bg-[#230230] text-white text-xs font-bold px-3 py-2 rounded-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedNequi ? '¡Copiado!' : 'Copiar'}</span>
                    </button>
                  </div>

                  <div className="flex justify-between font-headline font-black text-base text-brand-tertiary border-t border-brand-primary-container/20 pt-2.5">
                    <span>Total a transferir:</span>
                    <span className="text-lg">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Receipt Specs */}
                <div className="bg-brand-background rounded-2xl p-4 border border-brand-primary-container/30 text-left space-y-2.5 font-label text-xs sm:text-sm">
                  <div className="flex justify-between border-b border-brand-primary-container/10 pb-1.5">
                    <span className="text-brand-on-surface-variant font-medium">Código de Orden:</span>
                    <span className="font-bold text-brand-primary">{orderId}</span>
                  </div>
                  <div className="flex justify-between border-b border-brand-primary-container/10 pb-1.5">
                    <span className="text-brand-on-surface-variant font-medium">Destinatario:</span>
                    <span className="font-bold text-brand-on-surface">{formData.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-brand-primary-container/10 pb-1.5">
                    <span className="text-brand-on-surface-variant font-medium">Dirección:</span>
                    <span className="font-bold text-brand-on-surface truncate max-w-[200px]" title={`${formData.address}, ${formData.city}`}>
                      {formData.address}, {formData.city}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-on-surface-variant font-medium">Envío:</span>
                    <span className="font-bold capitalize">{shippingMethod === 'express' ? 'Express (1-2 días)' : 'Normal Gratis (3-5 días)'}</span>
                  </div>
                </div>

                {/* PRIMARY CHECKOUT ACTION BUTTON: REDIRECT TO WHATSAPP */}
                <div className="space-y-3 leading-none pt-2">
                  <button
                    type="button"
                    onClick={handleFinalizeWhatsApp}
                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-full font-label text-sm font-black shadow-md hover:scale-102 active:scale-95 transition-all flex items-center justify-center gap-2 select-none"
                  >
                    <ExternalLink className="w-4 h-4 text-white" />
                    <span>Finalizar Compra por WhatsApp 💬</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResetCheckout}
                    className="w-full bg-brand-primary/10 hover:bg-brand-primary/15 text-brand-primary py-3 rounded-full font-label text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Limpiar Carro e Ir a la Tienda 🌸</span>
                  </button>
                </div>
              </div>
            ) : isCheckingOut ? (
              
              /* 2. CHECKOUT INPUT FORM */
              <div className="space-y-6">
                <div>
                  <h3 className="font-headline text-lg font-bold text-brand-on-surface mb-1">
                    Información de Envío 🚚
                  </h3>
                  <p className="font-body text-xs text-brand-on-surface-variant">
                    Por favor completa tus datos reales para poder entregarte tus tesoros Kawaii.
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4 font-label text-sm">
                  
                  {/* Name field */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-brand-on-surface-variant flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-brand-primary" />
                      <span>Nombre Completo *</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      placeholder="Ej. Sofía Rodríguez"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-primary-container/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 bg-brand-background text-brand-on-surface font-body font-semibold"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-brand-on-surface-variant flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-brand-primary" />
                      <span>Correo Electrónico *</span>
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="Ej. sofia@gmail.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-primary-container/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 bg-brand-background text-brand-on-surface font-body font-semibold"
                    />
                  </div>

                  {/* Phone field */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-brand-on-surface-variant flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-brand-primary" />
                      <span>Teléfono / WhatsApp *</span>
                    </label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      placeholder="Ej. +57 322 642 0298"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-primary-container/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 bg-brand-background text-brand-on-surface font-body font-semibold"
                    />
                  </div>

                  {/* Shipping Address field */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-brand-on-surface-variant flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-brand-primary" />
                      <span>Dirección de Entrega *</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="address"
                      placeholder="Calle, número, barrio, apto..."
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-primary-container/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 bg-brand-background text-brand-on-surface font-body font-semibold"
                    />
                  </div>

                  {/* City/State */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-brand-on-surface-variant flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-brand-primary" />
                      <span>Ciudad / Departamento *</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="city"
                      placeholder="Ej. Cartagena, Bolívar"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-primary-container/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 bg-brand-background text-brand-on-surface font-body font-semibold"
                    />
                  </div>

                  {/* Return back button */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsCheckingOut(false)}
                      className="flex-1 border-2 border-brand-primary-container/50 text-brand-primary py-3 rounded-full font-bold hover:bg-brand-background active:scale-95 transition-all text-xs text-center"
                    >
                      Atrás al Carro
                    </button>
                    
                    <button
                      type="submit"
                      className="flex-1 bg-brand-tertiary text-white py-3 rounded-full font-bold hover:bg-brand-tertiary/90 shadow-md active:scale-95 transition-all text-xs flex items-center justify-center gap-1.5"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Ver Datos de Pago 💜</span>
                    </button>
                  </div>

                </form>
              </div>

            ) : (
              
              /* 3. NORMAL CART LIST SCREEN */
              <div className="space-y-6">
                
                {/* Empty Cart Banner */}
                {cartItems.length === 0 ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-24 h-24 bg-brand-primary-container/30 rounded-full flex items-center justify-center mx-auto text-brand-primary border border-brand-primary-container/45">
                      <ShoppingCart className="w-10 h-10" />
                    </div>
                    <div>
                      <h3 className="font-headline font-bold text-lg text-brand-on-surface">
                        Tu carrito está vacío
                      </h3>
                      <p className="font-body text-xs text-brand-on-surface-variant max-w-xs mx-auto mt-1">
                        ¡Llena tu rincón de ternura explorando nuestros maravillosos productos Sanrio! 💕
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="inline-flex items-center gap-1.5 bg-brand-primary text-white text-xs font-bold px-5 py-2.5 rounded-full hover:scale-105 active:scale-95 transition-all"
                    >
                      Volver a la exhibición
                    </button>
                  </div>
                ) : (
                  
                  /* List of products */
                  <div className="space-y-4 divide-y divide-brand-primary-container/20">
                    {cartItems.map((item) => (
                      <div 
                        key={item.product.id} 
                        className="flex items-center gap-4 pt-4 first:pt-0 group select-none"
                      >
                        {/* Miniature Product Photo */}
                        <div className="relative w-16 h-16 bg-brand-background rounded-xl overflow-hidden shrink-0 border border-brand-primary-container/25">
                          <img
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                            src={item.product.image}
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Middle info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-headline text-sm font-semibold text-brand-on-surface truncate group-hover:text-brand-primary transition-colors">
                            {item.product.name}
                          </h4>
                          <span className="font-label text-[10px] text-brand-on-primary-container bg-brand-primary-container px-2 py-0.5 rounded uppercase font-bold tracking-wide">
                            {item.product.category}
                          </span>
                          <div className="text-brand-tertiary font-bold text-xs mt-1 text-brand-tertiary">
                            {formatPrice(item.product.price)} c/u
                          </div>
                        </div>

                        {/* Right interaction row */}
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          
                          {/* Trash bin trigger */}
                          <button
                            onClick={() => {
                              onRemoveItem(item.product.id);
                              onShowNotification(`"${item.product.name}" eliminado del carrito 🥺`);
                            }}
                            className="text-gray-400 hover:text-brand-tertiary transition-colors"
                            title="Quitar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          {/* Plus-minus items quantity counter row */}
                          <div className="flex items-center gap-2.5 bg-brand-background border border-brand-primary-container/20 rounded-lg px-2 py-1">
                            <button
                              onClick={() => {
                                if (item.quantity > 1) {
                                  onUpdateQuantity(item.product.id, item.quantity - 1);
                                } else {
                                  onRemoveItem(item.product.id);
                                }
                              }}
                              className="text-brand-primary hover:scale-110 font-bold transition-transform text-xs"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-headline text-xs font-bold text-brand-on-surface">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="text-brand-primary hover:scale-110 font-bold transition-transform text-xs"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            )}
          </div>

          {/* Footers controls: Subtotals and Buttons */}
          {!checkoutFinished && cartItems.length > 0 && (
            <div className="px-6 py-6 border-t border-brand-primary-container/30 bg-brand-background/80 space-y-4">
              
              {/* Promo code form */}
              {!isCheckingOut && (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-brand-primary absolute left-3 top-3.5" />
                    <input
                      type="text"
                      placeholder="CUPÓN (Ej. KITTY10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                      className="w-full pl-9 pr-4 py-2.5 bg-white border border-brand-primary-container/40 rounded-full text-xs font-label uppercase font-bold focus:outline-none focus:ring-1 focus:ring-brand-primary/30"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={promoApplied}
                    className="bg-brand-primary text-white text-xs font-bold px-4 py-2 rounded-full hover:scale-105 active:scale-95 transition-all disabled:opacity-50 select-none"
                  >
                    Aplicar
                  </button>
                </form>
              )}

              {/* Delivery Speed controls toggler */}
              <div className="bg-white p-3 rounded-2xl border border-brand-primary-container/20 space-y-2">
                <span className="text-xs font-bold text-brand-on-surface-variant flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-brand-primary animate-pulse" />
                  <span>Método de Entrega</span>
                </span>
                
                <div className="grid grid-cols-2 gap-2 text-[10px] sm:text-xs">
                  {/* Standard option */}
                  <button
                    type="button"
                    onClick={() => setShippingMethod('standard')}
                    className={`p-2 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      shippingMethod === 'standard'
                        ? 'border-brand-primary bg-brand-primary-container/20 text-brand-primary font-bold'
                        : 'border-gray-200 bg-transparent text-gray-500'
                    }`}
                  >
                    <span>Envío Normal (3-5 días)</span>
                    <span className="text-xs font-black uppercase text-brand-primary font-headline">Gratis</span>
                  </button>

                  {/* Express option */}
                  <button
                    type="button"
                    onClick={() => setShippingMethod('express')}
                    className={`p-2 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      shippingMethod === 'express'
                        ? 'border-brand-primary bg-brand-primary-container/20 text-brand-primary font-bold'
                        : 'border-gray-200 bg-transparent text-gray-500'
                    }`}
                  >
                    <span>Envío Express (1-2 días)</span>
                    <span className="text-xs font-black text-brand-tertiary font-headline">{formatPrice(12000)}</span>
                  </button>
                </div>
              </div>

              {/* Pricing breakdown details */}
              <div className="space-y-1.5 pt-2 border-t border-brand-primary-container/20 text-xs sm:text-sm">
                
                <div className="flex justify-between font-label font-medium text-brand-on-surface-variant">
                  <span>Subtotal:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                {promoApplied && (
                  <div className="flex justify-between font-label font-bold text-brand-primary">
                    <span>Descuento (10%):</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between font-label font-medium text-brand-on-surface-variant">
                  <span>Costo de Envío:</span>
                  <span>{shippingCost === 0 ? 'Gratis' : formatPrice(shippingCost)}</span>
                </div>

                <div className="flex justify-between font-headline font-black text-lg text-brand-tertiary pt-2 border-t border-brand-primary-container/10">
                  <span>Total estimado:</span>
                  <span>{formatPrice(total)}</span>
                </div>

              </div>

              {/* Confirm checkout/start checkout button */}
              {!isCheckingOut ? (
                <button
                  onClick={handleStartCheckout}
                  className="w-full bg-brand-tertiary text-white py-4 rounded-full font-label text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:scale-102 active:scale-95 transition-all select-none"
                >
                  <Sparkles className="w-4 h-4 fill-brand-primary-container text-white" />
                  <span>Proceder al Pago 🛍️</span>
                </button>
              ) : null}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
