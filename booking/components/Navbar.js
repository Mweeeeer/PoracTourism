"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Palmtree } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Resorts", href: "/resorts" },
    { name: "About", href: "/#about" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-2 rounded-xl text-white group-hover:scale-110 transition-transform">
            <Palmtree size={24} />
          </div>
          <span className={cn(
            "text-xl font-bold tracking-tight",
            scrolled ? "text-text-primary" : "text-white"
          )}>
            Porac<span className="text-primary">Stays</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "font-medium transition-colors hover:text-primary",
                scrolled ? "text-text-secondary" : "text-white/90"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/resorts"
            className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full font-semibold transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-95"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className={cn(
            "md:hidden p-2 rounded-lg",
            scrolled ? "text-text-primary" : "text-white"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 top-[70px] bg-white z-40 md:hidden transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col p-6 gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-2xl font-semibold text-text-primary border-b border-slate-100 pb-4"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/resorts"
            className="bg-primary text-white text-center py-4 rounded-2xl font-bold text-lg shadow-lg shadow-primary/20"
            onClick={() => setIsOpen(false)}
          >
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
