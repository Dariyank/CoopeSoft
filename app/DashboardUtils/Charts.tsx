"use client";
import React, { useEffect } from 'react';
import { initCharts } from '../utils/chartUtils'; // Importa la función de gráficos
import "../globals.css";

const Dashboard = () => {
  useEffect(() => {
    initCharts(); // Llama a la función para inicializar los gráficos
  }, []);  // Solo se ejecuta una vez cuando se monta el componente

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-x-6 p-4">
      <div className="chart-container column">
        <canvas id="loanChart"></canvas>
      </div>
      <div className="chart-container2 column">
        <canvas id="capitalPieChart"></canvas>
      </div>
    </div>
  );
};

export default Dashboard;
