import { useContext } from "react";
import { SociosContext } from "../Context/sociosContext"; // Ajusta la ruta si es necesario

export const useSocios = () => {
  const context = useContext(SociosContext);

  if (!context) {
    throw new Error("useSocio debe ser utilizado dentro de un SocioProvider");
  }

  return context;
};
