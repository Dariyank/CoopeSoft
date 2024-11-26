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

export const initCharts = () => {
  // Gráfico de barras
  const ctx = document.getElementById('loanChart').getContext('2d');

  // Destruir el gráfico de barras existente si ya existe
  if (barChart) {
    barChart.destroy();
  }

  const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [
      {
        label: 'Total Prestado ($)',
        data: [12000, 15000, 17000, 16000, 19000],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const config = {
    type: 'bar',
    data: data,
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

  // Crear una nueva instancia del gráfico de barras
  barChart = new Chart(ctx, config);

  // Gráfico de pastel
  const pieCtx = document.getElementById('capitalPieChart').getContext('2d');

  // Destruir el gráfico de pastel existente si ya existe
  if (pieChart) {
    pieChart.destroy();
  }

  const totalCapital = 100000;
  const prestado = 60000;
  const restante = totalCapital - prestado;

  const pieData = {
    labels: ['Prestado', 'Capital Restante'],
    datasets: [
      {
        data: [prestado, restante],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
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
};
