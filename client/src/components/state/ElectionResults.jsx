import React from "react";
import {
  Box,
  Heading,
  TabList,
  Tabs,
  Tab,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";

import AllCandidates from "../data display/AllCandidates";
import Winners from "../data display/Winners";
import Losers from "../data display/Losers";

const ElectionResults = () => {
  return (
    <Box p={"1em"}>
      <Heading size="2xl" mb="1em">
        Election Results (mmd)
      </Heading>
      <Tabs variant={"soft-rounded"} colorScheme={"gray"}>
        <TabList>
          <Tab>All Candidates</Tab>
          <Tab>Winners</Tab>
          <Tab>Losers</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <AllCandidates />
          </TabPanel>
          <TabPanel>
            <Winners />
          </TabPanel>
          <TabPanel>
            <Losers />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ElectionResults;
