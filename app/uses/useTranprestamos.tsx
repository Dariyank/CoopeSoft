import { useContext } from "react";
import { PrestamosExtendidoContext } from "../Context/tranprestamosContext"; // Ajusta la ruta si es necesario

export const useTranprestamos = () => {
  const context = useContext(PrestamosExtendidoContext);

  if (!context) {
    throw new Error("usePrestamos debe ser utilizado dentro de un PrestamoProvider");
  }

  return context;
};
