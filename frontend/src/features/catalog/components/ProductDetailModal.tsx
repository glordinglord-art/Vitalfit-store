"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Check, ShieldCheck, Ruler, Sparkles, ChevronRight, Truck, RotateCcw } from "lucide-react";
import { Product, ProductVariant, ColorSwatch } from "../types/product.types";
import { useCartStore } from "@/features/cart/store/cart.store";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedSwatch, setSelectedSwatch] = useState<ColorSwatch | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0]);
      setSelectedSwatch(product.swatches[0]);
      // Seleccionar primera variante disponible
      const availableVariant = product.variants.find((v) => v.stock > 0) || product.variants[0];
      setSelectedVariant(availableVariant);
      setQuantity(1);
      setShowSizeGuide(false);
      setIsAdded(false);
    }
  }, [product]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!product || !selectedVariant || !selectedSwatch) return null;

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const totalStock = product.variants.reduce((acc, v) => acc + v.stock, 0);

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleAddToCart = () => {
    if (selectedVariant.stock <= 0) return;
    addItem(product, selectedVariant, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-white shadow-2xl border border-neutral-200 z-10 my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-black hover:bg-neutral-100 transition-colors"
          aria-label="Cerrar detalles"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto">
          {/* Left Column: Gallery */}
          <div className="p-6 sm:p-8 bg-neutral-50 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-neutral-200">
            {/* Main Featured Image */}
            <div className="relative aspect-[3/4] w-full bg-[#f0f0f0] overflow-hidden">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition-all duration-300"
              />
              {discount > 0 && (
                <div className="absolute top-3 left-3 bg-black text-white text-[10px] font-bold tracking-widest px-2.5 py-1 uppercase">
                  AHORRA {discount}%
                </div>
              )}
            </div>

            {/* Thumbnail Selectors */}
            {product.images.length > 1 && (
              <div className="flex gap-2.5 mt-4 w-full justify-center">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-16 h-20 bg-neutral-200 border transition-all ${
                      selectedImage === img
                        ? "border-black ring-1 ring-black scale-105"
                        : "border-neutral-300 hover:border-black opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Vista ${idx + 1}`}
                      fill
                      className="object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Specs & Buy Box */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Header Info */}
              <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-neutral-400 uppercase">
                <span>CÓDIGO: {product.code}</span>
                <span>•</span>
                <span className="text-black font-semibold">VITALFIT GEAR</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold tracking-wider uppercase text-black mt-1">
                {product.name}
              </h2>

              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-neutral-500 font-medium">
                  {product.subtitle}
                </p>
                <Link
                  href={`/producto/${product.slug}`}
                  onClick={onClose}
                  className="text-[10px] font-bold text-neutral-700 hover:text-black uppercase underline tracking-wider whitespace-nowrap ml-2"
                >
                  Página Completa ↗
                </Link>
              </div>

              {/* Price & Guarantee */}
              <div className="flex items-baseline gap-3 mt-3 pb-3 border-b border-neutral-100">
                <span className="text-2xl font-black text-black tracking-tight font-mono">
                  {formatPrice(product.price)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-xs text-neutral-400 line-through font-mono">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
                {product.compareAtPrice && (
                  <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                    Ahorro Drop {discount}%
                  </span>
                )}
              </div>

              {/* Scarcity / High Demand Callout Box */}
              <div className="p-3.5 bg-neutral-50 border border-neutral-300 mt-3 space-y-2">
                <div className="flex items-center justify-between text-xs font-black uppercase">
                  <span className="flex items-center gap-1.5 text-red-600">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                    EDICIÓN LIMITADA DROP 01
                  </span>
                  <span className="font-mono text-black font-extrabold text-[11px]">
                    {totalStock} piezas disp. de 50
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-neutral-200 h-2 rounded-none overflow-hidden">
                  <div
                    className="bg-black h-full transition-all duration-700"
                    style={{ width: `${Math.min(96, Math.max(70, 100 - (totalStock / 50) * 100))}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-neutral-500 pt-0.5 font-medium">
                  <span>🔥 84% de la producción ya reservada</span>
                  <span className="text-red-600 font-bold">14 personas viendo ahora</span>
                </div>
              </div>

              {/* Color Swatches */}
              <div className="mt-4">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="font-semibold text-black uppercase tracking-wider text-[11px]">
                    Color: <strong className="font-bold">{selectedSwatch.name}</strong>
                  </span>
                </div>
                <div className="flex gap-2">
                  {product.swatches.map((swatch, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSwatch(swatch)}
                      className={`w-6 h-6 border transition-all ${
                        selectedSwatch.name === swatch.name
                          ? "border-black ring-2 ring-black scale-110"
                          : "border-neutral-300 hover:border-black"
                      }`}
                      style={{ backgroundColor: swatch.colorCode }}
                      title={swatch.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selector & Guide Button */}
              <div className="mt-6">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="font-semibold text-black uppercase tracking-wider text-[11px]">
                    {product.gender === "supplements" ? "Formato / Sabor:" : "Talla:"}
                  </span>
                  {product.sizeGuide && (
                    <button
                      onClick={() => setShowSizeGuide(!showSizeGuide)}
                      className="text-[11px] font-semibold text-neutral-600 hover:text-black flex items-center gap-1 underline transition-colors"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>{showSizeGuide ? "Ocultar Medidas" : "Guía de Tallas (cm)"}</span>
                    </button>
                  )}
                </div>

                {/* Size guide table expansion */}
                {showSizeGuide && product.sizeGuide && (
                  <div className="mb-4 p-3 bg-neutral-50 border border-neutral-200 text-xs animate-in fade-in duration-200">
                    <p className="font-bold text-[10px] tracking-wider uppercase text-black mb-2">
                      Medidas en Centímetros (Corte Boxy Oversize)
                    </p>
                    <div className="grid grid-cols-4 gap-1 text-[11px] text-center font-mono">
                      <span className="font-bold text-neutral-500">Talla</span>
                      <span className="font-bold text-neutral-500">Pecho</span>
                      <span className="font-bold text-neutral-500">Largo</span>
                      <span className="font-bold text-neutral-500">Hombros</span>

                      {product.sizeGuide.map((sg) => (
                        <React.Fragment key={sg.size}>
                          <span className="font-bold text-black py-1">{sg.size}</span>
                          <span className="py-1">{sg.chest}</span>
                          <span className="py-1">{sg.length}</span>
                          <span className="py-1">{sg.shoulders}</span>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}

                {/* Variants Buttons with real remaining numbers */}
                <div className="grid grid-cols-5 gap-1.5">
                  {product.variants.map((v) => {
                    const isSelected = selectedVariant.id === v.id;
                    const isOutOfStock = v.stock <= 0;
                    const isLowStock = v.stock > 0 && v.stock <= 2;

                    return (
                      <button
                        key={v.id}
                        disabled={isOutOfStock}
                        onClick={() => setSelectedVariant(v)}
                        className={`py-2 px-1 text-xs font-bold border transition-all flex flex-col items-center justify-center cursor-pointer ${
                          isSelected
                            ? "bg-black text-white border-black shadow-md scale-[1.02]"
                            : isOutOfStock
                            ? "bg-neutral-100 text-neutral-300 border-neutral-200 line-through cursor-not-allowed"
                            : "bg-white text-black border-neutral-300 hover:border-black"
                        }`}
                      >
                        <span className="font-black text-xs">{v.name}</span>
                        {!isOutOfStock && (
                          <span
                            className={`text-[8px] font-mono leading-none mt-0.5 ${
                              isLowStock
                                ? isSelected
                                  ? "text-red-300 font-black"
                                  : "text-red-600 font-black"
                                : isSelected
                                ? "text-neutral-300"
                                : "text-neutral-400"
                            }`}
                          >
                            {v.stock === 1 ? "1 sola!" : `${v.stock}u`}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Dynamic Urgency Callout for Selected Size */}
                {selectedVariant.stock > 0 && selectedVariant.stock <= 3 ? (
                  <div className="mt-2.5 p-2 bg-neutral-950 text-white text-[10px] font-black uppercase tracking-wider flex items-center justify-between border border-neutral-800">
                    <span className="flex items-center gap-1.5 text-amber-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      ¡STOCK CRÍTICO EN TALLA {selectedVariant.name}!
                    </span>
                    <span className="font-mono text-white text-[10px]">
                      Solo quedan {selectedVariant.stock} unidades en bodega
                    </span>
                  </div>
                ) : (
                  <p className="text-[10px] text-neutral-500 font-mono mt-1.5">
                    ✓ Stock confirmado en bodega Medellín: {selectedVariant.stock} unidades disponibles.
                  </p>
                )}
              </div>

              {/* VitalFit App Perk Banner - NUESTRO TOQUE */}
              {product.vitalFitPerk && (
                <div className="mt-6 p-3.5 bg-neutral-900 text-white flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold tracking-[0.2em] text-amber-400 uppercase block">
                      EXCLUSIVO // VITALFIT TRAINING APP
                    </span>
                    <p className="text-xs text-neutral-300 mt-0.5 leading-snug">
                      {product.vitalFitPerk}
                    </p>
                  </div>
                </div>
              )}

              {/* Technical Specifications */}
              <div className="mt-6 pt-4 border-t border-neutral-100 space-y-2 text-xs text-neutral-700">
                <p className="leading-relaxed text-neutral-600 mb-3">
                  {product.description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-[11px] bg-neutral-50 p-3 border border-neutral-100">
                  {product.specifications.gramaje && (
                    <div>
                      <span className="text-neutral-400 uppercase text-[9px] block">Gramaje:</span>
                      <strong className="text-black">{product.specifications.gramaje}</strong>
                    </div>
                  )}
                  <div>
                    <span className="text-neutral-400 uppercase text-[9px] block">Composición:</span>
                    <strong className="text-black">{product.specifications.composicion}</strong>
                  </div>
                  <div>
                    <span className="text-neutral-400 uppercase text-[9px] block">Corte:</span>
                    <strong className="text-black">{product.specifications.corte}</strong>
                  </div>
                  <div>
                    <span className="text-neutral-400 uppercase text-[9px] block">Cuidados:</span>
                    <strong className="text-black">{product.specifications.cuidados}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions: Quantity and Add to Cart */}
            <div className="pt-4 border-t border-neutral-200 space-y-3">
              <div className="flex gap-3">
                {/* Quantity picker */}
                <div className="flex items-center border border-neutral-300 bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-3 text-black hover:bg-neutral-100 transition-colors text-sm font-bold"
                    aria-label="Restar una unidad"
                  >
                    -
                  </button>
                  <span className="px-3 font-mono font-bold text-sm text-black">
                    {quantity}
                  </span>
                  <button
                    disabled={quantity >= selectedVariant.stock}
                    onClick={() => setQuantity(Math.min(selectedVariant.stock, quantity + 1))}
                    className="px-3 py-3 text-black hover:bg-neutral-100 transition-colors text-sm font-bold disabled:opacity-30"
                    aria-label="Sumar una unidad"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  disabled={selectedVariant.stock <= 0}
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 text-xs font-bold tracking-[0.25em] uppercase flex items-center justify-center gap-2 transition-all shadow-md ${
                    isAdded
                      ? "bg-emerald-600 text-white"
                      : selectedVariant.stock <= 0
                      ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                      : "bg-black hover:bg-neutral-900 text-white active:scale-[0.99]"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>¡AGREGADO AL ARSENAL!</span>
                    </>
                  ) : selectedVariant.stock <= 0 ? (
                    <span>TALLA AGOTADA</span>
                  ) : (
                    <span>AGREGAR AL CARRITO • {formatPrice(product.price * quantity)}</span>
                  )}
                </button>
              </div>

              {/* Shipping & Returns Trust Badges */}
              <div className="flex items-center justify-between text-[10px] text-neutral-500 pt-1">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-neutral-700" />
                  Despacho 24-48h nacional
                </span>
                <span className="flex items-center gap-1">
                  <RotateCcw className="w-3.5 h-3.5 text-neutral-700" />
                  Cambios de talla sin costo
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-700" />
                  Calidad garantizada
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
