"use client";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";

function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex items-center justify-between p-5 shadow-md">
      <Image src="/logo.svg" width={50} height={50} alt="logo" className="w-[100px] md:w-[100px]" />

      {/* Desktop Navigation */}
      <ul className="hidden md:flex gap-14 font-medium text-lg">
        <li className={`${pathname === "/" ? "text-primary" : ""} hover:text-primary transition-all duration-300 cursor-pointer`}>
          <Link href="/">Home</Link>
        </li>
        <li className={`${pathname === "/about" ? "text-primary" : ""} hover:text-primary transition-all duration-300 cursor-pointer`}>
          <Link href="/about">About</Link>
        </li>
        <li className={`${pathname === "/contact" ? "text-primary" : ""} hover:text-primary transition-all duration-300 cursor-pointer`}>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>

      {/* Mobile Navigation Menu Button */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="relative w-8 h-8 focus:outline-none">
          <span
            className={`block w-full h-0.5 bg-black transition-transform duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block w-full h-0.5 bg-black mt-2 transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`block w-full h-0.5 bg-black mt-2 transition-transform duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="absolute top-[80px] left-0 w-full bg-white shadow-md z-10 flex flex-col items-center py-4 md:hidden">
          <ul className="flex flex-col gap-6 font-medium text-lg">
            <li className={`${pathname === "/" ? "text-primary" : ""} hover:text-primary transition-all duration-300 cursor-pointer`}>
              <Link href="/" onClick={toggleMenu}>Home</Link>
            </li>
            <li className={`${pathname === "/about" ? "text-primary" : ""} hover:text-primary transition-all duration-300 cursor-pointer`}>
              <Link href="/about" onClick={toggleMenu}>About</Link>
            </li>
            <li className={`${pathname === "/contact" ? "text-primary" : ""} hover:text-primary transition-all duration-300 cursor-pointer`}>
              <Link href="/contact" onClick={toggleMenu}>Contact</Link>
            </li>
          </ul>

          <div className="flex flex-col gap-4 mt-6">
            <LoginLink>
              <Button variant="ghost" onClick={toggleMenu}>Login</Button>
            </LoginLink>
            <RegisterLink>
              <Button onClick={toggleMenu}>Get Started</Button>
            </RegisterLink>
          </div>
        </div>
      )}

      {/* Desktop Login/Register Buttons */}
      <div className="hidden md:flex gap-5">
        <LoginLink>
          <Button variant="ghost">Login</Button>
        </LoginLink>
        <RegisterLink>
          <Button>Get Started</Button>
        </RegisterLink>
      </div>
    </div>
  );
}

export default Header;
