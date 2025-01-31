import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface MetricsChartProps {
  metrics: { name: string; logins: number; downloads: number }[];
}

const MetricsChart: React.FC<MetricsChartProps> = ({ metrics }) => {
  const data = {
    labels: metrics.map((m) => m.name),
    datasets: [
      {
        label: "Total Logins",
        data: metrics.map((m) => m.logins),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Total Downloads",
        data: metrics.map((m) => m.downloads),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true },
    },
  };

  return <Bar data={data} options={options} />;
};

export default MetricsChart;
