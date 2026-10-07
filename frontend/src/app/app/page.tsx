"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/shared/components/Navbar";
import Footer from "@/shared/components/Footer";
import {
  Smartphone,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Dumbbell,
  Apple,
  TrendingUp,
  ShieldCheck,
  QrCode,
  Download
} from "lucide-react";

export default function AppPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-black text-white py-16 sm:py-24 px-4 sm:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-900 border border-neutral-700 text-amber-400 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ECOSISTEMA PHY-GITAL VITALFIT</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-none">
              LA APP QUE TRANSFORMA TU ENTRENAMIENTO Y NUTRICIÓN
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl">
              Diseñada específicamente para culturismo natural y fuerza pesada. Lleva el control
              milimétrico de tu sobrecarga progresiva, calcula tus macronutrientes y sincroniza
              tu dosis de suplementación en un solo lugar.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="https://punto-de-inflexion.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-black hover:bg-neutral-200 font-black text-xs uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2 text-center"
              >
                <Smartphone className="w-4 h-4" />
                <span>Abrir App Móvil en Vivo ↗</span>
              </a>

              <Link
                href="/colecciones"
                className="px-8 py-4 border border-neutral-700 hover:border-white text-neutral-200 hover:text-white font-bold text-xs uppercase tracking-[0.2em] transition-colors text-center"
              >
                Comprar Ropa & Desbloquear VIP
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-4 text-xs text-neutral-400 font-mono">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Compatible con iOS & Android</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Sin Publicidad</span>
              </div>
            </div>
          </div>

          {/* Right Showcase Photo */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto border-4 border-neutral-800 bg-neutral-900 overflow-hidden shadow-2xl">
              <Image
                src="/app-showcase.jpg"
                alt="VitalFit App Móvil en entrenamiento de fuerza"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase">
                  Acceso Web App
                </span>
                <span className="text-lg font-black uppercase text-white mt-0.5">
                  punto-de-inflexion.vercel.app
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Pillars Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-neutral-500 block">
            CIENCIA & DISCIPLINA
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-black mt-2">
            TRES MÓDULOS DE ALTO RENDIMIENTO
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="p-8 border border-neutral-300 bg-neutral-50 space-y-4">
            <div className="w-12 h-12 bg-black text-white flex items-center justify-center">
              <Dumbbell className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg uppercase tracking-wide text-black">
              1. TRACKER DE SOBRECARGA PROGRESIVA
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Registra cada repetición y kilogramo levantado. La app te indica cuándo aumentar el peso
              en la siguiente sesión basándose en tu escala RPE para romper estancamientos.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 border border-neutral-300 bg-neutral-50 space-y-4">
            <div className="w-12 h-12 bg-black text-white flex items-center justify-center">
              <Apple className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg uppercase tracking-wide text-black">
              2. CALCULADORA DE MACROS & DIETA
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Calcula tus gramos exactos de proteína por kilogramo de masa magra, carbohidratos para rendimiento
              glucolítico y grasas saludables ajustadas a tu objetivo de volumen o definición.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 border border-neutral-300 bg-neutral-50 space-y-4">
            <div className="w-12 h-12 bg-black text-white flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg uppercase tracking-wide text-black">
              3. SATURACIÓN DE CREATINA 200 MESH
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Guía de administración para mantener tus depósitos intramusculares de fosfocreatina al 100%.
              Te avisa cuándo tomar tu scoop de 5g para maximizar el transporte celular con carbohidratos.
            </p>
          </div>
        </div>
      </section>

      {/* How to activate from your Clothes */}
      <section className="bg-neutral-100 py-16 px-4 sm:px-8 border-y border-neutral-200">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3">
            <span className="text-[10px] font-black tracking-widest text-neutral-500 uppercase">
              CÓMO ACTIVAR TU PASE VIP
            </span>
            <h3 className="text-2xl font-black uppercase text-black">
              ¿COMPRASTE UNA PRENDA EN LA TIENDA?
            </h3>
            <p className="text-xs text-neutral-600 max-w-xl">
              1. Revisa la etiqueta interna de tu camiseta oversize o esqueleto.<br />
              2. Escanea el código QR exclusivo con la cámara de tu celular.<br />
              3. Se abrirá la app en tu teléfono con 30 días VIP activados automáticamente en tu perfil.
            </p>
          </div>

          <div className="flex-shrink-0">
            <a
              href="https://punto-de-inflexion.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-widest transition-colors inline-flex items-center gap-2"
            >
              <span>Ir a la App Ahora ↗</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
