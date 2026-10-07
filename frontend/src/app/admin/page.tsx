"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  ShoppingBag,
  TrendingUp,
  Users,
  AlertTriangle,
  ArrowLeft,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Truck,
  Plus,
  RefreshCw,
  ExternalLink,
  ChevronDown,
  DollarSign,
  Smartphone,
  ShieldCheck,
  Edit,
  Trash2,
  Share2,
  Send,
  Sliders,
  Check,
  Copy
} from "lucide-react";

interface AdminOrder {
  id: string;
  cliente: {
    nombre: string;
    email: string;
    telefono: string;
    ciudad: string;
    departamento: string;
    direccion: string;
  };
  fecha: string;
  estado: "Pendiente" | "En Preparación" | "Despachado" | "Entregado";
  metodoPago: "Nequi" | "PSE Bancolombia" | "Tarjeta de Crédito" | "Contraentrega";
  referenciaPago: string;
  transportadora: string;
  guia: string;
  total: number;
  articulos: {
    nombre: string;
    talla: string;
    cantidad: number;
    precio: number;
    imagen: string;
  }[];
  appLinked: boolean;
}

interface ProductInventory {
  id: string;
  nombre: string;
  categoria: "Oversize" | "Tanks" | "Suplementos" | "Accesorios";
  precio: number;
  costo: number;
  stock: Record<string, number>;
  activo: boolean;
  imagen: string;
  gsm?: string;
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"pedidos" | "inventario" | "atletas" | "finanzas">("pedidos");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Mock de Órdenes Reales en Colombia
  const [orders, setOrders] = useState<AdminOrder[]>([
    {
      id: "VF-982144",
      cliente: {
        nombre: "Alejandro Gómez Restrepo",
        email: "alejandro.gomez@gmail.com",
        telefono: "+57 312 849 2011",
        ciudad: "Medellín",
        departamento: "Antioquia",
        direccion: "Cra 43A # 18 Sur - 122, El Poblado",
      },
      fecha: "06 Oct 2026, 09:42 PM",
      estado: "Despachado",
      metodoPago: "PSE Bancolombia",
      referenciaPago: "PSE-BANCO-91823719",
      transportadora: "Coordinadora Mercantil",
      guia: "CO-882194129",
      total: 259800,
      articulos: [
        {
          nombre: "CAMISETA OVERSIZE // METAL ANATOMY",
          talla: "L",
          cantidad: 1,
          precio: 139900,
          imagen: "/products/oversize-metal.jpg",
        },
        {
          nombre: "CAMISETA ESQUELETO // SAVAGE IRON",
          talla: "L",
          cantidad: 1,
          precio: 119900,
          imagen: "/products/tank-esquelto.jpg",
        },
      ],
      appLinked: true,
    },
    {
      id: "VF-982145",
      cliente: {
        nombre: "Mateo Velásquez Henao",
        email: "mateo.velasquez@outlook.com",
        telefono: "+57 301 552 1980",
        ciudad: "Bogotá D.C.",
        departamento: "Cundinamarca",
        direccion: "Calle 127 # 15-40 Apt 502",
      },
      fecha: "06 Oct 2026, 10:15 PM",
      estado: "En Preparación",
      metodoPago: "Nequi",
      referenciaPago: "NQ-TRANSF-448201",
      transportadora: "Servientrega",
      guia: "SE-Pending-1902",
      total: 129000,
      articulos: [
        {
          nombre: "CREATINA MONOHIDRATADA PURA 200 MESH",
          talla: "300g",
          cantidad: 1,
          precio: 129000,
          imagen: "/products/creatina-savage.jpg",
        },
      ],
      appLinked: true,
    },
    {
      id: "VF-982146",
      cliente: {
        nombre: "Carlos Eduardo Ospina",
        email: "carlos.ospina@gmail.com",
        telefono: "+57 318 420 8912",
        ciudad: "Cali",
        departamento: "Valle del Cauca",
        direccion: "Av. Roosevelt # 34-18",
      },
      fecha: "06 Oct 2026, 10:48 PM",
      estado: "Pendiente",
      metodoPago: "Contraentrega",
      referenciaPago: "PAGO-CONTRAENTREGA-EFECTIVO",
      transportadora: "Interrapidísimo",
      guia: "POR_ASIGNAR",
      total: 129900,
      articulos: [
        {
          nombre: "CAMISETA MUSCULAR BLANCA // HEAVYWEIGHT",
          talla: "XL",
          cantidad: 1,
          precio: 129900,
          imagen: "/products/white-muscle-tee.jpg",
        },
      ],
      appLinked: false,
    },
    {
      id: "VF-982140",
      cliente: {
        nombre: "Sebastián Quintero",
        email: "squintero.lift@hotmail.com",
        telefono: "+57 320 611 7733",
        ciudad: "Bucaramanga",
        departamento: "Santander",
        direccion: "Carrera 27 # 45-10, Cabecera",
      },
      fecha: "05 Oct 2026, 04:12 PM",
      estado: "Entregado",
      metodoPago: "Tarjeta de Crédito",
      referenciaPago: "TC-VISA-AUTH-8829",
      transportadora: "Coordinadora Mercantil",
      guia: "CO-710492811",
      total: 388800,
      articulos: [
        {
          nombre: "CAMISETA OVERSIZE // METAL ANATOMY",
          talla: "M",
          cantidad: 2,
          precio: 139900,
          imagen: "/products/oversize-metal.jpg",
        },
        {
          nombre: "CREATINA MONOHIDRATADA PURA 200 MESH",
          talla: "300g",
          cantidad: 1,
          precio: 129000,
          imagen: "/products/creatina-savage.jpg",
        },
      ],
      appLinked: true,
    },
  ]);

