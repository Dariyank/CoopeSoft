"use client";

import React, { createContext, useState, PropsWithChildren, Dispatch, SetStateAction } from 'react';

// Define la interfaz para los representantes

export interface Representantes {
  representanteid: string;
  nombre: string;
  cooperativaid: number;
  genero: string;
  edad:number;
  direccion:string;
  correo: string;
  telefono:string;
  contrasena: string
}


// Define la interfaz para el contexto
interface RepresentantesContextType {
  representantes: Representantes[];
  setRepresentantes: Dispatch<SetStateAction<Representantes[]>>;
}

// Crea el contexto con un valor inicial
export const RepresentantesContext = createContext<RepresentantesContextType | undefined>(undefined);

// Define el proveedor
export const RepresentantesProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [representantes, setRepresentantes] = useState<Representantes[]>([]);

  return (
    <RepresentantesContext.Provider value={{ representantes, setRepresentantes }}>
      {children}
    </RepresentantesContext.Provider>
  );
};
