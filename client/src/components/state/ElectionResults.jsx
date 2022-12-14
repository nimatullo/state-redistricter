import React from "react";
import {
  Box,
  Heading,
  TabList,
  Tabs,
  Tab,
  TabPanel,
  TabPanels,
  Link,
  Text,
} from "@chakra-ui/react";

import AllCandidates from "../data display/AllCandidates";
import Winners from "../data display/Winners";
import Losers from "../data display/Losers";
import { useParams } from "react-router-dom";

const ElectionResults = () => {
  const params = useParams();

  return (
    <Box p={"1em"}>
      <Heading size="2xl" mb="10px">
        Election Results
      </Heading>
      <Text mb="1em" color="gray.600">
        Election results for running the multi-member ranked choice voting
        simulation.
        {params.state === "va" ? (
          <>
            {
              " Information about the even vs. uneven candidate results can be found "
            }
            <Link color={"red.400"} href={`/map/${params.state}/even-uneven`}>
              here.
            </Link>
          </>
        ) : (
          ""
        )}
      </Text>
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
