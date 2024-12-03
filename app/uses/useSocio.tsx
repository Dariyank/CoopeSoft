import { useContext } from "react";
import { SocioContext } from "../Context/socioContext"; // Ajusta la ruta si es necesario

export const useSocio = () => {
  const context = useContext(SocioContext);

  if (!context) {
    throw new Error("useSocio debe ser utilizado dentro de un SocioProvider");
  }

  return context;
};
