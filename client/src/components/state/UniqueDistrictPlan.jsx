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
import { useParams } from "react-router-dom";

const UniqueDistrictPlan = () => {
  const [selectedDistrictPlan, setSelectedDistrictPlan] = useState(null);
  const [districtPlanData, setDPD] = useState(null);
  const [selectedDistrictData, setSDD] = useState(null);
  const [safeDistricts, setSafeDistricts] = useState(null);
  const [opportunityDistricts, setOpportunityDistricts] = useState(null);
  const [polsbyPopperScore, setPolsbyPopperScore] = useState(null);

  const GRID_SPACING = 5;

  const mapContext = useMapContext();
  const params = useParams();

  useEffect(() => {
    if (!selectedDistrictPlan) return;

    stateService
      .getUniqueDistrictPlan(params.state, selectedDistrictPlan)
      .then((data) => {
        console.log(data);
        setDPD(data);
        setSDD(data.districts[0]);
        setSafeDistricts(data.safeDistricts);
        setOpportunityDistricts(data.opportunityDistricts);
        setPolsbyPopperScore(data.polsbyPopperScore);
      });
  }, [selectedDistrictPlan]);

  useEffect(() => {
    if (!districtPlanData) return;
    const districtNumber = Number(mapContext.selectedDistrictNumber);
    setSDD(districtPlanData.districts[districtNumber - 1]);
  }, [mapContext]);

  return (
    <Box p={"1em"}>
      <Heading size="2xl" mb="1em">
        Unique District Plan
      </Heading>
      <DistrictPlanDropdown setSelectedPlan={setSelectedDistrictPlan} />
      {selectedDistrictData && (
        <>
          <Heading size="lg" mb="2" mt={GRID_SPACING}>
            District Plan Quality
          </Heading>
          <SimpleGrid columns={3} spacing={GRID_SPACING}>
            <Card
              label={"Opportunity Districts"}
              value={opportunityDistricts}
              helpText="District where one or more racial minorities make up a majority of the local population."
            />
            <Card
              label={"Safe Districts"}
              value={safeDistricts}
              helpText="Districts where expected margin of victory for one party is greater than 15%."
            />
            <Card
              label={"Polsby Popper Score"}
              value={polsbyPopperScore}
              helpText="A measure of compactness, with a higher score indicating a more compact district."
            />
          </SimpleGrid>
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
                value={selectedDistrictData.totalPopulation}
              />
              <Card
                label={"White Population"}
                value={selectedDistrictData.whitePopulation}
              />
              <Card
                label={"Hispanic Population"}
                value={selectedDistrictData.hispanicPopulation}
              />
              <Card
                label={"African American Population"}
                value={selectedDistrictData.blackPopulation}
              />
              <Card
                label={"Asian Population"}
                value={selectedDistrictData.asianPopulation}
              />
            </SimpleGrid>

            <Heading size="md" mb="2" mt={GRID_SPACING} fontWeight="semibold">
              Party Splits
            </Heading>

            <SimpleGrid columns={3} spacing={GRID_SPACING}>
              <Card
                label={"Republican Population"}
                value={selectedDistrictData.repSplit}
              />
              <Card
                label={"Democratic Population"}
                value={selectedDistrictData.demSplit}
              />
            </SimpleGrid>
          </>
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
