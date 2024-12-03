import { useContext } from "react";
import { RepresentanteContext } from "../Context/representanteContext"; // Ajusta la ruta si es necesario

export const useRepresentante = () => {
  const context = useContext(RepresentanteContext);
  
  if (!context) {
    throw new Error("useRepresentante debe ser utilizado dentro de un RepresentanteProvider");
  }

  return context;
};
