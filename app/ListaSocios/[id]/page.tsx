"use client";
import { FaDollarSign } from "react-icons/fa6";
import { useParams } from "next/navigation"; // Para obtener parámetros dinámicos
import { useSocio } from "@/app/useSocio/page"; // Asegúrate de importar el contexto

const DetallesSocio = () => {
  const { id } = useParams(); // Extrae el id desde la URL
  const { socios } = useSocio(); // Obtén el contexto de socios

  // Filtrar el socio según el ID o nombre (según lo que esté pasando como parámetro)
  const socio = socios.find(s => s.id === id);

  // Si el socio existe, se muestra el nombre. Si no, se puede mostrar un mensaje de error.
  const nombreSocio = socio ? socio.nombre : "Socio no encontrado";
  const cedula = socio ? socio.id : "Socio no encontrado";
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
                <h2 className="font-bold text-[24px] text-[#00755D]">
                  {nombreSocio}
                </h2>
                {socio ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="px-2">
                      <p className="text-sm"><strong>Cédula: </strong>{cedula}</p>
                      <p className="text-sm"><strong>Email: </strong>{socio.email}</p>
                      <p className="text-sm font-bold">Teléfono:</p>
                    </div>
                    <div className="px-2">
                      <p className="text-sm font-bold">Género:</p>
                      <p className="text-sm font-bold">Edad:</p>
                      <p className="text-sm"><strong>Compañía: </strong>{socio.empresa}</p>
                    </div>
                    <div className="px-2">
                      <p className="text-sm font-bold">Salario:</p>
                      <p className="text-sm font-bold">Dirección:</p>
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
                   $248,358.35
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
                   $248,358.35
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
                   $248,358.35
                </div> 
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default DetallesSocio;
