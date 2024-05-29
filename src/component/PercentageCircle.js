import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import Cookies from "js-cookie";
import "chart.js/auto";

const PieChart = () => {
  const [chartData, setChartData] = useState({
    labels: [], // Initialisez avec un tableau vide
    datasets: [
      {
        label: "# nombre de produit",
        data: [], // Initialisez avec un tableau vide
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)", // red
          "rgba(54, 162, 235, 0.2)", // blue
          "rgba(255, 206, 86, 0.2)", // yellow
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)", // red
          "rgba(54, 162, 235, 1)", // blue
          "rgba(255, 206, 86, 1)", // yellow
        ],
        borderWidth: 1,
      },
    ],
  });

  const fetchProductsParSite = async () => {
    const userToken = Cookies.get("authToken");

    if (!userToken) {
      console.error("User token not found");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:3001/dashboard/productparsite",
        {
          headers: { Authorization: "Bearer " + userToken },
        }
      );

      const data = response.data;
      console.log(data); // Assurez-vous que la réponse est structurée comme prévu

      // Extraction des noms de sites et des pourcentages
      const labels = data.map((item) => item[0]);
      const percentages = data.map((item) =>
        parseFloat(item[1].replace("%", ""))
      );

      // Mettre à jour l'état avec les nouvelles données
      setChartData({
        labels: labels,
        datasets: [
          {
            label: "# nombre de produit",
            data: percentages,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)", // red
              "rgba(54, 162, 235, 0.2)", // blue
              "rgba(255, 206, 86, 0.2)", // yellow
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)", // red
              "rgba(54, 162, 235, 1)", // blue
              "rgba(255, 206, 86, 1)", // yellow
            ],
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching products by site:", error);
    }
  };

  useEffect(() => {
    fetchProductsParSite();
  }, []);

  const options = {
    plugins: {
      legend: {
        display: false, // Hide legend if you don't need it
      },
    },
  };

  return (
    <div className="flex justify-center items-center w-[25%] pl-2 ml-2">
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
