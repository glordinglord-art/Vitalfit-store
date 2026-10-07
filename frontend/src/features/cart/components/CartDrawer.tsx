"use client";

import React from "react";
import Image from "next/image";
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from "lucide-react";
import { useCartStore, FREE_SHIPPING_THRESHOLD } from "../store/cart.store";

export const CartDrawer: React.FC = () => {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getTotalPrice, getTotalItems } =
    useCartStore();

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  const freeShippingProgress = Math.min(100, (totalPrice / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);

  if (!isOpen) return null;

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Dimmed Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <aside className="w-screen max-w-md bg-white border-l border-neutral-200 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-neutral-200 flex items-center justify-between">
            <div>
              <h2 className="text-xs sm:text-sm font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-black">
                BOLSA DE COMPRAS ({totalItems})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-black hover:opacity-60 transition-opacity"
              aria-label="Cerrar bolsa"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Free Shipping Tracker */}
          <div className="px-6 py-4 bg-neutral-50 border-b border-neutral-200">
            <div className="flex justify-between text-[11px] mb-2 font-medium">
              <span className="text-neutral-800">
                {remainingForFreeShipping === 0 ? (
                  <strong className="text-black">¡DESBLOQUEASTE ENVÍO GRATIS! 🎉</strong>
                ) : (
                  <span>
                    Agrega <strong className="text-black">{formatPrice(remainingForFreeShipping)}</strong> más para ENVÍO GRATIS
                  </span>
                )}
              </span>
              <span className="text-neutral-500 font-mono text-[10px]">
                {Math.round(freeShippingProgress)}%
              </span>
            </div>
            <div className="h-1 w-full bg-neutral-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-black transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Stock Reservation Warning */}
          {items.length > 0 && (
            <div className="px-6 py-2.5 bg-neutral-900 text-white flex items-center justify-between text-[10px] font-black uppercase tracking-wider border-b border-neutral-800">
              <span className="flex items-center gap-1.5 text-amber-400">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                STOCK RESERVADO EN BODEGA
              </span>
              <span className="font-mono bg-neutral-800 px-2 py-0.5 text-white">09:45 min ⏳</span>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <ShoppingBag className="w-10 h-10 stroke-[1] text-neutral-300" />
                <div>
                  <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-black">
                    TU BOLSA ESTÁ VACÍA
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1">
                    Explora nuestro nuevo drop y equípate con lo mejor para entrenar pesado.
                  </p>
                </div>
                <button
                  onClick={closeCart}
                  className="px-6 py-3 bg-black hover:bg-neutral-800 text-white text-[11px] font-bold tracking-[0.2em] uppercase transition-all"
                >
                  EMPEZAR A COMPRAR
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.variant.id}
                  className="flex gap-4 pb-5 border-b border-neutral-100 last:border-b-0"
                >
                  <div className="relative w-20 h-24 bg-neutral-100 flex-shrink-0 overflow-hidden">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover object-center"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-bold tracking-wider uppercase text-black truncate pr-2">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.variant.id)}
                          className="text-neutral-400 hover:text-black transition-colors"
                          aria-label="Eliminar prenda"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-neutral-500 mt-0.5">
                        Talla: <span className="font-semibold text-black">{item.variant.name}</span>
                      </p>
                      <p className="text-xs font-semibold text-black mt-1">
                        {formatPrice(item.product.price)}
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center border border-neutral-300 w-fit mt-2">
                      <button
                        onClick={() => updateQuantity(item.variant.id, item.quantity - 1)}
                        className="px-2.5 py-1 text-black hover:bg-neutral-100 transition-colors"
                        aria-label="Reducir cantidad"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-semibold text-black">
                        {item.quantity}
                      </span>
                      <button
                        disabled={item.quantity >= item.variant.stock}
                        onClick={() => updateQuantity(item.variant.id, item.quantity + 1)}
                        className="px-2.5 py-1 text-black hover:bg-neutral-100 transition-colors disabled:opacity-30"
                        aria-label="Aumentar cantidad"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Checkout Footer */}
          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-neutral-200 space-y-4">
              <div className="flex justify-between text-xs tracking-wider">
                <span className="font-semibold text-black uppercase">SUBTOTAL</span>
                <span className="font-bold text-black">{formatPrice(totalPrice)}</span>
              </div>
              <p className="text-[10px] text-neutral-500">
                Impuestos y tarifas de envío calculados al finalizar compra.
              </p>

              <button
                onClick={() => {
                  closeCart();
                  window.location.href = "/checkout";
                }}
                className="w-full py-4 bg-black hover:bg-neutral-900 text-white text-xs font-bold tracking-[0.25em] uppercase flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99]"
              >
                <span>FINALIZAR COMPRA</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-400">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-600" />
                <span>Pago cifrado SSL de 256 bits • Reserva de stock en tiempo real</span>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
