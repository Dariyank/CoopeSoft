"use client";

import React, { createContext, useState, PropsWithChildren, Dispatch, SetStateAction } from 'react';

// Define la interfaz para los socios

export interface Socios {
  socioid: string;
  nombre: string;
  genero: string,
  correo: string;
  edad:number,
  telefono:string;
  salario:number,
  direccion:string,
  registro: string;
  montoahorrado: number;
  estado: string;
  empresa: string;
  cedula: string;
}

// Define la interfaz para el contexto
interface SociosContextType {
  socios: Socios[];
  setSocios: Dispatch<SetStateAction<Socios[]>>;
}

// Crea el contexto con un valor inicial
export const SociosContext = createContext<SociosContextType | undefined>(undefined);

// Define el proveedor
export const SociosProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [socios, setSocios] = useState<Socios[]>([]);

  return (
    <SociosContext.Provider value={{ socios, setSocios }}>
      {children}
    </SociosContext.Provider>
  );
};
