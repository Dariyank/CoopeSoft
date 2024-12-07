import { useContext } from "react";
import { RepresentantesContext } from "../Context/representantesContext"; // Ajusta la ruta si es necesario

export const useRepresentantes = () => {
  const context = useContext(RepresentantesContext);
  
  if (!context) {
    throw new Error("useRepresentantes debe ser utilizado dentro de un RepresentantesProvider");
  }

  return context;
};
