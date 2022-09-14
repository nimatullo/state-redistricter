import {
  Box,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Text,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { BsFillPersonFill } from "react-icons/bs";
import React from "react";
import DataJSON from "../../../dummy_json/data.json";

const RaceInformation = ({ district }) => {
  return (
    <Box className="info-box">
      <div className="info-box-content">
        <Heading size="lg">Race breakdown for district {district}</Heading>
        {DataJSON.map((item) => {
          return (
            <Stat mt={5}>
              <StatLabel>
                <HStack>
                  <Icon as={BsFillPersonFill} />
                  <Text>{item.Race} Population</Text>
                </HStack>
              </StatLabel>
              <StatNumber>{item.Population.toLocaleString()}</StatNumber>
              <StatHelpText>{item.Percentage}% of population</StatHelpText>
            </Stat>
          );
        })}
      </div>
    </Box>
  );
};

export default RaceInformation;
