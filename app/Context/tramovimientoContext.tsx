"use client";

import React, { createContext, useState, PropsWithChildren, Dispatch, SetStateAction } from 'react';

// Define la interfaz para los representantes

export interface TransaccionExtendida {
  transaccionid: number;
  nombresocio: string;
  nombrerepresentante: string;
  tipo: string;
  monto: number;
  fecha: string;
  estado: string;
  descripcion: string;
}


// Define la interfaz para el contexto
interface MovimientosContextType {
  movimientos: TransaccionExtendida | null;
  setMovimientos: Dispatch<SetStateAction<TransaccionExtendida | null>>;
}

// Crea el contexto con un valor inicial
export const MovimientosContext = createContext<MovimientosContextType | undefined>(undefined);

// Define el proveedor
export const MovimientosProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [movimientos, setMovimientos] = useState<TransaccionExtendida | null>(null);

  return (
    <MovimientosContext.Provider value={{ movimientos, setMovimientos }}>
      {children}
    </MovimientosContext.Provider>
  );
};