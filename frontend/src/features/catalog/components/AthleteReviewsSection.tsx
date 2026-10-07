import React from "react";
import { Star, ShieldCheck, Quote } from "lucide-react";

interface Review {
  id: number;
  author: string;
  role: string;
  rating: number;
  title: string;
  text: string;
  verifiedItem: string;
}

const REVIEWS: Review[] = [
  {
    id: 1,
    author: "MATEO VÁSQUEZ",
    role: "Powerlifting Competitivo (PR: 220kg Deadlift)",
    rating: 5,
    title: "La tela más pesada que he probado en Colombia",
    text: "La camiseta oversize de 280 GSM tiene una caída y densidad descomunal. Otras marcas se estiran o el cuello se deforma a la tercera lavada; con VitalFit he entrenado pesado 3 semanas seguidas y el cuello sigue intacto.",
    verifiedItem: "Camiseta Oversize 280 GSM (Talla L)",
  },
  {
    id: 2,
    author: "CARLOS DUQUE",
    role: "Culturismo Clásico & Entrenador Personal",
    rating: 5,
    title: "Verdadero 200 Mesh sin sabor arenoso",
    text: "Llevo 7 años consumiendo creatina monohidratada y la diferencia de solubilidad de esta es de otro nivel. Cero grumos en agua fría y cero dolor estomacal. Además la calculadora en la app VitalFit te ahorra dolores de cabeza con la dosis.",
    verifiedItem: "Creatina 200 Mesh Pura (300g)",
  },
  {
    id: 3,
    author: "DANIEL SALAZAR",
    role: "Atleta Híbrido & Calistenia con Lastre",
    rating: 5,
    title: "El corte del esqueleto resalta los dorsales al máximo",
    text: "El corte boxfit del esqueleto con sisas amplias te da una libertad brutal en dominadas con lastre y presses. La textura de lavado mineral en vivo se ve incluso mejor que en las fotos.",
    verifiedItem: "Camiseta Esqueleto Savage Iron (Talla M)",
  },
];

export const AthleteReviewsSection: React.FC = () => {
  return (
    <section className="w-full bg-neutral-50 py-14 sm:py-20 px-3 sm:px-8 lg:px-12 border-t border-neutral-200 select-none">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 px-2">
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-black text-black" />
            ))}
            <span className="text-[11px] sm:text-xs font-bold text-black ml-1.5 sm:ml-2 font-mono">4.9 / 5.0</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-black">
            AVALADO EN LA SALA DE PESAS
          </h2>
          <p className="text-[11px] sm:text-xs text-neutral-500 mt-2 font-medium leading-relaxed">
            Testimonios reales de atletas de fuerza, culturistas y levantadores pesados que ponen nuestro gear a prueba cada semana.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-5 sm:p-6 border border-neutral-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-2.5 sm:mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-black text-black" />
                  ))}
                </div>
                <h4 className="text-[11px] sm:text-xs font-extrabold tracking-wider uppercase text-black mb-1.5 sm:mb-2">
                  "{rev.title}"
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                  {rev.text}
                </p>
              </div>

              <div className="pt-3.5 sm:pt-4 mt-5 sm:mt-6 border-t border-neutral-100">
                <div className="flex items-center justify-between text-[11px]">
                  <strong className="text-black font-extrabold uppercase">{rev.author}</strong>
                  <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold">
                    <ShieldCheck className="w-3 h-3 flex-shrink-0" /> Verificado
                  </span>
                </div>
                <p className="text-[10px] text-neutral-400 mt-0.5">{rev.role}</p>
                <p className="text-[9.5px] sm:text-[10px] text-neutral-600 font-mono mt-1.5 bg-neutral-50 px-2 py-0.5 rounded w-fit">
                  📦 {rev.verifiedItem}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AthleteReviewsSection;
