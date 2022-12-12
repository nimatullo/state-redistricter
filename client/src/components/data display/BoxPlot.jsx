import React, { useEffect } from "react";

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
import { useParams } from "react-router-dom";
import stateService from "../../services/stateService";

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

const BoxPlot = (props) => {
  const [boxPlotData, setBoxPlotData] = React.useState(null);

  const params = useParams();

  useEffect(() => {
    stateService
      .getBoxAndWhiskerData(params.state, props.population, props.planType)
      .then((data) => {
        setBoxPlotData(data);
      });
  }, [props.population, props.planType]);

  return boxPlotData ? (
    <div>
      <Chart
        type="boxplot"
        options={boxPlotData.options}
        data={boxPlotData.graph}
      />
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default BoxPlot;
