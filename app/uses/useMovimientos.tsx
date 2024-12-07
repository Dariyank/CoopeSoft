import { useContext } from 'react';
import { MovimientosContext } from '../Context/movimientoContext'; // Asegúrate de ajustar la ruta

export const useMovimientos = () => {
  const context = useContext(MovimientosContext);

  if (!context) {
    throw new Error("useMovimientos is undefined. Please ensure the component is wrapped in the MovimientosProvider.");
  }
    return context;
}