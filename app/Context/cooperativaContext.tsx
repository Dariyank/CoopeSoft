"use client";

import React, { createContext, useState, PropsWithChildren, Dispatch, SetStateAction } from 'react';

// Define la interfaz para los Movimientos

export interface Cooperativa {
	cooperativaid: any;
	nombre: any;
	correo: any;
	rnc: any;
	localizacion: any;
	contacto: any;
	contrasena: any;
}


// Define la interfaz para el contexto
interface CooperativaContextType {
  cooperativa: Cooperativa | null;
  setCooperativa: Dispatch<SetStateAction<Cooperativa | null>>;
}

// Crea el contexto con un valor inicial
export const CooperativaContext = createContext<CooperativaContextType | undefined>(undefined);

// Define el proveedor
export const CooperativaProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [cooperativa, setCooperativa] = useState<Cooperativa | null>(null);

  return (
    <CooperativaContext.Provider value={{ cooperativa, setCooperativa }}>
      {children}
    </CooperativaContext.Provider>
  );
};
