import { Box, Heading, HStack, Select, useRadioGroup } from "@chakra-ui/react";
import React, { useEffect } from "react";
import stateService from "../../services/stateService";
import BoxPlot from "../data display/BoxPlot";
import { RadioTab } from "./GraphicalSummary";

const BoxWhiskerPage = (props) => {
  const [boxAndWhiskerData, setBoxAndWhiskerData] = React.useState(null);
  const [ensembleType, setEnsembleType] = React.useState("smd");

  useEffect(() => {
    setBoxAndWhiskerData(stateService.getBoxAndWhiskerData("", options[0]));
  }, []);

  useEffect(() => {
    setBoxAndWhiskerData(stateService.getBoxAndWhiskerData("", options[0]));
  }, [ensembleType]);

  const options = [
    "African American Population",
    "Hispanic Population",
    "White Population",
    "Asian Population",
    "Democratic Population",
    "Republican Population",
  ];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "dataset",
    defaultValue: options[0],
    onChange: (value) =>
      setBoxAndWhiskerData(stateService.getBoxAndWhiskerData("", value)),
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
        <option value="smd">Single-member districts</option>
        <option value="mmd">Multi-member districts</option>
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
        {options.map((value) => {
          const radio = getRadioProps({ value });
          return (
            <RadioTab key={value} {...radio}>
              {value}
            </RadioTab>
          );
        })}
      </Box>

      {boxAndWhiskerData && <BoxPlot boxPlotData={boxAndWhiskerData} />}
    </Box>
  );
};

export default BoxWhiskerPage;
