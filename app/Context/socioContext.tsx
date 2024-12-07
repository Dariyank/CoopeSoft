import React, { createContext, useState, PropsWithChildren, Dispatch, SetStateAction } from 'react';

// Define la interfaz para los socio
export interface Socio {
  socioid: string;
  nombre: string;
  genero: string;
  correo: string;
  edad: number;
  telefono: string;
  salario: number;
  direccion: string;
  registro: string;
  montoahorrado: number;
  estado: string;
  empresa: string;
  cedula: string
}

// Define la interfaz para el contexto
interface SocioContextType {
  socio: Socio | null; // Ahora es un solo objeto o null si no hay socio
  setSocio: Dispatch<SetStateAction<Socio | null>>; // Método para actualizar el socio
}

// Crea el contexto con un valor inicial
export const SocioContext = createContext<SocioContextType | undefined>(undefined);

// Define el proveedor
export const SocioProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [socio, setSocio] = useState<Socio | null>(null); // Inicialmente no hay socio

  return (
    <SocioContext.Provider value={{ socio, setSocio }}>
      {children}
    </SocioContext.Provider>
  );
};
