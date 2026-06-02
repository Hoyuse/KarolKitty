/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, RefreshCw, Mail, Star, HeartCrack } from 'lucide-react';
import { Product, CartItem, Category } from './types';
import { INITIAL_PRODUCTS } from './data';

// Component imports
import Header from './components/Header';
import Hero from './components/Hero';
import WelcomeVideo from './components/WelcomeVideo';
import Categories from './components/Categories';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import ContactModal from './components/ContactModal';
import MissionVisionModal from './components/MissionVisionModal';
import Footer from './components/Footer';

export default function App() {
  // --- Core States ---
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favoriteProductIds, setFavoriteProductIds] = useState<string[]>([]);
  
  // --- Filters State ---
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);

  // --- Modals Toggle ---
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [contactOpen, setContactOpen] = useState<boolean>(false);
  const [missionVisionOpen, setMissionVisionOpen] = useState<boolean>(false);
  
  // --- Newsletter ---
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newsletterRegistered, setNewsletterRegistered] = useState<boolean>(false);

  // --- Toast state ---
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState<boolean>(false);

  // --- Persistent Storage loading ---
  useEffect(() => {
    // Cart Load
    try {
      const storedCart = localStorage.getItem('kk_cart_v1');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (e) {
      console.warn('Failed to load cart from localStorage', e);
    }

    // Favorites Load
    try {
      const storedFavs = localStorage.getItem('kk_favs_v1');
      if (storedFavs) {
        setFavoriteProductIds(JSON.parse(storedFavs));
      }
    } catch (e) {
      console.warn('Failed to load favorites from localStorage', e);
    }
  }, []);

  // --- Persistent Storage triggers ---
  const saveCartToStorage = (updatedCart: CartItem[]) => {
    try {
      localStorage.setItem('kk_cart_v1', JSON.stringify(updatedCart));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  };

  const saveFavoritesToStorage = (updatedFavorites: string[]) => {
    try {
      localStorage.setItem('kk_favs_v1', JSON.stringify(updatedFavorites));
    } catch (e) {
      console.warn('Failed to save favorites to localStorage', e);
    }
  };

  // --- Toast Trigger Utility ---
  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
  };

  useEffect(() => {
    if (toastVisible) {
      const timer = setTimeout(() => {
        setToastVisible(false);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastVisible, toastMessage]);

  useEffect(() => {
    // Check deep links
    try {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('video') === 'play') {
        setTimeout(() => {
          const element = document.getElementById('welcome-video-section');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            showNotification('¡Acceso directo al video de bienvenida! 🎀✨');
          }
        }, 1200);
      }
    } catch (e) {
      console.warn('Failed to parse query params', e);
    }
  }, []);

  // --- Interactive Functions ---
  const handleToggleFavorite = (productId: string) => {
    let updated: string[];
    const isFav = favoriteProductIds.includes(productId);
    
    if (isFav) {
      updated = favoriteProductIds.filter(id => id !== productId);
      showNotification('Eliminado de tus favoritos 🥺💔');
    } else {
      updated = [...favoriteProductIds, productId];
      showNotification('¡Añadido a tus favoritos con amor! 💖✨');
    }
    
    setFavoriteProductIds(updated);
    saveFavoritesToStorage(updated);
  };

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    const existingIndex = cart.findIndex(item => item.product.id === product.id);
    let updatedCart: CartItem[];

    if (existingIndex > -1) {
      updatedCart = [...cart];
      updatedCart[existingIndex].quantity += quantity;
    } else {
      updatedCart = [...cart, { product, quantity }];
    }

    setCart(updatedCart);
    saveCartToStorage(updatedCart);
    showNotification(`¡Añadido con amor! ✨ (${quantity}x ${product.name})`);
  };

  const handleUpdateCartQuantity = (productId: string, newQuantity: number) => {
    const updated = cart.map(item => {
      if (item.product.id === productId) {
        return { ...item, quantity: Math.max(1, newQuantity) };
      }
      return item;
    });
    setCart(updated);
    saveCartToStorage(updated);
  };

  const handleRemoveCartItem = (productId: string) => {
    const updated = cart.filter(item => item.product.id !== productId);
    setCart(updated);
    saveCartToStorage(updated);
  };

  const handleClearCart = () => {
    setCart([]);
    saveCartToStorage([]);
  };

  const handleSubscribeNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      showNotification('Por favor, ingresa un correo electrónico válido 🌸');
      return;
    }
    setNewsletterRegistered(true);
    showNotification('¡Bienvenido al Kitty Club! 💖 Descuento enviado a tu email ✨');
  };

  // --- Filtering Products ---
  const filteredProducts = products.filter(product => {
    // 1. Category check
    const matchesCategory = selectedCategory 
      ? product.category === selectedCategory 
      : true;

    // 2. Search check
    const normalizedSearch = searchTerm.toLowerCase().trim();
    const matchesSearch = normalizedSearch
      ? product.name.toLowerCase().includes(normalizedSearch) || 
        product.category.toLowerCase().includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch)
      : true;

    // 3. Favorites toggle check
    const matchesFavorites = showOnlyFavorites 
      ? favoriteProductIds.includes(product.id) 
      : true;

    return matchesCategory && matchesSearch && matchesFavorites;
  });

  // Calculate cart counts
  const totalCartItemsCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen bg-brand-background text-brand-on-surface font-body select-none">
      
      {/* Decorative subtle background grid dots */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.06] bg-[radial-gradient(#78555e_1.2px,transparent_1.2px)] [background-size:24px_24px] pointer-events-none z-0"></div>

      {/* Primary Header */}
      <Header
        cartCount={totalCartItemsCount}
        favoriteCount={favoriteProductIds.length}
        currentCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setShowOnlyFavorites(false); // Reset favorites filter on category click
        }}
        onToggleCart={() => setCartOpen(true)}
        onToggleFavorites={() => {
          setShowOnlyFavorites(!showOnlyFavorites);
          setSelectedCategory(null); // Clear category filter to show all loved items
          if (!showOnlyFavorites) {
            showNotification('Mostrando tus artículos favoritos 💖');
          } else {
            showNotification('Mostrando el catálogo completo ✨');
          }
        }}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onOpenContact={() => setContactOpen(true)}
        onOpenMissionVision={() => setMissionVisionOpen(true)}
      />

      <main className="relative z-10">
        
        {/* Render hero only on initial un-filtered view to maintain simple tidy view */}
        {!selectedCategory && !searchTerm && !showOnlyFavorites && (
          <>
            <Hero 
              onExploreClick={() => {
                const element = document.getElementById('catalog-section');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }} 
            />
            <WelcomeVideo onShowNotification={showNotification} />
          </>
        )}

        {/* Categories slider */}
        <Categories
          currentCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setShowOnlyFavorites(false);
          }}
        />

        {/* Catalog Showcase Section */}
        <section id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
          
          {/* Grid Headers Info */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mb-10 pb-4 border-b border-brand-primary-container/20">
            <div>
              <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-brand-on-surface tracking-tight">
                {showOnlyFavorites ? (
                  <span className="flex items-center gap-1.5 text-brand-primary">
                    <Heart className="w-6 h-6 fill-brand-primary-container text-brand-primary" />
                    <span>Tus Favoritos Guardados</span>
                  </span>
                ) : selectedCategory ? (
                  `Categoría: ${selectedCategory}`
                ) : searchTerm ? (
                  `Resultados para: "${searchTerm}"`
                ) : (
                  <span>Favoritos de la Semana</span>
                )}
              </h2>
              
              <p className="font-body text-xs sm:text-sm text-brand-on-surface-variant font-medium mt-1">
                {showOnlyFavorites 
                  ? `Tienes ${filteredProducts.length} coleccionables queridos` 
                  : 'Los artículos más cute que todos están amando.'}
              </p>
            </div>

            {/* Total items found */}
            <div className="text-xs font-semibold text-brand-on-surface-variant font-label bg-white border border-brand-primary-container/25 px-4 py-2 rounded-full shadow-xs">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'artículo' : 'artículos'} encontrados
            </div>
          </div>

          {/* Grid Products Display */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  isFavorite={favoriteProductIds.includes(prod.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onAddToCart={(p) => handleAddToCart(p, 1)}
                  onOpenDetails={setSelectedProduct}
                />
              ))}
            </div>
          ) : (
            /* Empty list feedback */
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-brand-primary-container/35 max-w-xl mx-auto space-y-4 shadow-sm px-6">
              <div className="w-16 h-16 bg-brand-background rounded-full flex items-center justify-center mx-auto text-brand-primary">
                <HeartCrack className="w-8 h-8 animate-pulse text-brand-on-primary-container/85" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-headline text-lg font-bold text-brand-on-surface">
                  No encontramos resultados para tu búsqueda
                </h3>
                <p className="font-body text-xs text-brand-on-surface-variant max-w-sm mx-auto">
                  Prueba cambiando los términos de búsqueda o selecciona otra categoría kawaii.
                </p>
              </div>

              {/* Reset view triggers */}
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory(null);
                  setShowOnlyFavorites(false);
                }}
                className="inline-flex items-center gap-1 bg-brand-primary text-white text-xs font-bold px-5 py-2.5 rounded-full hover:scale-105 active:scale-95 transition-all shadow-sm"
              >
                <RefreshCw className="w-3.5 h-3.5 shrink-0" />
                <span>Restablecer Catálogo</span>
              </button>
            </div>
          )}

        </section>

        {/* Newsletter Registration Box */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-brand-primary-fixed/55 p-8 sm:p-12 lg:p-16 rounded-3xl relative overflow-hidden flex flex-col items-center text-center border-2 border-brand-primary-container/40 shadow-xs">
            
            {/* Grid dot wallpaper inside banner */}
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(#78555e_1.5px,transparent_1.5px)] [background-size:16px_16px]"></div>

            {newsletterRegistered ? (
              <div className="space-y-4 max-w-md animate-fade-in relative z-10 font-label">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto text-brand-primary border border-brand-primary-container shadow-xs">
                  <Star className="w-8 h-8 animate-spin fill-brand-primary-container text-brand-primary" />
                </div>
                <div>
                  <h3 className="font-headline text-2xl font-black text-brand-on-primary-fixed">
                    ¡Ya eres parte del Kitty Club! 💖
                  </h3>
                  <p className="font-body text-sm text-brand-on-primary-fixed-variant mt-2 font-semibold">
                    Revisa tu casilla de correo electrónico. Te hemos enviado un <b>código de descuento exclusivo del 10%</b> para usar en tu primera compra y una sorpresa mágica.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6 max-w-xl relative z-10">
                <span className="inline-flex items-center gap-1.5 bg-white text-brand-primary px-4 py-1.5 rounded-full font-label text-xs font-bold tracking-wider uppercase border border-brand-primary-container/20 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-brand-primary animate-pulse" />
                  <span>Nuestra Comunidad</span>
                </span>

                <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-brand-on-primary-fixed leading-tight">
                  Únete al Kitty Club
                </h2>

                <p className="font-body text-sm sm:text-base text-brand-on-primary-fixed-variant leading-relaxed max-w-lg mx-auto font-semibold">
                  Recibe ofertas exclusivas, lanzamientos antes que nadie, sorpresas de cumpleaños y un 10% de descuento en tu primera compra.
                </p>

                {/* Submit Form */}
                <form onSubmit={handleSubscribeNewsletter} className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto pt-2">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-brand-primary absolute left-4 top-3.5" />
                    <input
                      required
                      type="email"
                      placeholder="Tu correo electrónico"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="w-full pl-10 pr-5 py-3.5 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-brand-primary/40 bg-white font-body text-xs sm:text-sm shadow-sm placeholder-gray-400 font-semibold"
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    className="bg-brand-on-primary-fixed text-white px-8 py-3.5 rounded-full font-label text-xs sm:text-sm font-bold shadow-md hover:scale-105 active:scale-95 transition-all whitespace-nowrap cursor-pointer select-none"
                  >
                    Suscribirme de inmediato
                  </button>
                </form>
              </div>
            )}

          </div>
        </section>

      </main>

      {/* Primary Footer Section */}
      <Footer onShowNotification={showNotification} />

      {/* 4. MODALS & SLIDE DRAWERS PLACEMENTS */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        isFavorite={selectedProduct ? favoriteProductIds.includes(selectedProduct.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onShowNotification={showNotification}
      />

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        onShowNotification={showNotification}
      />

      <MissionVisionModal
        isOpen={missionVisionOpen}
        onClose={() => setMissionVisionOpen(false)}
      />

      {/* 5. GORGEOUS CUSTOM FLOATING TOAST NOTIFICATION */}
      <div 
        className={`fixed bottom-6 right-6 z-[100] bg-white border-2 border-brand-primary-container p-4 rounded-2xl kawaii-shadow flex items-center gap-3 transition-transform duration-500 font-label pointer-events-auto max-w-sm sm:max-w-md border border-[#FADADD] ${
          toastVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-24 scale-90 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-brand-primary-container p-2.5 rounded-full text-brand-on-primary-container shrink-0">
          <Sparkles className="w-4 h-4 fill-brand-primary-container animate-pulse" />
        </div>
        <p className="text-xs sm:text-sm font-bold text-brand-on-surface">
          {toastMessage}
        </p>
      </div>

    </div>
  );
}
