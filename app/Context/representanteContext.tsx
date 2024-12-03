"use client";

import React, { createContext, useState, PropsWithChildren, Dispatch, SetStateAction } from 'react';

// Define la interfaz para los representantes

export interface Representante {
  id: string;
  nombre: string;
  email: string;
  registro: string;
  cooperativa: string;
  telefono:string;
  genero: string;
  edad:number;
  salario:number;
  direccion:string;
}


// Define la interfaz para el contexto
interface RepresentanteContextType {
  representantes: Representante[];
  setRepresentantes: Dispatch<SetStateAction<Representante[]>>;
}

// Crea el contexto con un valor inicial
export const RepresentanteContext = createContext<RepresentanteContextType | undefined>(undefined);

// Define el proveedor
export const RepresentanteProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [representantes, setRepresentantes] = useState<Representante[]>([]);

  return (
    <RepresentanteContext.Provider value={{ representantes, setRepresentantes }}>
      {children}
    </RepresentanteContext.Provider>
  );
};
