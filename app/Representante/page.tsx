import React from "react";
// import Image from "next/image";

const RepresentantePage = () => {
  return (
    <div className="min-h-screen bg-white">

      {/* Main Content */}
      <main className="p-6">
        <h1 className="uppercase font-extrabold text-[30px] text-[#00755D] mb-4">Buscar Socio</h1>
        <div className="bg-white p-6 rounded-md shadow-md">
          <form className="grid grid-cols-2 gap-4">
            {/* Nombre del Socio*/}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Nombre del Socio
              </label>
              <input
                type="text"
                placeholder="Nombre del Socio"
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-[#00755D] focus:ring-[#00755D]"
              />
            </div>

            {/* Correo Electrónico */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Correo Electrónico
              </label>
              <input
                type="email"
                placeholder="Correo Electrónico"
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-[#00755D] focus:ring-[#00755D]"
              />
            </div>

            {/* Cédula */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">Cédula</label>
              <input
                type="text"
                placeholder="Cédula"
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-[#00755D] focus:ring-[#00755D]"
              />
            </div>

            {/* Fecha de Nacimiento */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-[#00755D] focus:ring-[#00755D]"
              />
            </div>

            {/* Empresa */}
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-700">Empresa</label>
              <input
                type="text"
                placeholder="Empresa"
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-[#00755D] focus:ring-[#00755D]"
              />
            </div>

            {/* Botón de Buscar Representante */}
            <div className="col-span-2 flex justify-center mt-4">
              <button
                type="submit"
                className="bg-[#00755D] text-white font-semibold px-6 py-2 rounded-md shadow hover:bg-[#005f4a] focus:ring-2 focus:ring-[#00755D] focus:outline-none"
              >
                Buscar Socio
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default RepresentantePage;
