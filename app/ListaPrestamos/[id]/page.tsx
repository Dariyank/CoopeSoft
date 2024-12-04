"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsPencilSquare } from "react-icons/bs";
import Cookies from "js-cookie";
import { Prestamo } from "../../Context/prestamoContext";
// import { useMovimientos } from "@/app/uses/useMovimientos"; // Importa el hook del contexto



const DetallePrestamos = () => {

  const [prestamo, setPrestamo] = useState<Prestamo | null>(null);
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]); // Estado para la lista completa de movimientos
  // const { movimientos, setMovimientos } = useMovimientos()!; // Usamos el contextoconst [search, setSearch] = useState(""); 
  // const [search] = useState("");

  // useEffect para cargar los datos del archivo JSON
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/prestamos.json');
        const data = await response.json();
        setPrestamos(data); // Cargar los datos en el estado
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const prestamoId = Cookies.get("prestamoId"); // Leer el ID desde las cookies

    if (prestamoId) {
      const foundPrestamo = prestamos.find((p: Prestamo) => p.id === prestamoId);
      if (foundPrestamo) {
        setPrestamo(foundPrestamo);
      } else {
        setPrestamo(null);
      }
    }
  },[prestamos]);

  // Filtrar los datos según la búsqueda
  // const filteredMovimientos = movimientos.filter((movimiento) =>
  //   Object.values(movimiento).some((value) =>
  //     value.toString().toLowerCase().includes(search.toLowerCase())
  //   )
  // );

  // Si el movimiento existe, se muestra el nombre. Si no, se puede mostrar un mensaje de error.
  const idPrestamo= prestamo ? prestamo.id : "Prestamo no encontrado";
  if (!prestamo) return <div>Cargando...</div>;
  return (
    <div>
      <div className="px-6 text-[#00755D]">
        <h3 className="uppercase font-extrabold text-[30px]">Detalle de Prestamos</h3>
      </div>

      <div className="flex items-center justify-center p-6">
        {/* Contenedor principal */}
        <div className="w-full max-w-4xl px-6 ">
          <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6">
            
            <div className="flex-1">
              <div className="flex justify-between ">
                <h2 className="font-bold text-[24px] text-[#00755D]">
                  {idPrestamo}
                </h2>
                <Link
                    href="/movimientos"
                    className="text-[#00755D] hover:text-[#e6be31]"
                  >
                    <BsPencilSquare className="inline-block" size={20} />
                </Link>
              </div>
              {prestamo ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="px-2">
                      <p className="text-sm"><strong>Nombre: </strong>{prestamo.nombre}</p>
                      <p className="text-sm"><strong>Monto Prestado: </strong>{prestamo.montoPrestado}</p>
                      <p className="text-sm"><strong>Representante: </strong>{prestamo.tasaInteres} </p>
                    </div>
                    <div className="px-2">
                      <p className="text-sm"><strong>Fecha: </strong>{prestamo.diaSolicitud}</p>
                      <p className="text-sm"><strong>Estado: </strong>{prestamo.estado} </p>
                    </div>
                  </div>
                ) : (
                  <p>Movimiento no encontrado</p>
                )}


            </div>
           
          </div>
        </div>
      </div>

      
    </div>
  )
}

export default DetallePrestamos