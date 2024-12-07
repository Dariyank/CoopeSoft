"use client";
import { 
  obtenerPrestamosPorSocio,
  insertarTransaccion
} from '@/app/actions'

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { usePrestamos } from '@/app/uses/usePrestamos';

const RegistrarTransaccion = () => {

  const [showModal, setShowModal] = useState(false);  // Estado para mostrar el modal
  const [modalMessage, setModalMessage] = useState(""); //
  // const { socio, setSocio } = useSocio();
  const { prestamos, setPrestamos } = usePrestamos();
  const cookie = Cookies.get("socioId")
  let socioID ="";
  let id ="";
  if(cookie != undefined){
    socioID = cookie;
    id = cookie;
  }

  //Inizializa lista de prestamos actuales de socio
  useEffect(() => {
    const fetchData = async () => {
      const socioID = Cookies.get("socioId");
      
      if(socioID){
        const { success, data, error } = await obtenerPrestamosPorSocio(socioID);

        if (success && Array.isArray(data)) {
          setPrestamos(data);
        } else {
          console.error('Error fetching socio:', error || 'Invalid data');
        }
      }
    };
    fetchData();
  }, [setPrestamos]);

  const [formData, setFormData] = useState({
    representanteid: 1,
    prestamoid: 0,
    monto: 0,
    tipo: "",
    estado:'',
    descripcion: "",
    cooperativaid: 0
  });

  useEffect(() => {
    setFormData({
      representanteid: Number("1"),
      prestamoid: Number("0"),
      monto: 0,
      tipo: "",
      estado:'1',
      descripcion: "",
      cooperativaid: 1
    });
  }, [id]);

  //Validacion de datos en los campos
  const validateForm = () => {

    // Validación de monto (debe ser mayor que 0)
    if (isNaN(formData.monto) || formData.monto <= 0) {
      alert('El monto debe ser un número positivo.');
      return false;
    }

    // Validación de tipo (debe ser PagoPrestamo o Deposito)
    if (formData.tipo !== 'PagoPrestamo' && formData.tipo !== 'Deposito') {
      alert('El tipo de transacción debe ser "PagoPrestamo" o "Deposito".');
      return false;
    }

    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure that representanteid is always set to 1 before submitting
    const dataToSubmit = { ...formData, representanteid: 1 };

    if (validateForm()) {
      const { success, error } = await insertarTransaccion(socioID, dataToSubmit);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      success ? 
        (
          console.log("Datos enviados:", formData),
          setModalMessage("Taansaccion registrada"),
          setShowModal(true)
        ) :
        console.error('Error fetching socio:', error || 'Invalid data');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false); 
    window.history.back();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: id === "prestamoid" && value === "0" ? null : value, // Asigna null si el id es prestamoid y el valor es "0"
    }));
  };

  return (
    <div>
      <div className="px-6 uppercase font-extrabold text-[30px] text-[#00755D]">
        <h3>Crear Movimiento</h3>
      </div>
      <div className="flex justify-center items-center py-6">
        <div className="w-full max-w-4xl p-8 bg-white border border-gray-300 rounded-md shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="tipo">
                <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">
                  Tipo de transacción
                </label>
                <select
                  id="tipo"
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00755D]"
                >
                  <option value="">Seleccione...</option>
                  <option value="Deposito">Deposito</option>
                  <option value="PagoPrestamo">Pago prestamo</option>
                </select>
              </div>

              {/* Select de préstamo */}
              <div className="prestamo">
                <label htmlFor="prestamoid" className="block text-sm font-medium text-gray-700">
                  Préstamo
                </label>
                <select
                  id="prestamoid"
                  name="prestamoid"
                  value={formData.prestamoid ?? ''}
                  onChange={handleInputChange}
                  disabled={formData.tipo === 'masculino'} // Deshabilitar si el tipo es "Deposito"
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00755D]"
                >
                  <option value="">Seleccione...</option>
                  {prestamos.map((prestamo) => (
                    <option key={prestamo.prestamoid} value={prestamo.prestamoid}>
                      Préstamo ${prestamo.totalprestado}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className ="monto">
                <label htmlFor="monto" className="block text-sm font-medium text-gray-700">
                  Monto
                </label>
                <input
                  type="number"
                  id="monto"
                  value={formData.monto}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00755D]"
                  placeholder="Ingrese el monto que desea"
                />
              </div>
              <div className="descripcion col-span-1 md:col-span-2">
                <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
                  Descripcion
                </label>
                <input
                  type="text"
                  id="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00755D]"
                  placeholder="Ingrese uina descripcion"
                />
              </div>
            </div>
            <div className="mt-6 text-center">
              <button
                type="submit"
                className="px-6 py-2 text-white bg-[#00755D] hover:bg-[#e6be31] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00755D] focus:ring-offset-2"
              >
                Crear movimiento
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

export default RegistrarTransaccion;
