export type GenderCategory = "him" | "her" | "supplements" | "collabs";

export interface ColorSwatch {
  name: string;
  colorCode: string;
  imageSrc?: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  stock: number;
  sku: string;
}

export interface SizeMeasurement {
  size: string;
  chest: string; // Pecho en cm
  length: string; // Largo en cm
  shoulders: string; // Hombro a hombro
}

export interface Product {
  id: string;
  code: string;
  name: string;
  subtitle: string;
  slug: string;
  gender: "him" | "her" | "supplements";
  price: number;
  compareAtPrice?: number;
  currency: string;
  images: string[];
  swatches: ColorSwatch[];
  variants: ProductVariant[];
  tag?: string;
  description: string;
  specifications: {
    gramaje?: string;
    composicion: string;
    corte: string;
    cuello?: string;
    cuidados: string;
  };
  features: string[];
  sizeGuide?: SizeMeasurement[];
  vitalFitPerk?: string; // Beneficio único con la app de entrenamiento
}
