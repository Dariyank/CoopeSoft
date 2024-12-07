/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { Prestamo } from "../../Context/prestamoContext";
import { usePrestamo } from '@/app/uses/usePrestamo'
import { obtenerPrestamo } from "@/app/actions";
// import { useMovimientos } from "@/app/uses/useMovimientos"; // Importa el hook del contexto



const DetallePrestamos = () => {

  const {prestamo, setPrestamo} = usePrestamo(); // Estado para la lista completa de movimientos

  // useEffect para cargar los datos del archivo JSON
  useEffect(() => {
    limpiarDatos();
    const fetchData = async () => {
      const socioID = Cookies.get("socioId");
      
      if (socioID) {
        const { success, data, error } = await obtenerPrestamo(socioID);

        console.log(data);
  
        if (success && Array.isArray(data) && data.length > 0) {
          // Tomamos el primer elemento del array y transformamos
          const item = data[0]; // Asegúrate de manejar casos donde `data` tiene más de un elemento
          
          const transformedData: Prestamo = {
            prestamoid: item.prestamoid,
            //@ts-ignore
            socioid: item.socios.nombre || "Socio no disponible",
            //@ts-ignore
            representanteid: item.representantes.nombre || "Socio no disponible",
            tiempo: item.tiempo || 0, // Asigna un valor predeterminado si falta
            totalprestado: item.totalprestado || 0,
            fecha: item.fecha || "Fecha no disponible",
            montomensual: item.montomensual || 0,
            totaloriginal: item.totaloriginal || 0,
            taza: item.taza || 0,
          };
  
          setPrestamo(transformedData);
        } else {
          console.error('Error fetching socio:', error || 'Invalid data');
        }
      }
    };
    fetchData();
  }, []);
  


  // Filtrar los datos según la búsqueda
  // const filteredMovimientos = movimientos.filter((movimiento) =>
  //   Object.values(movimiento).some((value) =>
  //     value.toString().toLowerCase().includes(search.toLowerCase())
  //   )
  // );

  // Si el movimiento existe, se muestra el nombre. Si no, se puede mostrar un mensaje de error.

  
  const limpiarDatos = () => {
    setPrestamo(null);  // Limpia los datos del socio
  };

  const idPrestamo= prestamo ? prestamo.prestamoid : "Prestamo no encontrado";

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
                  Prestamo #{idPrestamo}
                </h2>
              </div>
              {prestamo ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="px-2">
                      <p className="text-sm"><strong>Nombre: </strong>{prestamo.socioid}</p>
                      <p className="text-sm"><strong>Fecha: </strong>{prestamo.fecha}</p>
                      <p className="text-sm"><strong>Representante: </strong>{prestamo.representanteid} </p>
                    </div>
                    <div className="px-2">
                      <p className="text-sm"><strong>Monto Prestado: </strong>{prestamo.totaloriginal}</p>
                      <p className="text-sm"><strong>Pendiente: </strong>{prestamo.totalprestado} </p>
                      <p className="text-sm"><strong>Tasa: </strong>{prestamo.taza}%</p>
                    </div>
                    <div className="px-2">
                      <p className="text-sm"><strong>Tiempo: </strong>{prestamo.tiempo} meses</p>
                      <p className="text-sm"><strong>Mensualidad: </strong>{prestamo.montomensual} </p>
                      <p className="text-sm"><strong>Tasa: </strong>{prestamo.taza}%</p>
                    </div>
                  </div>
                ) : (
                  <p>Prestamo no encontrado</p>
                )}


            </div>
           
          </div>
        </div>
      </div>

      
    </div>
  )
}

export default DetallePrestamos