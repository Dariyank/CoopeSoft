"use client";

import React, { useEffect, useState } from "react";
import { useRepresentante } from "../../uses/useRepresentante"; // // Ajusta la ruta según tu estructura
import Cookies from "js-cookie";

const RegistrarRepresentante = () => {
  const representanteId = Cookies.get("representanteId");
  const { representantes } = useRepresentante(); 
  const id = representanteId // Obtén el valor del parámetro 'id'

  const [formData, setFormData] = useState({
    id: "",
    nombres: "",
    apellidos: "",
    cedula: "",
    correo: "",
    telefono: "",
    edad: 0,
    genero: "",
    direccion: "",
  });

  useEffect(() => {
    if (id != undefined) {
      const representante = representantes.find((representante) => representante.id === id);
      let nombre = "Value", apellido = "Value";

      if(representante){
         const nombreC= representante.nombre.split(" ");
         nombre = nombreC[0];
         apellido = nombreC[1];
      }

      if (representante) {
        setFormData({
          id: representante.id,
          nombres: nombre,
          apellidos: apellido,
          cedula: representante.id,
          correo: representante.email,
          telefono: representante.telefono,
          edad: representante.edad,
          genero: representante.genero,
          direccion: representante.direccion,
        });
      }
    } else {
      // Si no hay ID, limpia los campos
      setFormData({
        id: "",
        nombres: "",
        apellidos: "",
        cedula: "",
        correo: "",
        telefono: "",
        edad: 0,
        genero: "",
        direccion: "",
      });
    }
  }, [id, representantes]);

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
        <h3>{id ? "Editar Representante" : "Registrar Representante"}</h3>
      </div>
      <div className="flex justify-center items-center py-6">
        <div className="w-full max-w-4xl p-8 bg-white border border-gray-300 rounded-md shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nombres" className="block text-sm font-medium text-gray-700">
                  Nombres
                </label>
                <input
                  type="text"
                  id="nombres"
                  value={formData.nombres}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00755D]"
                  placeholder="Ingrese los nombres"
                />
              </div>
              <div>
                <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700">
                  Apellidos
                </label>
                <input
                  type="text"
                  id="apellidos"
                  value={formData.apellidos}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00755D]"
                  placeholder="Ingrese los apellidos"
                />
              </div>
              <div>
                <label htmlFor="cedula" className="block text-sm font-medium text-gray-700">
                  Cédula
                </label>
                <input
                  type="text"
                  id="cedula"
                  value={formData.cedula}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00755D]"
                  placeholder="Ingrese la cédula"
                />
              </div>
              <div>
                <label htmlFor="correo" className="block text-sm font-medium text-gray-700">
                  Correo
                </label>
                <input
                  type="email"
                  id="correo"
                  value={formData.correo}
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
                {id ? "Actualizar Representante" : "Crear Representante"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrarRepresentante;
