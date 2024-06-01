import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import Cookies from "js-cookie"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const [chartData, setChartData] = useState({
    labels: [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ],
    datasets: [
      {
        label: "Data de l'année",
        data: Array(12).fill(0),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const userToken = Cookies.get("authToken");

      if (!userToken) {
        console.error("User token not found");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:3001/dashboard/productByMonth",
          {
            headers: { Authorization: "Bearer " + userToken },
          }
        );
        const data = response.data;

        // Create an array with the count of products per month
        const productCounts = Array(12).fill(0);
        Object.keys(data).forEach((month) => {
          const [year, monthNumber] = month.split("-");
          productCounts[parseInt(monthNumber, 10) - 1] = data[month];
        });

        setChartData({
          labels: [
            "Janvier",
            "Février",
            "Mars",
            "Avril",
            "Mai",
            "Juin",
            "Juillet",
            "Août",
            "Septembre",
            "Octobre",
            "Novembre",
            "Décembre",
          ],
          datasets: [
            {
              label: "Data de l'année",
              data: productCounts,
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Line Chart",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "600px" }} className="pr-2">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