  // Mock de Inventario de Productos
  const [products, setProducts] = useState<ProductInventory[]>([
    {
      id: "prod-1",
      nombre: "CAMISETA ESQUELETO // SAVAGE IRON",
      categoria: "Tanks",
      precio: 119900,
      costo: 48000,
      stock: { S: 8, M: 14, L: 2, XL: 6, XXL: 4 },
      activo: true,
      imagen: "/products/tank-esquelto.jpg",
      gsm: "260 GSM",
    },
    {
      id: "prod-2",
      nombre: "CAMISETA OVERSIZE // METAL ANATOMY",
      categoria: "Oversize",
      precio: 139900,
      costo: 55000,
      stock: { S: 5, M: 11, L: 1, XL: 8, XXL: 3 },
      activo: true,
      imagen: "/products/oversize-metal.jpg",
      gsm: "280 GSM Mineral Wash",
    },
    {
      id: "prod-3",
      nombre: "CREATINA MONOHIDRATADA PURA 200 MESH",
      categoria: "Suplementos",
      precio: 129000,
      costo: 52000,
      stock: { "300g": 18, "500g": 9 },
      activo: true,
      imagen: "/products/creatina-savage.jpg",
    },
    {
      id: "prod-4",
      nombre: "CAMISETA MUSCULAR BLANCA // HEAVYWEIGHT",
      categoria: "Oversize",
      precio: 129900,
      costo: 51000,
      stock: { S: 12, M: 19, L: 7, XL: 10, XXL: 5 },
      activo: true,
      imagen: "/products/white-muscle-tee.jpg",
      gsm: "270 GSM Clean Cut",
    },
    {
      id: "prod-5",
      nombre: "HOODIE HEAVYWEIGHT // ACID IRON 400 GSM",
      categoria: "Oversize",
      precio: 219900,
      costo: 82000,
      stock: { S: 2, M: 3, L: 1, XL: 2, XXL: 1 },
      activo: true,
      imagen: "/products/hoodie-acid.jpg",
      gsm: "400 GSM Felpa Pesada",
    },
    {
      id: "prod-6",
      nombre: "PRE-ENTRENO // BLOOD RUSH 400MG",
      categoria: "Suplementos",
      precio: 149900,
      costo: 58000,
      stock: { "Punch": 4, "Blue Razz": 2 },
      activo: true,
      imagen: "/products/preentreno-bloodrush.jpg",
    },
    {
      id: "prod-7",
      nombre: "SHORT DE ENTRENAMIENTO // RAW CUT 5-INCH",
      categoria: "Tanks",
      precio: 99900,
      costo: 38000,
      stock: { S: 3, M: 5, L: 2, XL: 3 },
      activo: true,
      imagen: "/products/short-lifter.jpg",
      gsm: "320 GSM French Terry",
    },
    {
      id: "prod-8",
      nombre: "PROTEÍNA AISLADA // CFM WHEY ISOLATE",
      categoria: "Suplementos",
      precio: 189900,
      costo: 78000,
      stock: { "Chocolate": 3, "Vainilla": 2 },
      activo: true,
      imagen: "/products/whey-isolate.jpg",
    },
    {
      id: "prod-9",
      nombre: "PANTALÓN JOGGER // HEAVY FLEECE CARGO",
      categoria: "Oversize",
      precio: 169900,
      costo: 68000,
      stock: { S: 3, M: 4, L: 2, XL: 1 },
      activo: true,
      imagen: "/products/short-lifter.jpg",
      gsm: "380 GSM Heavy Fleece",
    },
    {
      id: "prod-10",
      nombre: "CINTURÓN DE FUERZA // LEVER BELT 10MM",
      categoria: "Accesorios",
      precio: 249900,
      costo: 110000,
      stock: { S: 2, M: 3, L: 2, XL: 1 },
      activo: true,
      imagen: "/products/oversize-metal.jpg",
      gsm: "10mm Cuero Genuino",
    },
    {
      id: "prod-11",
      nombre: "STRAPS DE LEVANTAMIENTO // HEAVY LEATHER",
      categoria: "Accesorios",
      precio: 64900,
      costo: 24000,
      stock: { "Par Único": 8 },
      activo: true,
      imagen: "/products/tank-esquelto.jpg",
      gsm: "Cuero Vacuno 3.5mm",
    },
    {
      id: "prod-12",
      nombre: "ELECTROLITOS // HYDRA-SHIELD MATRIX",
      categoria: "Suplementos",
      precio: 89900,
      costo: 32000,
      stock: { "Lima Limón": 6, "Mora Azul": 4 },
      activo: true,
      imagen: "/products/preentreno-bloodrush.jpg",
    },
    {
      id: "prod-13",
      nombre: "TOP DEPORTIVO // HIGH SUPPORT CROSS-BACK",
      categoria: "Tanks",
      precio: 89900,
      costo: 34000,
      stock: { XS: 3, S: 4, M: 3, L: 2 },
      activo: true,
      imagen: "/products/white-muscle-tee.jpg",
      gsm: "290 GSM Soft-Touch",
    },
    {
      id: "prod-14",
      nombre: "BIKER SHORTS // SCULPT SEAMLESS",
      categoria: "Tanks",
      precio: 99900,
      costo: 39000,
      stock: { XS: 2, S: 5, M: 4, L: 2 },
      activo: true,
      imagen: "/products/short-lifter.jpg",
      gsm: "310 GSM Seamless",
    },
  ]);

