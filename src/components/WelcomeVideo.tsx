/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  QrCode, 
  Sparkles, 
  Heart, 
  Star, 
  Laptop, 
  Smartphone, 
  Tv
} from 'lucide-react';

interface WelcomeVideoProps {
  onShowNotification: (msg: string) => void;
}

export default function WelcomeVideo({ onShowNotification }: WelcomeVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // A single, extremely stable and light public test video on high-speed CDN.
  // This is officially cached, fully optimized and bypasses CORS and browser constraints.
  const videoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4';

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [appUrl, setAppUrl] = useState('https://karolkitty.com');
  const [captionText, setCaptionText] = useState('¡Hola, Kitty Amiga! Te damos la bienvenida a Karol Kitty... 💖');

  // Deep link generation
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentOrigin = window.location.origin + window.location.pathname;
      const deepLink = `${currentOrigin}?video=play`;
      setAppUrl(deepLink);
    }
  }, []);

  // Update dynamic captions as the video plays to say a cute greeting
  useEffect(() => {
    if (currentTime < 3) {
      setCaptionText('¡Hola Kitty Amiga! Bienvenido al rincón más dulce de internet... 🥰🎈');
    } else if (currentTime < 7) {
      setCaptionText('Encuentra peluches adorables, bolsos mágicos y papelería japonesa única ✨🌸');
    } else if (currentTime < 11) {
      setCaptionText('Cada artículo ha sido seleccionado con amor puro para alegrar tu día 🎀🧸');
    } else if (currentTime < 14) {
      setCaptionText('¡No olvides unirte al tierno Club Karol Kitty con tu carrito! 🛍️💖');
    } else {
      setCaptionText('¡Gracias por visitarnos y vivir la magia Kawaii con nosotros! 🌟🧚‍♀️');
    }
  }, [currentTime]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.warn("Playback failed or blocked by browser:", err);
            // Fallback play state
            setIsPlaying(false);
            onShowNotification('Haz clic directamente para dar permisos de reproducción 💖');
          });
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
      onShowNotification(nextMuted ? 'Música del video silenciada 🤫' : 'Volumen del video activado 🎵✨');
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const dur = videoRef.current.duration || 1;
      setCurrentTime(current);
      setDuration(dur);
      setProgress((current / dur) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 15);
    }
  };

  const handleProgressBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (videoRef.current && duration > 0) {
      const newTime = (val / 100) * duration;
      videoRef.current.currentTime = newTime;
      setProgress(val);
      setCurrentTime(newTime);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return '00:00';
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section 
      id="welcome-video-section" 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 scroll-mt-24"
    >
      {/* Container Card */}
      <div 
        id="video-qr-showcase" 
        className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border-2 border-brand-primary-container relative overflow-hidden kawaii-shadow"
      >
        {/* Adorable Background Ornaments */}
        <div className="absolute top-4 right-4 text-brand-primary/10 select-none pointer-events-none animate-pulse">
          <Sparkles className="w-16 h-16 fill-brand-primary-container/20" />
        </div>
        <div className="absolute bottom-4 left-4 text-brand-primary/10 select-none pointer-events-none">
          <Heart className="w-16 h-16 fill-brand-primary-container/20 animate-bounce" />
        </div>

        {/* Section Header */}
        <div id="video-intro-title" className="text-center md:text-left mb-8 max-w-3xl">
          <span className="inline-flex items-center gap-1.5 bg-brand-primary-container text-brand-on-primary-container px-3.5 py-1.5 rounded-full font-label text-xs font-bold border border-brand-primary/10 tracking-wide uppercase shadow-2xs">
            <Tv className="w-3.5 h-3.5 text-brand-on-primary-container shrink-0" />
            <span>Presentación Exclusiva 🎀</span>
          </span>
          <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-on-surface tracking-tight mt-2 flex items-center justify-center md:justify-start gap-2">
            Video de Bienvenida Kawaii ⭐
          </h2>
          <p className="font-body text-xs sm:text-sm text-brand-on-surface-variant font-medium mt-1 leading-relaxed">
            Presiona play para disfrutar de nuestro adorable video promocional, o escanea el código QR desde tu smartphone para llevar toda la ternura contigo.
          </p>
        </div>

        {/* Grid layout containing the video player and mobile QR */}
        <div id="video-qr-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Video Player Container (Takes 7 columns) */}
          <div id="video-player-frame" className="lg:col-span-7 flex flex-col space-y-3 justify-between">
            
            <div 
              id="player-wrapper" 
              className="relative bg-black rounded-2xl overflow-hidden aspect-video border-4 border-brand-primary-container shadow-md group select-none flex flex-col justify-center items-center"
            >
              {/* Actual Video Tag with standard source loaded safely */}
              <video
                ref={videoRef}
                onClick={togglePlay}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                src={videoUrl}
                loop
                playsInline
                className="w-full h-full object-cover cursor-pointer bg-black"
                referrerPolicy="no-referrer"
              />

              {/* Big Play Overlay Button */}
              {!isPlaying && (
                <button
                  id="big-play-overlay"
                  onClick={togglePlay}
                  className="absolute inset-0 m-auto w-16 h-16 bg-[#78555e]/90 hover:bg-brand-primary text-white rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 scale-100 hover:scale-110 active:scale-95 shadow-lg group-hover:bg-brand-primary hover:rotate-6 z-35"
                  title="Reproducir bienvenida"
                >
                  <Play className="w-8 h-8 fill-white ml-1" />
                </button>
              )}

              {/* Subtitles Overlay */}
              <div 
                id="subtitle-overlay-box" 
                className="absolute bottom-16 left-4 right-4 bg-black/60 backdrop-blur-3xs p-2.5 rounded-xl text-center z-10 pointer-events-none transition-all duration-300 border border-white/10"
              >
                <p className="font-body text-xs sm:text-sm font-semibold text-[#FFECEF] tracking-wide">
                  {captionText}
                </p>
              </div>

              {/* Custom Player Controls Bar */}
              <div 
                id="custom-controls-bar"
                className="absolute bottom-0 left-0 right-0 bg-[#78555e]/95 backdrop-blur-xs p-3 flex items-center justify-between gap-4 z-20 shadow-inner border-t border-white/10"
              >
                {/* Play/Pause Button */}
                <button
                  id="controls-play-btn"
                  onClick={togglePlay}
                  className="text-white hover:text-brand-primary-container p-1.5 rounded-lg hover:bg-white/10 active:scale-90 transition-all shrink-0 cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white" />}
                </button>

                {/* Left/Current Time Tracker */}
                <span className="text-[10px] text-white font-mono shrink-0 select-none font-bold">
                  {formatTime(currentTime)}
                </span>

                {/* Progress bar input */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={handleProgressBarChange}
                  className="flex-1 h-1.5 bg-white/20 hover:bg-white/30 rounded-full appearance-none cursor-pointer active:cursor-grabbing outline-none accent-[#f6cbcd] transition-all"
                  style={{
                    background: `linear-gradient(to right, #f6cbcd ${progress}%, rgba(255,255,255,0.2) ${progress}%)`
                  }}
                  title="Barra de progreso de reproducción"
                />

                {/* Total Duration Tracker */}
                <span className="text-[10px] text-pink-200 font-mono shrink-0 select-none font-bold">
                  {formatTime(duration)}
                </span>

                {/* Mute and HD status badge */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    id="controls-mute-btn"
                    onClick={toggleMute}
                    className="text-white hover:text-brand-primary-container p-1 rounded-lg hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
                    title={isMuted ? "Activar audio" : "Silenciar audio"}
                  >
                    {isMuted ? <VolumeX className="w-4.5 h-4.5" /> : <Volume2 className="w-4.5 h-4.5" />}
                  </button>

                  <span className="hidden sm:inline bg-white/15 text-white text-[9px] font-black tracking-widest px-2 py-1 rounded-md uppercase font-label">
                    BIENVENIDA ✨
                  </span>
                </div>

              </div>

            </div>

            {/* Bottom info banner */}
            <div className="flex items-center justify-between text-xs font-bold text-brand-on-surface-variant font-label bg-brand-background px-4 py-2.5 rounded-xl border border-brand-primary-container/20">
              <span className="flex items-center gap-1.5 text-brand-primary">
                <Laptop className="w-4 h-4 shrink-0" />
                <span>Modo Pantalla Completa Web / Tablet</span>
              </span>
              <span className="text-gray-500 font-normal">Soporte nativo sin restricciones</span>
            </div>

          </div>

          {/* Right Mobile QR Scanner (Takes 5 columns) */}
          <div id="video-qr-scanner-box" className="lg:col-span-5 flex flex-col justify-center items-center">
            
            <div id="qr-decorative-card" className="bg-[#FFF2F4] rounded-2xl p-6 border-2 border-[#FFE3E8] w-full max-w-sm flex flex-col items-center text-center space-y-4 hover:shadow-sm transition-all duration-300">
              
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1 bg-[#78555e] text-white text-[10px] uppercase font-black tracking-widest px-2.5 py-1 rounded-full font-label shadow-2xs">
                  <QrCode className="w-3.5 h-3.5 shrink-0" />
                  <span>Código de Escaneo</span>
                </span>
                <h3 className="font-headline text-lg font-extrabold text-brand-on-surface text-[#78555e]">
                  Ver en tu Dispositivo Móvil 📱
                </h3>
              </div>

              {/* QR Code generator */}
              <div id="qr-code-canvas-container" className="bg-white p-4 rounded-xl shadow-xs border-2 border-[#FFCCD4] relative group">
                <img
                  id="dynamic-qr-image"
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&color=78555e&bgcolor=ffffff&qzone=1&data=${encodeURIComponent(appUrl)}`}
                  alt="Código QR de Karol Kitty"
                  className="w-40 h-40 object-contain mx-auto select-none rounded-md"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute top-1 left-1 text-yellow-500 opacity-80 animate-bounce">
                  <Star className="w-4.5 h-4.5 fill-yellow-400" />
                </div>
                <div className="absolute bottom-1 right-1 text-brand-primary opacity-80 animate-pulse">
                  <Heart className="w-4.5 h-4.5 fill-brand-primary" />
                </div>
              </div>

              <div className="space-y-1 pt-1 w-full text-center">
                <p className="font-body text-xs text-brand-on-surface-variant font-bold leading-normal max-w-xs mx-auto">
                  Abre la cámara de tu móvil para escanear y acceder al instante a este video de bienvenida interactivo.
                </p>
                <div className="bg-white border border-[#FADADD] px-2.5 py-1.5 rounded-lg text-[9px] font-mono text-[#78555e] break-all max-w-xs shadow-2xs select-all font-bold">
                  {appUrl}
                </div>
              </div>

              <div className="flex items-center justify-center gap-1.5 bg-brand-primary-container text-brand-on-primary-container text-xs px-4 py-2.5 rounded-full font-bold w-full">
                <Smartphone className="w-4 h-4 animate-bounce text-brand-primary" />
                <span className="uppercase text-[10px] tracking-wide">¡Perfecto para compartir en Redes!</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
