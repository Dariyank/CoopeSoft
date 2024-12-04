"use client";

import React, { createContext, useState, PropsWithChildren, Dispatch, SetStateAction } from 'react';

// Define la interfaz para los representantes

export interface Movimientos {
  id: string;
  tipoMovimiento: string;
  nombre: string;
  representante: string;
  fechaRealizada: string;
  monto: number;
}


// Define la interfaz para el contexto
interface MovimientosContextType {
  movimientos: Movimientos[];
  setMovimientos: Dispatch<SetStateAction<Movimientos[]>>;
}

// Crea el contexto con un valor inicial
export const MovimientosContext = createContext<MovimientosContextType | undefined>(undefined);

// Define el proveedor
export const MovimientosProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [movimientos, setMovimientos] = useState<Movimientos[]>([]);

  return (
    <MovimientosContext.Provider value={{ movimientos, setMovimientos }}>
      {children}
    </MovimientosContext.Provider>
  );
};
