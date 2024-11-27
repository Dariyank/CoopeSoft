"use client";

import { useParams } from "next/navigation"; // Para obtener parámetros dinámicos

const DetallesSocio = () => {
  const { id } = useParams(); // Extrae el `id` desde la URL
  
  // Decodificar el parámetro `id` para manejar espacios y otros caracteres especiales
  const nombreDecodificado = id ? decodeURIComponent(String(id)) : "";

  return (
    <div>
      <h1>Detalles del Socio</h1>
      <p>{nombreDecodificado}</p>
      {/* Aquí puedes mostrar más detalles sobre el socio */}
    </div>
  );
};

export default DetallesSocio;
