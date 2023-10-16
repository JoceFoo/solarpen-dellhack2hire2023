import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

const electricData = [
  { month: "January", usage: 100 },
  { month: "February", usage: 150 },
  { month: "March", usage: 200 },
  { month: "April", usage: 120 },
  { month: "May", usage: 180 },
  { month: "June", usage: 250 },
];

const solarData = [
  { month: "January", usage: 50 },
  { month: "February", usage: 100 },
  { month: "March", usage: 200 },
  { month: "April", usage: 80 },
  { month: "May", usage: 90 },
  { month: "June", usage: 60 },
];

function LineChart() {
  const data = {
    labels: electricData.map((data) => data.month),
    datasets: [
      {
        label: "Electricity Usage(kWh)",
        data: electricData.map((data) => data.usage),
        borderColor: "#f94449",
        pointBorderColor: "#cb0c9f",
      },
      {
        label: "Solar Energy Usage(kWh)",
        data: solarData.map((data) => data.usage),
        borderColor: "#6ac5fe",
        pointBorderColor: "#0000FF",
      },
    ],
  };

  return (
    <div>
      <h1 className="text-xl text-center mt-10">
        Monthly Total Electricity and Solar Energy Usage
      </h1>
      <div
        style={{
          width: "700px",
          height: "330px",
          padding: "40px",
          cursor: "pointer",
          color: "#6ac5fe",
        }}
      >
        <Line data={data}></Line>
      </div>
    </div>
  );
}

export default LineChart;
