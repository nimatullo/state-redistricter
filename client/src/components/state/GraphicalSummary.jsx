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
import { useParams } from "react-router-dom";
import stateService from "../../services/stateService";
import BarChart from "../data display/BarChart";
import { Card } from "./UniqueDistrictPlan";

const GraphicalSummary = () => {
  const [ensembleType, setEnsembleType] = React.useState("SMD");
  const [graphType, setGraphType] = React.useState("opp-reps");
  const [mmdSharePercentages, setMmdSharePercentages] = React.useState(null);
  const [smdSharePercentages, setSmdSharePercentages] = React.useState(null);

  const params = useParams();

  const options = [
    {
      label: "Opportunity Representatives",
      value: "opp-reps",
    },
    {
      label: "Republican/Democratic Split",
      value: "rep-dem-split",
    },
  ];

  useEffect(() => {
    stateService.getSharePercentages(params.state).then((data) => {
      setMmdSharePercentages(data.MMD);
      setSmdSharePercentages(data.SMD);
    });
  }, []);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "dataset",
    defaultValue: graphType,
    onChange: (value) => setGraphType(value),
  });

  // Return "increase" or "decrease" if MMD is greater than SMD
  const calculateIncreaseOrDecrease = (party, index) => {
    return mmdSharePercentages[party][index] -
      smdSharePercentages[party][index] >
      0
      ? "increase"
      : "decrease";
  };

  const group = getRootProps();

  return (
    <Box p={"1em"}>
      <Heading size="2xl" mb="1em">
        Graphical Summary
      </Heading>
      <Select
        mb="1em"
        value={ensembleType}
        onChange={(e) => {
          setEnsembleType(e.target.value);
        }}
      >
        <option value="SMD">Single-member districts</option>
        <option value="MMD">Multi-member districts</option>
      </Select>
      <HStack {...group}>
        {options.map((option) => {
          const label = option.label;
          const radio = getRadioProps({ value: option.value });
          return (
            <RadioTab key={option.value} {...radio}>
              {label}
            </RadioTab>
          );
        })}
      </HStack>
      <BarChart ensembleType={ensembleType} graphType={graphType} />
      <SimpleGrid columns={4} spacing={5} mt={5}>
        {ensembleType === "SMD"
          ? smdSharePercentages && (
              <>
                <Card
                  label={"Democrat Vote Share"}
                  value={
                    (smdSharePercentages.DEMOCRAT[0] * 100).toFixed(2) + "%"
                  }
                />
                <Card
                  label={"Democrat Vote Share"}
                  value={
                    (smdSharePercentages.DEMOCRAT[1] * 100).toFixed(2) + "%"
                  }
                />
                <Card
                  label={"Republican Vote Share"}
                  value={
                    (smdSharePercentages.REPUBLICAN[0] * 100).toFixed(2) + "%"
                  }
                />
                <Card
                  label={"Republican Seat Share"}
                  value={
                    (smdSharePercentages.REPUBLICAN[1] * 100).toFixed(2) + "%"
                  }
                />
              </>
            )
          : mmdSharePercentages && (
              <>
                <Card
                  label={"Democrat Vote Share"}
                  value={
                    (mmdSharePercentages?.DEMOCRAT[0] * 100).toFixed(2) + "%"
                  }
                  type={calculateIncreaseOrDecrease("DEMOCRAT", 0)}
                  helpText={
                    Math.abs(
                      (mmdSharePercentages.DEMOCRAT[0] -
                        smdSharePercentages.DEMOCRAT[0]) *
                        100
                    ).toFixed(2) + "%"
                  }
                />
                <Card
                  label={"Democrat Seat Share"}
                  value={
                    (mmdSharePercentages.DEMOCRAT[1] * 100).toFixed(2) + "%"
                  }
                  type={calculateIncreaseOrDecrease("DEMOCRAT", 1)}
                  helpText={
                    Math.abs(
                      (mmdSharePercentages.DEMOCRAT[1] -
                        smdSharePercentages.DEMOCRAT[1]) *
                        100
                    ).toFixed(2) + "%"
                  }
                />
                <Card
                  label={"Republican Vote Share"}
                  value={
                    (mmdSharePercentages.REPUBLICAN[0] * 100).toFixed(2) + "%"
                  }
                  type={calculateIncreaseOrDecrease("REPUBLICAN", 0)}
                  helpText={
                    Math.abs(
                      (mmdSharePercentages.REPUBLICAN[0] -
                        smdSharePercentages.REPUBLICAN[0]) *
                        100
                    ).toFixed(2) + "%"
                  }
                />
                <Card
                  label={"Republican Seat Share"}
                  value={
                    (mmdSharePercentages.REPUBLICAN[1] * 100).toFixed(2) + "%"
                  }
                  type={calculateIncreaseOrDecrease("REPUBLICAN", 1)}
                  helpText={
                    Math.abs(
                      (mmdSharePercentages.REPUBLICAN[1] -
                        smdSharePercentages.REPUBLICAN[1]) *
                        100
                    ).toFixed(2) + "%"
                  }
                />
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
