'use client';
import { FaDollarSign } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa6";
import { FaMoneyBill } from "react-icons/fa6";
import InfoCard from '../DashboardUtils/InfoCard';
import Charts from '../DashboardUtils/Charts';
import { 
  obtenerPrestamosPorCooperativa,
  obtenerTrasaccionesPorCooperativa,
  obtenerSociosPorCooperativa 
} from '@/app/actions';

const cooperativaId = '1';

const prestamosPromise = obtenerPrestamosPorCooperativa(cooperativaId);
const transaccionesPromise = obtenerTrasaccionesPorCooperativa(cooperativaId);
const sociosPromise = obtenerSociosPorCooperativa(cooperativaId);

const [
  { success: prestamosSuccess, data: prestamosData, error: prestamosError },
  { success: transaccionesSuccess, data: transaccionesData, error: transaccionesError },
  { success: sociosSuccess, data: sociosData, error: sociosError }
] = await Promise.all([prestamosPromise, transaccionesPromise, sociosPromise]);
    
// Ensure data is always defined, even if the requests fail
const prestamos = prestamosData ? prestamosData.filter(prestamo => prestamo.totaloriginal > 0) : [];
const socios = sociosData ? sociosData.filter(socio => socio.montoahorrado >= 0) : [];
const depositos = transaccionesData ? transaccionesData.filter(transaccion => transaccion.tipo === "Deposito") : [];

console.log(socios)

const totalPrestado = prestamos.reduce((suma, prestamo) => suma + prestamo.totaloriginal, 0);
const totalCapital = depositos.reduce((suma, transaccion) => suma + transaccion.monto, 0);

const totalPrestadoDone = totalPrestado.toLocaleString();
const totalCapitalDone = totalCapital.toLocaleString();

const Dashboard = () => {
  return (
    <div>
      <div className="px-6 uppercase font-extrabold text-[30px] text-[#00755D]"><h3>Dashboard</h3></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        <InfoCard title="Capital de Ahorros" icon={FaDollarSign} value={`S${totalCapitalDone}`} change="+4.4%" iconColor="#00704a" />
        <InfoCard title="Socios" icon={FaUsers}value={`${socios.length}`} change="+2.6%" iconColor="#FFD43B" />
        <InfoCard title="Total Prestado" icon={FaChartLine} value={`$${totalPrestadoDone}`} change="+3.1%" iconColor="#00704a" />
        <InfoCard title="Total Préstamos" icon={FaMoneyBill} value={`${prestamos.length}`} change="+3.1%" iconColor="#FFD43B" />
      </div>
      <Charts />
    </div>
  );
}
export default Dashboard;
