import { useContext } from "react";
import { PrestamosContext } from "../Context/prestamosContext"; // Ajusta la ruta si es necesario

export const usePrestamos = () => {
  const context = useContext(PrestamosContext);

  if (!context) {
    throw new Error("usePrestamos debe ser utilizado dentro de un PrestamoProvider");
  }

  return context;
};
