import { Box, Heading, HStack, Select, useRadioGroup } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import stateService from "../../services/stateService";
import BoxPlot from "../data display/BoxPlot";
import { RadioTab } from "./GraphicalSummary";

const BoxWhiskerPage = (props) => {
  const [boxAndWhiskerData, setBoxAndWhiskerData] = React.useState(null);
  const [ensembleType, setEnsembleType] = React.useState("SMD");
  const [population, setPopulation] = React.useState("BLACK");
  const [layoutList, setLayoutList] = React.useState(null);

  const params = useParams();

  useEffect(() => {
    stateService.getLayoutList(params.state).then((data) => {
      setLayoutList(data);
    });
  }, []);

  const options = [
    {
      label: "African American",
      value: "BLACK",
    },
    {
      label: "Asian",
      value: "ASIAN",
    },
    {
      label: "Hispanic",
      value: "HISPANIC",
    },
    {
      label: "White",
      value: "WHITE",
    },
    {
      label: "Republican",
      value: "REP",
    },
    {
      label: "Democrat",
      value: "DEM",
    },
  ];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "dataset",
    defaultValue: population,
    onChange: (value) => {
      setPopulation(value);
    },
  });

  const group = getRootProps();

  return (
    <Box p={"1em"}>
      <Heading size="2xl" mb="1em">
        Box and Whisker
      </Heading>
      <Select
        mb="1em"
        value={ensembleType}
        onChange={(e) => setEnsembleType(e.target.value)}
      >
        <option value="SMD">Single-member districts</option>
        <optgroup label="MMD">
          {layoutList &&
            layoutList.map((layout) => (
              <option key={layout} value={layout}>
                {layout.split("chain")[1]}
              </option>
            ))}
        </optgroup>
      </Select>

      <Box
        {...group}
        display="flex"
        width="800px"
        overflowX="auto"
        whiteSpace="nowrap"
        css={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {options.map((option) => {
          const radio = getRadioProps({ value: option.value });
          return (
            <RadioTab key={option.value} {...radio}>
              {option.label}
            </RadioTab>
          );
        })}
      </Box>

      <BoxPlot population={population} planType={ensembleType} />
    </Box>
  );
};

export default BoxWhiskerPage;
