import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  PieController,
  ArcElement,
  Legend,
  Tooltip,
} from 'chart.js';
import { 
  obtenerPrestamosPorCooperativa,
  obtenerTrasaccionesPorCooperativa  
} from '@/app/actions';

// Registrar los componentes necesarios
Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  PieController,
  ArcElement,
  Legend,
  Tooltip
);

// Variables para almacenar las instancias de los gráficos
let barChart = null;
let pieChart = null;

export const initCharts = async () => {
  try {
    const cooperativaId = '1'; // Cambia esto por el ID real de la cooperativa

    // Llamar a ambas funciones para obtener datos
    const prestamosPromise = obtenerPrestamosPorCooperativa(cooperativaId);
    const transaccionesPromise = obtenerTrasaccionesPorCooperativa(cooperativaId);

    const [{ success: prestamosSuccess, data: prestamosData, error: prestamosError }, 
           { success: transaccionesSuccess, data: transaccionesData, error: transaccionesError }] = 
           await Promise.all([prestamosPromise, transaccionesPromise]);

    // Manejar errores en las llamadas
    if (!prestamosSuccess) {
      console.error(`Error al obtener los préstamos: ${prestamosError}`);
      return;
    }

    if (!transaccionesSuccess) {
      console.error(`Error al obtener las transacciones: ${transaccionesError}`);
      return;
    }

    // Obtener el mes actual y los 4 anteriores
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 
      'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth(); // Índice del mes actual (0-11)

    const ultimosMeses = Array.from({ length: 5 }, (_, i) => meses[(mesActual - i + 12) % 12]).reverse();

    // Filtrar datos por los meses relevantes
    const dataset = ultimosMeses.map((mes) => {
      const prestamosDelMes = prestamosData.filter((prestamo) => {
        const fechaPrestamo = new Date(prestamo.fecha);
        return meses[fechaPrestamo.getMonth()] === mes;
      });

      // Sumar los totales originales de los préstamos del mes
      return prestamosDelMes.reduce((suma, prestamo) => suma + prestamo.totaloriginal, 0);
    });

    // Calcular el capital total desde las transacciones
    const prestamos = prestamosData.reduce((suma, prestamo) => suma + prestamo.totaloriginal, 0)
    const depositos = transaccionesData.filter(transaccion => transaccion.tipo === "Deposito")
    const totalCapital = depositos.reduce((suma, transaccion) => suma + transaccion.monto, 0);
    // Configurar el gráfico de barras
    const ctx = document.getElementById('loanChart').getContext('2d');

    if (barChart) {
      barChart.destroy();
    }

    const barData = {
      labels: ultimosMeses,
      datasets: [
        {
          label: 'Total Prestado ($)',
          data: dataset,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };

    const barConfig = {
      type: 'bar',
      data: barData,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            labels: {
              color: 'black',
            },
          },
        },
      },
    };

    // Crear la nueva instancia del gráfico
    barChart = new Chart(ctx, barConfig);

    // Crear el gráfico de pastel
    const pieCtx = document.getElementById('capitalPieChart').getContext('2d');

    // Destruir el gráfico de pastel existente si ya existe
    if (pieChart) {
      pieChart.destroy();
    }

    // Calcular el capital restante
    const restante = totalCapital - prestamos;

    const pieData = {
      labels: ['Prestado', 'Capital Restante'],
      datasets: [
        {
          data: [prestamos, restante > 0 ? restante : 0],
          backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
          borderWidth: 1,
        },
      ],
    };

    const pieConfig = {
      type: 'pie',
      data: pieData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: 'black',
            },
          },
        },
      },
    };

    // Crear una nueva instancia del gráfico de pastel
    pieChart = new Chart(pieCtx, pieConfig);
  } catch (error) {
    console.error('Error en initCharts:', error);
  }
};