  // Modal para crear producto
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [newProdName, setNewProdName] = useState("");
  const [newProdCat, setNewProdCat] = useState<"Oversize" | "Tanks" | "Suplementos" | "Accesorios">("Oversize");
  const [newProdPrice, setNewProdPrice] = useState("129900");
  const [newProdGsm, setNewProdGsm] = useState("280 GSM Acid Wash");

  // Edición rápida de estado de pedido
  const handleStatusChange = (orderId: string, newStatus: AdminOrder["estado"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, estado: newStatus } : o))
    );
  };

  // Edición rápida de guía
  const handleGuideChange = (orderId: string, newGuide: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, guia: newGuide } : o))
    );
  };

  // Modificación de stock en vivo
  const handleStockAdjust = (prodId: string, size: string, delta: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== prodId) return p;
        const current = p.stock[size] || 0;
        const updated = Math.max(0, current + delta);
        return {
          ...p,
          stock: { ...p.stock, [size]: updated },
        };
      })
    );
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatCOP = (val: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Métricas
  const totalVentas = orders.reduce((acc, curr) => acc + curr.total, 0);
  const pedidosPendientes = orders.filter((o) => o.estado === "Pendiente" || o.estado === "En Preparación").length;
  const atletasConApp = orders.filter((o) => o.appLinked).length;

  const filteredOrders = orders.filter((o) => {
    const matchesStatus =
      selectedStatusFilter === "todos" ||
      o.estado.toLowerCase() === selectedStatusFilter.toLowerCase();
    const matchesSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.cliente.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.cliente.ciudad.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.guia.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-neutral-900 text-white font-sans">
      {/* Top Admin Header */}
      <header className="border-b border-neutral-800 bg-black/90 backdrop-blur sticky top-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Ver Tienda</span>
          </Link>
          <div className="h-4 w-px bg-neutral-800" />
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-bold">
              ADMIN CONTROL // VITALFIT GEAR
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://punto-de-inflexion.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs font-bold uppercase tracking-wider rounded text-neutral-200 flex items-center gap-1.5 transition-colors"
          >
            <Smartphone className="w-3.5 h-3.5 text-amber-400" />
            <span>App Móvil VitalFit ↗</span>
          </a>
          <div className="w-8 h-8 rounded-full bg-white text-black font-extrabold text-xs flex items-center justify-center">
            VF
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Title Bar & Quick Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
              PANEL DE CONTROL GENERAL
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Monitoreo en tiempo real de pedidos, stock por talla y atletas vinculados a la app.
            </p>
          </div>

          <button
            onClick={() => setIsNewProductModalOpen(true)}
            className="px-4 py-2.5 bg-white text-black text-xs font-extrabold uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center gap-2 self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Crear Nuevo Drop</span>
          </button>
        </div>

        {/* 4 KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* KPI 1 */}
          <div className="bg-neutral-950 border border-neutral-800 p-5 rounded-none">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-[11px] font-bold uppercase tracking-widest">Ventas Totales</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold tracking-tight font-mono text-white">
                {formatCOP(totalVentas)}
              </span>
            </div>
            <p className="text-[10px] text-emerald-400 mt-1 font-mono">
              +24.6% vs semana anterior (COP)
            </p>
          </div>

          {/* KPI 2 */}
          <div className="bg-neutral-950 border border-neutral-800 p-5 rounded-none">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-[11px] font-bold uppercase tracking-widest">Por Despachar</span>
              <Package className="w-4 h-4 text-amber-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold tracking-tight font-mono text-amber-400">
                {pedidosPendientes}
              </span>
              <span className="text-xs text-neutral-500">pedidos</span>
            </div>
            <p className="text-[10px] text-neutral-400 mt-1">
              Coordinadora & Servientrega listos
            </p>
          </div>

          {/* KPI 3 */}
          <div className="bg-neutral-950 border border-neutral-800 p-5 rounded-none">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-[11px] font-bold uppercase tracking-widest">Atletas con App</span>
              <Smartphone className="w-4 h-4 text-blue-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold tracking-tight font-mono text-white">
                {atletasConApp} / {orders.length}
              </span>
              <span className="text-xs text-neutral-500">
                ({Math.round((atletasConApp / orders.length) * 100)}%)
              </span>
            </div>
            <p className="text-[10px] text-blue-400 mt-1">
              QR de prendas canjeados con éxito
            </p>
          </div>

          {/* KPI 4 */}
          <div className="bg-neutral-950 border border-neutral-800 p-5 rounded-none">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-[11px] font-bold uppercase tracking-widest">Stock Crítico</span>
              <AlertTriangle className="w-4 h-4 text-red-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold tracking-tight font-mono text-red-400">
                2
              </span>
              <span className="text-xs text-neutral-500">variantes</span>
            </div>
            <p className="text-[10px] text-red-400 mt-1">
              Talla L (Metal Anatomy) & Creatina 500g
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-neutral-800 pb-px overflow-x-auto">
          <button
            onClick={() => setActiveTab("pedidos")}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border-b-2 flex items-center gap-2 ${
              activeTab === "pedidos"
                ? "border-white text-white bg-neutral-950/60"
                : "border-transparent text-neutral-400 hover:text-white"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Gestión de Pedidos ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("inventario")}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border-b-2 flex items-center gap-2 ${
              activeTab === "inventario"
                ? "border-white text-white bg-neutral-950/60"
                : "border-transparent text-neutral-400 hover:text-white"
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Inventario & Stock Tallas</span>
          </button>

          <button
            onClick={() => setActiveTab("atletas")}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border-b-2 flex items-center gap-2 ${
              activeTab === "atletas"
                ? "border-white text-white bg-neutral-950/60"
                : "border-transparent text-neutral-400 hover:text-white"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Atletas & Sincronización App</span>
          </button>

          <button
            onClick={() => setActiveTab("finanzas")}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border-b-2 flex items-center gap-2 ${
              activeTab === "finanzas"
                ? "border-white text-white bg-neutral-950/60"
                : "border-transparent text-neutral-400 hover:text-white"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Pasarelas & Balances</span>
          </button>
        </div>

        {/* TAB 1: GESTIÓN DE PEDIDOS */}
        {activeTab === "pedidos" && (
          <div className="space-y-4">
            {/* Filter & Search Bar */}
            <div className="bg-neutral-950 border border-neutral-800 p-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Buscar por # Pedido, cliente, ciudad o guía..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 text-xs text-white pl-9 pr-4 py-2 focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
                <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" /> Estado:
                </span>
                {["todos", "pendiente", "en preparación", "despachado", "entregado"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedStatusFilter(st)}
                    className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest border transition-colors cursor-pointer ${
                      selectedStatusFilter === st
                        ? "bg-white text-black border-white"
                        : "bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-700 hover:text-white"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-neutral-950 border border-neutral-800 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-black/60 border-b border-neutral-800 text-[10px] uppercase font-bold tracking-widest text-neutral-400">
                  <tr>
                    <th className="py-3 px-4">Pedido ID</th>
                    <th className="py-3 px-4">Cliente & Contacto</th>
                    <th className="py-3 px-4">Destino</th>
                    <th className="py-3 px-4">Método de Pago</th>
                    <th className="py-3 px-4">Prendas / Ítems</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Estado Pedido</th>
                    <th className="py-3 px-4">Transportadora & Guía</th>
                    <th className="py-3 px-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-neutral-900/50 transition-colors">
                      {/* ID */}
                      <td className="py-4 px-4 font-mono font-bold text-white whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span>{order.id}</span>
                          <button
                            onClick={() => copyToClipboard(order.id, order.id)}
                            className="text-neutral-500 hover:text-white cursor-pointer"
                            title="Copiar ID"
                          >
                            {copiedId === order.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                        <span className="text-[10px] font-normal text-neutral-500 block">
                          {order.fecha}
                        </span>
                      </td>

                      {/* Cliente */}
                      <td className="py-4 px-4">
                        <strong className="text-white block font-medium">
                          {order.cliente.nombre}
                        </strong>
                        <span className="text-[11px] text-neutral-400 block font-mono">
                          {order.cliente.email}
                        </span>
                        <a
                          href={`https://wa.me/${order.cliente.telefono.replace(/[^0-9]/g, "")}?text=Hola%20${encodeURIComponent(order.cliente.nombre)},%20te%20escribimos%20de%20VitalFit%20Gear%20respecto%20a%20tu%20pedido%20${order.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-emerald-400 hover:underline flex items-center gap-1 mt-0.5"
                        >
                          <Send className="w-2.5 h-2.5" /> {order.cliente.telefono}
                        </a>
                      </td>

                      {/* Destino */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="font-bold text-white">{order.cliente.ciudad}</span>
                        <span className="text-neutral-400 block text-[11px]">
                          {order.cliente.departamento}
                        </span>
                        <span className="text-[10px] text-neutral-500 truncate max-w-[150px] block">
                          {order.cliente.direccion}
                        </span>
                      </td>

                      {/* Método de pago */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-neutral-900 border border-neutral-700 text-neutral-200">
                          {order.metodoPago}
                        </span>
                        <span className="text-[10px] text-neutral-500 block mt-1 font-mono truncate max-w-[130px]">
                          Ref: {order.referenciaPago}
                        </span>
                      </td>

                      {/* Artículos */}
                      <td className="py-4 px-4">
                        <div className="flex -space-x-2 overflow-hidden">
                          {order.articulos.map((art, idx) => (
                            <div
                              key={idx}
                              className="relative w-8 h-10 border border-neutral-800 bg-black flex-shrink-0"
                              title={`${art.nombre} (${art.talla}) x${art.cantidad}`}
                            >
                              <Image
                                src={art.imagen}
                                alt={art.nombre}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                        <span className="text-[10px] text-neutral-400 block mt-1">
                          {order.articulos.length} {order.articulos.length === 1 ? "artículo" : "artículos"}
                        </span>
                      </td>

                      {/* Total */}
                      <td className="py-4 px-4 font-mono font-bold text-white whitespace-nowrap">
                        {formatCOP(order.total)}
                      </td>

                      {/* Estado Dropdown */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <select
                          value={order.estado}
                          onChange={(e) => handleStatusChange(order.id, e.target.value as AdminOrder["estado"])}
                          className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1.5 border rounded-none cursor-pointer focus:outline-none ${
                            order.estado === "Entregado"
                              ? "bg-emerald-950/60 text-emerald-400 border-emerald-800"
                              : order.estado === "Despachado"
                              ? "bg-blue-950/60 text-blue-400 border-blue-800"
                              : order.estado === "En Preparación"
                              ? "bg-amber-950/60 text-amber-400 border-amber-800"
                              : "bg-neutral-900 text-neutral-300 border-neutral-700"
                          }`}
                        >
                          <option value="Pendiente">Pendiente</option>
                          <option value="En Preparación">En Preparación</option>
                          <option value="Despachado">Despachado</option>
                          <option value="Entregado">Entregado</option>
                        </select>
                      </td>

                      {/* Transportadora y Guía */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-bold uppercase text-neutral-400">
                            {order.transportadora}
                          </span>
                          <input
                            type="text"
                            value={order.guia}
                            onChange={(e) => handleGuideChange(order.id, e.target.value)}
                            placeholder="Guía #..."
                            className="bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-white px-2 py-1 w-32 focus:border-white focus:outline-none"
                          />
                        </div>
                      </td>

                      {/* Acciones */}
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={() =>
                            alert(
                              `Comprobante de despacho para orden ${order.id}:\nCliente: ${order.cliente.nombre}\nDirección: ${order.cliente.direccion}, ${order.cliente.ciudad}\nTotal: ${formatCOP(order.total)}\nGuía: ${order.guia}`
                            )
                          }
                          className="px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Ver Guía
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredOrders.length === 0 && (
                <div className="p-8 text-center text-neutral-500 text-xs">
                  No se encontraron pedidos con el criterio seleccionado.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: INVENTARIO & STOCK POR TALLAS */}
        {activeTab === "inventario" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-neutral-950 border border-neutral-800 p-6 flex flex-col justify-between"
                >
                  <div className="flex gap-4 items-start">
                    <div className="relative w-20 h-24 bg-black border border-neutral-800 flex-shrink-0">
                      <Image
                        src={prod.imagen}
                        alt={prod.nombre}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 px-2 py-0.5 bg-neutral-900 border border-neutral-800">
                          {prod.categoria}
                        </span>
                        {prod.gsm && (
                          <span className="text-[10px] font-bold font-mono text-neutral-400">
                            {prod.gsm}
                          </span>
                        )}
                      </div>
                      <h3 className="font-extrabold text-sm uppercase tracking-wide text-white mt-1">
                        {prod.nombre}
                      </h3>
                      <div className="mt-1 flex items-center gap-3 font-mono text-xs">
                        <span className="text-white font-bold">{formatCOP(prod.precio)}</span>
                        <span className="text-neutral-500">Costo: {formatCOP(prod.costo)}</span>
                        <span className="text-emerald-400">
                          Margen: {Math.round(((prod.precio - prod.costo) / prod.precio) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stock Editor by Size */}
                  <div className="mt-6 pt-4 border-t border-neutral-900">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-3">
                      Inventario Disponible por Variante:
                    </span>
                    <div className="grid grid-cols-5 gap-2">
                      {Object.entries(prod.stock).map(([size, count]) => (
                        <div
                          key={size}
                          className="bg-neutral-900 border border-neutral-800 p-2 text-center"
                        >
                          <span className="text-[10px] font-extrabold text-neutral-400 block">
                            {size}
                          </span>
                          <span
                            className={`text-sm font-mono font-extrabold block my-1 ${
                              count <= 2 ? "text-red-400" : "text-white"
                            }`}
                          >
                            {count}
                          </span>
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => handleStockAdjust(prod.id, size, -1)}
                              className="w-5 h-5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold flex items-center justify-center cursor-pointer transition-colors"
                            >
                              -
                            </button>
                            <button
                              onClick={() => handleStockAdjust(prod.id, size, 1)}
                              className="w-5 h-5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold flex items-center justify-center cursor-pointer transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ATLETAS & APP VITALFIT */}
        {activeTab === "atletas" && (
          <div className="space-y-6">
            <div className="bg-neutral-950 border border-neutral-800 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-widest">
                    ECOSISTEMA PHY-GITAL
                  </span>
                  <h3 className="text-lg font-extrabold uppercase text-white">
                    CONEXIÓN DIRECTA CON APP MÓVIL VITALFIT
                  </h3>
                </div>
                <p className="text-xs text-neutral-400 mt-1 max-w-2xl">
                  Cada prenda enviada contiene una etiqueta con QR/NFC que otorga 30 días VIP gratis en la app móvil (https://punto-de-inflexion.vercel.app/).
                  Aquí puedes verificar los atletas que ya redimieron su código y desbloquearon rutinas de sobrecarga.
                </p>
              </div>

              <a
                href="https://punto-de-inflexion.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-white text-black text-xs font-extrabold uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center gap-2 flex-shrink-0"
              >
                <Smartphone className="w-4 h-4" />
                <span>Abrir App Móvil en Vivo ↗</span>
              </a>
            </div>

            {/* Lista de Atletas Sincronizados */}
            <div className="bg-neutral-950 border border-neutral-800">
              <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
                  ÚLTIMOS ATLETAS REGISTRADOS Y SUSCRITOS
                </h4>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">
                  Base de Datos Supabase Activa
                </span>
              </div>

              <div className="divide-y divide-neutral-900">
                {[
                  {
                    nombre: "Alejandro Gómez",
                    email: "atleta@vitalfit.com",
                    ciudad: "Medellín",
                    prenda: "Camiseta Oversize Metal Anatomy",
                    qrCanjeado: true,
                    diasVipRestantes: 28,
                    rutinaAsignada: "Hipertrofia Savage 5 Días",
                  },
                  {
                    nombre: "Mateo Velásquez",
                    email: "mateo.velasquez@outlook.com",
                    ciudad: "Bogotá",
                    prenda: "Creatina Monohidratada 200 Mesh",
                    qrCanjeado: true,
                    diasVipRestantes: 30,
                    rutinaAsignada: "Fuerza Bruta & Creatine Tracking",
                  },
                  {
                    nombre: "Sebastián Quintero",
                    email: "squintero.lift@hotmail.com",
                    ciudad: "Bucaramanga",
                    prenda: "Camiseta Esqueleto Savage Iron",
                    qrCanjeado: true,
                    diasVipRestantes: 24,
                    rutinaAsignada: "Torso / Pierna Progresivo",
                  },
                  {
                    nombre: "Carlos Eduardo Ospina",
                    email: "carlos.ospina@gmail.com",
                    ciudad: "Cali",
                    prenda: "Camiseta Muscular Blanca Heavyweight",
                    qrCanjeado: false,
                    diasVipRestantes: 0,
                    rutinaAsignada: "Esperando Entrega para Activar",
                  },
                ].map((ath, idx) => (
                  <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-neutral-800 text-white font-bold text-xs flex items-center justify-center">
                        {ath.nombre.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-white">{ath.nombre}</span>
                          <span className="text-[10px] text-neutral-400">({ath.ciudad})</span>
                        </div>
                        <span className="text-xs text-neutral-400 block font-mono">{ath.email}</span>
                        <span className="text-[10px] text-neutral-500 block mt-0.5">
                          Prenda: {ath.prenda}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 sm:text-right">
                      <div>
                        {ath.qrCanjeado ? (
                          <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>{ath.diasVipRestantes} días VIP en App</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
                            <Clock className="w-4 h-4" />
                            <span>Pendiente de activación</span>
                          </div>
                        )}
                        <span className="text-[10px] text-neutral-400 block mt-0.5">
                          {ath.rutinaAsignada}
                        </span>
                      </div>

                      <button
                        onClick={() => alert(`Enviando pase directo a la App para ${ath.nombre}`)}
                        className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Enviar Pase
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PASARELAS & BALANCES */}
        {activeTab === "finanzas" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-neutral-950 border border-neutral-800 p-5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                  Nequi Colombia
                </span>
                <span className="text-xl font-extrabold font-mono text-white block mt-2">
                  {formatCOP(3580000)}
                </span>
                <span className="text-[10px] text-neutral-500">42% de transacciones</span>
              </div>

              <div className="bg-neutral-950 border border-neutral-800 p-5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                  PSE / Bancolombia
                </span>
                <span className="text-xl font-extrabold font-mono text-white block mt-2">
                  {formatCOP(3210000)}
                </span>
                <span className="text-[10px] text-neutral-500">38% de transacciones</span>
              </div>

              <div className="bg-neutral-950 border border-neutral-800 p-5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                  Tarjetas Débito / Crédito
                </span>
                <span className="text-xl font-extrabold font-mono text-white block mt-2">
                  {formatCOP(1280000)}
                </span>
                <span className="text-[10px] text-neutral-500">15% de transacciones</span>
              </div>

              <div className="bg-neutral-950 border border-neutral-800 p-5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                  Contraentrega Efectivo
                </span>
                <span className="text-xl font-extrabold font-mono text-white block mt-2">
                  {formatCOP(380000)}
                </span>
                <span className="text-[10px] text-neutral-500">5% de transacciones</span>
              </div>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 p-6">
              <h3 className="text-sm font-extrabold uppercase text-white tracking-wider mb-2">
                ESTADO DE PASARELAS DE PAGO VINCULADAS
              </h3>
              <p className="text-xs text-neutral-400 mb-6">
                Todas las transacciones se liquidan diariamente a la cuenta empresarial Bancolombia de VitalFit.
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-neutral-900 border border-neutral-800">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <div>
                      <strong className="text-xs font-bold text-white uppercase block">Wompi / Bancolombia PSE</strong>
                      <span className="text-[10px] text-neutral-400">ID Comercio: WMP-VITALFIT-CO</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold">ACTIVO // CONECTADO</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-neutral-900 border border-neutral-800">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <div>
                      <strong className="text-xs font-bold text-white uppercase block">Nequi Negocios Directo</strong>
                      <span className="text-[10px] text-neutral-400">API Key: NQ-PROD-2026-LIVE</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold">ACTIVO // CONECTADO</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-neutral-900 border border-neutral-800">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <div>
                      <strong className="text-xs font-bold text-white uppercase block">Coordinadora / Interrapidísimo Contraentrega</strong>
                      <span className="text-[10px] text-neutral-400">Convenio Corporativo Radicado</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold">ACTIVO // CONECTADO</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal: Crear Nuevo Drop */}
      {isNewProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-950 border border-neutral-800 max-w-lg w-full p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="font-extrabold text-base uppercase text-white tracking-wide">
                CREAR NUEVO DROP / PRODUCTO
              </h3>
              <button
                onClick={() => setIsNewProductModalOpen(false)}
                className="text-neutral-400 hover:text-white text-xs font-bold cursor-pointer"
              >
                CERRAR ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Nombre de la Prenda o Suplemento
                </label>
                <input
                  type="text"
                  placeholder="Ej: HOODIE HEAVYWEIGHT // ACID IRON"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 p-2 text-white focus:outline-none focus:border-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Categoría
                  </label>
                  <select
                    value={newProdCat}
                    onChange={(e) => setNewProdCat(e.target.value as any)}
                    className="w-full bg-neutral-900 border border-neutral-800 p-2 text-white focus:outline-none focus:border-white"
                  >
                    <option value="Oversize">Oversize (280 GSM)</option>
                    <option value="Tanks">Tanks / Esqueletos</option>
                    <option value="Suplementos">Suplementación Pura</option>
                    <option value="Accesorios">Accesorios & Gear</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Precio de Venta (COP)
                  </label>
                  <input
                    type="number"
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 p-2 text-white focus:outline-none focus:border-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Especificación Técnica / Gramaje
                </label>
                <input
                  type="text"
                  placeholder="Ej: 280 GSM Peinado // Lavado Mineral Antidesgaste"
                  value={newProdGsm}
                  onChange={(e) => setNewProdGsm(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 p-2 text-white focus:outline-none focus:border-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
              <button
                onClick={() => setIsNewProductModalOpen(false)}
                className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-bold uppercase cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  if (!newProdName) return alert("Por favor ingresa un nombre para el producto");
                  const created: ProductInventory = {
                    id: `prod-${Date.now()}`,
                    nombre: newProdName.toUpperCase(),
                    categoria: newProdCat,
                    precio: Number(newProdPrice) || 129900,
                    costo: 50000,
                    stock: { S: 10, M: 15, L: 15, XL: 10, XXL: 5 },
                    activo: true,
                    imagen: "/products/oversize-metal.jpg",
                    gsm: newProdGsm,
                  };
                  setProducts([created, ...products]);
                  setIsNewProductModalOpen(false);
                  setNewProdName("");
                  alert(`¡Drop "${created.nombre}" creado exitosamente con 55 unidades en inventario!`);
                }}
                className="px-5 py-2 bg-white text-black hover:bg-neutral-200 text-xs font-extrabold uppercase cursor-pointer"
              >
                Publicar Drop
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
