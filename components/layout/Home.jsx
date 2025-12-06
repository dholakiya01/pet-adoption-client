'use client'
import { useState } from "react";
import Footer from "./Footer";
import Hero from "./Hero";
import Navbar from "./Navbar";
import { Menu, X, Heart, Phone, Mail } from 'lucide-react';
import Header from "./Header";
import HeroSection from "./Hero";
import PetTypesSection from "./PetTypesSection";
import PetCatalog from "./PetCatalog";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
      <div className="min-h-screen">
      <Header/>
      <main>
        <HeroSection/>
        <PetTypesSection />
        <PetCatalog />
      </main>
      <Footer />
    </div>
  );
}
