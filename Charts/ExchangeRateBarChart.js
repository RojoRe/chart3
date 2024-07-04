import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import Chart from "chart.js/auto";

const ExchangeRateBarChart = () => {
  const [exchangeRates, setExchangeRates] = useState(null);
  const apiKey = "420b1d8ea21618d61579f211";

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`
        );
        if (response.status === 200) {
          setExchangeRates(response.data.conversion_rates);
        } else {
          throw new Error("Failed to fetch exchange rates");
        }
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };
    fetchExchangeRates();
  }, [apiKey]);

  if (!exchangeRates) {
    return <p>Cargando datos...</p>;
  }

  const chartData = {
    labels: ["USD to MXN", "MXN to USD"],
    datasets: [
      {
        label: "Paridad de Peso y Dólar",
        data: [exchangeRates.MXN, 1 / exchangeRates.MXN],
        backgroundColor: ["rgba(0, 67, 139, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(0, 67, 139, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#00438b",
          font: {
            size: 14,
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          },
        },
      },
      x: {
        ticks: {
          color: "#00438b",
          font: {
            size: 14,
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 16,
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          },
          color: "#00438b",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 67, 139, 0.8)",
        titleFont: {
          size: 16,
          family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        },
        bodyFont: {
          size: 14,
          family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        },
      },
    },
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2>Paridad de Peso y Dólar</h2>
      <div style={{ position: "relative", height: "400px" }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ExchangeRateBarChart;
