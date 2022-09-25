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
import { BiDollarCircle } from "react-icons/bi";
import React, { useEffect } from "react";

import FloridaJSON from "../../../dummy_json/florida/data.json";
import ArkansasJSON from "../../../dummy_json/arkansas/data.json";
import NorthCarolinaJSON from "../../../dummy_json/north_carolina/data.json";

const SocioeconomicInformation = ({ district, state }) => {
  const [socioeconomicData, setSocioeconomicData] = React.useState(null);

  useEffect(() => {
    switch (state.toLowerCase()) {
      case "fl":
        setSocioeconomicData(
          FloridaJSON["IncomeandBenefits(In2019inflation-adjusteddollars)"]
        );
        break;
      case "ar":
        setSocioeconomicData(
          ArkansasJSON["IncomeandBenefits(In2019inflation-adjusteddollars)"]
        );
      case "nc":
        setSocioeconomicData(
          NorthCarolinaJSON[
            "IncomeandBenefits(In2019inflation-adjusteddollars)"
          ]
        );
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
          Socioeconomic breakdown for district {district.split("-")[1]}
        </Heading>
        {socioeconomicData &&
          socioeconomicData.map((item) => {
            return (
              <Stat mt={5}>
                <StatLabel>
                  <HStack>
                    <Icon as={BiDollarCircle} />
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

export default SocioeconomicInformation;
