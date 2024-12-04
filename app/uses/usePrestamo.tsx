import { useContext } from "react";
import { PrestamoContext } from "../Context/prestamoContext"; // Ajusta la ruta si es necesario

export const usePrestamo = () => {
  const context = useContext(PrestamoContext);

  if (!context) {
    throw new Error("usePrestamo debe ser utilizado dentro de un PrestamoProvider");
  }

  return context;
};
