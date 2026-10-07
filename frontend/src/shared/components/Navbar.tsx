"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, User, ChevronDown, X, Menu, Sparkles, MessageCircle, ArrowRight } from "lucide-react";
import { useCartStore } from "@/features/cart/store/cart.store";

const TICKER_MESSAGES = [
  "⚡ DROP 01 // SAVAGE ROOTS EN VIVO • EDICIÓN LIMITADA",
  "🇨🇴 ENVÍO GRATIS A TODA COLOMBIA EN COMPRAS SOBRE $150.000 COP",
  "📲 CADA PRENDA INCLUYE QR CON 30 DÍAS VIP EN LA APP VITALFIT",
  "🧬 CREATINA MICRONIZADA 200 MESH DE GRADO FARMACÉUTICO",
];

export const Navbar: React.FC = () => {
  const { toggleCart, getTotalItems } = useCartStore();
  const [activeMenu, setActiveMenu] = useState<"him" | "her" | "supplements" | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const totalItems = getTotalItems();

  // Rotate top announcement ribbon
  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % TICKER_MESSAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white select-none shadow-sm">
      {/* 1. TOP ANNOUNCEMENT TICKER (VITALFIT SIGNATURE RIBBON) */}
      <div className="w-full bg-[#0c0c0e] text-white py-1.5 px-4 text-center overflow-hidden border-b border-neutral-800">
        <div className="flex items-center justify-center gap-3 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-500">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
          <span>{TICKER_MESSAGES[tickerIndex]}</span>
          <span className="hidden sm:inline text-neutral-500">|</span>
          <a
            href="https://wa.me/573009128421"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold lowercase tracking-normal text-xs"
          >
            <MessageCircle className="w-3 h-3" />
            <span>asesoría directa</span>
          </a>
        </div>
      </div>

      {/* 2. MAIN HEADER BAR */}
      <div className="w-full px-3 sm:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between border-b border-neutral-200">
        {/* Left: Support / WhatsApp & Admin */}
        <div className="hidden lg:flex items-center gap-2">
          <a
            href="https://wa.me/573009128421"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded text-[11px] font-bold tracking-wider text-black transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>WHATSAPP</span>
          </a>
          <Link
            href="/admin"
            className="px-2 py-1.5 text-[10px] font-bold tracking-widest uppercase text-neutral-500 hover:text-black border border-transparent hover:border-neutral-200 transition-colors"
          >
            ADMIN ⚙
          </Link>
        </div>

        {/* Mobile menu hamburger */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 flex items-center justify-center text-black active:scale-95 transition-transform"
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 stroke-[1.8]" /> : <Menu className="w-6 h-6 stroke-[1.8]" />}
          </button>
        </div>

        {/* Center: Signature Brand Logo */}
        <div className="flex flex-col items-center justify-center">
          <Link href="/" className="group inline-block text-center">
            <h1 className="font-extrabold text-xl sm:text-2xl md:text-3xl tracking-[0.24em] sm:tracking-[0.38em] uppercase text-black hover:opacity-85 transition-opacity">
              V I T A L F I T
            </h1>
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 -mt-0.5">
              <span className="text-[6.5px] sm:text-[7.5px] tracking-[0.25em] sm:tracking-[0.3em] font-bold text-neutral-400 uppercase">
                HIERRO & CIENCIA
              </span>
              <span className="w-1 h-1 rounded-full bg-red-600" />
              <span className="text-[6.5px] sm:text-[7.5px] tracking-[0.25em] sm:tracking-[0.3em] font-bold text-black uppercase">
                EST. 2026
              </span>
            </div>
          </Link>
        </div>

        {/* Right: Actions (Search, Profile, Cart, Country) */}
        <div className="flex items-center gap-1.5 sm:gap-4 md:gap-6 text-black">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center hover:opacity-60 transition-opacity"
            aria-label="Buscar en la tienda"
          >
            <Search className="w-4 h-4 stroke-[1.8]" />
          </button>

          <Link
            href="/cuenta"
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center hover:opacity-60 transition-opacity"
            aria-label="Portal de Atleta / Mi Cuenta"
          >
            <User className="w-4 h-4 stroke-[1.8]" />
          </Link>

          {/* Cart Bag with badge */}
          <button
            onClick={toggleCart}
            className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center hover:opacity-60 transition-opacity"
            aria-label="Bolsa de compras"
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.8]" />
            {totalItems > 0 && (
              <span className="absolute top-1 right-0.5 sm:-top-1 sm:-right-2 bg-black text-white text-[8.5px] sm:text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-pulse">
                {totalItems}
              </span>
            )}
          </button>

          {/* Currency / Region Selector */}
          <div className="relative">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="hidden sm:flex items-center gap-1 text-[11px] font-bold tracking-wider text-black hover:opacity-70 transition-opacity bg-neutral-100 px-2 py-1 rounded"
            >
              <span>🇨🇴 COP</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            {currencyDropdownOpen && (
              <div className="absolute right-0 top-7 bg-white border border-neutral-200 shadow-xl rounded py-1.5 w-32 text-xs z-50">
                <button
                  onClick={() => setCurrencyDropdownOpen(false)}
                  className="w-full text-left px-3 py-1.5 hover:bg-neutral-100 flex items-center gap-2 font-medium"
                >
                  <span>🇨🇴 COP ($)</span>
                </button>
                <button
                  onClick={() => setCurrencyDropdownOpen(false)}
                  className="w-full text-left px-3 py-1.5 hover:bg-neutral-100 flex items-center gap-2 font-medium"
                >
                  <span>🇺🇸 USD ($)</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. EXPANDABLE SEARCH OVERLAY */}
      {searchOpen && (
        <div className="w-full bg-neutral-50 border-b border-neutral-200 px-4 sm:px-12 py-3 animate-in fade-in duration-200">
          <div className="max-w-2xl mx-auto flex items-center gap-3">
            <Search className="w-4 h-4 text-neutral-400" />
            <input
              type="text"
              autoFocus
              placeholder="Buscar por corte boxfit, creatina 200 mesh, esqueleto, oversize..."
              className="w-full bg-transparent border-none outline-none text-xs font-medium text-black placeholder:text-neutral-400"
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="text-xs text-neutral-500 hover:text-black uppercase font-bold tracking-wider"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* 4. PRIMARY NAVIGATION BAR */}
      <nav className="hidden lg:flex items-center justify-center gap-10 py-3 border-b border-neutral-100 text-[11px] font-bold tracking-[0.22em] uppercase text-black">
        <button
          onMouseEnter={() => setActiveMenu("him")}
          onClick={() => setActiveMenu(activeMenu === "him" ? null : "him")}
          className={`flex items-center gap-1 hover:opacity-60 transition-all pb-0.5 ${
            activeMenu === "him" ? "border-b-2 border-black" : ""
          }`}
        >
          <span>HOMBRES</span>
          <ChevronDown className="w-3 h-3" />
        </button>

        <button
          onMouseEnter={() => setActiveMenu("her")}
          onClick={() => setActiveMenu(activeMenu === "her" ? null : "her")}
          className={`flex items-center gap-1 hover:opacity-60 transition-all pb-0.5 ${
            activeMenu === "her" ? "border-b-2 border-black" : ""
          }`}
        >
          <span>MUJERES</span>
          <ChevronDown className="w-3 h-3" />
        </button>

        <button
          onMouseEnter={() => setActiveMenu("supplements")}
          onClick={() => setActiveMenu(activeMenu === "supplements" ? null : "supplements")}
          className={`flex items-center gap-1 hover:opacity-60 transition-all pb-0.5 ${
            activeMenu === "supplements" ? "border-b-2 border-black" : ""
          }`}
        >
          <span>SUPLEMENTACIÓN CIENTÍFICA</span>
          <span className="px-1.5 py-0.2 bg-black text-white text-[8px] font-extrabold rounded ml-1 tracking-widest">
            200 MESH
          </span>
        </button>

        <Link
          href="/colecciones"
          className="hover:opacity-60 transition-all pb-0.5"
        >
          COLECCIONES
        </Link>

        <Link
          href="/app"
          className="hover:opacity-60 transition-all flex items-center gap-1.5 text-black"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>APP VITALFIT</span>
        </Link>

        <Link
          href="/colecciones"
          className="text-red-600 hover:opacity-80 transition-all font-black"
        >
          DROPS EXCLUSIVOS
        </Link>
      </nav>

      {/* 5. VISUAL MEGA-MENU (RICH WITH IMAGES & PERKS) */}
      {activeMenu && (
        <div
          onMouseLeave={() => setActiveMenu(null)}
          className="absolute left-0 w-full bg-white border-b border-neutral-200 shadow-2xl py-8 px-6 sm:px-12 lg:px-20 z-50 animate-in fade-in slide-in-from-top-1 duration-200"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Column 1: Indumentaria */}
            <div>
              <h4 className="text-[10px] font-extrabold tracking-[0.25em] text-neutral-400 uppercase mb-3">
                INDUMENTARIA PESADA
              </h4>
              <ul className="space-y-2 text-xs font-semibold tracking-wider text-black">
                <li><a href="#catalogo" onClick={() => setActiveMenu(null)} className="hover:opacity-60">Esqueletos & Musculosas Boxfit</a></li>
                <li><a href="#catalogo" onClick={() => setActiveMenu(null)} className="hover:opacity-60">Camisetas Oversize 280 GSM</a></li>
                <li><a href="#catalogo" onClick={() => setActiveMenu(null)} className="hover:opacity-60">Prendas de Compresión</a></li>
                <li><a href="#catalogo" onClick={() => setActiveMenu(null)} className="hover:opacity-60">Buzos & Hoodies Pesados</a></li>
                <li><a href="#catalogo" onClick={() => setActiveMenu(null)} className="hover:opacity-60">Joggers de Entrenamiento</a></li>
                <li className="pt-2"><a href="#catalogo" onClick={() => setActiveMenu(null)} className="underline hover:opacity-60">Ver Todo el Catálogo →</a></li>
              </ul>
            </div>

            {/* Column 2: Suplementación & Ciencia */}
            <div>
              <h4 className="text-[10px] font-extrabold tracking-[0.25em] text-neutral-400 uppercase mb-3">
                CIENCIA DEL RENDIMIENTO
              </h4>
              <ul className="space-y-2 text-xs font-semibold tracking-wider text-black">
                <li><a href="#catalogo" onClick={() => setActiveMenu(null)} className="hover:opacity-60">Creatina 200 Mesh Pura</a></li>
                <li><a href="#catalogo" onClick={() => setActiveMenu(null)} className="hover:opacity-60">Pre-Entreno High-Stim Blood Rush</a></li>
                <li><a href="#catalogo" onClick={() => setActiveMenu(null)} className="hover:opacity-60">Proteína Aislada CFM</a></li>
                <li><a href="#catalogo" onClick={() => setActiveMenu(null)} className="hover:opacity-60">Shakers de Acero Inoxidable</a></li>
                <li><a href="#catalogo" onClick={() => setActiveMenu(null)} className="hover:opacity-60">Cinturones & Straps de Cuero</a></li>
              </ul>
            </div>

            {/* Column 3: Miniatura del Producto Insignia */}
            <div className="bg-neutral-50 p-3 border border-neutral-200 flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-bold tracking-[0.2em] text-red-600 uppercase block mb-1">
                  MÁS POPULAR ESTE MES
                </span>
                <h5 className="font-extrabold text-xs tracking-wider uppercase text-black">
                  CAMISETA OVERSIZE 280 GSM
                </h5>
                <p className="text-[11px] text-neutral-500 mt-1 line-clamp-2">
                  Algodón peinado de exportación con serigrafía híbrida plata/rojo.
                </p>
              </div>
              <div className="relative aspect-[4/3] w-full mt-3 bg-neutral-200 overflow-hidden">
                <Image
                  src="/products/oversize-metal.jpg"
                  alt="Prenda Destacada"
                  fill
                  className="object-cover"
                />
              </div>
              <a
                href="#catalogo"
                onClick={() => setActiveMenu(null)}
                className="mt-3 text-[10px] font-bold tracking-widest uppercase text-black underline hover:opacity-60"
              >
                Comprar Prenda ($139.900 COP) →
              </a>
            </div>

            {/* Column 4: VitalFit App Callout */}
            <div className="bg-neutral-900 text-white p-4 flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-bold tracking-[0.25em] text-amber-400 uppercase block mb-1">
                  ECOSISTEMA INTEGRADO
                </span>
                <h5 className="font-extrabold text-sm tracking-wider uppercase text-white">
                  APP DE ENTRENAMIENTO
                </h5>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                  Cada prenda incluye etiqueta NFC/QR con 30 días VIP para rutinas de hipertrofia y registro de cargas.
                </p>
              </div>

              <a
                href="https://punto-de-inflexion.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setActiveMenu(null)}
                className="mt-4 px-3 py-2 bg-white text-black font-bold text-[10px] tracking-widest uppercase text-center hover:bg-neutral-200 transition-colors"
              >
                ABRIR APP VITALFIT ↗
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 6. MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-neutral-200 px-5 py-6 space-y-4 max-h-[82vh] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Quick Categories Navigation */}
          <div className="mb-2">
            <span className="text-[9.5px] font-extrabold tracking-[0.25em] text-neutral-400 uppercase block mb-2">
              CATEGORÍAS DE TIENDA
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-bold tracking-wider uppercase">
              <a
                href="#catalogo"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-black text-center"
              >
                HOMBRES
              </a>
              <a
                href="#catalogo"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-black text-center"
              >
                MUJERES
              </a>
              <a
                href="#catalogo"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-black text-center"
              >
                SUPLEMENTOS
              </a>
              <a
                href="#catalogo"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-black text-center"
              >
                GEAR & STRAPS
              </a>
            </div>
          </div>

          <div className="space-y-1 text-xs font-bold tracking-widest uppercase pt-2 border-t border-neutral-100">
            <div>
              <Link
                href="/colecciones"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 text-black hover:opacity-60"
              >
                <span>VER TODAS LAS COLECCIONES</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
              </Link>
            </div>
            <div>
              <Link
                href="/app"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 text-amber-600 hover:opacity-80"
              >
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>APP VITALFIT DE ENTRENAMIENTO</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-500" />
              </Link>
            </div>
            <div>
              <Link
                href="/cuenta"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 text-black hover:opacity-60"
              >
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span>MI CUENTA & PEDIDOS</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
              </Link>
            </div>
            <div>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 text-neutral-500 hover:text-black"
              >
                <span>MODO ADMINISTRADOR ⚙</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-300" />
              </Link>
            </div>
          </div>

          {/* Action CTAs: Live App & WhatsApp */}
          <div className="pt-3 space-y-2 border-t border-neutral-100">
            <a
              href="https://punto-de-inflexion.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 px-4 bg-black text-white font-bold text-xs tracking-[0.2em] uppercase text-center block shadow-md active:scale-95 transition-all"
            >
              ABRIR APP EN VIVO ↗
            </a>

            <a
              href="https://wa.me/573009128421"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-[11px] tracking-wider uppercase text-center flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>ASESORÍA POR WHATSAPP 🇨🇴</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
