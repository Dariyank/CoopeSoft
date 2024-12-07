/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";


import { actualizarRepresentante, insertarRepresentante, obtenerRepresentante } from '@/app/actions'

import React, { useEffect, useState } from "react";
import { useRepresentante } from "../../uses/useRepresentante"; 
import Cookies from "js-cookie";

const RegistrarRepresentante = () => {
  const representanteID = Cookies.get("representanteId");
  const id = representanteID || ""; // Obtén el valor del parámetro 'id
  const {representante, setRepresentante} = useRepresentante();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showModal, setShowModal] = useState(false); 
  const [modalMessage, setModalMessage] = useState(""); 

  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    cooperativaid: 1,
    genero: "",
    edad: 0,
    direccion: "",
    correo: "",
    telefono: "",
    contrasena: "",
    confirmcontrasena: ""
  });

  const validateForm = () => {
    
    // Validaciones adicionales para campos específicos
    if (isNaN(Number(formData.edad)) || Number(formData.edad) <= 0 || Number(formData.edad) >= 110) {
      alert('La edad debe ser un número valido.');
      return false;
    }
    if (isNaN(Number(formData.cooperativaid)) || Number(formData.cooperativaid) <= 0) {
      alert('El ID de la cooperativa debe ser un número positivo.');
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(String(formData.correo))) {
      alert('El correo no tiene un formato válido.');
      return false;
    }
    if (formData.contrasena !== formData.confirmcontrasena) {
      alert('Las contraseñas no coinciden.');
      return false;
    }
    if ( formData.genero == "") {
      alert('Debes elegir un genero en el formulario');
      return false;
    }

    return true;
  };

  useEffect(() => {
    limpiarDatos();
    const fetchData = async () => {
      
      if(representanteID){
        const { success, data, error } = await obtenerRepresentante(representanteID);

        if (success && Array.isArray(data)) {
          setRepresentante(data[0]);
        } else {
          console.error('Error fetching socio:', error || 'Invalid data');
        }
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (id != "") {
      if (representante) {
        const nombres = representante.nombre.split(" ");
        const nombre = nombres[0];
        const apellido = nombres[1];
        setFormData({
          nombres: nombre,
          apellidos: apellido,
          cooperativaid: 1,
          genero: representante.genero,
          edad: representante.edad,
          direccion: representante.direccion,
          correo: representante.correo,
          telefono: representante.telefono,
          contrasena: "",
          confirmcontrasena: ""
        });
      }
    } else {
      // Si no hay ID, limpia los campos
      setFormData({
        nombres: "",
        apellidos: "",
        cooperativaid: 1,
        genero: "",
        edad: 0,
        direccion: "",
        correo: "",
        telefono: "",
        contrasena: "",
        confirmcontrasena: ""
      });
    }
  }, [id, representante]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let errorData, successData;
    if (!id && validateForm()) {
      const formRightData = {
        nombre: formData.nombres + " " + formData.apellidos,
        cooperativaid: 1,
        genero: formData.genero,
        edad: formData.edad,
        direccion: formData.direccion,
        correo: formData.correo,
        telefono: formData.telefono,
        contrasena: formData.contrasena,
      }
      const { success, error } = await insertarRepresentante(formRightData);
      errorData = error;
      if(success){
        setModalMessage("Representante registrado")
        setShowModal(true);
        limpiarDatos() 
      }
    } else if(id && validateForm()){
      const formRightData = {
        nombre: formData.nombres + " " + formData.apellidos,
        cooperativaid: 1,
        genero: formData.genero,
        edad: formData.edad,
        direccion: formData.direccion,
        correo: formData.correo,
        telefono: formData.telefono,
        contrasena: formData.contrasena,
      }
      const { success, error } = await actualizarRepresentante(id, formRightData);
      successData = success;
      errorData = error;
    }else {
      console.error('Error fetching socio:', errorData || 'Invalid data');
    }
    if (successData) {
      !id ? setModalMessage("Representante registrado") : setModalMessage("Representante Actualizado");
      setShowModal(true);
      !id ? limpiarDatos() : (
        setTimeout(() => {
        window.history.back(); // Regresa a la página anterior
        }, 1000) 
      );
    } else {
      console.error('Error fetching representante:', errorData || 'Invalid data');
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  
  const limpiarDatos = () => {
    setRepresentante(null);  // Limpia los datos del socio
  };

  const handleCloseModal = () => {
    setShowModal(false);  // Cerrar el modal
    window.location.reload();  // Recargar la página
  };

  return (
    <div>
      <div className="px-6 uppercase font-extrabold text-[30px] text-[#00755D]">
        <h3>{"Registrar Representante"}</h3>
      </div>
      <div className="flex justify-center items-center py-6">
        <div className="w-full max-w-4xl p-8 bg-white border border-gray-300 rounded-md shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nombres" className="block text-sm font-medium text-gray-700">
                  Nombre
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
                  Apellido
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
                  value={formData.edad === 0 ? "" : formData.edad}
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
              <div>
                <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="contrasena"
                  value={formData.contrasena}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00755D]"
                  placeholder="Ingrese la contraseña"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-2 text-sm text-gray-500"
                >
                  {isPasswordVisible ? "Ocultar" : "Mostrar"}
                </button>
              </div>
              <div>
                <label htmlFor="confirmcontrasena" className="block text-sm font-medium text-gray-700">
                  Confirmar contraseña
                </label>
                <input
                  type="password"
                  id="confirmcontrasena"
                  value={formData.confirmcontrasena}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00755D]"
                  placeholder="Repitala aqui debajo"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-2 text-sm text-gray-500"
                >
                  {isPasswordVisible ? "Ocultar" : "Mostrar"}
                </button>
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
      {/* Modal de éxito */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-black">
          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <h3 className="text-green-500 text-2xl">{modalMessage}</h3>
            <button
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md"
              onClick={handleCloseModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrarRepresentante;
