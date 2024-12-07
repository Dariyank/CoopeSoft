/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import { obtenerSociosPorCooperativa } from '@/app/actions'

import React, { useState, useEffect, useRef } from "react";
import { useSocios } from "../uses/useSocios";
import { HiAdjustments } from "react-icons/hi";
import { IoEyeSharp } from "react-icons/io5";
import Link from "next/link";
import Cookies from 'js-cookie';

const ListaSocios: React.FC = () => {
  const { socios, setSocios } = useSocios();
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "id">("id");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const menuRef = useRef<HTMLDivElement>(null);
  const socioId = Cookies.get("socioId");
  

  // Carga inicial de socios
  useEffect(() => {
    const fetchData = async () => {
      const { success, data, error } = await obtenerSociosPorCooperativa("1");

      if (success && Array.isArray(data)) {
        setSocios(data);
      } else {
        console.error('Error fetching socios:', error || 'Invalid data');
      }
    };
    fetchData();
  }, [setSocios]);

  // Cerrar el menú si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Función para manejar el cambio en el input de búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // Función para guardar el id del socio en las cookies
  const handleSaveIdInCookies = (id: string) => {
    Cookies.set("socioId", id, { expires: 7, sameSite: "Strict", secure: true }); // Guardamos el ID en cookies, con una expiración de 7 días
  };

  const removeIdCookies = () => {
    Cookies.remove('socioId');
  };

  // Función para ordenar los datos
  const handleSort = (criteria: "asc" | "desc" | "id") => {
    const sorted = [...socios].sort((a, b) => {
      if (criteria === "id") return parseInt(a.socioid, 10) - parseInt(b.socioid, 10);
      if (criteria === "asc") return a.montoahorrado - b.montoahorrado;
      return b.montoahorrado - a.montoahorrado;
    });

    setSortOrder(criteria); // Actualiza el estado de `sortOrder`
    setSocios(sorted);
  };

  // Filtrar los datos según la búsqueda (usando el debouncedSearch)
  const filteredSocios = socios.filter((socio) =>
    Object.values(socio).some((value) =>
      value ? value.toString().toLowerCase().includes(search.toLowerCase()) : false
    )
  );
  const totalPages = Math.ceil(filteredSocios.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = filteredSocios.slice(startIndex, startIndex + rowsPerPage);

  // Toggle menú de ordenamiento
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <div>
      <div className="px-6 uppercase font-extrabold text-[30px] text-[#00755D]">
        <h3>Lista de Socios</h3>
      </div>

      {/* Controles */}
      <div className="flex items-center gap-4 p-6 bg-white rounded-lg">
        {/* Botón Ordenar */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={toggleMenu}
            className="flex items-center gap-2 px-6 py-2 border border-gray-400 rounded-lg hover:bg-gray-100"
          >
            Ordenar <span className="text-sm">▼</span>
          </button>

          {isMenuOpen && (
            <div
              className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div className="py-1 " role="none">
                <button
                  onClick={() => handleSort("asc")}
                  className={`block px-4 py-2 text-sm ${
                    sortOrder === "asc" ? "font-bold" : "text-gray-700 hover:bg-gray-100"
                  }`}
                  role="menuitem"
                >
                  Menor Ahorro
                </button>
                <button
                  onClick={() => handleSort("desc")}
                  className={`block px-4 py-2 text-sm ${
                    sortOrder === "desc" ? "font-bold" : "text-gray-700 hover:bg-gray-100"
                  }`}
                  role="menuitem"
                >
                  Mayor Ahorro
                </button>
                <button
                  onClick={() => handleSort("id")}
                  className={`block px-4 py-2 text-sm ${
                    sortOrder === "id" ? "font-bold" : "text-gray-700 hover:bg-gray-100"
                  }`}
                  role="menuitem"
                >
                  Por ID
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Input de Búsqueda */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <HiAdjustments />
          </span>
          <input
            type="text"
            placeholder="Buscar"
            value={search}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
          />
        </div>

        {/* Botón Registrar Socio */}
        <Link
          href="/ListaSocios/RegistrarSocio"
          className="px-4 py-2 bg-[#00755D] text-white rounded-lg hover:bg-[#e6be31] flex items-center justify-center"
          onClick={() => socioId != undefined ? removeIdCookies() : null} // Eliminados el id en cookies al hacer clic
        >
          Registrar Socio
        </Link>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto p-6 py-1">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-[#00755D] text-white">
            <tr>
              <th className="p-2 border border-gray-300">ID</th>
              <th className="p-2 border border-gray-300">Nombre</th>
              <th className="p-2 border border-gray-300">Email</th>
              <th className="p-2 border border-gray-300">Registro</th>
              <th className="p-2 border border-gray-300">Monto ahorrado</th>
              <th className="p-2 border border-gray-300">Ahorros</th>
              <th className="p-2 border border-gray-300">Empresa</th>
              <th className="p-2 border border-gray-300">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((socio, index) => (
              <tr
                key={socio.socioid}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="p-2 border border-gray-300">{socio.socioid}</td>
                <td className="p-2 border border-gray-300">{socio.nombre}</td>
                <td className="p-2 border border-gray-300">{socio.correo}</td>
                <td className="p-2 border border-gray-300">{socio.registro}</td>
                <td className="p-2 border border-gray-300">
                {socio.montoahorrado
                  ? socio.montoahorrado.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })
                  : "No tiene nada ahorrado"}
                </td>
                <td className="p-2 border border-gray-300">{socio.montoahorrado}</td>
                <td className="p-2 border border-gray-300">{socio.empresa}</td>
                <td className="p-2 border border-gray-300 text-center">
                  <Link
                    href={`/ListaSocios/perfilSocio`}
                    className="text-[#00755D] hover:text-[#e6be31]"
                    onClick={() => {handleSaveIdInCookies(socio.socioid)}} // Guardamos el id en cookies al hacer clic
                  >
                    <IoEyeSharp className="inline-block" size={25} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
       {/* Paginación */}
       <div className="flex justify-between items-center p-4">
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
            className="border border-gray-300 rounded-md p-2"
          >
            {[5, 10, 15, 20].map((rows) => (
              <option key={rows} value={rows}>
                {rows} por página
              </option>
            ))}
          </select>

          <div>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(1)}
              className={`mx-1 px-3 py-1 rounded-md ${currentPage === 1 ? "bg-gray-300 text-gray-500" : "bg-[#00755D] hover:bg-[#e6be31] text-white"}`}
            >
              Inicio
            </button>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className={`mx-1 px-3 py-1 rounded-md ${currentPage === 1 ? "bg-gray-300 text-gray-500" : "bg-[#00755D] hover:bg-[#e6be31] text-white"}`}
            >
              Anterior
            </button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className={`mx-1 px-3 py-1 rounded-md ${
                currentPage === totalPages ? "bg-gray-300 text-gray-500" : "bg-[#00755D] hover:bg-[#e6be31] text-white"
              }`}
            >
              Siguiente
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
              className={`mx-1 px-3 py-1 rounded-md ${
                currentPage === totalPages ? "bg-gray-300 text-gray-500" : "bg-[#00755D] hover:bg-[#e6be31] text-white "
              }`}
            >
              Fin
            </button>
          </div>
        </div>
    </div>
  );
};

export default ListaSocios;