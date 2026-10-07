"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  User,
  MapPin,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Truck,
  Clock,
  CheckCircle2,
  Download,
  CreditCard,
  QrCode,
  Smartphone,
  Check,
  ChevronRight,
  LogOut,
  Award,
  Calendar,
  AlertCircle,
  Plus
} from "lucide-react";

export default function CuentaPage() {
  // Estado de autenticación (por defecto autenticado para previsualizar, pero permite cerrar sesión para ver registro)
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [activeTab, setActiveTab] = useState<"pedidos" | "app" | "direcciones" | "pagos">("pedidos");
  const [copiedPromo, setCopiedPromo] = useState(false);

  // Form states para Login / Registro
  const [loginEmail, setLoginEmail] = useState("atleta@vitalfit.com");
  const [loginPass, setLoginPass] = useState("••••••••••••");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regCity, setRegCity] = useState("Medellín");

  // Mock pedidos del atleta
  const pedidos = [
    {
      id: "VF-982144",
      fecha: "6 de Octubre, 2026",
      hora: "09:42 PM",
      estado: "DESPACHADO // EN CAMINO",
      estadoPaso: 3, // 1: Recibido, 2: Empacado, 3: Despachado, 4: En reparto, 5: Entregado
      transportadora: "Coordinadora Mercantil",
      guia: "CO-882194129",
      metodoPago: "PSE (Bancolombia Ahorros)",
      referenciaPago: "PSE-AUT-91823719",
      subtotal: 259800,
      envio: 0,
      total: 259800,
      articulos: [
        {
          nombre: "CAMISETA OVERSIZE // METAL ANATOMY",
          talla: "L",
          gsm: "280 GSM Mineral Wash",
          cantidad: 1,
          precio: 139900,
          imagen: "/products/oversize-metal.jpg",
        },
        {
          nombre: "CAMISETA ESQUELETO // SAVAGE IRON",
          talla: "L",
          gsm: "260 GSM Heavy Ribbed",
          cantidad: 1,
          precio: 119900,
          imagen: "/products/tank-esquelto.jpg",
        },
      ],
      appPerkUnlocked: "Rutina Especializada: Espalda & Dorsales Savage",
    },
    {
      id: "VF-712093",
      fecha: "18 de Septiembre, 2026",
      hora: "03:15 PM",
      estado: "ENTREGADO",
      estadoPaso: 5,
      transportadora: "Servientrega Express",
      guia: "SE-310492811",
      metodoPago: "Nequi Directo (Transferencia Aprobada)",
      referenciaPago: "NQ-REF-482019",
      subtotal: 129000,
      envio: 0,
      total: 129000,
      articulos: [
        {
          nombre: "CREATINA MONOHIDRATADA PURA 200 MESH",
          talla: "300g (60 Serv)",
          gsm: "200 Mesh Micronizada Sin Sabor",
          cantidad: 1,
          precio: 129000,
          imagen: "/products/creatina-savage.jpg",
        },
      ],
      appPerkUnlocked: "Calculadora de Carga y Saturación de Creatina",
    },
  ];

  // Direcciones guardadas
  const [direcciones, setDirecciones] = useState([
    {
      id: 1,
      titulo: "Casa / Residencia",
      destinatario: "Alejandro Gómez Restrepo",
      telefono: "+57 312 849 2011",
      direccion: "Carrera 43A # 18 Sur - 122, Apto 804",
      ciudad: "Medellín, Antioquia",
      esPrincipal: true,
    },
    {
      id: 2,
      titulo: "Gimnasio / Box de Entrenamiento",
      destinatario: "Alejandro Gómez (Savage Gym)",
      telefono: "+57 312 849 2011",
      direccion: "Calle 10 # 36-24",
      ciudad: "Medellín, Antioquia",
      esPrincipal: false,
    },
  ]);

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText("SAVAGE-ALEJO-VIP");
    setCopiedPromo(true);
    setTimeout(() => setCopiedPromo(false), 2000);
  };

  return (
    <main className="min-h-screen bg-neutral-100 text-black">
      {/* Top Bar Header */}
      <header className="w-full bg-white border-b border-neutral-200 h-20 flex items-center justify-between px-4 sm:px-8 lg:px-12 sticky top-0 z-30">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-neutral-600 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a la Tienda</span>
        </Link>

        <Link href="/" className="font-extrabold text-2xl tracking-[0.35em] uppercase text-black">
          V I T A L F I T
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="text-[10px] font-bold tracking-widest uppercase bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-3 py-1.5 border border-neutral-300 transition-colors"
          >
            Modo Admin ⚙
          </Link>

          <a
            href="https://punto-de-inflexion.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold tracking-wider uppercase bg-black hover:bg-neutral-800 text-white px-4 py-2 transition-colors flex items-center gap-1.5"
          >
            <Smartphone className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Abrir App Móvil ↗</span>
          </a>
        </div>
      </header>

      {/* SI EL USUARIO NO ESTÁ AUTENTICADO: VISTA DE LOGIN / REGISTRO */}
      {!isAuthenticated ? (
        <div className="max-w-md mx-auto px-4 py-16">
          <div className="bg-white border border-neutral-300 p-8 shadow-sm">
            <div className="text-center mb-6">
              <span className="text-[10px] font-extrabold tracking-[0.3em] uppercase text-neutral-500 block">
                COMUNIDAD DE ALTO RENDIMIENTO
              </span>
              <h1 className="text-2xl font-black uppercase tracking-tight text-black mt-1">
                {authMode === "login" ? "ACCESO DE ATLETA" : "CREA TU CUENTA ATLETA"}
              </h1>
              <p className="text-xs text-neutral-500 mt-2">
                {authMode === "login"
                  ? "Ingresa para consultar tus pedidos y sincronizar tu ropa con la app de entrenamiento."
                  : "Desbloquea 30 días VIP gratis en la App VitalFit con tu primera compra."}
              </p>
            </div>

            {/* Toggle Login / Registro */}
            <div className="grid grid-cols-2 border border-neutral-200 mb-6 text-xs font-bold uppercase tracking-wider">
              <button
                onClick={() => setAuthMode("login")}
                className={`py-2.5 transition-colors cursor-pointer ${
                  authMode === "login" ? "bg-black text-white" : "bg-neutral-50 text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => setAuthMode("register")}
                className={`py-2.5 transition-colors cursor-pointer ${
                  authMode === "register" ? "bg-black text-white" : "bg-neutral-50 text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                Registrarse
              </button>
            </div>

            {authMode === "login" ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsAuthenticated(true);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full border border-neutral-300 p-2.5 text-xs text-black focus:outline-none focus:border-black font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    className="w-full border border-neutral-300 p-2.5 text-xs text-black focus:outline-none focus:border-black font-mono"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-black hover:bg-neutral-800 text-white py-3 text-xs font-extrabold uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Entrar a Mi Panel
                </button>
              </form>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsAuthenticated(true);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Ej: David Santiago Ruiz"
                    className="w-full border border-neutral-300 p-2.5 text-xs text-black focus:outline-none focus:border-black"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="tu.correo@ejemplo.com"
                    className="w-full border border-neutral-300 p-2.5 text-xs text-black focus:outline-none focus:border-black font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                    Ciudad en Colombia
                  </label>
                  <select
                    value={regCity}
                    onChange={(e) => setRegCity(e.target.value)}
                    className="w-full border border-neutral-300 p-2.5 text-xs text-black focus:outline-none focus:border-black"
                  >
                    <option value="Medellín">Medellín (Antioquia)</option>
                    <option value="Bogotá D.C.">Bogotá D.C. (Cundinamarca)</option>
                    <option value="Cali">Cali (Valle)</option>
                    <option value="Barranquilla">Barranquilla (Atlántico)</option>
                    <option value="Bucaramanga">Bucaramanga (Santander)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black hover:bg-neutral-800 text-white py-3 text-xs font-extrabold uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Crear Cuenta & Activar Beneficios
                </button>
              </form>
            )}

            {/* Quick Demo Access */}
            <div className="mt-6 pt-6 border-t border-neutral-200 text-center">
              <span className="text-[11px] text-neutral-500 block mb-2">
                ¿Quieres probar el perfil sin registrarte?
              </span>
              <button
                onClick={() => setIsAuthenticated(true)}
                className="text-xs font-bold uppercase text-black hover:underline cursor-pointer flex items-center justify-center gap-1.5 mx-auto"
              >
                <span>Acceder con Cuenta de Ejemplo (Alejandro Gómez)</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* SI EL USUARIO ESTÁ AUTENTICADO: PERFIL COMPLETO */
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-10">
          {/* Athlete Profile Header Box */}
          <div className="bg-white p-6 sm:p-8 border border-neutral-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-black text-white font-black text-xl flex items-center justify-center border-2 border-neutral-300">
                AG
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wide text-black">
                    ALEJANDRO GÓMEZ RESTREPO
                  </h1>
                  <span className="px-2.5 py-0.5 bg-neutral-900 text-white text-[10px] font-extrabold tracking-widest uppercase">
                    ATLETA ÉLITE
                  </span>
                </div>
                <p className="text-xs text-neutral-500 mt-1 font-mono">
                  atleta@vitalfit.com • +57 312 849 2011 • Medellín, Colombia
                </p>
                <div className="flex items-center gap-4 text-xs font-medium text-neutral-600 mt-2">
                  <span className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <strong>2 Pedidos Realizados</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Total Invertido: <strong>{formatPrice(388800)}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Quick App Status Callout */}
            <div className="flex flex-col md:items-end w-full md:w-auto p-4 bg-neutral-50 border border-neutral-200">
              <span className="text-[10px] font-extrabold tracking-widest text-neutral-500 uppercase flex items-center gap-1">
                <Smartphone className="w-3.5 h-3.5 text-black" />
                MEMBRESÍA APP MÓVIL
              </span>
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-700 mt-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>30 Días VIP Activos</span>
              </div>
              <a
                href="https://punto-de-inflexion.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-[11px] font-bold uppercase tracking-wider text-black underline flex items-center gap-1 hover:text-neutral-600"
              >
                <span>Abrir App Nutrición & Entreno</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 sm:gap-6 border-b border-neutral-300 mb-8 overflow-x-auto pb-px">
            <button
              onClick={() => setActiveTab("pedidos")}
              className={`pb-3 text-xs font-black tracking-[0.2em] uppercase transition-all flex items-center gap-2 cursor-pointer border-b-2 whitespace-nowrap ${
                activeTab === "pedidos"
                  ? "border-black text-black"
                  : "border-transparent text-neutral-400 hover:text-black"
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Mis Pedidos ({pedidos.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("app")}
              className={`pb-3 text-xs font-black tracking-[0.2em] uppercase transition-all flex items-center gap-2 cursor-pointer border-b-2 whitespace-nowrap ${
                activeTab === "app"
                  ? "border-black text-black"
                  : "border-transparent text-neutral-400 hover:text-black"
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Mi App VitalFit (VIP)</span>
            </button>

            <button
              onClick={() => setActiveTab("direcciones")}
              className={`pb-3 text-xs font-black tracking-[0.2em] uppercase transition-all flex items-center gap-2 cursor-pointer border-b-2 whitespace-nowrap ${
                activeTab === "direcciones"
                  ? "border-black text-black"
                  : "border-transparent text-neutral-400 hover:text-black"
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Direcciones Guardadas</span>
            </button>

            <button
              onClick={() => setActiveTab("pagos")}
              className={`pb-3 text-xs font-black tracking-[0.2em] uppercase transition-all flex items-center gap-2 cursor-pointer border-b-2 whitespace-nowrap ${
                activeTab === "pagos"
                  ? "border-black text-black"
                  : "border-transparent text-neutral-400 hover:text-black"
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Métodos de Pago</span>
            </button>

            <button
              onClick={() => setIsAuthenticated(false)}
              className="pb-3 text-xs font-bold tracking-[0.2em] uppercase text-red-500 hover:text-red-700 transition-colors ml-auto flex items-center gap-1 cursor-pointer whitespace-nowrap"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Cerrar Sesión</span>
            </button>
          </div>

          {/* TAB 1: MIS PEDIDOS CON DETALLE DE PAGO Y RASTREO */}
          {activeTab === "pedidos" && (
            <div className="space-y-8">
              {pedidos.map((pedido) => (
                <div
                  key={pedido.id}
                  className="bg-white border border-neutral-300 shadow-sm p-6 sm:p-8 space-y-6"
                >
                  {/* Top Header of Order */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-black text-sm tracking-wider text-black">
                          ORDEN #{pedido.id}
                        </span>
                        <span
                          className={`px-2.5 py-1 text-[10px] font-extrabold tracking-widest uppercase border ${
                            pedido.estado.includes("ENTREGADO")
                              ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                              : "bg-blue-50 text-blue-800 border-blue-300"
                          }`}
                        >
                          {pedido.estado}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 mt-1">
                        Comprado el {pedido.fecha} a las {pedido.hora}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 sm:text-right">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">
                          Total Pagado
                        </span>
                        <strong className="text-lg font-black text-black font-mono">
                          {formatPrice(pedido.total)}
                        </strong>
                      </div>

                      <button
                        onClick={() =>
                          alert(
                            `Factura Electrónica DIAN para ${pedido.id}:\nCliente: Alejandro Gómez\nTotal: ${formatPrice(pedido.total)}\nMedio: ${pedido.metodoPago}\nRef: ${pedido.referenciaPago}\n\n¡Descarga de comprobante lista!`
                          )
                        }
                        className="p-2 border border-neutral-300 hover:border-black text-neutral-700 hover:text-black transition-colors cursor-pointer"
                        title="Descargar Comprobante / Factura"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Visual Shipping Progress Timeline */}
                  <div className="p-4 bg-neutral-50 border border-neutral-200">
                    <div className="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-widest text-neutral-500 mb-3">
                      <span>Rastreo del Envío</span>
                      <span className="font-mono text-black">
                        {pedido.transportadora} // Guía: <strong>{pedido.guia}</strong>
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div className="space-y-1">
                        <div className="h-1.5 w-full bg-black rounded-full" />
                        <span className="text-[10px] font-bold text-black block">1. Confirmado</span>
                      </div>
                      <div className="space-y-1">
                        <div className="h-1.5 w-full bg-black rounded-full" />
                        <span className="text-[10px] font-bold text-black block">2. Empacado 280 GSM</span>
                      </div>
                      <div className="space-y-1">
                        <div
                          className={`h-1.5 w-full rounded-full ${
                            pedido.estadoPaso >= 3 ? "bg-black" : "bg-neutral-300"
                          }`}
                        />
                        <span
                          className={`text-[10px] font-bold block ${
                            pedido.estadoPaso >= 3 ? "text-black" : "text-neutral-400"
                          }`}
                        >
                          3. Despachado
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div
                          className={`h-1.5 w-full rounded-full ${
                            pedido.estadoPaso >= 5 ? "bg-black" : "bg-neutral-300"
                          }`}
                        />
                        <span
                          className={`text-[10px] font-bold block ${
                            pedido.estadoPaso >= 5 ? "text-emerald-700 font-black" : "text-neutral-400"
                          }`}
                        >
                          4. Entregado
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* List of Ordered Items */}
                  <div className="divide-y divide-neutral-100">
                    {pedido.articulos.map((art, idx) => (
                      <div key={idx} className="py-4 flex gap-4 items-center">
                        <div className="relative w-16 h-20 bg-neutral-100 flex-shrink-0 border border-neutral-300">
                          <Image
                            src={art.imagen}
                            alt={art.nombre}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-xs uppercase tracking-wide text-black truncate">
                            {art.nombre}
                          </h4>
                          <p className="text-xs text-neutral-500 mt-0.5">
                            Variante: <strong className="text-black">{art.talla}</strong> ({art.gsm}) • Cantidad: {art.cantidad}
                          </p>
                          <p className="text-xs font-bold text-black mt-1 font-mono">
                            {formatPrice(art.precio)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Detailed Payment Breakdown Box (What user explicitly asked for) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-neutral-200 text-xs">
                    <div className="p-4 bg-neutral-50 border border-neutral-200 space-y-1.5">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-500 block">
                        Detalles del Pago
                      </span>
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-neutral-700" />
                        <span className="font-bold text-black">{pedido.metodoPago}</span>
                      </div>
                      <p className="text-[11px] font-mono text-neutral-500">
                        Código de Referencia: {pedido.referenciaPago}
                      </p>
                      <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-emerald-600" /> Transacción aprobada por pasarela
                      </p>
                    </div>

                    <div className="p-4 bg-neutral-50 border border-neutral-200 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-500 block">
                          Beneficio App Desbloqueado
                        </span>
                        <strong className="text-xs text-black block mt-1">
                          {pedido.appPerkUnlocked}
                        </strong>
                        <p className="text-[11px] text-neutral-500 mt-0.5">
                          Escanea la etiqueta interna de la prenda para acceder al contenido.
                        </p>
                      </div>

                      <a
                        href="https://punto-de-inflexion.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-black hover:underline"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Abrir en App VitalFit ↗</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: MI APP VITALFIT (VIP LINKAGE) */}
          {activeTab === "app" && (
            <div className="space-y-6">
              <div className="bg-black text-white p-8 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-4 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-amber-400 text-black text-[10px] font-black uppercase tracking-widest">
                      MEMBRESÍA VIP ACTIVA
                    </span>
                    <span className="text-xs text-neutral-400 font-mono">
                      VÁLIDA HASTA EL 06 NOV 2026
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                    VITALFIT — NUTRICIÓN & ENTRENAMIENTO
                  </h2>

                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Al comprar ropa técnica VitalFit Gear y suplementos puros 200 Mesh, tienes acceso completo e ilimitado a la plataforma de entrenamiento móvil.
                    Lleva el registro de tus series efectivas, calcula tu consumo de creatina y sigue rutinas de hipertrofia diseñadas para culturismo natural.
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <a
                      href="https://punto-de-inflexion.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors flex items-center gap-2"
                    >
                      <Smartphone className="w-4 h-4" />
                      <span>Abrir App Móvil en Vivo ↗</span>
                    </a>

                    <button
                      onClick={handleCopyCode}
                      className="px-4 py-3 border border-neutral-700 hover:border-white text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-white transition-colors cursor-pointer flex items-center gap-2"
                    >
                      {copiedPromo ? <Check className="w-4 h-4 text-emerald-400" /> : <QrCode className="w-4 h-4" />}
                      <span>{copiedPromo ? "CÓDIGO COPIADO" : "CÓDIGO: SAVAGE-ALEJO-VIP"}</span>
                    </button>
                  </div>
                </div>

                {/* QR Code Demo Visual */}
                <div className="bg-white p-6 text-black text-center flex-shrink-0 flex flex-col items-center">
                  <div className="w-36 h-36 border-4 border-black p-2 flex flex-col items-center justify-center bg-neutral-100">
                    <QrCode className="w-28 h-28 text-black" />
                  </div>
                  <span className="text-[10px] font-black tracking-widest uppercase mt-3">
                    ESCANEA CON TU TELÉFONO
                  </span>
                  <span className="text-[9px] text-neutral-500 font-mono">
                    punto-de-inflexion.vercel.app
                  </span>
                </div>
              </div>

              {/* Perks List */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 border border-neutral-300">
                  <span className="text-xl font-black text-black font-mono block mb-2">01</span>
                  <h4 className="font-extrabold text-xs uppercase tracking-wider text-black">
                    SOBRECARGA PROGRESIVA
                  </h4>
                  <p className="text-xs text-neutral-500 mt-2">
                    Registra peso, RPE y repeticiones de cada serie en tus ejercicios compuestos para garantizar ganancia muscular semana a semana.
                  </p>
                </div>

                <div className="bg-white p-6 border border-neutral-300">
                  <span className="text-xl font-black text-black font-mono block mb-2">02</span>
                  <h4 className="font-extrabold text-xs uppercase tracking-wider text-black">
                    CALCULADORA DE MACROS & CREATINA
                  </h4>
                  <p className="text-xs text-neutral-500 mt-2">
                    Algoritmo personalizado que calcula tu dosis exacta de creatina (0.1g x kg de peso corporal) y requerimiento de proteína.
                  </p>
                </div>

                <div className="bg-white p-6 border border-neutral-300">
                  <span className="text-xl font-black text-black font-mono block mb-2">03</span>
                  <h4 className="font-extrabold text-xs uppercase tracking-wider text-black">
                    SINCRONIZACIÓN DE DROPS
                  </h4>
                  <p className="text-xs text-neutral-500 mt-2">
                    Acceso preferente 1 hora antes a cada nuevo drop de camisetas de 280 GSM antes de que se agoten en la tienda pública.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DIRECCIONES GUARDADAS */}
          {activeTab === "direcciones" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold uppercase tracking-wide text-black">
                    Tus Direcciones de Entrega
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Utilizadas para calcular envíos express con Coordinadora y Servientrega en Colombia.
                  </p>
                </div>

                <button
                  onClick={() => alert("Formulario para agregar nueva dirección en Colombia")}
                  className="px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Agregar Dirección</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {direcciones.map((dir) => (
                  <div
                    key={dir.id}
                    className={`bg-white border p-6 space-y-3 relative ${
                      dir.esPrincipal ? "border-black shadow-sm" : "border-neutral-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs uppercase tracking-wide text-black">
                        {dir.titulo}
                      </span>
                      {dir.esPrincipal && (
                        <span className="px-2 py-0.5 bg-black text-white text-[9px] font-bold uppercase tracking-widest">
                          PREDETERMINADA
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-neutral-600 space-y-1">
                      <p className="font-semibold text-black">{dir.destinatario}</p>
                      <p>{dir.direccion}</p>
                      <p>{dir.ciudad}</p>
                      <p className="font-mono text-neutral-500">{dir.telefono}</p>
                    </div>

                    <div className="pt-2 flex items-center gap-3 text-xs font-bold uppercase text-black">
                      <button
                        onClick={() => alert("Editar dirección")}
                        className="hover:underline cursor-pointer"
                      >
                        Editar
                      </button>
                      <span>•</span>
                      <button
                        onClick={() => alert("Dirección seleccionada como principal")}
                        className="text-neutral-500 hover:text-black cursor-pointer"
                      >
                        Hacer Principal
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: MÉTODOS DE PAGO */}
          {activeTab === "pagos" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-extrabold uppercase tracking-wide text-black">
                  Tus Métodos de Pago Registrados
                </h3>
                <p className="text-xs text-neutral-500">
                  Transacciones encriptadas de alta seguridad vía Wompi Bancolombia y Nequi.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-neutral-300 p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-black">Nequi Vinculado</span>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase">
                      VERIFICADO
                    </span>
                  </div>
                  <div className="font-mono text-sm font-bold text-neutral-800">
                    Número: 312 *** 2011
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    Permite compras rápidas con 1 toque aprobando desde tu notificación de Nequi.
                  </p>
                </div>

                <div className="bg-white border border-neutral-300 p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-black">PSE / Débito Bancolombia</span>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase">
                      VERIFICADO
                    </span>
                  </div>
                  <div className="font-mono text-sm font-bold text-neutral-800">
                    Cuenta de Ahorros **** 9102
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    Débito directo sin cobros adicionales ni comisiones.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
