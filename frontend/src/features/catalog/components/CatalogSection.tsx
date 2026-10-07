"use client";

import React, { useState } from "react";
import { GenderCategory, Product } from "../types/product.types";
import { MOCK_PRODUCTS } from "../services/products.mock";
import { ProductCard } from "./ProductCard";
import { ProductDetailModal } from "./ProductDetailModal";

export const CatalogSection: React.FC = () => {
  const [selectedGender, setSelectedGender] = useState<GenderCategory>("him");
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    if (selectedGender === "him") return product.gender === "him" && !product.name.includes("CINTURÓN") && !product.name.includes("STRAPS");
    if (selectedGender === "her") return product.gender === "her";
    if (selectedGender === "supplements") return product.gender === "supplements";
    if ((selectedGender as string) === "gear") return product.name.includes("CINTURÓN") || product.name.includes("STRAPS");
    return true;
  });

  return (
    <section id="catalogo" className="w-full pt-8 sm:pt-12 pb-16 sm:pb-24 select-none">
      {/* Drop Urgency Ribbon */}
      <div className="max-w-4xl mx-auto px-3 sm:px-4 mb-5 sm:mb-7">
        <div className="p-2 sm:p-2.5 bg-neutral-100 border border-neutral-300 flex flex-col sm:flex-row items-center justify-between gap-1 text-[10px] sm:text-[11px] font-mono text-center sm:text-left">
          <div className="flex items-center gap-2 font-bold uppercase text-black">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
            <span>DROP 01 // EDICIÓN LIMITADA DE 50 UNIDADES</span>
          </div>
          <span className="text-neutral-600 font-semibold text-[9.5px] sm:text-[11px]">
            Stock real en vivo • Las tallas no se reponen
          </span>
        </div>
      </div>

      {/* Category Tabs: HOMBRES | MUJERES | SUPLEMENTACIÓN | GEAR */}
      <div className="w-full border-b border-[#e5e5e5] mb-6 sm:mb-8">
        <div className="flex items-center justify-start md:justify-center gap-3 sm:gap-8 px-4 overflow-x-auto scrollbar-none pb-3">
          <button
            onClick={() => setSelectedGender("him")}
            className={`text-[11px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase transition-all pb-2 -mb-[13px] whitespace-nowrap min-h-[40px] flex items-center ${
              selectedGender === "him"
                ? "text-black border-b-2 border-black"
                : "text-neutral-400 hover:text-black"
            }`}
          >
            HOMBRES
          </button>

          <button
            onClick={() => setSelectedGender("her")}
            className={`text-[11px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase transition-all pb-2 -mb-[13px] whitespace-nowrap min-h-[40px] flex items-center ${
              selectedGender === "her"
                ? "text-black border-b-2 border-black"
                : "text-neutral-400 hover:text-black"
            }`}
          >
            MUJERES
          </button>

          <button
            onClick={() => setSelectedGender("supplements")}
            className={`text-[11px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase transition-all pb-2 -mb-[13px] whitespace-nowrap min-h-[40px] flex items-center ${
              selectedGender === "supplements"
                ? "text-black border-b-2 border-black"
                : "text-neutral-400 hover:text-black"
            }`}
          >
            SUPLEMENTACIÓN
          </button>

          <button
            onClick={() => setSelectedGender("gear" as any)}
            className={`text-[11px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase transition-all pb-2 -mb-[13px] whitespace-nowrap min-h-[40px] flex items-center ${
              (selectedGender as string) === "gear"
                ? "text-black border-b-2 border-black"
                : "text-neutral-400 hover:text-black"
            }`}
          >
            ACCESORIOS & GEAR
          </button>
        </div>
      </div>

      {/* Responsive Product Grid: 2 columns on mobile, 3 on tablet, 4 on desktop */}
      <div className="w-full px-2 sm:px-6 lg:px-8">
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center text-xs font-semibold tracking-widest text-neutral-400 uppercase">
            NO HAY PRODUCTOS EN ESTA CATEGORÍA. EL NUEVO DROP ESTÁ POR LANZARSE.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-5">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetail={setSelectedProductForDetail}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProductForDetail}
        onClose={() => setSelectedProductForDetail(null)}
      />
    </section>
  );
};
