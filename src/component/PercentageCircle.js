import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const data = {
  labels: ['zara' , 'breshka' , 'pmg' , 'pull and bear'],
  datasets: [
    {
      label: '# nombre de produit',
      data: [47, 19, 36], // Example data
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',  // red
        'rgba(54, 162, 235, 0.2)',   // blue
        'rgba(255, 206, 86, 0.2)',   // yellow
        'rgba(75, 192, 192, 0.2)',   // green
        'rgba(153, 102, 255, 0.2)',  // purple
        'rgba(255, 159, 64, 0.2)',   // orange
        // ...add more colors for each data point
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',  // red
        'rgba(54, 162, 235, 1)',   // blue
        'rgba(255, 206, 86, 1)',   // yellow
        'rgba(75, 192, 192, 1)',   // green
        'rgba(153, 102, 255, 1)',  // purple
        'rgba(255, 159, 64, 1)',   // orange
        // ...add more border colors for each data point
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  plugins: {
    legend: {
      display: false // Hide legend if you don't need it
    }
  }
};

const PieChart = () => (
  <div className="flex justify-center items-center w-[25%] pl-2 ml-2">
    <Pie data={data} options={options} />
  </div>
);

export default PieChart;
