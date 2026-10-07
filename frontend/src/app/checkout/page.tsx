"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Check, Truck, Lock, CreditCard, Building2, Smartphone, DollarSign } from "lucide-react";
import { useCartStore, FREE_SHIPPING_THRESHOLD } from "@/features/cart/store/cart.store";

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const totalPrice = getTotalPrice();
  const isFreeShipping = totalPrice >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = items.length === 0 ? 0 : isFreeShipping ? 0 : 12000;
  const grandTotal = totalPrice + shippingCost;

  // Form states
  const [formData, setFormData] = useState({
    nombre: "Alejandro Gómez",
    documento: "1020456789",
    email: "atleta@vitalfit.com",
    telefono: "3009128421",
    departamento: "Antioquia",
    ciudad: "Medellín",
    direccion: "Carrera 43A # 18 Sur - 125",
    barrio: "El Poblado / Apto 802",
    notas: "Dejar en recepción",
  });

  const [paymentMethod, setPaymentMethod] = useState<"card" | "pse" | "nequi" | "cod">("pse");
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<any | null>(null);

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (discountCode.trim().toUpperCase() === "SAVAGE10" || discountCode.trim().toUpperCase() === "VITAL10") {
      setAppliedDiscount(Math.round(totalPrice * 0.1));
      alert("¡Cupón del 10% aplicado exitosamente!");
    } else {
      alert("Cupón no válido. Prueba con SAVAGE10");
    }
  };

  const handleProcessOrder = () => {
    if (items.length === 0) {
      alert("Tu bolsa de compras está vacía.");
      return;
    }

    setIsProcessing(true);

    // Simular el candado de Idempotencia y reserva de stock
    setTimeout(() => {
      setIsProcessing(false);
      const fakeOrder = {
        id: `VF-${Math.floor(100000 + Math.random() * 900000)}`,
        items: [...items],
        total: grandTotal - appliedDiscount,
        method: paymentMethod,
        date: new Date().toLocaleDateString("es-CO", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        tracking: `CO-${Math.floor(100000000 + Math.random() * 900000000)}`,
      };
      setOrderConfirmed(fakeOrder);
      clearCart();
    }, 1800);
  };

  if (orderConfirmed) {
    return (
      <main className="min-h-screen bg-neutral-50 flex items-center justify-center p-4 sm:p-8 select-none">
        <div className="max-w-2xl w-full bg-white border border-neutral-200 p-8 sm:p-12 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-black text-white mx-auto flex items-center justify-center">
            <Check className="w-8 h-8 stroke-[3]" />
          </div>

          <div>
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-neutral-400">
              ORDEN CONFIRMADA // PAGO APROBADO
            </span>
            <h1 className="font-extrabold text-3xl sm:text-4xl uppercase tracking-wider text-black mt-1">
              ¡GRACIAS POR TU COMPRA!
            </h1>
            <p className="text-xs text-neutral-500 mt-2 font-mono">
              Número de Pedido: <strong className="text-black">{orderConfirmed.id}</strong>
            </p>
          </div>

          <div className="p-4 bg-neutral-50 border border-neutral-200 text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-neutral-500">Guía de Despacho (Coordinadora/Servientrega):</span>
              <strong className="font-mono text-black">{orderConfirmed.tracking}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Total Facturado:</span>
              <strong className="text-black">{formatPrice(orderConfirmed.total)}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Destino:</span>
              <strong className="text-black">{formData.ciudad}, {formData.departamento}</strong>
            </div>
          </div>

          {/* VitalFit App Perk Notification */}
          <div className="p-4 bg-[#0c0c0e] text-white text-left flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">
              QR
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-wider uppercase text-amber-400">
                BENEFICIO APP VITALFIT DESBLOQUEADO
              </h4>
              <p className="text-[11px] text-neutral-300 mt-1">
                Al recibir tu paquete, escanea el código en la bastilla de la prenda o ingresa tu número de orden en la app para activar tus 30 días VIP.
              </p>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/cuenta"
              className="px-8 py-3.5 bg-black hover:bg-neutral-800 text-white font-bold text-xs tracking-[0.2em] uppercase transition-all"
            >
              VER MIS PEDIDOS EN EL PORTAL
            </Link>
            <Link
              href="/"
              className="px-8 py-3.5 bg-neutral-100 hover:bg-neutral-200 text-black font-bold text-xs tracking-[0.2em] uppercase transition-all"
            >
              VOLVER A LA TIENDA
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-50 text-black select-none">
      {/* Minimalist Checkout Top Navigation */}
      <header className="w-full bg-white border-b border-neutral-200 h-16 flex items-center justify-between px-4 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-neutral-600 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Catálogo</span>
        </Link>

        <Link href="/" className="font-extrabold text-xl tracking-[0.35em] uppercase text-black">
          V I T A L F I T
        </Link>

        <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>Checkout 100% Cifrado</span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8">
        {/* Scarcity / Stock Reservation Alert */}
        <div className="mb-6 p-3 bg-neutral-900 text-white flex items-center justify-between text-xs font-black uppercase tracking-wider border border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>🔥 Stock reservado temporalmente por alta demanda del Drop 01</span>
          </div>
          <span className="font-mono bg-black text-amber-400 px-2.5 py-1 text-[11px] border border-neutral-700">
            09:42 min restantes ⏳
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Form Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Datos de Envío */}
            <div className="bg-white p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <h2 className="text-xs font-extrabold tracking-[0.25em] uppercase text-black flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  <span>1. DATOS DE ENTREGA EN COLOMBIA</span>
                </h2>
                <span className="text-[10px] text-neutral-400 font-mono">PASO 1 DE 2</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-neutral-500 font-semibold mb-1 uppercase text-[10px] tracking-wider">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full p-2.5 border border-neutral-300 rounded-none focus:outline-none focus:border-black font-medium"
                  />
                </div>

                <div>
                  <label className="block text-neutral-500 font-semibold mb-1 uppercase text-[10px] tracking-wider">
                    Cédula / Documento *
                  </label>
                  <input
                    type="text"
                    value={formData.documento}
                    onChange={(e) => setFormData({ ...formData, documento: e.target.value })}
                    className="w-full p-2.5 border border-neutral-300 rounded-none focus:outline-none focus:border-black font-medium"
                  />
                </div>

                <div>
                  <label className="block text-neutral-500 font-semibold mb-1 uppercase text-[10px] tracking-wider">
                    Correo Electrónico (Para Factura y Guía) *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2.5 border border-neutral-300 rounded-none focus:outline-none focus:border-black font-medium"
                  />
                </div>

                <div>
                  <label className="block text-neutral-500 font-semibold mb-1 uppercase text-[10px] tracking-wider">
                    Teléfono Celular (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="w-full p-2.5 border border-neutral-300 rounded-none focus:outline-none focus:border-black font-medium"
                  />
                </div>

                <div>
                  <label className="block text-neutral-500 font-semibold mb-1 uppercase text-[10px] tracking-wider">
                    Departamento *
                  </label>
                  <input
                    type="text"
                    value={formData.departamento}
                    onChange={(e) => setFormData({ ...formData, departamento: e.target.value })}
                    className="w-full p-2.5 border border-neutral-300 rounded-none focus:outline-none focus:border-black font-medium"
                  />
                </div>

                <div>
                  <label className="block text-neutral-500 font-semibold mb-1 uppercase text-[10px] tracking-wider">
                    Ciudad / Municipio *
                  </label>
                  <input
                    type="text"
                    value={formData.ciudad}
                    onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                    className="w-full p-2.5 border border-neutral-300 rounded-none focus:outline-none focus:border-black font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-neutral-500 font-semibold mb-1 uppercase text-[10px] tracking-wider">
                    Dirección Exacta (Calle, Carrera, Número) *
                  </label>
                  <input
                    type="text"
                    value={formData.direccion}
                    onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                    className="w-full p-2.5 border border-neutral-300 rounded-none focus:outline-none focus:border-black font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-neutral-500 font-semibold mb-1 uppercase text-[10px] tracking-wider">
                    Barrio, Edificio o Torre / Apto
                  </label>
                  <input
                    type="text"
                    value={formData.barrio}
                    onChange={(e) => setFormData({ ...formData, barrio: e.target.value })}
                    className="w-full p-2.5 border border-neutral-300 rounded-none focus:outline-none focus:border-black font-medium"
                  />
                </div>
              </div>
            </div>

            {/* 2. Método de Pago */}
            <div className="bg-white p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <h2 className="text-xs font-extrabold tracking-[0.25em] uppercase text-black flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-600" />
                  <span>2. MÉTODO DE PAGO SEGURO</span>
                </h2>
                <span className="text-[10px] text-neutral-400 font-mono">PASO 2 DE 2</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* PSE */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("pse")}
                  className={`p-4 border text-left flex items-start gap-3 transition-all ${
                    paymentMethod === "pse"
                      ? "border-black bg-neutral-50 ring-1 ring-black"
                      : "border-neutral-200 hover:border-black"
                  }`}
                >
                  <Building2 className="w-5 h-5 text-black flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold uppercase text-black">PSE // BANCOLOMBIA, DAVIVIENDA</h4>
                    <p className="text-[10px] text-neutral-500 mt-0.5">
                      Débito bancario en línea instantáneo.
                    </p>
                  </div>
                </button>

                {/* Nequi / Daviplata */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("nequi")}
                  className={`p-4 border text-left flex items-start gap-3 transition-all ${
                    paymentMethod === "nequi"
                      ? "border-black bg-neutral-50 ring-1 ring-black"
                      : "border-neutral-200 hover:border-black"
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-purple-700 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold uppercase text-black">NEQUI / DAVIPLATA</h4>
                    <p className="text-[10px] text-neutral-500 mt-0.5">
                      Transferencia inmediata por QR o notificación push.
                    </p>
                  </div>
                </button>

                {/* Tarjeta */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`p-4 border text-left flex items-start gap-3 transition-all ${
                    paymentMethod === "card"
                      ? "border-black bg-neutral-50 ring-1 ring-black"
                      : "border-neutral-200 hover:border-black"
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-black flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold uppercase text-black">TARJETA CRÉDITO / DÉBITO</h4>
                    <p className="text-[10px] text-neutral-500 mt-0.5">
                      Visa, Mastercard, American Express.
                    </p>
                  </div>
                </button>

                {/* Contraentrega */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-4 border text-left flex items-start gap-3 transition-all ${
                    paymentMethod === "cod"
                      ? "border-black bg-neutral-50 ring-1 ring-black"
                      : "border-neutral-200 hover:border-black"
                  }`}
                >
                  <DollarSign className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold uppercase text-black">PAGO CONTRAENTREGA</h4>
                    <p className="text-[10px] text-neutral-500 mt-0.5">
                      Pagas en efectivo al recibir en tu puerta.
                    </p>
                  </div>
                </button>
              </div>

              {/* Security info box */}
              <div className="p-3 bg-neutral-50 border border-neutral-200 flex items-center gap-2 text-[11px] text-neutral-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>
                  Tu compra está blindada con llave de idempotencia en nuestro backend para prevenir cualquier cobro doble o sobreventa de stock.
                </span>
              </div>
            </div>
          </div>

          {/* Right Summary Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-6 sticky top-24">
              <h3 className="text-xs font-extrabold tracking-[0.25em] uppercase text-black border-b border-neutral-100 pb-3">
                RESUMEN DE TU ARSENAL ({items.length})
              </h3>

              {/* Items List */}
              <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                {items.length === 0 ? (
                  <p className="text-xs text-neutral-500 text-center py-4">
                    No tienes productos agregados a la bolsa.
                  </p>
                ) : (
                  items.map((item) => (
                    <div key={item.variant.id} className="flex gap-3 items-center">
                      <div className="relative w-14 h-16 bg-neutral-100 flex-shrink-0 border border-neutral-200">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                        <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0 text-xs">
                        <h4 className="font-bold text-black uppercase truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-[11px] text-neutral-500">
                          Talla: <strong className="text-black">{item.variant.name}</strong>
                        </p>
                      </div>

                      <div className="text-xs font-bold text-black font-mono">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Coupon form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2 pt-2 border-t border-neutral-100">
                <input
                  type="text"
                  placeholder="Código de Descuento (ej: SAVAGE10)"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="flex-1 p-2.5 border border-neutral-300 text-xs font-mono uppercase focus:outline-none focus:border-black"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-black text-white text-xs font-bold tracking-wider uppercase hover:bg-neutral-800 transition-colors"
                >
                  APLICAR
                </button>
              </form>

              {/* Totals Breakdown */}
              <div className="space-y-2 text-xs border-t border-neutral-100 pt-4">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span className="font-mono font-medium text-black">{formatPrice(totalPrice)}</span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Descuento Especial (10%)</span>
                    <span className="font-mono">-{formatPrice(appliedDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-neutral-600">
                  <span>Envío Nacional</span>
                  <span className="font-mono font-medium text-black">
                    {shippingCost === 0 ? "¡GRATIS!" : formatPrice(shippingCost)}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-extrabold text-black pt-3 border-t border-neutral-200">
                  <span className="uppercase tracking-wider">TOTAL A PAGAR</span>
                  <span className="font-mono text-base">{formatPrice(grandTotal - appliedDiscount)}</span>
                </div>
              </div>

              {/* Confirm & Pay Button */}
              <button
                disabled={isProcessing || items.length === 0}
                onClick={handleProcessOrder}
                className={`w-full py-4 text-xs font-bold tracking-[0.25em] uppercase flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99] ${
                  isProcessing
                    ? "bg-neutral-400 text-white cursor-wait"
                    : items.length === 0
                    ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                    : "bg-black hover:bg-neutral-900 text-white"
                }`}
              >
                {isProcessing ? (
                  <span>VALIDANDO IDEMPOTENCIA & STOCK...</span>
                ) : (
                  <span>PAGAR ORDEN // {formatPrice(grandTotal - appliedDiscount)}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
