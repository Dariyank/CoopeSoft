"use client";

import React, { createContext, useState, PropsWithChildren, Dispatch, SetStateAction } from 'react';

// Define la interfaz para los Movimientos

interface Movimiento {
  tipo: string;
  fechaPago: string;
  monto: number;
  estado: string;
  notas: string;
  cliente:string;
}


// Define la interfaz para el contexto
interface MovimientoContextType {
  movimiento: Movimiento[];
  setMovimiento: Dispatch<SetStateAction<Movimiento[]>>;
}

// Crea el contexto con un valor inicial
export const MovimientoContext = createContext<MovimientoContextType | undefined>(undefined);

// Define el proveedor
export const MovimientoProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [movimiento, setMovimiento] = useState<Movimiento[]>([]);

  return (
    <MovimientoContext.Provider value={{ movimiento, setMovimiento }}>
      {children}
    </MovimientoContext.Provider>
  );
};
