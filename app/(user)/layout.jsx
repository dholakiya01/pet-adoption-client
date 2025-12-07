"use client";
import AuthGuard from "@/components/auth/AuthGuard";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function PetLayout({ children }) {
  return (
    <AuthGuard allowedRoles={[2]}>
      <div>
        <Header />
        {children}
        <Footer />
      </div>
    </AuthGuard>
  );
}
