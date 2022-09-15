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
import RaceInformation from "./districtbreakdown/RaceInformation";
import { useParams, Link } from "react-router-dom";
import EducationInformation from "./districtbreakdown/EducationInformation";
import SexAndAgeInformation from "./districtbreakdown/AgeInformation";

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
    <div className="district-information-container">
      <div className="breadcrumbs">
        <Breadcrumb
          pt="1em"
          pl="1em"
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
      </div>
      {district ? (
        <Tabs variant={"soft-rounded"} colorScheme={"blue"} p="1em">
          <TabList>
            <Tab>Race Information</Tab>
            <Tab>Education Information</Tab>
            <Tab>Sex and Age Information</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <RaceInformation district={district} state={params.state} />
            </TabPanel>
            <TabPanel>
              <EducationInformation district={district} state={params.state} />
            </TabPanel>
            <TabPanel>
              <SexAndAgeInformation district={district} state={params.state} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      ) : (
        <Heading size="lg" p="1em">
          Select a district
        </Heading>
      )}
    </div>
  );
};

export default InfoBox;
