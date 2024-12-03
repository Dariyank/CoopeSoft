"use client";
import { IoLogoAngular } from "react-icons/io";
import { BiUserCircle } from "react-icons/bi";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Lista de Socios", href: "/ListaSocios" },
    { label: "Lista de Representantes", href: "/ListaRepresentantes" },
    { label: "Lista de prestamos", href: "/ListaPrestamos" },
    { label: "Lista de movimientos", href: "/ListaMovimientos" },
  ];

  return (
    <nav className="bg-slate-50 flex items-center px-6 py-6 h-[65px] mb-5">
      {/* Logo Section */}
      <div className="flex-shrink-0 w-[150px] text-xl font-bold" style={{ color: "#00755D" }}>
        <Link href="/">
          <IoLogoAngular size={35} />
        </Link>
      </div>

      {/* Navigation Links Section */}
      <ul className="flex-1 flex space-x-6 justify-center" style={{ color: "#00755D" }}>
        {links.map((link) => (
          <li
            key={link.href}
            className={`w-[145px] text-center font-bold text-[16px] flex items-center justify-center h-[50px] border-2 
              ${currentPath.startsWith(link.href) ? "border-[#00755D] text-[#00755D]" : "border-transparent text-[#00755D] hover:text-[#444444] transition-colors"} 
              rounded-md  cursor-pointer`}
            style={{ padding: "7px" }}  // 7px padding between text and border
          >
            <Link href={link.href}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* User Icon Section */}
      <div
        className="flex-shrink-0 w-[150px] text-sm font-semibold text-[12px] flex items-center h-[40px] justify-end"
        style={{ color: "#00755D" }}
      >
        <Link className="flex items-center space-x-[3px]" href="/">
          <span>Coop. Herrera</span>
          <BiUserCircle size={35} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
