"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, ChevronLeft, ChevronRight, Sparkles, ShieldCheck, Truck, QrCode } from "lucide-react";

interface HeroSlide {
  id: number;
  image: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    image: "/campaign-hero.jpg",
    eyebrow: "LANZAMIENTO OFICIAL // DROP 01",
    title: "SAVAGE ROOTS // ROPA PESADA 280 GSM",
    subtitle: "Corte Boxfit estructurado, algodón peinado de fibra larga y lavado mineral artesanal que resalta el físico.",
    ctaText: "COMPRAR DROP AHORA",
    ctaLink: "#catalogo",
  },
  {
    id: 2,
    image: "/campaign-gym.jpg",
    eyebrow: "FORJADO EN EL HIERRO // ALTO RENDIMIENTO",
    title: "DISEÑADO PARA ENTRENAR AL LÍMITE",
    subtitle: "Estructura densa indeformable y sisas amplias para máxima libertad en presses y jalones pesados.",
    ctaText: "VER ESQUELETOS & TANKS",
    ctaLink: "#catalogo",
  },
  {
    id: 3,
    image: "/campaign-supps.jpg",
    eyebrow: "HIERRO & CIENCIA // CERO RELLENOS",
    title: "CREATINA 200 MESH & NUTRICIÓN PURA",
    subtitle: "Fórmulas micronizadas de grado farmacéutico diseñadas para saturación celular y fuerza explosiva real.",
    ctaText: "VER SUPLEMENTACIÓN",
    ctaLink: "#catalogo",
  },
];

export const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Auto-advance slides every 5.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      handleNext(); // Swiped left -> next
    } else if (diff < -50) {
      handlePrev(); // Swiped right -> prev
    }
    setTouchStartX(null);
  };

  const scrollToCatalog = () => {
    const el = document.getElementById("catalogo");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative w-full select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Main Full-Width Hero Slider Viewport */}
      <div className="relative w-full h-[78svh] min-h-[500px] sm:h-[88vh] sm:min-h-[600px] overflow-hidden bg-black touch-pan-y">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover object-center transform scale-100 transition-transform duration-[6000ms] ease-out"
                style={{
                  transform: isActive ? "scale(1.04)" : "scale(1)",
                }}
              />

              {/* Cinematic Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />

              {/* Floating Content Box */}
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-16 sm:pb-24 px-4 text-center">
                {/* Eyebrow Tag */}
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 bg-white/90 backdrop-blur-md text-black text-[9px] sm:text-[10px] font-bold tracking-[0.22em] uppercase mb-3 sm:mb-4 shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
                  <span>{slide.eyebrow}</span>
                </div>

                {/* Big Editorial Title */}
                <h2 className="font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide uppercase text-white max-w-4xl leading-tight drop-shadow-md animate-in fade-in slide-in-from-bottom-3 duration-700 px-2">
                  {slide.title}
                </h2>

                {/* Subhead Description */}
                <p className="mt-2.5 sm:mt-3 text-[11px] sm:text-xs md:text-sm text-neutral-200 max-w-lg font-normal leading-relaxed drop-shadow animate-in fade-in slide-in-from-bottom-4 duration-900 px-2 line-clamp-3 sm:line-clamp-none">
                  {slide.subtitle}
                </p>

                {/* CTA Button */}
                <div className="mt-5 sm:mt-6 flex items-center gap-3">
                  <button
                    onClick={scrollToCatalog}
                    className="px-7 sm:px-9 py-3 sm:py-3.5 bg-white hover:bg-neutral-100 text-black text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase transition-all transform hover:scale-105 active:scale-95 shadow-2xl"
                  >
                    {slide.ctaText}
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Carousel Arrow Controls - Desktop / Tablet */}
        <button
          onClick={handlePrev}
          className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 sm:w-11 h-10 sm:h-11 bg-white/20 hover:bg-white text-white hover:text-black rounded-full items-center justify-center backdrop-blur-md transition-all shadow-lg active:scale-90"
          aria-label="Diapositiva anterior"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2]" />
        </button>

        <button
          onClick={handleNext}
          className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 sm:w-11 h-10 sm:h-11 bg-white/20 hover:bg-white text-white hover:text-black rounded-full items-center justify-center backdrop-blur-md transition-all shadow-lg active:scale-90"
          aria-label="Siguiente diapositiva"
        >
          <ChevronRight className="w-5 h-5 stroke-[2]" />
        </button>

        {/* Slide Progress Indicators (Dots with active bar) */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 transition-all rounded-full ${
                idx === currentSlide
                  ? "w-7 sm:w-8 bg-white shadow-md"
                  : "w-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Ir a diapositiva ${idx + 1}`}
            />
          ))}
        </div>

        {/* Chevron to Scroll Down */}
        <button
          onClick={scrollToCatalog}
          className="hidden md:flex absolute bottom-8 right-8 z-30 w-10 h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-black items-center justify-center backdrop-blur-md shadow-lg transition-transform hover:translate-y-1"
          aria-label="Bajar al catálogo"
        >
          <ChevronDown className="w-5 h-5 stroke-[2]" />
        </button>
      </div>

      {/* 🇨🇴 NUESTRO TOQUE: Barra de Identidad y Ecosistema VitalFit */}
      <div className="w-full bg-[#0a0a0c] text-white border-y border-neutral-800 py-3 sm:py-4 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 text-center">
          <div className="flex items-center justify-center gap-2 sm:gap-2.5 py-1.5 px-1 bg-white/[0.02] sm:bg-transparent rounded sm:rounded-none">
            <span className="text-sm sm:text-base flex-shrink-0">🇨🇴</span>
            <div className="text-left">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase block text-white leading-tight">
                ALGODÓN PESADO 280 GSM
              </span>
              <span className="text-[9px] sm:text-[10px] text-neutral-400 block leading-tight">
                Tejido denso pre-encogido
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 sm:gap-2.5 py-1.5 px-1 bg-white/[0.02] sm:bg-transparent rounded sm:rounded-none">
            <QrCode className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 flex-shrink-0" />
            <div className="text-left">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase block text-amber-400 leading-tight">
                APP VITALFIT INCLUIDA
              </span>
              <span className="text-[9px] sm:text-[10px] text-neutral-400 block leading-tight">
                QR con rutinas Pro 30 días
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 sm:gap-2.5 py-1.5 px-1 bg-white/[0.02] sm:bg-transparent rounded sm:rounded-none">
            <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-300 flex-shrink-0" />
            <div className="text-left">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase block text-white leading-tight">
                DESPACHO 24-48H
              </span>
              <span className="text-[9px] sm:text-[10px] text-neutral-400 block leading-tight">
                Envíos asegurados Colombia
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 sm:gap-2.5 py-1.5 px-1 bg-white/[0.02] sm:bg-transparent rounded sm:rounded-none">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 flex-shrink-0" />
            <div className="text-left">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase block text-white leading-tight">
                CAMBIOS SIN COSTO
              </span>
              <span className="text-[9px] sm:text-[10px] text-neutral-400 block leading-tight">
                Garantía total de talla
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
