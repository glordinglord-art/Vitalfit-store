"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { MOCK_PRODUCTS } from "@/features/catalog/services/products.mock";
import { useCartStore } from "@/features/cart/store/cart.store";
import Navbar from "@/shared/components/Navbar";
import Footer from "@/shared/components/Footer";
import {
  ArrowLeft,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Check,
  ChevronDown,
  Ruler,
  Star,
  Smartphone,
  Share2
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  // Encontrar el producto por slug o usar el primero como fallback
  const product =
    MOCK_PRODUCTS.find((p) => p.slug === slug) ||
    MOCK_PRODUCTS.find((p) => p.slug.includes(slug)) ||
    MOCK_PRODUCTS[0];

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>("specs");
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const totalStock = product.variants.reduce((acc, v) => acc + v.stock, 0);

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleAddToCart = () => {
    addItem(product, selectedVariant.name, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, selectedVariant.name, quantity);
    router.push("/checkout");
  };

  const toggleAccordion = (key: string) => {
    setActiveAccordion(activeAccordion === key ? null : key);
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Navbar />

      {/* Breadcrumb Bar */}
      <div className="border-b border-neutral-200 bg-neutral-50 px-4 sm:px-8 py-3 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-neutral-500">
            <Link href="/" className="hover:text-black transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <Link href="/colecciones" className="hover:text-black transition-colors">
              Colección
            </Link>
            <span>/</span>
            <span className="text-black font-bold uppercase truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </span>
          </div>

          <Link
            href="/colecciones"
            className="flex items-center gap-1.5 font-bold uppercase text-[11px] hover:text-neutral-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al Catálogo</span>
          </Link>
        </div>
      </div>

      {/* Main Product Showcase Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          {/* Left Column: Gallery (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-20 h-24 sm:w-24 sm:h-32 border-2 transition-all flex-shrink-0 cursor-pointer ${
                    selectedImage === idx ? "border-black" : "border-neutral-200 hover:border-neutral-400"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} vista ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Featured Photo */}
            <div className="relative flex-1 aspect-[4/5] bg-neutral-100 border border-neutral-200 overflow-hidden">
              <Image
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />

              {product.tag && (
                <span className="absolute top-4 left-4 bg-black text-white text-[11px] font-black uppercase tracking-widest px-3 py-1">
                  {product.tag}
                </span>
              )}
            </div>
          </div>

          {/* Right Column: Buy Box & Specs (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center justify-between text-neutral-500 text-xs font-mono uppercase tracking-widest mb-1">
                <span>SKU: {selectedVariant.sku}</span>
                <span className="flex items-center gap-1 text-black font-bold">
                  <Star className="w-3.5 h-3.5 fill-black text-black" />
                  <span>4.9 / 5.0 (48 Reseñas)</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black leading-tight">
                {product.name}
              </h1>

              <p className="text-xs text-neutral-500 mt-1 uppercase tracking-wide">
                {product.subtitle}
              </p>

              {/* Price Row */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl font-black font-mono text-black">
                  {formatPrice(product.price)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-sm font-mono text-neutral-400 line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
                {product.compareAtPrice && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                    Ahorras {formatPrice(product.compareAtPrice - product.price)}
                  </span>
                )}
              </div>

              {/* Scarcity / High Demand Callout Box */}
              <div className="p-4 bg-neutral-50 border border-neutral-300 mt-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-black uppercase">
                  <span className="flex items-center gap-1.5 text-red-600">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                    EDICIÓN LIMITADA DROP 01
                  </span>
                  <span className="font-mono text-black font-extrabold text-xs">
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

                <div className="flex items-center justify-between text-[11px] text-neutral-600 pt-0.5 font-medium">
                  <span>🔥 84% de la producción ya reservada</span>
                  <span className="text-red-600 font-bold">18 atletas viendo esta prenda ahora</span>
                </div>
              </div>
            </div>

            {/* App Link Callout */}
            <div className="p-3.5 bg-neutral-900 text-white flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Smartphone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <p className="text-[11px] leading-tight">
                  <strong className="text-white block font-black uppercase">
                    30 Días VIP Gratis en la App VitalFit
                  </strong>
                  Acceso exclusivo a rutinas de hipertrofia y calculadora de sobrecarga.
                </p>
              </div>
              <a
                href="https://punto-de-inflexion.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-bold uppercase tracking-wider text-amber-400 underline whitespace-nowrap hover:text-white"
              >
                Ver App ↗
              </a>
            </div>

            {/* Color Swatches */}
            {product.swatches && (
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 block mb-2">
                  Tonalidad: <strong className="text-black">{product.swatches[selectedColor]?.name}</strong>
                </span>
                <div className="flex items-center gap-2">
                  {product.swatches.map((swatch, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(idx)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
                        selectedColor === idx ? "border-black scale-110" : "border-neutral-300 hover:scale-105"
                      }`}
                      style={{ backgroundColor: swatch.colorCode }}
                      title={swatch.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-2">
                <span>Seleccionar Talla / Variante:</span>
                <button
                  onClick={() => setIsSizeGuideOpen(!isSizeGuideOpen)}
                  className="flex items-center gap-1 text-neutral-500 hover:text-black underline cursor-pointer text-[11px]"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Guía de Tallas (cm)</span>
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {product.variants.map((v) => {
                  const isSelected = selectedVariant.id === v.id;
                  const isOutOfStock = v.stock === 0;
                  const isLowStock = v.stock > 0 && v.stock <= 2;

                  return (
                    <button
                      key={v.id}
                      onClick={() => !isOutOfStock && setSelectedVariant(v)}
                      disabled={isOutOfStock}
                      className={`py-2.5 px-1 text-xs font-black uppercase tracking-wider border transition-all flex flex-col items-center justify-center cursor-pointer ${
                        isSelected
                          ? "bg-black text-white border-black shadow-md scale-[1.02]"
                          : isOutOfStock
                          ? "bg-neutral-100 text-neutral-300 border-neutral-200 cursor-not-allowed line-through"
                          : "bg-white text-black border-neutral-300 hover:border-black"
                      }`}
                    >
                      <span className="font-extrabold text-xs">{v.name}</span>
                      {!isOutOfStock && (
                        <span
                          className={`text-[8.5px] font-mono leading-none mt-1 ${
                            isLowStock
                              ? isSelected
                                ? "text-red-300 font-black"
                                : "text-red-600 font-black"
                              : isSelected
                              ? "text-neutral-300"
                              : "text-neutral-400"
                          }`}
                        >
                          {v.stock === 1 ? "¡1 sola!" : `${v.stock}u`}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Stock status indicator */}
              <div className="mt-2.5">
                {selectedVariant.stock <= 3 && selectedVariant.stock > 0 ? (
                  <div className="p-2.5 bg-neutral-950 text-white text-[10px] font-black uppercase tracking-wider flex items-center justify-between border border-neutral-800">
                    <span className="text-amber-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      ¡STOCK CRÍTICO // TALLA {selectedVariant.name}!
                    </span>
                    <span className="font-mono text-white text-[11px]">
                      Solo quedan {selectedVariant.stock} unidades en bodega
                    </span>
                  </div>
                ) : (
                  <div className="text-[11px] font-mono text-emerald-700 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>✓ Stock confirmado: {selectedVariant.stock} unidades listas para despacho inmediato en Colombia</span>
                  </div>
                )}
              </div>
            </div>

            {/* Size Guide Table Modal Drawer */}
            {isSizeGuideOpen && (
              <div className="p-4 bg-neutral-50 border border-neutral-300 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                  <span className="font-extrabold uppercase text-black">Medidas Reales de la Prenda</span>
                  <button
                    onClick={() => setIsSizeGuideOpen(false)}
                    className="text-neutral-500 hover:text-black font-bold text-xs"
                  >
                    Cerrar ✕
                  </button>
                </div>
                <table className="w-full mt-3 text-left">
                  <thead className="text-[10px] uppercase font-bold text-neutral-500">
                    <tr>
                      <th className="py-1">Talla</th>
                      <th className="py-1">Pecho (Circ.)</th>
                      <th className="py-1">Largo</th>
                      <th className="py-1">Hombro</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 font-mono text-[11px]">
                    {product.sizeGuide?.map((row) => (
                      <tr key={row.size} className={selectedVariant.name === row.size ? "bg-white font-bold" : ""}>
                        <td className="py-1.5">{row.size}</td>
                        <td className="py-1.5">{row.chest}</td>
                        <td className="py-1.5">{row.length}</td>
                        <td className="py-1.5">{row.shoulders}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Quantity Selector & Add to Cart */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                <div className="flex items-center border border-neutral-300 bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-12 flex items-center justify-center font-bold text-sm text-neutral-600 hover:text-black cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-mono font-bold text-sm text-black">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(selectedVariant.stock, quantity + 1))}
                    className="w-10 h-12 flex items-center justify-center font-bold text-sm text-neutral-600 hover:text-black cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 px-6 text-xs font-black uppercase tracking-[0.2em] transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    addedAnimation
                      ? "bg-emerald-600 text-white"
                      : "bg-black hover:bg-neutral-800 text-white"
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>¡Agregado a la Bolsa!</span>
                    </>
                  ) : (
                    <span>Agregar a la Bolsa</span>
                  )}
                </button>
              </div>

              {/* Instant Buy Button */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 bg-neutral-900 hover:bg-black text-white text-xs font-black uppercase tracking-[0.2em] transition-colors cursor-pointer border border-neutral-800"
              >
                Comprar Ahora con PSE / Nequi
              </button>
            </div>

            {/* Colombia Guarantee Badges */}
            <div className="grid grid-cols-3 gap-2 py-4 border-y border-neutral-200 text-center">
              <div className="space-y-1">
                <Truck className="w-4 h-4 mx-auto text-neutral-700" />
                <span className="text-[10px] font-bold uppercase text-neutral-700 block">
                  Envío Nacional
                </span>
                <span className="text-[9px] text-neutral-400 block">2-3 días hábiles</span>
              </div>
              <div className="space-y-1">
                <ShieldCheck className="w-4 h-4 mx-auto text-neutral-700" />
                <span className="text-[10px] font-bold uppercase text-neutral-700 block">
                  Garantía 280 GSM
                </span>
                <span className="text-[9px] text-neutral-400 block">Tejido anti-desgaste</span>
              </div>
              <div className="space-y-1">
                <RotateCcw className="w-4 h-4 mx-auto text-neutral-700" />
                <span className="text-[10px] font-bold uppercase text-neutral-700 block">
                  Cambios Gratis
                </span>
                <span className="text-[9px] text-neutral-400 block">Por talla sin costo</span>
              </div>
            </div>

            {/* Accordions */}
            <div className="divide-y divide-neutral-200 text-xs">
              {/* Accordion 1: Especificaciones */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion("specs")}
                  className="w-full flex items-center justify-between text-left font-extrabold uppercase tracking-wider text-black cursor-pointer"
                >
                  <span>Especificaciones & Materiales</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeAccordion === "specs" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeAccordion === "specs" && (
                  <div className="mt-3 space-y-2 text-neutral-600 text-xs leading-relaxed">
                    <p>{product.description}</p>
                    <div className="pt-2 space-y-1 font-mono text-[11px]">
                      <p>• <strong>Gramaje:</strong> {product.specifications?.gramaje}</p>
                      <p>• <strong>Composición:</strong> {product.specifications?.composicion}</p>
                      <p>• <strong>Corte:</strong> {product.specifications?.corte}</p>
                      <p>• <strong>Cuidados:</strong> {product.specifications?.cuidados}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 2: Envíos */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion("shipping")}
                  className="w-full flex items-center justify-between text-left font-extrabold uppercase tracking-wider text-black cursor-pointer"
                >
                  <span>Envíos & Tiempos de Entrega en Colombia</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeAccordion === "shipping" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeAccordion === "shipping" && (
                  <div className="mt-3 space-y-2 text-neutral-600 text-xs leading-relaxed">
                    <p>
                      Despachamos desde nuestro centro logístico en <strong>Medellín</strong> con <strong>Coordinadora Mercantil</strong> y <strong>Servientrega</strong>.
                    </p>
                    <p>
                      • <strong>Medellín y Valle de Aburrá:</strong> 24 a 48 horas hábiles.
                    </p>
                    <p>
                      • <strong>Bogotá, Cali, Barranquilla y ciudades principales:</strong> 2 a 3 días hábiles.
                    </p>
                    <p>
                      • <strong>Envío Gratis</strong> en compras superiores a $150.000 COP.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
