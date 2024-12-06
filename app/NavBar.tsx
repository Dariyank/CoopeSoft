"use client";

import { usePathname } from "next/navigation";
import { IoLogoAngular } from "react-icons/io";
import { BiUserCircle } from "react-icons/bi";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export function useCurrentPath() {
  const pathName = usePathname();
  return pathName;
}

const Navbar = () => {
  const links = [
    { label: "Lista de Socios", href: "/ListaSocios" },
    { label: "Lista de Representantes", href: "/ListaRepresentantes" },
    { label: "Lista de prestamos", href: "/ListaPrestamos" },
    { label: "Lista de movimientos", href: "/ListaMovimientos" },
  ];

  const pathname = useCurrentPath();

  return (
    <nav className="bg-slate-50 flex items-center px-6 py-6 h-[65px]">
      {/* Logo Section */}
      <div
        className="flex-shrink-0 w-[150px] text-xl font-bold"
        style={{ color: "#00755D" }}
      >
        <Link href={pathname === "/LandingPage" ? "/" : "/"}>
          {pathname === "/LandingPage" || pathname === "/loginPage" ? (
            <div className="flex items-center space-x-2">
              <Image
                src="/img/Logo.png"
                alt="Coopesoft Logo"
                width={50}
                height={50}
              />
              <span className="text-[#00755D] text-lg font-bold">Coopesoft</span>
          </div>
          ) : (
            <IoLogoAngular size={35} /> // Logo para otras páginas
          )}
        </Link>
      </div>

      {/* Navigation Links Section */}
      <ul
        className="flex-1 flex space-x-6 justify-center"
        style={{ color: "#00755D" }}
      >
        {/* Mostrar texto en lugar de los links cuando pathname es '/LandingPage' */}
        {pathname === "/LandingPage" || pathname === "/loginPage" ? (
          <div
            className="w-full text-center text-[16px] font-semibold"
            style={{ color: "#00755D" }}
          >
            Para ordenar tu cooperativa
          </div>
        ) : pathname ==="/Representante" ? (
          // Botones específicos para la página '/Representante'
          <div className="flex items-center space-x-6">
            <Link
              href="/BuscarSocio"
              className="text-[#00755D] font-semibold hover:text-[#444444] transition-colors"
            >
              Buscar Socio
            </Link>
            <Link
              href="/RegistrarSocio"
              className="text-[#00755D] font-semibold hover:text-[#444444] transition-colors"
            >
              Registrar Socio
            </Link>
          </div>
          ) : (
            // Renderizar el resto de los enlaces en el navbar
          links.map((link) => (
            <li
              key={link.href}
              className={`w-[145px] text-center font-bold text-[16px] flex items-center justify-center h-[50px] border-2 
                ${
                  pathname.startsWith(link.href)
                    ? "border-[#00755D] text-[#00755D]"
                    : "border-transparent text-[#00755D] hover:text-[#444444] transition-colors"
                } 
                rounded-md cursor-pointer`}
              style={{ padding: "7px" }} // 7px padding between text and border
            >
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))
        )}
      </ul>

       {/* User Icon Section */}
       <div className="flex-shrink-0 w-[150px] text-sm font-semibold text-[12px] flex items-center h-[40px] justify-end">
        {pathname === "/LandingPage" ? (
          <Link href="/loginPage" className="flex items-center space-x-[3px]">
            <button className="bg-[#00755D] text-white px-4 py-2 rounded-md hover:bg-[#005844]">
              Iniciar Sesión
            </button>
          </Link>
        ) : pathname === "/Representante" ? (
          // Sección específica para la página '/Representante'
          <Link href="/LandingPage" className="flex items-center space-x-[8px] text-[#00755D]">
          {/* Contenedor de textos (Juana Delgado y Cerrar Sesión) */}
          <div className="flex flex-col items-end">
            <span className="font-semibold">Juana Delgado</span>
            <span className="text-[12px] text-gray-600 hover:text-gray-800">
              Cerrar Sesión
            </span>
          </div>
          {/* Ícono de usuario */}
          <BiUserCircle size={35} className="flex-shrink-0" />
        </Link>
        ) : (
          pathname !== "/loginPage" && (
            <Link href="/LandingPage" className="flex items-center space-x-[8px] text-[#00755D]">
            {/* Contenedor de textos (Coop. Herrera y Cerrar Sesión) */}
            <div className="flex flex-col items-end">
              <span className="font-semibold">Coop. Herrera</span>
              <span className="text-[12px] text-gray-600 hover:text-gray-800">Cerrar Sesión</span>
            </div>
            {/* Ícono de usuario */}
            <BiUserCircle size={35} className="flex-shrink-0" />
          </Link>
          )
        )}
      </div>
    </nav>
  );
};

export default Navbar;
