import { FaDollarSign } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa6";
import { FaMoneyBill } from "react-icons/fa6";
import InfoCard from './Dashboard/InfoCard';
import Charts from './Dashboard/Charts';

export default function Home() {
  return (
    <div>
      <div className="px-6 uppercase font-extrabold text-[30px] text-[#00755D]"><h3>Dashboard</h3></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        <InfoCard title="Capital de Ahorros" icon={FaDollarSign} value="30,276,520" change="+4.4%" iconColor="#00704a" />
        <InfoCard title="Socios" icon={FaUsers}value="1,235" change="+2.6%" iconColor="#FFD43B" />
        <InfoCard title="Total Prestado" icon={FaChartLine} value="6,575,000" change="+3.1%" iconColor="#00704a" />
        <InfoCard title="Total Préstamos" icon={FaMoneyBill} value="475" change="+3.1%" iconColor="#FFD43B" />
      </div>
      <Charts />
    </div>
  );
}
