"use client";

import { obtenerTrasaccionesPorCooperativa } from '@/app/actions';
import React, { useState, useEffect, useRef } from "react";
import { useMovimientos } from "../uses/useMovimientos";
import { HiAdjustments } from "react-icons/hi";
import { IoEyeSharp } from "react-icons/io5";
import Link from "next/link";
import Cookies from 'js-cookie';

const ListaMovimientos: React.FC = () => {
  const { movimientos, setMovimientos } = useMovimientos()!;
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "id">("asc");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const menuRef = useRef<HTMLDivElement>(null);

  // Inicializa los movimientos
  useEffect(() => {
    const fetchData = async () => {
      const { success, data, error } = await obtenerTrasaccionesPorCooperativa("1");
      if (success && Array.isArray(data)) {
        setMovimientos(data);
      } else {
        console.error('Error fetching movimientos:', error || 'Invalid data');
      }
    };
    fetchData();
  }, [setMovimientos]);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

  const handleSaveIdInCookies = (id: string) => {
    Cookies.set('movimientoId', id, { expires: 7 });
  };

  const handleSort = (criteria: "asc" | "desc" | "id") => {
    const sorted = [...movimientos].sort((a, b) => {
      if (criteria === "id") return parseInt(a.transaccionid, 10) - parseInt(b.transaccionid, 10);
      if (criteria === "asc") return a.monto - b.monto;
      return b.monto - a.monto;
    });
    setSortOrder(criteria);
    setMovimientos(sorted);
  };

  const filteredMovimientos = movimientos.filter((movimiento) =>
    Object.values(movimiento).some((value) =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredMovimientos.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const dataMovimiento = filteredMovimientos.slice(startIndex, startIndex + rowsPerPage);

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // Reinicia a la primera página
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <div>
      <div className="px-6 uppercase font-extrabold text-[30px] text-[#00755D]">
        <h3>Lista de Movimientos</h3>
      </div>

      <div className="flex items-center gap-4 p-6 bg-white rounded-lg">
        <div className="relative" ref={menuRef}>
          <button
            onClick={toggleMenu}
            className="flex items-center gap-2 px-6 py-2 border border-gray-400 rounded-lg hover:bg-gray-100"
          >
            Ordenar <span className="text-sm">▼</span>
          </button>

          {isMenuOpen && (
            <div className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
              <div className="py-1">
                <button
                  onClick={() => handleSort("asc")}
                  className={`block px-4 py-2 text-sm ${sortOrder === "asc" ? "font-bold" : "text-gray-700 hover:bg-gray-100"}`}
                >
                  Ascendente
                </button>
                <button
                  onClick={() => handleSort("desc")}
                  className={`block px-4 py-2 text-sm ${sortOrder === "desc" ? "font-bold" : "text-gray-700 hover:bg-gray-100"}`}
                >
                  Descendente
                </button>
                <button
                  onClick={() => handleSort("id")}
                  className={`block px-4 py-2 text-sm ${sortOrder === "id" ? "font-bold" : "text-gray-700 hover:bg-gray-100"}`}
                >
                  ID
                </button>
              </div>
            </div>
          )}
        </div>

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

      <div className="overflow-x-auto p-6 py-1">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-[#00755D] text-white">
            <tr>
              <th className="p-2 border border-gray-300">ID</th>
              <th className="p-2 border border-gray-300">Tipo</th>
              <th className="p-2 border border-gray-300">Nombre</th>
              <th className="p-2 border border-gray-300">Representante</th>
              <th className="p-2 border border-gray-300">Fecha</th>
              <th className="p-2 border border-gray-300">Monto</th>
              <th className="p-2 border border-gray-300">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {dataMovimiento.map((movimiento, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                <td className="p-2 border border-gray-300">{movimiento.transaccionid}</td>
                <td className="p-2 border border-gray-300">{movimiento.tipo}</td>
                <td className="p-2 border border-gray-300">{movimiento.socioid}</td>
                <td className="p-2 border border-gray-300">{movimiento.representanteid}</td>
                <td className="p-2 border border-gray-300">{movimiento.fecha}</td>
                <td className="p-2 border border-gray-300">{movimiento.monto}</td>
                <td className="p-2 border border-gray-300 text-center">
                  <Link
                    href={`/ListaMovimientos/perfilMovimiento`}
                    className="text-[#00755D] hover:text-[#e6be31]"
                    onClick={() => handleSaveIdInCookies(movimiento.transaccionid)}
                  >
                    <IoEyeSharp className="inline-block" size={25} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center p-4">
        <select
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
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
            className={`mx-1 px-3 py-1 rounded-md ${currentPage === 1 ? "bg-gray-300 text-gray-500" : "bg-[#00755D] text-white"}`}
          >
            Inicio
          </button>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className={`mx-1 px-3 py-1 rounded-md ${currentPage === 1 ? "bg-gray-300 text-gray-500" : "bg-[#00755D] text-white"}`}
          >
            Anterior
          </button>
          <span className="mx-2">
            Página {currentPage} de {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className={`mx-1 px-3 py-1 rounded-md ${currentPage === totalPages ? "bg-gray-300 text-gray-500" : "bg-[#00755D] text-white"}`}
          >
            Siguiente
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
            className={`mx-1 px-3 py-1 rounded-md ${currentPage === totalPages ? "bg-gray-300 text-gray-500" : "bg-[#00755D] text-white"}`}
          >
            Final
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListaMovimientos;
