"use client";

import React, { useState, useEffect} from "react";
import { BsPencilSquare } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";
import Link from "next/link";
import { useRepresentante } from "@/app/uses/useRepresentante"; // Asegúrate de importar el contexto
import { useParams } from "next/navigation"; // Para obtener parámetros dinámicos
import { useMovimiento } from "@/app/uses/useMovimiento"; // Importa el hook del contexto

const DetallesRepresentante = () => {
    const { id } = useParams(); // Extrae el id desde la URL
    const { representantes } = useRepresentante(); // Obtén el contexto de Representantes

    const [search] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const { movimientos, setMovimiento } = useMovimiento(); // Obtén los datos del contexto

    // Inicializa la lista de socios una vez (si está vacía)
   useEffect(() => {
    if (movimientos.length === 0) {
      setMovimiento([
        {
          tipo: "Deposito",
          fechaPago: "17-01-2024",
          monto: 222222,
          estado: "completado",
          notas: "HOLAHOLA, Hola,hola,hola,hola,ahola",
          cliente:"fulano de tal",
        },
        {
          tipo: "Deposito",
          fechaPago: "17-01-2024",
          monto: 432222,
          estado: "completado",
          notas: "Bla,,bla,bla,bla,ablalalflflfsf",
          cliente:"fulano de tal",
        },
        {
          tipo: "Pago intereses Anuales",
          fechaPago: "17-01-2024",
          monto: 222222,
          estado: "completado",
          notas: "HOLAHOLA, Hola,hola,hola,hola,ahola",
          cliente:"fulano de tal",
        },
        {
          tipo: "Deposito",
          fechaPago: "17-01-2024",
          monto: 222222,
          estado: "completado",
          notas: "HOLAHOLA, Hola,hola,hola,hola,ahola",
          cliente:"fulano de tal",
        },
        {
          tipo: "Deposito",
          fechaPago: "17-01-2024",
          monto: 222222,
          estado: "completado",
          notas: "HOLAHOLA, Hola,hola,hola,hola,ahola",
          cliente:"fulano de tal",
        },
        {
          tipo: "Deposito",
          fechaPago: "17-01-2024",
          monto: 222222,
          estado: "completado",
          notas: "HOLAHOLA, Hola,hola,hola,hola,ahola",
          cliente:"fulano de tal",
        },
      ]);
    }
  }, [movimientos, setMovimiento]);


    // Filtrar el representante según el ID o nombre (según lo que esté pasando como parámetro)
    const representante = representantes.find(s => s.id === id);

    // Filtrar los datos según la búsqueda
    const filteredMovimientos = movimientos.filter((movimiento) =>
        Object.values(movimiento).some((value) =>
        value.toString().toLowerCase().includes(search.toLowerCase())
        )
    );

    const totalPages = Math.ceil(filteredMovimientos.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const dataMovimientos = filteredMovimientos.slice(startIndex, startIndex + rowsPerPage);

    // Si el representante existe, se muestra el nombre. Si no, se puede mostrar un mensaje de error.
    const nombreRepresentante = representante ? representante.nombre : "Representante no encontrado";
    const cedula = representante ? representante.id : "Representante no encontrado";
    
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
                            href="/movimientos"
                            className="text-[#00755D] hover:text-[#e6be31]"
                            >
                            <BsPencilSquare className="inline-block" size={20} />
                        </Link>
                        </div>
                        {representante ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="px-2">
                                <p className="text-sm"><strong>Cédula: </strong>{cedula}</p>
                                <p className="text-sm"><strong>Email: </strong>{representante.email}</p>
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
                    <th className="p-2 border border-gray-300">Tipo</th>
                    <th className="p-2 border border-gray-300">Fecha Pago</th>
                    <th className="p-2 border border-gray-300">Monto</th>
                    <th className="p-2 border border-gray-300">Estado</th>
                    <th className="p-2 border border-gray-300">Notas</th> 
                    <th className="p-2 border border-gray-300">Cliente</th>
                    <th className="p-2 border border-gray-300">Ver</th>
                    </tr>
                </thead>
                <tbody>
                    {dataMovimientos.map((movimientos, index) => (
                    <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                    >
                        <td className="p-2 border border-gray-300">{movimientos.tipo}</td>
                        <td className="p-2 border border-gray-300">{movimientos.fechaPago}</td>
                        <td className="p-2 border border-gray-300">
                        {movimientos.monto.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                        })}
                        </td>
                        <td className="p-2 border border-gray-300">{movimientos.estado}</td>
                        <td className="p-2 border border-gray-300">{movimientos.notas}</td>
                        <td className="p-2 border border-gray-300">{movimientos.cliente}</td>
                        <td className="p-2 border border-gray-300 text-center">
                        <Link
                            href="/movimientos"
                            className="text-[#00755D] hover:text-[#e6be31]"
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

export default DetallesRepresentante