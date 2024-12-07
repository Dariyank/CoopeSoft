"use client";

import { FaEnvelope, FaLock } from "react-icons/fa";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  crearCooperativa
} from '@/app/actions'
import Cookies from 'js-cookie';

const LoginPage = () => {
  const router = useRouter()

    const [formValuesCrear, setFormValuesCrear] = useState({
      correo: '',
      nombre: '',
      localizacion: '',
      rnc: '',
      contacto: '',
      contrasena: '',
      confirmar: ''
    });

    const [formValueIniciar, setFormValuesIniciar] = useState({
      correo: '',
      contrasena: ''
    });

    const validateFormCrear = () => {
      // Validaciones adicionales para campos específicos
      if (isNaN(Number(formValuesCrear.rnc)) || Number(formValuesCrear.rnc) <= 0) {
        alert('La edad debe ser un número positivo.');
        return false;
      }
      if (!/^\S+@\S+\.\S+$/.test(String(formValuesCrear.correo))) {
        alert('El correo no tiene un formato válido.');
        return false;
      }
      if (formValuesCrear.contrasena != "" && formValuesCrear.contrasena.length < 5) {
        alert('La tienes muy chica o que? Vacio o pequeño esa clave esta');
        return false;
      }
      if (formValuesCrear.contrasena !== formValuesCrear.confirmar) {
        alert('Las contraseñas no coinciden.');
        return false;
      }
      if ( formValuesCrear.localizacion == "") {
        alert('Debes ser un lugar fisico mijo');
        return false;
      }
    
      return true;
    };

    const validateFormIniciar = () => {
      // Validaciones adicionales para campos específicos
      if (formValueIniciar.contrasena != "") {
        alert('Debes escribir tu contraseña');
        return false;
      }
      if (formValueIniciar.correo != "") {
        alert('Debes escribir tu correo');
        return false;
      }
    
      return true;
    };
  
    const handleChangeCrear = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { id, value } = e.target;
      setFormValuesCrear((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleChangeIniciar = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { id, value } = e.target;
      setFormValuesIniciar((prevData) => ({ ...prevData, [id]: value }));
    };

    // const handleObtener = async () => {
    //   const {success, data} = await obtenerCooperativa('1');
    // }
    const handleSubmitCrear = async (e: React.FormEvent) => {
      e.preventDefault();
      let dataC = {
        cooperativaid: 0,
        nombre: "",
        correo: "",
        rnc: "",
        localizacion: "",
        contacto: "",
        contrasena: ""
      }
      let successData, errorData
      if (validateFormCrear()){
        const { success, data, error } = await crearCooperativa(formValuesCrear);
        successData = success;
        errorData = error;
      }

      // handleObtener();
      if (successData && dataC) {
        setModalMessage("Cliente registrado");
        Cookies.set('socioId', formValuesCrear.correo, { expires: 7 });
        router.push('/');
      } else {
        console.error('Error fetching socio:', errorData || 'Invalid data');
      }
  
      // console.log('Form Values:', formValuesCrear);
  
      // Simulamos que la cooperativa se crea exitosamente y redirigimos
       // Redirige a la página de inicio
    };

    

    // Llamada a la función
    const handleSubmitiniciar = async (e: React.FormEvent) => {
      e.preventDefault();

      if (validateFormIniciar()) {
        try {
          Cookies.set('usertype', '1', { expires: 7 });
          router.push('/Dashboard');
        } catch (err) {
          console.error('Error en el login:', err);
        }
      }
    };


  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100">
      {/* Login and Register Forms */}
      <main className="flex flex-col lg:flex-row justify-center items-center gap-10 mt-12">
        {/* Login Form */}
        <div className="bg-white shadow-md rounded-lg p-8 w-[350px]">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Iniciar Sesión</h2>
          <form onSubmit={handleSubmitiniciar}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 font-medium mb-2">
                Correo
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  onChange={handleChangeIniciar} // Asegúrate de que esto esté en todos los inputs
                  placeholder="email@address.com"
                  className="w-full border rounded-md pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-[#00755D]"
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-600 font-medium mb-2">
                Contraseña
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  onChange={handleChangeIniciar} // Asegúrate de que esto esté en todos los inputs
                  placeholder="********"
                  className="w-full border rounded-md pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-[#00755D]"
                />
              </div>
            </div>
              <button
                type="submit"
                className="w-full bg-[#00755D] text-white py-2 rounded-md font-medium hover:bg-[#005844] transition-colors"
              >
                Iniciar sesión
              </button>
          </form>
          <p className="focus:ring-[#00755D]">correo:contacto@cooperativaejemplo.com</p>
          <p className="focus:ring-[#00755D]">contraseña:contraseña_segura</p>
        </div>


        {/* Register Form */}
        <div className="bg-white shadow-md rounded-lg p-8 w-[350px]">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Crear cuenta</h2>
          <form onSubmit={handleSubmitCrear}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 font-medium mb-2">
                Correo
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  id="correo"
                  value={formValuesCrear.correo}
                  onChange={handleChangeCrear} // Asegúrate de que esto esté en todos los inputs
                  placeholder="Cooperativa@Ejemplo.com"
                  className="w-full border rounded-md pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-[#00755D]"
                />
              </div>
            </div>

            <div className="flex space-x-4 mb-4">
              <div className="w-1/2">
                <label htmlFor="nombre" className="block text-gray-600 font-medium mb-2">
                  Nombre
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      id="nombre"
                      value={formValuesCrear.nombre}
                      onChange={handleChangeCrear} // Asegúrate de que esto esté en todos los inputs
                      placeholder="Cooperativa Ejemplo"
                      className="w-full border rounded-md pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-[#00755D]"
                    />
                </div>
              </div>

              <div className="w-1/2">
                <label htmlFor="rnc" className="block text-gray-600 font-medium mb-2">
                  RNC
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    id="rnc"
                    value={formValuesCrear.rnc}
                    onChange={handleChangeCrear}
                    placeholder="X-XXX-XXXX-XX"
                    className="w-full border rounded-md pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-[#00755D]"
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="localizacion" className="block text-gray-600 font-medium mb-2">
                Localización
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  id="localizacion"  // Cambié el id de "direccion" a "localizacion"
                  value={formValuesCrear.localizacion}
                  onChange={handleChangeCrear}
                  placeholder="Av/ Ejemplo"
                  className="w-full border rounded-md pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-[#00755D]"
                />
              </div>
            </div>
            <div className="w-full mb-4">
              <label htmlFor="contacto" className="block text-gray-600 font-medium mb-2">
                Contacto
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  id="contacto"  // Cambié el id de "contact" a "contacto"
                  value={formValuesCrear.contacto}
                  onChange={handleChangeCrear}
                  placeholder="Juan CEO"
                  className="w-full border rounded-md pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-[#00755D]"
                />
              </div>
            </div>
            <div className="flex space-x-4 mb-4">
              <div className="w-1/2">
                <label htmlFor="contrasena" className="block text-gray-600 font-medium mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="password"
                    id="contrasena"
                    value={formValuesCrear.contrasena}
                    onChange={handleChangeCrear}
                    placeholder="********"
                    className="w-full border rounded-md pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-[#00755D]"
                  />
                </div>
              </div>

              <div className="w-1/2">
                <label htmlFor="confirmar" className="block text-gray-600 font-medium mb-2">
                  Confirma
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="password"
                    id="confirmar"
                    value={formValuesCrear.confirmar}
                    onChange={handleChangeCrear}
                    placeholder="********"
                    className="w-full border rounded-md pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-[#00755D]"
                  />
                </div>
              </div>
            </div>

              <button
                type="submit"
                className="w-full bg-[#00755D] text-white py-2 rounded-md font-medium hover:bg-[#005844] transition-colors"
              >
                Crear cuenta
              </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
