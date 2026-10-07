"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Product, ProductVariant, ColorSwatch } from "../types/product.types";
import { useCartStore } from "@/features/cart/store/cart.store";

interface ProductCardProps {
  product: Product;
  onOpenDetail?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetail }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSwatch, setSelectedSwatch] = useState<ColorSwatch>(
    product.swatches[0]
  );
  const [isHovered, setIsHovered] = useState(false);
  const [addedVariantId, setAddedVariantId] = useState<string | null>(null);

  const addItem = useCartStore((s) => s.addItem);
  const totalStock = product.variants.reduce((acc, v) => acc + v.stock, 0);

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  const handleQuickAdd = (variant: ProductVariant, e: React.MouseEvent) => {
    e.stopPropagation();
    if (variant.stock <= 0) return;
    addItem(product, variant, 1);
    setAddedVariantId(variant.id);
    setTimeout(() => setAddedVariantId(null), 1200);
  };

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleCardClick = () => {
    if (onOpenDetail) {
      onOpenDetail(product);
    }
  };

  return (
    <div
      className="group relative flex flex-col select-none cursor-pointer"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container with Neutral Studio Backdrop */}
      <div className="relative aspect-[3/4] w-full bg-[#f4f4f4] overflow-hidden">
        <Image
          src={product.images[currentImageIndex] || product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
        />

        {/* Tag & Scarcity badges */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
          {product.tag && (
            <span className="px-2 py-0.5 bg-black text-white text-[9px] font-black tracking-widest uppercase shadow-sm">
              {product.tag}
            </span>
          )}
          {totalStock <= 15 && totalStock > 0 && (
            <span className="px-2 py-0.5 bg-red-600 text-white text-[8.5px] font-black tracking-widest uppercase flex items-center gap-1 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              ¡ÚLTIMAS {totalStock} PIEZAS!
            </span>
          )}
        </div>

        {/* Carousel arrows */}
        {product.images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/80 hover:bg-white text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2]" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/80 hover:bg-white text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
              aria-label="Siguiente foto"
            >
              <ChevronRight className="w-4 h-4 stroke-[2]" />
            </button>
          </>
        )}

        {/* YoungLA Style Hover: "AGREGAR A LA BOLSA" Quick Popover */}
        <div
          className={`absolute inset-x-3 bottom-3 z-20 bg-white/95 backdrop-blur-md p-3.5 shadow-xl border border-neutral-200 transition-all duration-300 ${
            isHovered
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-2 pointer-events-none lg:opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center mb-2">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-black">
              AGREGAR A LA BOLSA
            </span>
          </div>

          {/* Color swatch mini row inside popover */}
          <div className="flex items-center justify-center gap-1.5 mb-2.5">
            {product.swatches.map((swatch, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSwatch(swatch);
                }}
                className={`w-4 h-4 rounded-none border transition-all ${
                  selectedSwatch.name === swatch.name
                    ? "border-black ring-1 ring-black"
                    : "border-neutral-300 hover:border-black"
                }`}
                style={{ backgroundColor: swatch.colorCode }}
                title={swatch.name}
              />
            ))}
          </div>

          {/* Scarcity Bar inside popover */}
          <div className="mb-2 text-center">
            <div className="flex items-center justify-between text-[8.5px] font-black uppercase tracking-wider text-neutral-600 mb-1">
              <span className="text-red-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
                STOCK CRÍTICO DROP 01
              </span>
              <span className="font-mono text-black font-bold">{totalStock} disp. de 50</span>
            </div>
            <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-red-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(96, Math.max(70, 100 - (totalStock / 50) * 100))}%` }}
              />
            </div>
          </div>

          {/* Size Pill Grid with remaining stock counts */}
          <div className="flex items-center justify-center gap-1">
            {product.variants.map((v) => {
              const isOutOfStock = v.stock <= 0;
              const isJustAdded = addedVariantId === v.id;
              const isLowStock = v.stock > 0 && v.stock <= 3;

              return (
                <button
                  key={v.id}
                  disabled={isOutOfStock}
                  onClick={(e) => handleQuickAdd(v, e)}
                  className={`flex-1 py-1.5 px-0.5 text-[10px] font-bold border transition-all flex flex-col items-center justify-center ${
                    isJustAdded
                      ? "bg-black text-white border-black"
                      : isOutOfStock
                      ? "bg-neutral-100 text-neutral-300 border-neutral-200 line-through cursor-not-allowed"
                      : "bg-white text-black border-neutral-300 hover:bg-black hover:text-white hover:border-black active:scale-95"
                  }`}
                  title={isOutOfStock ? "Talla agotada" : `Talla ${v.name}: ${v.stock} unidades disponibles`}
                >
                  {isJustAdded ? (
                    <Check className="w-3 h-3 mx-auto" />
                  ) : (
                    <>
                      <span className="font-extrabold">{v.name}</span>
                      {!isOutOfStock && (
                        <span
                          className={`text-[7.5px] font-mono leading-none mt-0.5 ${
                            isLowStock ? "text-red-600 font-black" : "text-neutral-400 group-hover:text-neutral-200"
                          }`}
                        >
                          {v.stock === 1 ? "1 sola!" : `${v.stock}u`}
                        </span>
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Product Details Below Image */}
      <div className="pt-3 pb-6 flex flex-col items-center text-center space-y-1">
        <h3 className="text-[11px] font-bold tracking-[0.15em] uppercase text-black group-hover:underline">
          {product.code} - {product.name}
        </h3>

        <p className="text-[11px] font-medium text-neutral-800 tracking-wider">
          {formatPrice(product.price)}
        </p>

        {/* Live Scarcity Stock Teaser */}
        {totalStock <= 15 ? (
          <div className="flex items-center gap-1.5 text-[9.5px] font-black text-red-600 tracking-wider uppercase pt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            <span>¡Solo {totalStock} piezas en stock!</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-[9.5px] font-bold text-emerald-700 tracking-wider uppercase pt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Despacho inmediato 24-48h</span>
          </div>
        )}

        {/* Color Swatches Under Price */}
        <div className="flex items-center justify-center gap-1 pt-1.5">
          {product.swatches.map((swatch, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSwatch(swatch);
              }}
              className={`w-3.5 h-3.5 border transition-all ${
                selectedSwatch.name === swatch.name
                  ? "border-black ring-1 ring-black scale-110"
                  : "border-neutral-300 hover:border-black"
              }`}
              style={{ backgroundColor: swatch.colorCode }}
              title={swatch.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
