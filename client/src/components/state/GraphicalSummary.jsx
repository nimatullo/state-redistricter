import {
  Heading,
  Box,
  useRadio,
  useRadioGroup,
  HStack,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import stateService from "../../services/stateService";
import BarChart from "../data display/BarChart";
import { Card } from "./UniqueDistrictPlan";

const GraphicalSummary = () => {
  const [graphData, setGraphData] = React.useState(null);
  const [ensembleType, setEnsembleType] = React.useState("smd");
  const [sharePercentages, setSharePercentages] = React.useState({});

  useEffect(() => {
    const data = stateService.getGraphData("", options[0]);
    setGraphData(data);
  }, []);

  useEffect(() => {
    setGraphData(stateService.getGraphData("", options[0]), ensembleType);
  }, [ensembleType]);

  const options = [
    "Opportunity Representatives",
    "Republican/Democratic Split",
  ];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "dataset",
    defaultValue: options[0],
    onChange: (value) => setGraphData(stateService.getGraphData("", value)),
  });

  const group = getRootProps();

  return (
    <Box p={"1em"}>
      <Heading size="2xl" mb="1em">
        Graphical Summary
      </Heading>
      <Select
        mb="1em"
        value={ensembleType}
        onChange={(e) => setEnsembleType(e.target.value)}
      >
        <option value="smd">Single-member districts</option>
        <option value="mmd">Multi-member districts</option>
      </Select>
      <HStack {...group}>
        {options.map((value) => {
          const radio = getRadioProps({ value });
          return (
            <RadioTab key={value} {...radio}>
              {value}
            </RadioTab>
          );
        })}
      </HStack>
      <BarChart data={graphData} />
      <SimpleGrid columns={4} spacing={5}>
        {ensembleType === "smd" ? (
          <>
            <Card label={"Democrat Vote Share"} value={"53%"} />
            <Card label={"Democrat Seat Share"} value={"53%"} />
            <Card label={"Republican Vote Share"} value={"53%"} />
            <Card label={"Republican Seat Share"} value={"53%"} />
          </>
        ) : (
          <>
            <Card
              label={"Democrat Vote Share"}
              value={"53%"}
              helpText={"5%"}
              type="increase"
            />
            <Card
              label={"Democrat Seat Share"}
              value={"53%"}
              helpText={"2%"}
              type="decrease"
            />
            <Card label={"Republican Vote Share"} value={"53%"} />
            <Card label={"Republican Seat Share"} value={"53%"} />
          </>
        )}
      </SimpleGrid>
    </Box>
  );
};

export const RadioTab = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderRadius="full"
        fontWeight="bold"
        color="gray.600"
        _checked={{
          bg: "gray.100",
          color: "gray.700",
        }}
        p="2"
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default GraphicalSummary;
