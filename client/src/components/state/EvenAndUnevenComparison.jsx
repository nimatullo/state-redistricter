import {
  Box,
  Heading,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import React from "react";

import AllCandidatesComparison from "../data display/AllCandidatesComparison";
import WinnersComparison from "../data display/WinnersComparison";
import LosersComparison from "../data display/LosersComparison";

const EvenAndUnevenComparison = () => {
  return (
    <Box p="1em">
      <Heading size="xl" mb="5px">
        Even vs Uneven MMD Elections
      </Heading>
      <Text color={"gray.600"} mb="1em">
        Comparison between running an MMD election simulation with both parties
        having an equal number of candidates vs running the simulation where one
        party has more candidates than the other.
      </Text>
      <Tabs variant={"soft-rounded"} colorScheme={"gray"}>
        <TabList>
          <Tab>All Candidates</Tab>
          <Tab>Winners</Tab>
          <Tab>Losers</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <AllCandidatesComparison />
          </TabPanel>
          <TabPanel>
            <WinnersComparison />
          </TabPanel>
          <TabPanel>
            <LosersComparison />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default EvenAndUnevenComparison;
