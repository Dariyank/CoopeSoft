"use client";

import React, { createContext, useState, PropsWithChildren, Dispatch, SetStateAction } from 'react';

// Define la interfaz para los representantes

export interface Representante {
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
interface RepresentanteContextType {
  representante: Representante | null; // Ahora es un solo objeto o null si no hay Representante
  setRepresentante: Dispatch<SetStateAction<Representante | null>>; // Método para actualizar el Representante
}

// Crea el contexto con un valor inicial
export const RepresentanteContext = createContext<RepresentanteContextType | undefined>(undefined);

// Define el proveedor
export const RepresentanteProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [representante, setRepresentante] = useState<Representante | null>(null); // Inicialmente no hay Representante

  return (
    <RepresentanteContext.Provider value={{ representante, setRepresentante }}>
      {children}
    </RepresentanteContext.Provider>
  );
};
