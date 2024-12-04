"use client";

import React, { useEffect, useState } from "react";
import { useSocio } from "../../uses/useSocio"; // Ajusta la ruta según tu estructura
import Cookies from "js-cookie";

const RegistrarSocio = () => {
  const socioId = Cookies.get("socioId");
  const { socios } = useSocio(); 
  const id = socioId // Obtén el valor del parámetro 'id'

  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    email: "",
    telefono: "",
    genero: "",
    edad: 0,
    direccion: "",
  });

  useEffect(() => {
    if (id != undefined) {
      const socio = socios.find((socio) => socio.id === id);

      if (socio) {
        setFormData({
          id: socio.id,
          nombre: socio.nombre,
          email: socio.email,
          telefono: socio.telefono,
          genero: socio.genero,
          edad: socio.edad,
          direccion: socio.direccion,
        });
      }
    } else {
      // Si no hay ID, limpia los campos
      setFormData({
        id: "",
        nombre: "",
        email: "",
        telefono: "",
        genero: "",
        edad: 0,
        direccion: "",
      });
    }
  }, [id, socios]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para enviar los datos actualizados o crear un nuevo socio
    console.log("Datos enviados:", formData);
  };

  return (
    <div>
      <div className="px-6 uppercase font-extrabold text-[30px] text-[#00755D]">
        <h3>{id ? "Editar Socio" : "Registrar Socio"}</h3>
      </div>
      <div className="flex justify-center items-center py-6">
        <div className="w-full max-w-4xl p-8 bg-white border border-gray-300 rounded-md shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                  Nombres
                </label>
                <input
                  type="text"
                  id="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00755D]"
                  placeholder="Ingrese los nombres"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Correo
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00755D]"
                  placeholder="Ingrese el correo"
                />
              </div>
              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
                  Teléfono
                </label>
                <input
                  type="text"
                  id="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00755D]"
                  placeholder="Ingrese el teléfono"
                />
              </div>
              <div>
                <label htmlFor="genero" className="block text-sm font-medium text-gray-700">
                  Género
                </label>
                <select
                  id="genero"
                  value={formData.genero}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00755D]"
                >
                  <option value="">Seleccione...</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                  <option value="no_identificado">No me identifico</option>
                </select>
              </div>
              <div>
                <label htmlFor="edad" className="block text-sm font-medium text-gray-700">
                  Edad
                </label>
                <input
                  type="number"
                  id="edad"
                  value={formData.edad}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00755D]"
                  placeholder="Ingrese la edad"
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">
                  Dirección
                </label>
                <input
                  type="text"
                  id="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00755D]"
                  placeholder="Ingrese la dirección"
                />
              </div>
            </div>
            <div className="mt-6 text-center">
              <button
                type="submit"
                className="px-6 py-2 text-white bg-[#00755D] hover:bg-[#e6be31] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00755D] focus:ring-offset-2"
              >
                {id ? "Actualizar socio" : "Crear socio"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrarSocio;
