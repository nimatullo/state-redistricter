import {
  Heading,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Stack,
} from "@chakra-ui/react";
import { BsChevronRight } from "react-icons/bs";
import React from "react";
import RaceInformation from "./maps/RaceInformation";
import { useParams, Link } from "react-router-dom";

const InfoBox = ({ district }) => {
  const params = useParams();

  const getFullStateName = (state) => {
    switch (state.toUpperCase()) {
      case "FL":
        return "Florida";
      case "NC":
        return "North Carolina";
      case "AR":
        return "Arkansas";
      default:
        return "State";
    }
  };

  return (
    <Stack>
      <Breadcrumb
        p="1em"
        spacing="8px"
        separator={<BsChevronRight color="gray.500" />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">
            {getFullStateName(params.state)}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      {district ? (
        <Tabs variant={"soft-rounded"} colorScheme={"blue"} p="1em">
          <TabList>
            <Tab>Race Information</Tab>
            <Tab>Single-member District</Tab>
            <Tab>Multi-member District</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <RaceInformation district={district} />
            </TabPanel>
            <TabPanel>
              <h1>Deez</h1>
            </TabPanel>
            <TabPanel>
              <h1>Nuts</h1>
            </TabPanel>
          </TabPanels>
        </Tabs>
      ) : (
        <Heading size="lg" p="1em">
          Select a district
        </Heading>
      )}
    </Stack>
  );
};

export default InfoBox;
