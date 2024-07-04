import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";

const StockIndicatorsPieChart = () => {
  const [indicators, setIndicators] = useState(null);
  const apiKey = "HV4V2YTHPQYT8QQG"; 

  useEffect(() => {
    const fetchStockIndicators = async () => {
      try {
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=${apiKey}`
        );
        if (response.status === 200) {
          const { MarketCapitalization, PERatio, DividendYield } =
            response.data;

          const data = {
            MarketCapitalization,
            PERatio,
            DividendYield,
          };

          setIndicators(data);
        } else {
          throw new Error("Failed to fetch stock indicators");
        }
      } catch (error) {
        console.error("Error fetching stock indicators:", error);
      }
    };

    fetchStockIndicators();
  }, [apiKey]);

  if (!indicators) {
    return <p>Cargando datos...</p>;
  }

  const labels = Object.keys(indicators);
  const data = Object.values(indicators);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Indicadores de Bolsa de Valores",
        data: data,
        backgroundColor: [
          "#00438b", 
          "#FF9800", 
          "#F44336", 
          "#2196F3", 
          "#9C27B0", 
          "#FFEB3B", 
        ],
        hoverBackgroundColor: [
          "#66BB6A", 
          "#FFB74D", 
          "#E57373", 
          "#64B5F6", 
          "#BA68C8", 
          "#FFF176", 
        ],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          fontSize: 16,
          color: "#333",
        },
      },
    },
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
      <h2 style={{ marginBottom: "20px", color: "#00438b" }}>
        Indicadores Importantes de la Bolsa de Valores
      </h2>
      <div style={{ position: "relative", height: "400px", width: "100%" }}>
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default StockIndicatorsPieChart;
