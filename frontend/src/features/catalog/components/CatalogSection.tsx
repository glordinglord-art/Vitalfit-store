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
    <section id="catalogo" className="w-full pt-10 pb-20 select-none">
      {/* Drop Urgency Ribbon */}
      <div className="max-w-4xl mx-auto px-4 mb-6">
        <div className="p-2.5 bg-neutral-100 border border-neutral-300 flex items-center justify-between text-[11px] font-mono">
          <div className="flex items-center gap-2 font-bold uppercase text-black">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
            <span>DROP 01 // EDICIÓN LIMITADA DE 50 UNIDADES</span>
          </div>
          <span className="text-neutral-600 hidden sm:inline font-semibold">
            Stock real en vivo • Las tallas no se reponen
          </span>
        </div>
      </div>

      {/* Category Tabs: HOMBRES | MUJERES | SUPLEMENTACIÓN | GEAR */}
      <div className="w-full flex items-center justify-center gap-4 sm:gap-8 border-b border-[#e5e5e5] pb-4 mb-8 overflow-x-auto">
        <button
          onClick={() => setSelectedGender("him")}
          className={`text-xs font-bold tracking-[0.25em] uppercase transition-all pb-2 -mb-[18px] whitespace-nowrap ${
            selectedGender === "him"
              ? "text-black border-b-2 border-black"
              : "text-neutral-400 hover:text-black"
          }`}
        >
          HOMBRES
        </button>

        <button
          onClick={() => setSelectedGender("her")}
          className={`text-xs font-bold tracking-[0.25em] uppercase transition-all pb-2 -mb-[18px] whitespace-nowrap ${
            selectedGender === "her"
              ? "text-black border-b-2 border-black"
              : "text-neutral-400 hover:text-black"
          }`}
        >
          MUJERES
        </button>

        <button
          onClick={() => setSelectedGender("supplements")}
          className={`text-xs font-bold tracking-[0.25em] uppercase transition-all pb-2 -mb-[18px] whitespace-nowrap ${
            selectedGender === "supplements"
              ? "text-black border-b-2 border-black"
              : "text-neutral-400 hover:text-black"
          }`}
        >
          SUPLEMENTACIÓN
        </button>

        <button
          onClick={() => setSelectedGender("gear" as any)}
          className={`text-xs font-bold tracking-[0.25em] uppercase transition-all pb-2 -mb-[18px] whitespace-nowrap ${
            (selectedGender as string) === "gear"
              ? "text-black border-b-2 border-black"
              : "text-neutral-400 hover:text-black"
          }`}
        >
          ACCESORIOS & GEAR
        </button>
      </div>

      {/* Full-width Product Grid (Edge to Edge 4 Columns) */}
      <div className="w-full px-2 sm:px-6 lg:px-8">
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center text-xs font-semibold tracking-widest text-neutral-400 uppercase">
            NO HAY PRODUCTOS EN ESTA CATEGORÍA. EL NUEVO DROP ESTÁ POR LANZARSE.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
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
