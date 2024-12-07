"use client";

import React, { createContext, useState, PropsWithChildren, Dispatch, SetStateAction } from 'react';

// Define la interfaz para los representantes

export interface PrestamosExtendido {
  prestamoid: number,
  socioid: number,
  nombresocio: string,
  correosocio: string,
  monto: number,
  taza: number,
  fecha: string,
  representante: string
}


// Define la interfaz para el contexto
interface PrestamosExtendidoContextType {
  prestamos: PrestamosExtendido[];
  setPrestamos: Dispatch<SetStateAction<PrestamosExtendido[]>>;
}

// Crea el contexto con un valor inicial
export const PrestamosExtendidoContext = createContext<PrestamosExtendidoContextType | undefined>(undefined);

// Define el proveedor
export const PrestamosExtendidosProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [prestamos, setPrestamos] = useState<PrestamosExtendido[]>([]);

  return (
    <PrestamosExtendidoContext.Provider value={{ prestamos, setPrestamos }}>
      {children}
    </PrestamosExtendidoContext.Provider>
  );
};
