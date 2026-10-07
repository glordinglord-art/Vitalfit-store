import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-[#e5e5e5] pt-12 sm:pt-16 pb-10 sm:pb-12 select-none">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-neutral-100">
          {/* Col 1: Newsletter */}
          <div className="sm:col-span-2 max-w-md">
            <h3 className="text-xs font-bold tracking-[0.22em] sm:tracking-[0.25em] uppercase text-black mb-2">
              ACCESO VIP A NUEVOS DROPS
            </h3>
            <p className="text-xs text-neutral-500 mb-4 leading-relaxed">
              Sé el primero en acceder a ediciones limitadas, reposiciones de tallas y drops privados para la comunidad de atletas.
            </p>
            <div className="flex border-b border-black pb-2">
              <input
                type="email"
                placeholder="Ingresa tu correo electrónico"
                className="w-full text-xs text-black placeholder:text-neutral-400 outline-none bg-transparent"
              />
              <button className="text-xs font-bold tracking-widest uppercase text-black hover:opacity-60 flex items-center gap-1 flex-shrink-0 pl-2">
                <span>UNIRME</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Col 2: Help / Customer Service */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-black mb-3">
              AYUDA & SOPORTE
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li><a href="#" className="hover:text-black">Preguntas Frecuentes</a></li>
              <li><a href="#" className="hover:text-black">Envíos Nacionales y Cambios</a></li>
              <li><a href="#" className="hover:text-black">Guía de Tallas (Boxy vs Fitted)</a></li>
              <li><a href="#" className="hover:text-black">Rastrear mi Envío</a></li>
            </ul>
          </div>

          {/* Col 3: Brand */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-black mb-3">
              VITALFIT STORE
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li><Link href="/cuenta" className="hover:text-black font-semibold">Mi Portal de Atleta (Pedidos)</Link></li>
              <li>
                <a
                  href="https://punto-de-inflexion.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black font-semibold text-amber-600 flex items-center gap-1"
                >
                  App de Entrenamiento ↗
                </a>
              </li>
              <li><Link href="/admin" className="hover:text-black text-neutral-500">Panel Administrativo</Link></li>
              <li><a href="#" className="hover:text-black">Términos de Servicio</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-neutral-400 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span className="font-extrabold tracking-[0.3em] text-black text-xs">
              V I T A L F I T
            </span>
            <span>© 2026 VITALFIT STORE. TODOS LOS DERECHOS RESERVADOS.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-neutral-500">
            <a href="#" className="hover:text-black">POLÍTICA DE PRIVACIDAD</a>
            <a href="#" className="hover:text-black">TÉRMINOS DE COMPRA</a>
            <a href="#" className="hover:text-black">ACCESIBILIDAD</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
