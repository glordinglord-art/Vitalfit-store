"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/shared/components/Navbar";
import Footer from "@/shared/components/Footer";
import ProductCard from "@/features/catalog/components/ProductCard";
import ProductDetailModal from "@/features/catalog/components/ProductDetailModal";
import { MOCK_PRODUCTS } from "@/features/catalog/services/products.mock";
import { Product } from "@/features/catalog/types/product.types";
import { SlidersHorizontal, ArrowUpDown, Sparkles, Filter, Check } from "lucide-react";

export default function ColeccionesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  const [selectedSize, setSelectedSize] = useState<string>("todas");
  const [sortBy, setSortBy] = useState<"populares" | "menor-precio" | "mayor-precio">("populares");
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);

  // Filtrado y ordenamiento de productos
  const filteredProducts = useMemo(() => {
    let list = [...MOCK_PRODUCTS];

    // Filtro por categoría
    if (selectedCategory === "oversize") {
      list = list.filter((p) => p.name.includes("OVERSIZE") || p.name.includes("HOODIE") || p.name.includes("JOGGER") || p.specifications?.corte?.includes("Oversized"));
    } else if (selectedCategory === "tanks") {
      list = list.filter((p) => p.name.includes("ESQUELETO") || p.name.includes("MUSCULAR") || p.name.includes("SHORT"));
    } else if (selectedCategory === "suplementos") {
      list = list.filter((p) => p.gender === "supplements");
    } else if (selectedCategory === "mujeres") {
      list = list.filter((p) => p.gender === "her");
    } else if (selectedCategory === "accesorios") {
      list = list.filter((p) => p.name.includes("CINTURÓN") || p.name.includes("STRAPS") || p.name.includes("ACCESORIOS"));
    }

    // Filtro por talla
    if (selectedSize !== "todas") {
      list = list.filter((p) =>
        p.variants.some((v) => v.name.toLowerCase() === selectedSize.toLowerCase() && v.stock > 0)
      );
    }

    // Ordenamiento
    if (sortBy === "menor-precio") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "mayor-precio") {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [selectedCategory, selectedSize, sortBy]);

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Navbar />

      {/* Header Banner de Colecciones */}
      <section className="bg-neutral-900 text-white py-12 px-4 sm:px-8 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-400">
                CATÁLOGO OFICIAL COLOMBIA // 2026
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
              COLECCIÓN COMPLETA VITALFIT
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-xl">
              Cortes sobrios de alto gramaje (260 - 280 GSM) y suplementación con pureza garantizada.
              Cada pieza incluye acceso a la App de Nutrición & Entrenamiento.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-neutral-400">
              Mostrando <strong className="text-white">{filteredProducts.length}</strong> piezas activas
            </span>
          </div>
        </div>
      </section>

      {/* Filter and Control Bar */}
      <div className="sticky top-16 z-20 bg-white border-b border-neutral-200 px-4 sm:px-8 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Categorías Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            {[
              { id: "todos", label: "Todas las Piezas" },
              { id: "oversize", label: "Oversize & Hoodies" },
              { id: "tanks", label: "Tanks & Shorts" },
              { id: "suplementos", label: "Suplementación Pura" },
              { id: "mujeres", label: "Colección Mujeres" },
              { id: "accesorios", label: "Accesorios & Gear" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-black text-white"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sizing & Sorting Controls */}
          <div className="flex items-center gap-4">
            {/* Talla Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                Talla:
              </span>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="bg-neutral-100 border border-neutral-300 text-xs font-bold uppercase py-1 px-2.5 cursor-pointer focus:outline-none"
              >
                <option value="todas">Todas</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                Ordenar:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-neutral-100 border border-neutral-300 text-xs font-bold uppercase py-1 px-2.5 cursor-pointer focus:outline-none"
              >
                <option value="populares">Más Populares</option>
                <option value="menor-precio">Precio: Menor a Mayor</option>
                <option value="mayor-precio">Precio: Mayor a Menor</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de Productos */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetail={(p) => setSelectedProductForModal(p)}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-4">
            <p className="text-sm font-bold uppercase text-neutral-500 tracking-wider">
              No hay productos que coincidan con los filtros seleccionados.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("todos");
                setSelectedSize("todas");
              }}
              className="px-5 py-2.5 bg-black text-white text-xs font-extrabold uppercase tracking-widest hover:bg-neutral-800 transition-colors"
            >
              Restablecer Filtros
            </button>
          </div>
        )}
      </main>

      {/* Modal de Detalle Rápido */}
      {selectedProductForModal && (
        <ProductDetailModal
          product={selectedProductForModal}
          onClose={() => setSelectedProductForModal(null)}
        />
      )}

      <Footer />
    </div>
  );
}
