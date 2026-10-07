import React from "react";
import { Navbar } from "@/shared/components/Navbar";
import { HeroBanner } from "@/shared/components/HeroBanner";
import { CatalogSection } from "@/features/catalog/components/CatalogSection";
import { SupplementScienceSection } from "@/features/catalog/components/SupplementScienceSection";
import { AppEcosystemSection } from "@/features/catalog/components/AppEcosystemSection";
import { AthleteReviewsSection } from "@/features/catalog/components/AthleteReviewsSection";
import { CartDrawer } from "@/features/cart/components/CartDrawer";
import { Footer } from "@/shared/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen w-full flex flex-col bg-white text-black">
      <Navbar />
      <HeroBanner />
      <CatalogSection />
      <SupplementScienceSection />
      <AppEcosystemSection />
      <AthleteReviewsSection />
      <Footer />
      <CartDrawer />
    </main>
  );
}
