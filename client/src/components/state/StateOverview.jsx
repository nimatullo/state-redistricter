import { Box, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import React from "react";
import stateService from "../../services/stateService";
import { Card } from "./UniqueDistrictPlan";
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
  const [mmdData, setMMDData] = React.useState({});
  const params = useParams();

  React.useEffect(() => {
    const fullStateName = OUR_STATES[params.state].fullName;
    const data = stateService.getStateData(fullStateName);
    setStateData(data);

    stateService.getSummaryData(params.state).then((data) => {
      console.log(data);
      setMMDData(data);
    });
  }, []);

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

  return (
    <Box p={"1em"}>
      <Heading size="2xl" mb="10px">
        Overview
      </Heading>
      <Text mb="1em" color="gray.600">
        General information about the state along with comparisions between the
        enacted plan, average multi-member district plans and average single
        member district plans.
      </Text>
      <Tabs variant={"soft-rounded"} colorScheme={"gray"}>
        <TabList>
          <Tab>Demographic Breakdown</Tab>
          <Tab>Enacted Plan Comparison</Tab>
          <Tab>Ensemble Summary Comparison</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Heading size="xl" my="16px">
              Demographic breakdown
            </Heading>
            <Flex justifyContent={"space-between"} height={"50%"}>
              {stateData.percentages?.length > 0 &&
                stateData?.percentages.map((data) => {
                  return (
                    <>
                      <Box width={"100%"}>
                        <Heading size="md">{Object.keys(data)[0]} (%)</Heading>
                        <Pie
                          data={convertToChartJSDataset(Object.values(data)[0])}
                        />
                      </Box>
                    </>
                  );
                })}
            </Flex>
          </TabPanel>
          <TabPanel>
            <SimpleGrid columns={2} spacing={5}>
              <Heading size="md">Enacted Plan</Heading>
              <Heading size="md">Average MMD Plan</Heading>
              <Card
                label="Opportunity Represenatives"
                value={stateData.opportunityReps}
              />
              <Card
                label="Opportunity Represenatives"
                value={mmdData.avgOpportunityReps?.mmd}
              />
              <Card
                label="Republican Vote Share / Seat Share"
                value={`${(stateData.repVoteShare * 100).toFixed(2) + "%"} / ${
                  (stateData.repSeatShare * 100).toFixed(2) + "%"
                }`}
              />
              <Card
                label="Republican Vote Share / Seat Share"
                value={`${
                  (mmdData.avgRepSplit?.mmd * 100).toFixed(2) + "%"
                } / ${(mmdData.avgRepSplit?.smd * 100).toFixed(2) + "%"}
                `}
              />
              <Card
                label="Democrat Vote Share / Seat Share"
                value={`${(stateData.demVoteShare * 100).toFixed(2) + "%"} / ${
                  (stateData.demSeatShare * 100).toFixed(2) + "%"
                }`}
              />
              <Card
                label="Democrat Vote Share / Seat Share"
                value={`${
                  (mmdData.avgDemSplit?.mmd * 100).toFixed(2) + "%"
                } / ${(mmdData.avgDemSplit?.smd * 100).toFixed(2) + "%"}`}
              />
            </SimpleGrid>
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
