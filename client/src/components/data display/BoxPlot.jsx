import React from "react";

import { Chart } from "react-chartjs-2";
import {
  BoxPlotController,
  BoxAndWiskers,
} from "@sgratzl/chartjs-chart-boxplot";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BoxAndWiskers,
  BoxPlotController
);

const boxplotData = {
  labels: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
  datasets: [
    {
      label: "Boxplot",
      itemRadius: 2,
      borderColor: "grey",
      data: [
        [10, 20, 30, 40, 50],
        [20, 30, 40, 50, 60],
      ],
    },
  ],
};

const BoxPlot = (props) => {
  return (
    <div>
      <Chart
        type="boxplot"
        options={{
          quantiles: "fivenum",
        }}
        legend={{
          display: false,
        }}
        data={props.boxPlotData}
      />
    </div>
  );
};

export default BoxPlot;
