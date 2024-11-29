import { useContext } from 'react';
import { MovimientoContext } from '../Context/movContext'; // Asegúrate de ajustar la ruta

export const useMovimiento = () => {
  const context = useContext(MovimientoContext);

  if (!context) {
    throw new Error("MovimientoContext is undefined. Please ensure the component is wrapped in the MovimientoProvider.");
  }
    return context;
}