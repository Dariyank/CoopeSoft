"use client";

import React, { createContext, useState, PropsWithChildren, Dispatch, SetStateAction } from 'react';

// Define la interfaz para los socios

export interface Socio {
  id: string;
  nombre: string;
  email: string;
  telefono:string;
  genero: string,
  edad:number,
  salario:number,
  direccion:string,
  registro: string;
  montoAhorrado: number;
  estado: string;
  empresa: string;
}

// Define la interfaz para el contexto
interface SocioContextType {
  socios: Socio[];
  setSocios: Dispatch<SetStateAction<Socio[]>>;
}

// Crea el contexto con un valor inicial
export const SocioContext = createContext<SocioContextType | undefined>(undefined);

// Define el proveedor
export const SocioProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [socios, setSocios] = useState<Socio[]>([]);

  return (
    <SocioContext.Provider value={{ socios, setSocios }}>
      {children}
    </SocioContext.Provider>
  );
};
