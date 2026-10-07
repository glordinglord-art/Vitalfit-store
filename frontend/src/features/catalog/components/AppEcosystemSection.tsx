import React from "react";
import Image from "next/image";
import { QrCode, Smartphone, Dumbbell, Award, ArrowUpRight } from "lucide-react";

export const AppEcosystemSection: React.FC = () => {
  return (
    <section id="ecosistema-app" className="w-full bg-white py-20 px-4 sm:px-8 lg:px-12 border-t border-neutral-200 select-none">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Mobile App Showcase Image */}
          <div className="relative aspect-square w-full bg-neutral-100 overflow-hidden shadow-2xl border border-neutral-200">
            <Image
              src="/app-showcase.jpg"
              alt="VitalFit Training App en el gimnasio"
              fill
              className="object-cover object-center"
            />
            <div className="absolute top-4 left-4 bg-black/90 backdrop-blur-md text-white text-[10px] font-bold tracking-[0.25em] px-3 py-1.5 uppercase">
              VITALFIT TRAINING ECOSYSTEM
            </div>
          </div>

          {/* Right Column: The Phygital Story */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-amber-600 uppercase">
              <QrCode className="w-4 h-4" />
              <span>NUESTRA ORIGINALIDAD // PHYGITAL GEAR</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase text-black leading-tight">
              MÁS QUE UNA PRENDA. <br />
              <span className="text-neutral-400">UN SISTEMA DE HIPERTROFIA.</span>
            </h2>

            <p className="text-sm text-neutral-600 leading-relaxed">
              En VitalFit unimos la indumentaria pesada y la tecnología. Cada camiseta y esqueleto cuenta con un parche inteligente con código QR en la bastilla interior. Al recibir tu pedido, lo escaneas y activas inmediatamente tu acceso a la plataforma de entrenamiento.
            </p>

            {/* Step by step */}
            <div className="space-y-4 pt-2">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="text-xs font-extrabold tracking-wider uppercase text-black">
                    RECIBE TU GEAR CON ETIQUETA INTELIGENTE
                  </h4>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Cada prenda física está vinculada a una rutina de hipertrofia específica para ese corte.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="text-xs font-extrabold tracking-wider uppercase text-black">
                    DESBLOQUEA 30 DÍAS VIP EN LA APP
                  </h4>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Acceso completo a nuestro sistema de sobrecarga progresiva, cálculo de 1RM y registro de series.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="text-xs font-extrabold tracking-wider uppercase text-black">
                    COMUNIDAD PRIVADA DE ATLETAS
                  </h4>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Comparte tus marcas de levantamiento, asiste a eventos presenciales y accede a pre-ordenes exclusivas.
                  </p>
                </div>
              </div>
            </div>

            {/* App Store CTA */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <a
                href="#catalogo"
                className="px-6 py-3.5 bg-black hover:bg-neutral-800 text-white font-bold text-xs tracking-[0.2em] uppercase text-center transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
              >
                <span>COMPRAR PRENDAS CON APP</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="https://punto-de-inflexion.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-neutral-100 hover:bg-neutral-200 text-black border border-neutral-300 font-bold text-xs tracking-[0.2em] uppercase text-center transition-all flex items-center justify-center gap-2"
              >
                <Smartphone className="w-4 h-4 text-amber-500" />
                <span>ABRIR APP EN VIVO ↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
