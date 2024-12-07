/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";
import { obtenerSocio, insertarSocio, actualizarSocio } from '@/app/actions'

import React, { useEffect, useState } from "react";
import { useSocio } from "../../uses/useSocio";
import Cookies from "js-cookie";

const RegistrarSocio = () => {
  const socioId = Cookies.get("socioId");
  const [showModal, setShowModal] = useState(false);  // Estado para mostrar el modal
  const [modalMessage, setModalMessage] = useState(""); //
  const { socio, setSocio } = useSocio();
  const id = socioId // Obtén el valor del parámetro 'id'

  const [formData, setFormData] = useState({
    nombre: "",
    cooperativaid: 0,
    genero: "",
    correo: "",
    edad: 0,
    telefono: "",
    salario: 0,
    direccion: "",
    registro: "",
    montoahorrado: 0,
    empresa: "",
    cedula: ""
  });

    //Validacion de datos en los campos
  const validateForm = () => {
  
    // Validaciones adicionales para campos específicos
    if (isNaN(Number(formData.edad)) || Number(formData.edad) <= 0) {
      alert('La edad debe ser un número positivo.');
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(String(formData.correo))) {
      alert('El correo no tiene un formato válido.');
      return false;
    }
    if (isNaN(Number(formData.montoahorrado)) || Number(formData.montoahorrado) < 0) {
      alert('El monto ahorrado debe ser un número mayor o igual a cero.');
      return false;
    }
    if (isNaN(Number(formData.salario)) || Number(formData.salario) < 0) {
      alert('El salario debe ser un número mayor o igual a cero.');
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

  useEffect(() => {
    if (id != undefined) {

      if (socio) {
        setFormData({
          nombre: socio.nombre,
          cooperativaid: 1,
          genero: socio.genero,
          correo: socio.correo,
          edad: socio.edad,
          telefono: socio.telefono,
          salario: socio.salario,
          direccion: socio.direccion,
          registro: socio.registro,
          montoahorrado: socio.montoahorrado,
          empresa: socio.empresa,
          cedula: socio.cedula
        });
      }
    } else {
      // Si no hay ID, limpia los campos
      setFormData({
        nombre: "",
        cooperativaid: 1,
        genero: "",
        correo: "",
        edad: 0,
        telefono: "",
        salario: 0,
        direccion: "",
        registro: "",
        montoahorrado: 0,
        empresa: "",
        cedula: ""
      });
    }
  }, [id, socio]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let successData, errorData
    if (!id && validateForm()) {
      const { success, error } = await insertarSocio(formData);
      successData = success;
      errorData = error;
    }else if (id && validateForm()) {
      const { success, error } = await actualizarSocio(id, formData);
      successData = success;
      errorData = error;
    } else {
      console.log("Datos enviados:", formData);
    }
    if (successData) {
      !id ? setModalMessage("Cliente registrado") : setModalMessage("Cliente Actualizado");
      setShowModal(true);
      !id ? limpiarDatos() : (
        setTimeout(() => {
        window.history.back(); // Regresa a la página anterior
        }, 1000) 
      );
    } else {
      console.error('Error fetching socio:', errorData || 'Invalid data');
    }
  };

  const limpiarDatos = () => {
    setSocio(null);  // Limpia los datos del socio
  };

  const handleCloseModal = () => {
    setShowModal(false);  // Cerrar el modal
    window.location.reload();  // Recargar la página
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
              <div className ="nombre">
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
              <div className ="cedula">
                <label htmlFor="cedula" className="block text-sm font-medium text-gray-700">
                  Cedula
                </label>
                <input
                  type="text"
                  id="cedula"
                  value={formData.cedula}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00755D]"
                  placeholder="Ingrese su cedula"
                />
              </div>
              <div className='Correo'>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Correo
                </label>
                <input
                  type="text"
                  id="correo"
                  value={formData.correo}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00755D]"
                  placeholder="Ingrese el correo"
                />
              </div>
              <div className='telefono'>
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
              <div className='genero'>
                <label htmlFor="genero" className="block text-sm font-medium text-gray-700">
                  Género
                </label>
                <select
                  id="genero"
                  value={formData.genero != "" ? formData.genero : ""}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00755D]"
                >
                  <option value="">Seleccione...</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                  <option value="no_identificado">No me identifico</option>
                </select>
              </div>
              <div className='edad'>
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
              <div className='empresa'>
                <label htmlFor="empresa" className="block text-sm font-medium text-gray-700">
                  Empresa
                </label>
                <input
                  type="string"
                  id="empresa"
                  value={formData.empresa}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00755D]"
                  placeholder="Ingrese el correo"
                />
              </div>
              <div className='salario'>
                <label htmlFor="salario" className="block text-sm font-medium text-gray-700">
                  Salario
                </label>
                <input
                  type="number"
                  id="salario"
                  value={formData.salario}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00755D]"
                  placeholder="Ingrese su salario"
                />
              </div>
              <div className="direccion col-span-1 md:col-span-2">
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

export default RegistrarSocio;
