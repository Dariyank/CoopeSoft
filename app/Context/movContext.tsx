"use client";

import React, { createContext, useState, PropsWithChildren, Dispatch, SetStateAction } from 'react';

// Define la interfaz para los Movimientos

interface Movimiento {
  tipo: string;
  fechaPago: string;
  monto: number;
  estado: string;
  notas: string;
}


// Define la interfaz para el contexto
interface MovimientoContextType {
  movimientos: Movimiento[];
  setMovimiento: Dispatch<SetStateAction<Movimiento[]>>;
}

// Crea el contexto con un valor inicial
export const MovimientoContext = createContext<MovimientoContextType | undefined>(undefined);

// Define el proveedor
export const MovimientoProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [movimientos, setMovimiento] = useState<Movimiento[]>([]);

  return (
    <MovimientoContext.Provider value={{ movimientos, setMovimiento }}>
      {children}
    </MovimientoContext.Provider>
  );
};
