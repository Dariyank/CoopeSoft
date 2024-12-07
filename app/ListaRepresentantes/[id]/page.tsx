"use client";



import { 
  obtenerTransaccionesPorRepresentante, 
  obtenerRepresentante,
} from '@/app/actions'

import React, { useState, useEffect} from "react";
import Cookies from "js-cookie";
import { BsPencilSquare } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";
import { TransaccionesExtendida } from "../../Context/tramovimientosContext";

import Link from "next/link";
import { useMovimientos } from "@/app/uses/useMovimientos"; // Importa el hook del contexto
import { useRepresentante } from '@/app/uses/useRepresentante';

const DetallesRepresentante = () => {

  const [movimiento, setMovimiento] = useState<TransaccionesExtendida[] | null>(null);
  const { representante, setRepresentante } = useRepresentante();
  const { movimientos, setMovimientos } = useMovimientos()!; // Usamos el contextoconst [search, setSearch] = useState(""); 
  const [search] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Inicializa la lista de representantes una vez (si está vacía)
  useEffect(() => {
    limpiarDatos();
    const fetchData = async () => {
      const representanteID = Cookies.get("representanteId");
      
      if(representanteID){
        const { success, data, error } = await obtenerRepresentante(representanteID);

        if (success && Array.isArray(data)) {
          setRepresentante(data[0]);
        } else {
          console.error('Error fetching representante:', error || 'Invalid data');
        }
      }
    };

    if(representante)
      console.log(typeof representante.representanteid);
    fetchData();
  }, []);

  // Inicializa la lista de movimientos una vez (si está vacía)
  useEffect(() => {
    const fetchData = async () => {
      const representanteID = Cookies.get("representanteId");
      if (representanteID) {
        const { success, data, error } = await obtenerTransaccionesPorRepresentante(representanteID);
        if (success && Array.isArray(data)) {
          const transformedData: TransaccionesExtendida[] = data.map((item) => {
            //@ts-ignore
            const nombreSocio = item.socios?.nombre || "Nombre no disponible";
  
            return {
              transaccionid: item.transaccionid,
              nombresocio: nombreSocio,
              nombrerepresentante: item.representanteid,
              tipo: item.tipo,
              monto: item.monto,
              fecha: item.fecha,
              estado: item.estado,
              descripcion: item.descripcion,
            };
          });
          setMovimiento(transformedData);
        } else {
          console.error('Error fetching movimientos:', error || 'Invalid data');
        }
      }
    };
    fetchData();
  }, [setMovimiento]);

  // Función para guardar el id del socio en las cookies
  const handleSaveMovInCookies = (id: string) => {
    Cookies.set('movimientoId', id, { expires: 7 }); // Guardamos el ID en cookies, con una expiración de 7 días
  };

  const handleSaveIdInCookies = (id: string) => {
    Cookies.set('representanteId', id, { expires: 7 }); // Guardamos el ID en cookies, con una expiración de 7 días
  };

  // Filtrar los datos según la búsqueda
  const filteredMovimientos = (movimiento || []).filter((movimiento) =>
    Object.values(movimiento).some((value) =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );
  
  const limpiarDatos = () => {
    setRepresentante(null);  // Limpia los datos del socio
  };

  const totalPages = Math.ceil(filteredMovimientos.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const dataMovimiento = filteredMovimientos.slice(startIndex, startIndex + rowsPerPage);

  // Si el representante existe, se muestra el nombre. Si no, se puede mostrar un mensaje de error.
  const nombreRepresentante = representante ? representante.nombre : "Representante no encontrado";
  const cedula = representante ? representante.representanteid : "Representante no encontrado";

  if (!representante) return <div>Cargando...</div>;
  return (
    <div>
        {/* Título */}
        <div className="px-6 text-[#00755D]">
            <h3 className="uppercase font-extrabold text-[30px]"> Perfil del Representante</h3>
        </div>

        <div className="flex items-center justify-center p-6">
            {/* Contenedor principal */}
            <div className="w-full max-w-4xl px-6 ">
              <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6">
                  {/* Encabezado del perfil */}
                    <div className="flex items-center space-x-4">
                        {/* Imagen de perfil */}
                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-500 font-bold text-2xl">IMG</span>
                        </div>
                        
                        {/* Información general */}
                        <div className="flex-1">
                        <div className="flex justify-between ">
                        <h2 className="font-bold text-[24px] text-[#00755D]">
                            {nombreRepresentante}
                        </h2>
                        <Link
                            href="/ListaRepresentantes/RegistrarRepresentante"
                            className="text-[#00755D] hover:text-[#e6be31]"
                            onClick={() => handleSaveIdInCookies(representante.representanteid)}
                          >
                            <BsPencilSquare className="inline-block" size={20} />
                        </Link>
                        </div>
                        {representante ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          <div className="px-2">
                              <p className="text-sm"><strong>ID: </strong>{cedula}</p>
                              <p className="text-sm"><strong>Email: </strong>{representante.correo}</p>
                              <p className="text-sm"><strong>Teléfono: </strong>{representante.telefono} </p>
                          </div>
                          <div className="px-2">
                              <p className="text-sm"><strong>Género: </strong>{representante.genero} </p>
                              <p className="text-sm"><strong>Edad: </strong>{representante.edad} </p>
                          </div>
                          <div className="px-2">
                              <p className="text-sm"><strong>Dirección: </strong>{representante.direccion} </p>
                          </div>
                          </div>
                        ) : (
                          <p>Representante no encontrado</p>
                        )}
                    </div>
                  </div>
                </div>
            </div>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto p-6 py-4">
          <div><h2 className="font-bold py-2 text-[#00755D] text-[25px]">Movimientos</h2></div>
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-[#00755D] text-white">
                <tr>
                <th className="p-2 border border-gray-300 w-[10%]">Tipo</th>
                <th className="p-2 border border-gray-300 w-[10%]">Fecha Pago</th>
                <th className="p-2 border border-gray-300 w-[10%]">Monto</th>
                <th className="p-2 border border-gray-300 w-[15%]">Estado</th>
                <th className="p-2 border border-gray-300 w-[15%]">Cliente</th>
                <th className="p-2 border border-gray-300 w-[30%]">Notas</th> 
                <th className="p-2 border border-gray-300 w-[10%]">Ver</th>
                </tr>
            </thead>
            <tbody>
            {dataMovimiento && Array.isArray(movimiento) && movimiento.length > 0 ? (
              movimiento.map((movimiento, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="p-2 border border-gray-300">{movimiento.tipo}</td>
                  <td className="p-2 border border-gray-300">{movimiento.fecha}</td>
                  <td className="p-2 border border-gray-300">
                      {movimiento.monto.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                      })}
                  </td>
                  <td className="p-2 border border-gray-300">{movimiento.estado == '1' ? "Realizada" : "Cancelada"}</td>
                  <td className="p-2 border border-gray-300">{movimiento.nombresocio}</td>
                  <td className="p-2 border border-gray-300">{movimiento.descripcion}</td>
                  <td className="p-2 border border-gray-300 text-center">
                      <Link
                          href={`../../ListaMovimientos/${movimiento.transaccionid}`}
                          className="text-[#00755D] hover:text-[#e6be31]"
                          onClick={() => handleSaveMovInCookies(String(movimiento.transaccionid))}
                      >
                          <IoEyeSharp className="inline-block" size={25} />
                      </Link>
                  </td>
                </tr>
              ))
            ) : (
                <tr>
                  <td className="text-center p-4">
                    No hay movimientos disponibles.
                  </td>
                </tr>
            )}
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

export default DetallesRepresentante