import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import stateService from "../../services/stateService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = (props) => {
  const [graphData, setGraphData] = React.useState(null);

  const params = useParams();

  useEffect(() => {
    stateService
      .getGraphData(params.state, props.graphType, props.ensembleType)
      .then((data) => {
        setGraphData(data);
      });
  }, [props.graphType, props.ensembleType]);

  return graphData ? (
    <Bar data={graphData.graph} options={graphData.options} />
  ) : (
    <p>Loading...</p>
  );
};

export default BarChart;
