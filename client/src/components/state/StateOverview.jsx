import { Box, Divider, Flex, Heading } from "@chakra-ui/react";
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
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const StateOverview = ({ state }) => {
  const [stateData, setStateData] = React.useState({});
  const params = useParams();

  React.useEffect(() => {
    const data = stateService.getStateData(state);
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

  const generateBarData = () => {
    const totalDistrictNumber = OUR_STATES[params.state].districts;
    const districtsList = [...Array(totalDistrictNumber).keys()].map(
      (x) => x + 1
    );

    return {
      labels: districtsList.map((x) => `District ${x}`),
      datasets: [
        {
          label: "avg. efficiency gap",
          data: districtsList.map((x) => Math.random()),
          backgroundColor: generateColor(),
        },
      ],
    };
  };

  const convertToChartJSDataset = (data) => {
    return {
      labels: data.map((d) => d.title),
      datasets: [
        {
          data: data.map((d) => `${Number(d.percentage).toFixed(1)}`),
          backgroundColor: data.map((d) => generateColor()),
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
          <Tab>State Demographics</Tab>
          <Tab>Ensemble Summary Comparison</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Heading size="xl" my="16px">
              Demographic breakdown
            </Heading>
            <Flex justifyContent={"space-between"}>
              {stateData.length > 0 &&
                stateData.map((data) => {
                  return (
                    <Box>
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
            <Flex justifyContent={"space-between"}>
              <Box>
                <Heading size="lg" fontWeight={"medium"}>
                  Multi-member ensemble
                </Heading>
              </Box>
              <Box>
                <Heading size="lg" fontWeight={"medium"}>
                  Single-member ensemble
                </Heading>
                <Bar options={options} data={generateBarData()} />
              </Box>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default StateOverview;
