"use client";

import React, { createContext, useState, PropsWithChildren, Dispatch, SetStateAction } from 'react';

// Define la interfaz para los representantes

export interface Prestamos {
  prestamoid: string;
  socioid: string;
  representanteid: string;
  taza: number;
  tiempo: number;
  totalprestado: number;
  totaloriginal: number;
  fecha: string;
  montomensual: number;
}


// Define la interfaz para el contexto
interface PrestamosContextType {
  prestamos: Prestamos[];
  setPrestamos: Dispatch<SetStateAction<Prestamos[]>>;
}

// Crea el contexto con un valor inicial
export const PrestamosContext = createContext<PrestamosContextType | undefined>(undefined);

// Define el proveedor
export const PrestamosProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [prestamos, setPrestamos] = useState<Prestamos[]>([]);

  return (
    <PrestamosContext.Provider value={{ prestamos, setPrestamos }}>
      {children}
    </PrestamosContext.Provider>
  );
};
