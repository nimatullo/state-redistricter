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
  const [layoutList, setLayoutList] = React.useState([]);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSummaryData();
  }, []);

  const fetchSummaryDataForLayout = (layout) => {
    stateService.getSummaryDataForLayout(params.state, layout).then((data) => {
      setSummaryData(data);
    });
  };

  const fetchSummaryData = () => {
    stateService.getSummaryData(params.state).then((data) => {
      setSummaryData(data);
      setLayoutList(data.layoutList);
    });
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
              if (e.target.value === "0") {
                fetchSummaryData();
              } else {
                fetchSummaryDataForLayout(e.target.value);
              }
            }}
          >
            <option value="0">Multi-member districts</option>
            <optgroup label="MMD Layouts">
              {layoutList.map((layout) => (
                <option value={layout}>{layout}</option>
              ))}
            </optgroup>
          </Select>
        </GridItem>
      </Grid>
      <Feature
        stat="Number of district plans"
        data={summaryData.totalDistrictPlans}
        roundedTo={0}
      />
      <Feature
        stat="Mean majority-minority representatives per plan"
        data={summaryData.avgOpportunityReps}
        roundedTo={1}
      />
      <Feature
        stat="Mean equal population measure"
        data={summaryData.avgEqualPop}
        roundedTo={2}
      />
      <Feature
        stat="Mean Polsby-Popper Score"
        data={summaryData.avgPolsbyPopperScores}
        roundedTo={3}
      />
      <Feature
        stat="Mean Republican split"
        data={summaryData.avgRepSplit}
        roundedTo={2}
        isPercentage
      />
      <Feature
        stat="Mean Democrat split"
        data={summaryData.avgDemSplit}
        roundedTo={2}
        isPercentage
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

        <GridItem textAlign={"right"}>
          {props.isPercentage
            ? (props.data.smd * 100).toFixed(props.roundedTo) + "%"
            : props.data.smd.toFixed(props.roundedTo)}
        </GridItem>

        <GridItem textAlign={"right"}>
          {props.isPercentage
            ? (props.data.mmd * 100).toFixed(props.roundedTo) + "%"
            : props.data.mmd.toFixed(props.roundedTo)}
        </GridItem>
      </Grid>
    )
  );
};

export default EnsembleSummary;
