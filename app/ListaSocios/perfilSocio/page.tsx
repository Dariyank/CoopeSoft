"use client";

import { 
  obtenerTransaccionesPorSocio, 
  obtenerSocio,
  actualizarPrestamopendiente
} from '@/app/actions'

import React, { useState, useEffect } from "react";
import { useSocio } from "@/app/uses/useSocio";
import { useMovimientos } from "@/app/uses/useMovimientos";
import { usePrestamo } from "@/app/uses/usePrestamo";
import Cookies from "js-cookie";
import { FaDollarSign } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import { BsPencilSquare } from "react-icons/bs";

import Link from "next/link";

const DetallesSocio = () => {

  const { socio, setSocio } = useSocio();
  const { movimientos, setMovimientos } = useMovimientos();
  const { prestamo, setPrestamo } = usePrestamo();
  const [search] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  let monto = 0;

  // useEffect para cargar los datos del API
  useEffect(() => {
    limpiarDatos();
    const fetchData = async () => {
      const socioID = Cookies.get("socioId");
      
      if(socioID){
        const { success, data, error } = await obtenerSocio(socioID);

        if (success && Array.isArray(data)) {
          setSocio(data[0]);
        } else {
          console.error('Error fetching socio:', error || 'Invalid data');
        }
      }
    };
    fetchData();
  }, []);

   // Inicializa la lista de movimientos una vez (si está vacía)
   useEffect(() => {
    const fetchData = async () => {
      const socioID = Cookies.get("socioId");
      if (socioID) {
        const { success, data, error } = await obtenerTransaccionesPorSocio(socioID);
        if (success && Array.isArray(data)) {
          setMovimientos(data);
        } else {
          console.error('Error fetching movimientos:', error || 'Invalid data');
        }
      }
    };
    fetchData();
  }, [setMovimientos]);

  //Carga todos los prestamos del socio
  useEffect(() => {
    const fetchData = async () => {
    const socioID = Cookies.get("socioId");
      if (socioID) {

        const { success, data, error } = await actualizarPrestamopendiente(socioID);
        if (success && data) {
          setPrestamo(data);
        } else {
          console.error('Error fetching movimientos:', error || 'Invalid data');
        }
      }
    };
    fetchData();
  }, [setPrestamo]);

   // Función para guardar el id del socio en las cookies
   const handleSaveMovInCookies = (id: string) => {
    Cookies.set('movimientoId', id, { expires: 7 }); // Guardamos el ID en cookies, con una expiración de 7 días
  };

  // Filtrar los datos según la búsqueda
  const filteredMovimientos = movimientos.filter((movimiento) =>
    Object.values(movimiento).some((value) =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  // Función para guardar el id del socio en las cookies
  const handleSaveIdInCookies = (id: string) => {
    if(Cookies.get("socioId"))
      Cookies.remove('socioId');
    Cookies.set('socioId', id, { expires: 7 }); // Guardamos el ID en cookies, con una expiración de 7 días
  };

  const limpiarDatos = () => {
    setSocio(null);  // Limpia los datos del socio
    setMovimientos([]);  // Limpia los movimientos
  };

  const totalPages = Math.ceil(filteredMovimientos.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const dataMovimientos = filteredMovimientos.slice(startIndex, startIndex + rowsPerPage);
  if (dataMovimientos[0] ) {
    dataMovimientos[0].tipo == "Depósito" ? monto = dataMovimientos[0].monto : 0;
  }

  // Si el socio existe, se muestra el nombre. Si no, se puede mostrar un mensaje de error.
  const nombreSocio = socio ? socio.nombre : "Socio no encontrado";
  const cedula = socio ? String(socio.cedula) || 0 : "Socio no encontrado"
  const montoAhorradoSocio = socio ? Number(socio.montoahorrado) || 0 : "Socio no encontrado";
  const prestamoSocio = prestamo ? prestamo.totalprestado || 0 :"0";

  if (!socio || !movimientos) {
    return <div>Cargando...</div>;
  }
  return (
    <div>
      {/* Título */}
      <div className="px-6 text-[#00755D]">
        <h3 className="uppercase font-extrabold text-[30px]">Perfil del Socio</h3>
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
                  {nombreSocio}
                </h2>
                <Link
                    href="/ListaSocios/RegistrarSocio"
                    className="text-[#00755D] hover:text-[#e6be31]"
                    onClick={() =>handleSaveIdInCookies(socio.socioid)}
                  >
                    <BsPencilSquare className="inline-block" size={20} />
                </Link>
                </div>
                {socio ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="px-2">
                      <p className="text-sm"><strong>Cédula: </strong>{cedula}</p>
                      <p className="text-sm"><strong>Email: </strong>{socio.correo}</p>
                      <p className="text-sm"><strong>Teléfono: </strong>{socio.telefono}</p>
                    </div>
                    <div className="px-2">
                      <p className="text-sm"><strong>Género: </strong>{socio.genero == 'M' ? "Masculino" : socio.genero == 'F' ? "Femenino" : socio.genero =='X' ? "No identificado" : "Error al conseguir el genero" } </p>
                      <p className="text-sm"><strong>Edad: </strong>{socio.edad} </p>
                      <p className="text-sm"><strong>Compañía: </strong>{socio.empresa}</p>
                    </div>
                    <div className="px-2">
                      <p className="text-sm"><strong>Salario: </strong>{socio.salario}</p>
                      <p className="text-sm"><strong>Dirección: </strong>{socio.direccion}</p>
                    </div>
                  </div>
                ) : (
                  <p>Socio no encontrado</p>
                )}
              </div>
            </div>

            {/* Detalles adicionales */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-800 text-sm uppercase font-bold">Ahorros</span>
                  <span className=" text-[#00755D] text-[24px]">
                    < FaDollarSign/>
                  </span>
                </div>
                <div className="text-2xl font-semibold">
                  ${montoAhorradoSocio}
                </div> 
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-800 text-sm uppercase font-bold">Ultima Transaccion</span>
                  <span className=" text-[#00755D] text-[24px]">
                    < FaDollarSign/>
                  </span>
                </div>
                <div className="text-2xl font-semibold">
                   {monto}
                </div> 
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-800 text-sm uppercase font-bold">Capital Endeudado</span>
                  <span className=" text-[#00755D] text-[24px]">
                    < FaDollarSign/>
                  </span>
                </div>
                <div className="text-2xl font-semibold">
                   ${prestamoSocio}
                </div> 
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 justify-center bg-white rounded-lg">
        <Link
          href="/SolicitarPrestamo/"
          className="px-4 py-2 bg-[#00755D] text-white rounded-lg hover:bg-[#e6be31] flex items-center justify-center"
        >
          Solicitar Prestamo
        </Link>
        <Link
          href="../../ListaMovimientos/RegistrarTransaccion"
          className="px-4 py-2 bg-[#00755D] text-white rounded-lg hover:bg-[#e6be31] flex items-center justify-center"
        >
          Registrar Transacción
        </Link>
      </div>

      {/* Tabla de Movimientos */}
      <div className="overflow-x-auto p-6 py-4">
        <div><h2 className="font-bold py-2 text-[#00755D] text-[25px]">Movimientos</h2></div>
        {dataMovimientos.length === 0 ? (
          <div className="text-center text-gray-500 py-6">
            No hay movimientos disponibles
          </div>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-[#00755D] text-white">
              <tr>
                <th className="p-2 border border-gray-300 w-[10%]">Tipo</th>
                <th className="p-2 border border-gray-300 w-[15%]">Fecha Pago</th>
                <th className="p-2 border border-gray-300 w-[20%]">Monto</th>
                <th className="p-2 border border-gray-300 w-[10%]">Estado</th>
                <th className="p-2 border border-gray-300 w-[35%]">Notas</th>
                <th className="p-2 border border-gray-300 w-[10%]">Ver</th>
              </tr>
            </thead>
            <tbody>
              {dataMovimientos.map((movimiento, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="p-2 border border-gray-300">{movimiento.tipo}</td>
                  <td className="p-2 border border-gray-300">{movimiento.fecha}</td>
                  <td className="p-2 border border-gray-300">
                    {movimiento.monto && !isNaN(movimiento.monto)
                        ? movimiento.monto.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      }): "$0.00"
                    }
                  </td>
                  <td className="p-2 border border-gray-300">{movimiento.estado === "1" ? "Realizada" : "Cancelada"}</td>
                  <td className="p-2 border border-gray-300">{movimiento.descripcion}</td>
                  <td className="p-2 border border-gray-300 text-center">
                    <Link
                      href={`../../ListaMovimientos/${movimiento.transaccionid}`}
                      className="text-[#00755D] hover:text-[#e6be31]"
                      onClick={() => handleSaveMovInCookies(movimiento.transaccionid)} // Guardamos el id en cookies al hacer clic
                    >
                      <IoEyeSharp className="inline-block" size={25} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Paginación */}
      {dataMovimientos.length > 0 && (
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
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
              className={`mx-1 px-3 py-1 rounded-md ${currentPage === totalPages ? "bg-gray-300 text-gray-500" : "bg-[#00755D] hover:bg-[#e6be31] text-white"}`}
            >
              Fin
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetallesSocio;
