"use client";

import React, { useState, useEffect, useRef } from "react";
import { useMovimientos } from "../uses/useMovimientos";
import { HiAdjustments } from "react-icons/hi";

const ListaMovimientos: React.FC =  () => {

  const { movimientos, setMovimientos } = useMovimientos()!; // Usamos el contextoconst [search, setSearch] = useState("");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "id">("asc");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);


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

  // Función para ordenar los datos
  const handleSort = (criteria: "asc" | "desc" | "id") => {
    const sorted = [...movimientos].sort((a, b) => {
      if (criteria === "id") return a.id.localeCompare(b.id);
      if (criteria === "asc") return a.monto - b.monto;
      return b.monto - a.monto;
    });

    setSortOrder(criteria); // Actualiza el estado de `sortOrder`
    setMovimientos(sorted);
  };

  // Filtrar los datos según la búsqueda
  // const filteredPrestamos = prestamos.filter((prestamo) =>
  //   Object.values(prestamo).some((value) =>
  //     value.toString().toLowerCase().includes(search.toLowerCase())
  //   )
  // );


  // Toggle menú de ordenamiento
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <div>
      <div className="px-6 uppercase font-extrabold text-[30px] text-[#00755D]">
        <h3>Lista de Movimientos</h3>
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
                  Ascendente
                </button>
                <button
                  onClick={() => handleSort("desc")}
                  className={`block px-4 py-2 text-sm ${
                    sortOrder === "desc" ? "font-bold" : "text-gray-700 hover:bg-gray-100"
                  }`}
                  role="menuitem"
                >
                  Descendente
                </button>
                <button
                  onClick={() => handleSort("id")}
                  className={`block px-4 py-2 text-sm ${
                    sortOrder === "id" ? "font-bold" : "text-gray-700 hover:bg-gray-100"
                  }`}
                  role="menuitem"
                >
                  ID
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
      </div>
      
    </div>
  )
}

export default ListaMovimientos