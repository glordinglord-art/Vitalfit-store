import React from "react";
import Image from "next/image";
import { ShieldCheck, Check, X, Sparkles, Beaker, Zap, ArrowRight } from "lucide-react";

export const SupplementScienceSection: React.FC = () => {
  return (
    <section className="w-full bg-[#0a0a0c] text-white py-20 px-4 sm:px-8 lg:px-12 border-t border-neutral-800 select-none">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-amber-400 uppercase mb-2">
              <Beaker className="w-4 h-4" />
              <span>CIENCIA DEL RENDIMIENTO • ESTÁNDAR FARMACÉUTICO</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-wider uppercase text-white">
              CERO MARKETING ENGAÑOSO. <br />
              <span className="text-neutral-400">100% PUREZA CERTIFICADA.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md leading-relaxed font-normal">
            En VitalFit eliminamos los rellenos químicos, saborizantes artificiales innecesarios y márgenes de intermediarios. Cada lote es testeado para garantizar máxima biodisponibilidad y solubilidad en agua fría.
          </p>
        </div>

        {/* 3 Science Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-14">
          <div className="p-6 bg-[#111116] border border-neutral-800">
            <div className="w-10 h-10 bg-white/10 flex items-center justify-center text-white mb-4">
              <Zap className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="text-sm font-extrabold tracking-wider uppercase text-white mb-2">
              MICRONIZADO 200 MESH
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Molienda ultra-fina al tamiz 200 Mesh. Se suspende en segundos en agua sin crear grumos en el fondo de tu shaker ni causar hinchazón estomacal.
            </p>
          </div>

          <div className="p-6 bg-[#111116] border border-neutral-800">
            <div className="w-10 h-10 bg-white/10 flex items-center justify-center text-white mb-4">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-sm font-extrabold tracking-wider uppercase text-white mb-2">
              5G POR SCOOP = 5G REALES
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Cero carbohidratos de relleno como maltodextrina o harina de arroz. Lo que indica la tabla nutricional es exactamente lo que entra a tu masa muscular.
            </p>
          </div>

          <div className="p-6 bg-[#111116] border border-neutral-800">
            <div className="w-10 h-10 bg-white/10 flex items-center justify-center text-white mb-4">
              <Sparkles className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-sm font-extrabold tracking-wider uppercase text-white mb-2">
              SATURACIÓN Y ATP CELULAR
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Acelera la regeneración de adenosín trifosfato (ATP) entre series pesadas, permitiéndote sacar 2 a 3 repeticiones extra en tus levantamientos de fuerza.
            </p>
          </div>
        </div>

        {/* Comparative Analysis Table: VitalFit vs Conventional Brands */}
        <div className="p-6 sm:p-8 bg-[#121217] border border-neutral-800 rounded-none">
          <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-neutral-300 mb-6 text-center">
            TABLA COMPARATIVA // VITALFIT SAVAGE VS. MARCAS COMERCIALES
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-neutral-800 text-[10px] tracking-wider uppercase text-neutral-400">
                  <th className="py-3 px-4">Parámetro de Calidad</th>
                  <th className="py-3 px-4 text-white bg-white/5 font-extrabold text-xs">VITALFIT SAVAGE (200 MESH)</th>
                  <th className="py-3 px-4">Creatinas Comerciales Típicas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 font-medium">
                <tr>
                  <td className="py-3.5 px-4 text-neutral-300 font-bold">Pureza de la Materia Prima</td>
                  <td className="py-3.5 px-4 text-emerald-400 bg-white/5 flex items-center gap-1.5 font-bold">
                    <Check className="w-4 h-4" /> 99.9% Monohidrato Puro
                  </td>
                  <td className="py-3.5 px-4 text-neutral-500">80% - 90% (Con excipientes)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 text-neutral-300 font-bold">Granulometría / Solubilidad</td>
                  <td className="py-3.5 px-4 text-white bg-white/5">
                    Micronizado 200 Mesh (Cero grumos)
                  </td>
                  <td className="py-3.5 px-4 text-neutral-500">80 Mesh (Arenosa, sedimenta al fondo)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 text-neutral-300 font-bold">Digestión y Tolerancia</td>
                  <td className="py-3.5 px-4 text-emerald-400 bg-white/5 flex items-center gap-1.5">
                    <Check className="w-4 h-4" /> Absorción rápida sin malestar
                  </td>
                  <td className="py-3.5 px-4 text-neutral-500 flex items-center gap-1.5">
                    <X className="w-4 h-4 text-red-500" /> Frecuente molestia gástrica
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 text-neutral-300 font-bold">Integración Tecnológica</td>
                  <td className="py-3.5 px-4 text-amber-400 bg-white/5 font-bold">
                    Calculadora de Carga en App VitalFit
                  </td>
                  <td className="py-3.5 px-4 text-neutral-500">Cero soporte digital</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <a
              href="#catalogo"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white hover:bg-neutral-200 text-black font-bold text-xs tracking-[0.25em] uppercase transition-all shadow-lg active:scale-95"
            >
              <span>EXPLORAR SUPLEMENTACIÓN PURA</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
