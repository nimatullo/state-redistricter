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
  Center,
  Button,
  Select,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import stateService from "../../services/stateService";
import { useNavigate, useParams } from "react-router-dom";

const EnsembleSummary = () => {
  const [summaryData, setSummaryData] = React.useState({});

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const data = stateService.getSummaryData(params.state);
    setSummaryData(data);
  }, []);

  const fetchSummaryData = (layout) => {
    const data = stateService.getSummaryData(params.state, layout);
    setSummaryData(data);
  };

  return (
    <>
      <Grid gridTemplateColumns={"1fr 1fr 1fr"} placeItems="center">
        <GridItem gridColumn={2}>
          <Heading textAlign={"left"} as="h1" fontSize="lg">
            Single-member districts
          </Heading>
        </GridItem>
        <GridItem>
          <Select
            fontWeight={"700"}
            textAlign={"right"}
            fontSize="lg"
            border={"transparent"}
            _hover={{ cursor: "pointer" }}
            onChange={(e) => {
              fetchSummaryData(e.target.value);
            }}
          >
            <option>Multi-member districts</option>
            <optgroup label="MMD Layouts">
              <option value="345">335</option>
              <option value="333">333</option>
            </optgroup>
          </Select>
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

      <Center>
        <Button
          onClick={() => {
            navigate("/map/" + params.state + "/graphical-summary");
          }}
          variant="outline"
        >
          Show Graphical Summary
        </Button>
      </Center>
    </>
  );
};

const Feature = (props) => {
  return (
    props.data && (
      <Grid
        gridTemplateColumns={"1fr 1fr 1fr"}
        marginY="3"
        gap="3"
        borderBottom="1px solid"
        borderColor="gray.200"
      >
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
