# ⚡ VITALFIT GEAR — Monorepo (Frontend & Backend)

> **Plataforma E-commerce de Alto Rendimiento // Indumentaria Pesada & Suplementación Científica**  
> Ecosistema Phygital conectado a la app móvil en vivo: **[VITALFIT — Nutrición & Entrenamiento](https://punto-de-inflexion.vercel.app/)**

---

## 🏛️ Arquitectura del Proyecto

Este repositorio es un **Monorepo** que aloja tanto el Frontend como el Backend:

```
vitalfit-store/
├── frontend/               # Next.js 16 (App Router) • Screaming Architecture
│   ├── src/
│   │   ├── app/            # Rutas: /, /colecciones, /producto/[slug], /checkout, /cuenta, /admin, /app
│   │   ├── features/       # Screaming Architecture por dominio de negocio
│   │   │   ├── catalog/    # Catálogo, productos, modal de detalle, filtros
│   │   │   ├── cart/       # Estado Zustand, bolsa de compras, persistencia
│   │   │   ├── checkout/   # Flujo de pago, direcciones en Colombia, pasarelas
│   │   │   └── auth/       # Portal del atleta, login y registro
│   │   └── shared/         # Componentes transversales (Navbar, Hero, Footer, UI)
│   └── public/             # Fotografía editorial de productos y campañas
│
├── backend/                # NestJS 12 • Arquitectura Hexagonal (Ports & Adapters)
│   ├── src/
│   │   ├── domain/         # Entidades puras y reglas de negocio
│   │   ├── application/    # Casos de uso y puertos (Interfaces)
│   │   └── infrastructure/ # Adaptadores: PostgreSQL, Supabase, Redis, Wompi/PSE
│   └── test/               # Tests unitarios y E2E con Vitest
│
└── README.md
```

---

## 🚀 Tecnologías Principales

### Frontend
- **Framework:** Next.js 16.4 (React 19, TypeScript, Turbopack)
- **Estilos:** Tailwind CSS v4 con paleta monocromática de lujo (Black & White editorial, estética YoungLA / Represent)
- **Gestión de Estado:** Zustand con persistencia en localStorage
- **Iconografía:** Lucide React
- **Tipografía:** Bebas Neue & Montserrat (Google Fonts)

### Backend
- **Framework:** NestJS 12 (TypeScript estricto)
- **Arquitectura:** Hexagonal (Dominio, Aplicación, Infraestructura)
- **Testing & Calidad:** Vitest, Oxlint, Prettier
- **Persistencia Planeada:** PostgreSQL vía Supabase / Railway con Prisma ORM y locks distribuidos con Redis

---

## 🌟 Características de la Tienda

1. **Ecosistema Phy-Gital:** Cada prenda física adquirida incluye una etiqueta inteligente con código QR que desbloquea **30 días VIP gratis** en la app móvil: [https://punto-de-inflexion.vercel.app/](https://punto-de-inflexion.vercel.app/).
2. **Psicología de Escasez y Stock en Tiempo Real:**
   - Visualización de unidades restantes por talla (`S`, `M`, `L`, `XL`, `XXL`).
   - Alertas de stock crítico (`¡Últimas 2 piezas!`) y barras de progreso del Drop 01.
   - Temporizador de reserva de stock en la bolsa de compras y en el checkout.
3. **Localización 100% Colombiana:**
   - Precios en pesos colombianos (**COP**).
   - Cálculo automático de envío gratis a partir de `$150.000 COP`.
   - Métodos de pago locales: **PSE (Bancolombia)**, **Nequi Directo**, **Tarjetas de Crédito/Débito** y **Contraentrega Nacional**.
   - Integración con transportadoras nacionales (**Coordinadora Mercantil** y **Servientrega**).
4. **Portal del Atleta (`/cuenta`):**
   - Historial de pedidos con comprobante y medio de pago exacto utilizado.
   - Línea de tiempo visual de despacho (`Confirmado` → `Empacado` → `Despachado` → `Entregado`).
   - Pase VIP personal y código QR para sincronizar con la app de entrenamiento.
5. **Modo Administrador (`/admin`):**
   - Métricas de ventas en tiempo real, control de pedidos con cambio de estado en vivo, asignación de números de guía y editor de inventario por tallas (`+` / `-`).

---

## 🛠️ Cómo Ejecutar el Proyecto Localmente

### 1. Clonar el Repositorio
```bash
git clone https://github.com/glordinglord-art/Vitalfit-store.git
cd Vitalfit-store
```

### 2. Levantar el Frontend
```bash
cd frontend
npm install
npm run dev
```
Abre en tu navegador: [http://localhost:3000](http://localhost:3000)

### 3. Levantar el Backend
```bash
cd ../backend
npm install
npm run start:dev
```

---

## 📄 Licencia
Privado — Desarrollado para **VitalFit Store Colombia // 2026**.
