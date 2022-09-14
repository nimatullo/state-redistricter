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
import React, { useEffect } from "react";

import DataJSON from "../../../dummy_json/data.json";
import FloridaJSON from "../../../dummy_json/FL/data.json";

const RaceInformation = ({ district }) => {
  const [raceData, setRaceData] = React.useState(null);

  useEffect(() => {
    setRaceData(FloridaJSON.Race);
  }, []);

  return (
    <Box className="info-box">
      <div className="info-box-content">
        <Heading size="lg">Race breakdown for district {district}</Heading>
        {raceData &&
          raceData.map((item) => {
            return (
              <Stat mt={5}>
                <StatLabel>
                  <HStack>
                    <Icon as={BsFillPersonFill} />
                    <Text>{item.title}</Text>
                  </HStack>
                </StatLabel>
                <StatNumber>
                  {Number(
                    item.districts[Number(district.split("-")[1])]
                  ).toLocaleString()}
                </StatNumber>
              </Stat>
            );
          })}
      </div>
    </Box>
  );
};

export default RaceInformation;
