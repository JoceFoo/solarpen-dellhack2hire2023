import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement } from "chart.js";

ChartJS.register(ArcElement);

const chartLabels = ["Solar Energy Cost(RM)", "Electricity Cost(RM)"];
const chartData = [3, 2];
const backgroundColors = [
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
];

function DoughnutChart() {
  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: "Total Solar Energy vs Electricity Cost",
        data: chartData,
        backgroundColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1 className="text-xl text-center mt-10">
        Monthly Total Cost of Electricity and Solar Energy
      </h1>
      <div
        style={{
          width: "700px",
          height: "350px",
          padding: "40px",
          cursor: "pointer",
        }}
      >
        <Doughnut data={data}></Doughnut>
      </div>
    </div>
  );
}

export default DoughnutChart;
