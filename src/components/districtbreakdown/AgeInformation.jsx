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

import DataJSON from "../../../dummy_json/data.json";
import FloridaJSON from "../../../dummy_json/FL/data.json";

const SexAndAgeInformation = ({ district }) => {
  const [sexAndAgeData, setSexAndAgeData] = React.useState(null);

  useEffect(() => {
    setSexAndAgeData(FloridaJSON.SexandAge);
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
                    item.districts[Number(district.split("-")[1])]
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
