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
import { FaTransgenderAlt } from "react-icons/fa";
import React, { useEffect } from "react";

import FloridaJSON from "../../../dummy_json/FL/data.json";
import ArkansasJSON from "../../../dummy_json/arkansas/data.json";

const SexAndAgeInformation = ({ district, state }) => {
  const [sexAndAgeData, setSexAndAgeData] = React.useState(null);

  useEffect(() => {
    switch (state.toLowerCase()) {
      case "fl":
        setSexAndAgeData(FloridaJSON.SexandAge);
        console.log("FLorida");
        break;
      case "ar":
        setSexAndAgeData(ArkansasJSON.SexandAge);
        console.log("Arkansas");
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
          Sex and Age breakdown for district {district.split("-")[1]}
        </Heading>
        {sexAndAgeData &&
          sexAndAgeData.map((item) => {
            return (
              <Stat mt={5}>
                <StatLabel>
                  <HStack>
                    <Icon as={FaTransgenderAlt} />
                    <Text>{getTextIfParanethesis(item.title)}</Text>
                  </HStack>
                </StatLabel>
                <StatNumber>
                  {Number(
                    item.districts[Number(district.split("-")[1]) - 1]
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

export default SexAndAgeInformation;
