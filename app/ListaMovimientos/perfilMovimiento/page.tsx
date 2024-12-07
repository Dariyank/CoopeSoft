"use client";

import { 
  obtenerMovimiento
} from '@/app/actions'

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { TransaccionExtendida } from "../../Context/tramovimientoContext";
// import { useMovimientos } from "@/app/uses/useMovimientos"; // Importa el hook del contexto



const DetalleMovimientos = () => {

  const [movimiento, setMovimiento] = useState<TransaccionExtendida | null>(null);
  // const [movimientos, setMovimientos] = useState<Movimientos[]>([]); // Estado para la lista completa de movimientos
  // const { movimientos, setMovimientos } = useMovimientos()!; // Usamos el contextoconst [search, setSearch] = useState(""); 
  // const [search] = useState("");

  // useEffect para cargar los datos del archivo JSON
  useEffect(() => {
    limpiarDatos();
    const fetchData = async () => {
      const movimientoID = Cookies.get("movimientoId");
      
      if(movimientoID){
        const { success, data, error } = await obtenerMovimiento(movimientoID);
        
        if (success && data) {
          const movimiento: TransaccionExtendida = {
            transaccionid: data[0].transaccionid,
            //@ts-ignore
            nombresocio: data[0].socios.nombre, // Acceder al nombre de socio
            //@ts-ignore
            nombrerepresentante: data[0].representantes.nombre, // Acceder al nombre de representante
            tipo: data[0].tipo,
            monto: data[0].monto,
            fecha: data[0].fecha,
            estado: data[0].estado,
            descripcion: data[0].descripcion,
          };
          console.log(movimiento);
          setMovimiento(movimiento);
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

  const limpiarDatos = () => {
    setMovimiento(null);  // Limpia los datos del socio
    // setMovimientos([]);  // Limpia los movimientos
  };

  // Si el movimiento existe, se muestra el nombre. Si no, se puede mostrar un mensaje de error.
  const idMovimiento= movimiento ? movimiento.transaccionid : "Movimiento no encontrado";

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
                  Movimiento #{idMovimiento}
                </h2>
              </div>
              {movimiento ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="px-2">
                      <p className="text-sm"><strong>Nombre: </strong>{movimiento.nombresocio}</p>
                      <p className="text-sm"><strong>Tipo: </strong>{movimiento.tipo}</p>
                      <p className="text-sm"><strong>Fecha: </strong>{movimiento.fecha}</p>
                    </div>
                    <div className="px-2">
                      <p className="text-sm"><strong>Estado: </strong>{movimiento.estado} </p>
                      <p className="text-sm"><strong>Representante: </strong>{movimiento.nombrerepresentante} </p>
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