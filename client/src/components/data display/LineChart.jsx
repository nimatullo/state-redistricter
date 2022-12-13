import React from "react";
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
import { Line } from "react-chartjs-2";
import { useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import { Box, Heading } from "@chakra-ui/react";

import stateService from "../../services/stateService";
import { useParams } from "react-router-dom";

const LineChart = () => {
  const params = useParams();

  const [data, setData] = React.useState(null);

  useEffect(() => {
    stateService.getOppRepGraph(params.state).then((res) => {
      console.log(res);
      setData(res);
    });
  }, []);

  return data ? (
    <Box p="1em">
      <Heading size="2xl" mb="1em">
        Opportunity Representative Threshold
      </Heading>
      <Line data={data.graph} options={data.options} />
    </Box>
  ) : (
    <p>Loading...</p>
  );
};

export default LineChart;
