import { useState } from "react";
import { Menu, X, Heart, Phone, Mail } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import HeaderAuth from "./HeaderAuth";

export default function Header() {
  const token = useSelector((state) => state.auth.token);
  const [isOpen, setIsOpen] = useState(false);

  const navtabs = [
    { name: "Home", href: "/" },
    { name: "Available Pets", href: "/pets" },
    { name: "About Us", href: "#" },
    { name: "Contact", href: "#" },
  ];

  return (
    <header className="bg-white shadow-soft sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-brand-primaryBlue text-white py-2">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <a
              href="tel:+1234567890"
              className="flex items-center gap-2 hover:opacity-80"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">+1 (234) 567-890</span>
            </a>
            <a
              href="mailto:info@petadopt.com"
              className="flex items-center gap-2 hover:opacity-80"
            >
              <Mail className="w-4 h-4" />
              <span className="hidden md:inline">info@petadopt.com</span>
            </a>
          </div>
          <div className="text-xs sm:text-sm">
            <span>🎉 Adoption Week - Special Offers!</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-brand-lightBlue rounded-xl p-2">
              <Heart className="w-6 h-6 text-brand-primaryBlue fill-brand-primaryBlue" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-800">
                PawsHome
              </h1>
              <p className="text-xxs text-gray-500 hidden sm:block">
                Find Your Perfect Companion
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-8 text-gray-700 font-medium">
            {navtabs.map((item, i) => (
              <li key={i}>
                <Link
                  href={item.href}
                  className="hover:text-brand-primaryBlue transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          {/* <div className="hidden lg:block">
            <Link href={'/login'} className="bg-brand-primaryBlue text-white px-6 py-2.5 rounded-xl hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg">
              Login
            </Link>
          </div> */}
          <HeaderAuth token={token} />

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-100">
            <ul className="flex flex-col gap-4 mt-4 text-gray-700 font-medium">
              {navtabs.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    className="block hover:text-brand-primaryBlue transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
