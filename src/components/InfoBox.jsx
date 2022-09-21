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
  Image,
  Center,
  Stack,
} from "@chakra-ui/react";
import { BiChevronRight } from "react-icons/bi";
import React, { useContext } from "react";
import RaceInformation from "./districtbreakdown/RaceInformation";
import { useParams, Link } from "react-router-dom";
import EducationInformation from "./districtbreakdown/EducationInformation";
import SexAndAgeInformation from "./districtbreakdown/AgeInformation";
import SocioeconomicInformation from "./districtbreakdown/SocioeconomicInformation";
import MapContext from "../services/mapContext";

import OUR_STATES from "../assets/ourStates";

const InfoBox = ({ district }) => {
  const params = useParams();
  const mapContext = useContext(MapContext);

  const resetZoom = () => {
    mapContext.resetZoom();
  };

  return (
    <div className="district-information-container">
      <div className="breadcrumbs">
        <Breadcrumb
          pt="1em"
          pl="1em"
          spacing="8px"
          separator={<BiChevronRight color="gray.300" />}
        >
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem onClick={resetZoom}>
            <BreadcrumbLink href="#">
              {OUR_STATES[params.state].name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage fontWeight="bold">
            <BreadcrumbLink href="#">
              {district ? `District ${district.split("-")[1]}` : "District"}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      {district ? (
        <Tabs variant={"soft-rounded"} colorScheme={"blue"} p="1em">
          <TabList>
            <Tab>Race</Tab>
            <Tab>Education</Tab>
            <Tab>Sex and Age</Tab>
            <Tab>Socioeconomic</Tab>
            <Tab>Analytics</Tab>
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
            <TabPanel>
              <SocioeconomicInformation
                district={district}
                state={params.state}
              />
            </TabPanel>
            <TabPanel>
              <Center m="1em">
                <Stack spacing="1em" height="100%">
                  <Image
                    border={"1px solid #E2E8F0"}
                    borderRadius="lg"
                    width="35vw"
                    height="auto"
                    src="https://cdn.discordapp.com/attachments/658712772313481246/1021982267792437288/unknown.png"
                  />
                  <Image
                    border={"1px solid #E2E8F0"}
                    borderRadius="lg"
                    width="120%"
                    height="auto"
                    src="https://cdn.discordapp.com/attachments/658712772313481246/1021986731509174294/unknown.png"
                  />
                </Stack>
              </Center>
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
