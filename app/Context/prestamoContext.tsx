"use client";

import React, { createContext, useState, PropsWithChildren, Dispatch, SetStateAction } from 'react';

// Define la interfaz para los representantes

export interface Prestamo {
  prestamoid: string;
  socioid: string;
  representanteid: string;
  tiempo: number;
  totalprestado: number;
  fecha: string;
  montomensual: number;
  totaloriginal: number;
  taza: number;
}


// Define la interfaz para el contexto
interface PrestamoContextType {
  prestamo: Prestamo | null;
  setPrestamo: Dispatch<SetStateAction<Prestamo | null>>;
}

// Crea el contexto con un valor inicial
export const PrestamoContext = createContext<PrestamoContextType | undefined>(undefined);

// Define el proveedor
export const PrestamoProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [prestamo, setPrestamo] = useState<Prestamo | null>(null); // Inicialmente no hay socio

  return (
    <PrestamoContext.Provider value={{ prestamo, setPrestamo }}>
      {children}
    </PrestamoContext.Provider>
  );
};
