'use client'
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function PetLayout({ children }) {
  return (
      <div>
      <Header/>
        {children}
        <Footer/>
      </div>
  );
}