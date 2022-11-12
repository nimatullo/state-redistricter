import React from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from "@chakra-ui/react";
import { useState } from "react";

import { useEffect } from "react";
import stateService from "../../services/stateService";
import { useMapContext } from "../../services/mapContext";
import DistrictPlanDropdown from "../maps/DistrictPlanDropdown";

const UniqueDistrictPlan = () => {
  const [selectedDistrictPlan, setSelectedDistrictPlan] = useState(null);
  const [districtPlanData, setDPD] = useState(null);
  const [selectedDistrictData, setSDD] = useState(null);

  const GRID_SPACING = 5;

  const mapContext = useMapContext();

  useEffect(() => {
    const data = stateService.getUniqueDistrictPlan(selectedDistrictPlan);

    setDPD(data);
    console.log(data);
    setSDD(data.districtData[0]);
  }, [selectedDistrictPlan]);

  useEffect(() => {
    if (!districtPlanData) return;

    const districtNumber = Number(mapContext.selectedDistrictNumber);
    setSDD(districtPlanData.districtData[districtNumber - 1]);
  }, [mapContext]);

  return (
    <Box p={"1em"}>
      <Heading size="2xl" mb="1em">
        Unique District Plan
      </Heading>
      <DistrictPlanDropdown setSelectedPlan={setSelectedDistrictPlan} />
      {selectedDistrictPlan && (
        <>
          <Box>
            <Heading marginTop={"1em"} size="lg" mb="2">
              Selected District: {mapContext.selectedDistrictNumber}
            </Heading>
          </Box>
          <Heading size="md" mb="2" fontWeight="semibold">
            Populations
          </Heading>
          <SimpleGrid columns={3} spacing={GRID_SPACING}>
            <Card
              label={"Total Population"}
              value={selectedDistrictData.population}
            />
            <Card
              label={"African American Population"}
              value={selectedDistrictData.africanAmerican}
            />
            <Card label={"Hispanic Population"} value={10} />
            <Card label={"Asian Population"} value={10} />
            <Card label={"White Population"} value={10} />
          </SimpleGrid>

          <Heading size="md" mb="2" mt={GRID_SPACING} fontWeight="semibold">
            Party Splits
          </Heading>

          <SimpleGrid columns={3} spacing={GRID_SPACING}>
            <Card
              label={"Republican Population"}
              value={selectedDistrictData.republican + "%"}
            />
            <Card
              label={"Democratic Population"}
              value={100 - selectedDistrictData.republican + "%"}
            />
          </SimpleGrid>

          <Heading size="md" mb="2" mt={GRID_SPACING} fontWeight="semibold">
            District Plan Quality
          </Heading>
          <SimpleGrid columns={3} spacing={GRID_SPACING}>
            <Card
              label={"Opportunity Districts"}
              value={selectedDistrictData.opportunityDistricts}
              helpText="District where one or more racial minorities make up a majority of the local population."
            />
            <Card
              label={"Safe Districts"}
              value={selectedDistrictData.safeDistricts}
              helpText="Districts where expected margin of victory for one party is greater than 15%"
            />
            <Card
              label={"Polsby Popper Score"}
              value={selectedDistrictData.polsbyPopper}
              helpText="A measure of compactness, with a higher score indicating a more compact district"
            />
          </SimpleGrid>
        </>
      )}
    </Box>
  );
};

const Card = (props) => {
  return (
    <Box p={5} shadow="sm" borderWidth={"1px"} borderRadius="5px">
      <Stat>
        <StatLabel>{props.label}</StatLabel>
        <StatNumber>{props.value.toLocaleString()}</StatNumber>
        {props.helpText && <StatHelpText>{props.helpText}</StatHelpText>}
      </Stat>
    </Box>
  );
};

export default UniqueDistrictPlan;
