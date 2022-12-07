import { Box, Flex, Heading } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import React from "react";
import stateService from "../../services/stateService";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { useParams } from "react-router-dom";
import OUR_STATES from "../../assets/ourStates";
import EnsembleSummary from "./EnsembleSummary";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const StateOverview = () => {
  const [stateData, setStateData] = React.useState({});
  const params = useParams();

  React.useEffect(() => {
    const fullStateName = OUR_STATES[params.state].fullName;
    const data = stateService.getStateData(fullStateName);
    setStateData(data.percentages);
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Average Efficiency Gap of Each District",
      },
    },
  };

  const convertToChartJSDataset = (data) => {
    return {
      labels: data.map((d) => d.title),
      datasets: [
        {
          data: data.map((d) => `${Number(d.percentage).toFixed(1)}`),
          backgroundColor: data.map((d) => d.color),
        },
      ],
    };
  };

  const generateColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  return (
    <Box p={"1em"}>
      <Heading size="2xl" mb="1em">
        Overview
      </Heading>
      <Tabs variant={"soft-rounded"} colorScheme={"gray"}>
        <TabList>
          <Tab>Enacted Plan Demographics</Tab>
          <Tab>Ensemble Summary Comparison</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Heading size="xl" my="16px">
              Demographic breakdown
            </Heading>
            <Flex justifyContent={"space-evenly"}>
              {stateData.length > 0 &&
                stateData.map((data) => {
                  return (
                    <Box width={"100%"}>
                      <Heading size="md">{Object.keys(data)[0]} (%)</Heading>
                      <Pie
                        data={convertToChartJSDataset(Object.values(data)[0])}
                      />
                    </Box>
                  );
                })}
            </Flex>
          </TabPanel>
          <TabPanel>
            <Heading size="xl" my="16px">
              Generated ensemble summary
            </Heading>
            <EnsembleSummary />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default StateOverview;
