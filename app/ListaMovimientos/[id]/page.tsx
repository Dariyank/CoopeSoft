"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsPencilSquare } from "react-icons/bs";
import Cookies from "js-cookie";
import { Movimientos } from "../../Context/movimientoContext";
// import { useMovimientos } from "@/app/uses/useMovimientos"; // Importa el hook del contexto



const DetalleMovimientos = () => {

  const [movimiento, setMovimiento] = useState<Movimientos | null>(null);
  const [movimientos, setMovimientos] = useState<Movimientos[]>([]); // Estado para la lista completa de movimientos
  // const { movimientos, setMovimientos } = useMovimientos()!; // Usamos el contextoconst [search, setSearch] = useState(""); 
  // const [search] = useState("");

  // useEffect para cargar los datos del archivo JSON
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/movimientos.json');
        const data = await response.json();
        setMovimientos(data); // Cargar los datos en el estado
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const movimientoId = Cookies.get("movimientoId"); // Leer el ID desde las cookies

    if (movimientoId) {
      const foundMovimiento = movimientos.find((m: Movimientos) => m.id === movimientoId);
      if (foundMovimiento) {
        setMovimiento(foundMovimiento);
      } else {
        setMovimiento(null);
      }
    }
  }, [movimientos]);

  // Filtrar los datos según la búsqueda
  // const filteredMovimientos = movimientos.filter((movimiento) =>
  //   Object.values(movimiento).some((value) =>
  //     value.toString().toLowerCase().includes(search.toLowerCase())
  //   )
  // );

  // Si el movimiento existe, se muestra el nombre. Si no, se puede mostrar un mensaje de error.
  const idMovimiento= movimiento ? movimiento.id : "Movimiento no encontrado";
  if (!movimiento) return <div>Cargando...</div>;
  return (
    <div>
      <div className="px-6 text-[#00755D]">
        <h3 className="uppercase font-extrabold text-[30px]">Detalle de Movimiento</h3>
      </div>

      <div className="flex items-center justify-center p-6">
        {/* Contenedor principal */}
        <div className="w-full max-w-4xl px-6 ">
          <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6">
            
            <div className="flex-1">
              <div className="flex justify-between ">
                <h2 className="font-bold text-[24px] text-[#00755D]">
                  {idMovimiento}
                </h2>
                <Link
                    href="/movimientos"
                    className="text-[#00755D] hover:text-[#e6be31]"
                  >
                    <BsPencilSquare className="inline-block" size={20} />
                </Link>
              </div>
              {movimiento ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="px-2">
                      <p className="text-sm"><strong>Nombre: </strong>{movimiento.nombre}</p>
                      <p className="text-sm"><strong>Tipo: </strong>{movimiento.tipoMovimiento}</p>
                      <p className="text-sm"><strong>Fecha: </strong>{movimiento.fechaRealizada}</p>
                    </div>
                    <div className="px-2">
                      <p className="text-sm"><strong>Estado: </strong>{movimiento.estado} </p>
                      <p className="text-sm"><strong>Representante: </strong>{movimiento.representante} </p>
                      <p className="text-sm"><strong>Monto: </strong>{movimiento.monto}</p>
                    </div>
                    <div className="px-2">
                      <p className="text-sm"><strong>Descripcion: </strong>{movimiento.descripcion}</p>
                    
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

export default DetalleMovimientos