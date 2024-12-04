"use client";

import React, { createContext, useState, PropsWithChildren, Dispatch, SetStateAction } from 'react';

// Define la interfaz para los representantes

export interface Prestamo {
  id: string;
  nombre: string;
  email: string;
  diaSolicitud: string;
  montoPrestado: number;
  estado:string;
  tasaInteres: GLfloat;
}


// Define la interfaz para el contexto
interface PrestamoContextType {
  prestamos: Prestamo[];
  setPrestamos: Dispatch<SetStateAction<Prestamo[]>>;
}

// Crea el contexto con un valor inicial
export const PrestamoContext = createContext<PrestamoContextType | undefined>(undefined);

// Define el proveedor
export const PrestamoProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);

  return (
    <PrestamoContext.Provider value={{ prestamos, setPrestamos }}>
      {children}
    </PrestamoContext.Provider>
  );
};
