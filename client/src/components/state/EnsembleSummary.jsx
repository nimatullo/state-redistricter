import {
  Box,
  SimpleGrid,
  Flex,
  ChakraProvider,
  Text,
  List,
  ListItem,
  Grid,
  GridItem,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import stateService from "../../services/stateService";
import { useParams } from "react-router-dom";

const EnsembleSummary = () => {
  const [summaryData, setSummaryData] = React.useState({});

  const params = useParams();

  useEffect(() => {
    const data = stateService.getSummaryData(params.state);
    setSummaryData(data);
  }, []);

  return (
    <>
      <Grid gridTemplateColumns={"1fr 1fr 1fr"}>
        <GridItem gridColumn={2}>
          <Heading textAlign={"right"} as="h1" fontSize="xl">
            Single-member districts
          </Heading>
        </GridItem>
        <GridItem>
          <Heading textAlign={"right"} as="h1" fontSize="xl">
            Multi-member districts
          </Heading>
        </GridItem>
      </Grid>

      <Feature
        stat="Number of district plans"
        data={summaryData.numberOfDistricts}
      />
      <Feature
        stat="Mean majority-minority representatives per plan"
        data={summaryData.majorityMinority}
      />
      <Feature
        stat="Mean equal population measure"
        data={summaryData.equalPopMeasure}
      />
      <Feature
        stat="Mean Polsby-Popper Score"
        data={summaryData.polsbyPopper}
        isMean
      />
      <Feature
        stat="Mean Republican/Democratic split"
        data={summaryData.republicanDemocraticSplit}
      />
    </>
  );
};

const Feature = (props) => {
  return (
    props.data && (
      <Grid gridTemplateColumns={"1fr 1fr 1fr"} marginY="3" gap="3">
        <GridItem>
          <Text fontWeight={"semibold"}>{props.stat}</Text>
        </GridItem>

        <GridItem textAlign={"right"}>{props.data.smd}</GridItem>

        <GridItem textAlign={"right"}>{props.data.mmd}</GridItem>
      </Grid>
    )
  );
};

export default EnsembleSummary;
