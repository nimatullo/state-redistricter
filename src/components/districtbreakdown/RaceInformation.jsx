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

import FloridaJSON from "../../../dummy_json/FL/data.json";
import ArkansasJSON from "../../../dummy_json/arkansas/data.json";
import NorthCarolinaJSON from "../../../dummy_json/north_carolina/data.json";

const RaceInformation = ({ district, state }) => {
  const [raceData, setRaceData] = React.useState(null);

  useEffect(() => {
    switch (state.toLowerCase()) {
      case "fl":
        setRaceData(FloridaJSON.Race);
        break;
      case "ar":
        setRaceData(ArkansasJSON.Race);
      case "nc":
        setRaceData(NorthCarolinaJSON.Race);
      default:
        break;
    }
  }, []);

  const getTextIfParanethesis = (text) => {
    if (text.includes("(")) {
      return text.split("(")[0];
    }
    return text;
  };

  const getTextBetweenParanethesis = (text) => {
    return text.split("(")[1].split(")")[0];
  };

  return (
    <Box className="info-box">
      <div className="info-box-content">
        <Heading size="lg">
          Race breakdown for district {district.split("-")[1]}
        </Heading>
        {raceData &&
          raceData.map((item) => {
            return (
              <Stat mt={5}>
                <StatLabel>
                  <HStack>
                    <Icon as={BsFillPersonFill} />
                    <Text>{getTextIfParanethesis(item.title)}</Text>
                  </HStack>
                </StatLabel>
                <StatNumber>
                  {Number(
                    item.districts[Number(district.split("-")[1] - 1)]
                  ).toLocaleString()}
                </StatNumber>
                {item.title.includes("(") && (
                  <StatHelpText>
                    {getTextBetweenParanethesis(item.title)}
                  </StatHelpText>
                )}
              </Stat>
            );
          })}
      </div>
    </Box>
  );
};

export default RaceInformation;
