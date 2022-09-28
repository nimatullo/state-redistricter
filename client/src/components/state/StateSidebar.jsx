import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  HStack,
  Icon,
  Link,
  Stack,
} from "@chakra-ui/react";
import * as React from "react";
import { BiBookOpen } from "react-icons/bi";
import { MdOutlineGridOn } from "react-icons/md";
import { FaBalanceScale, FaMoneyBillWaveAlt } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import OUR_STATES from "../../assets/ourStates";

const StateSidebar = ({ currentView, setView }) => {
  const [currentState, setCurrentState] = React.useState("");
  const params = useParams();

  React.useEffect(() => {
    setCurrentState(OUR_STATES[params.state].name);
  });

  const underline = (view) => {
    return currentView === view ? "underline" : "none";
  };

  return (
    <Box pt="1em" height={"100vh"} bgColor={"brand.main"} color={"brand.white"}>
      <Heading p={3} size="md">
        {currentState}
      </Heading>
      <Accordion allowToggle>
        <Box p={2} ml={2}>
          <HStack>
            <Icon as={BiBookOpen} color={"brand.secondary"} />
            <Link
              textDecoration={underline("summary")}
              onClick={() => setView("summary")}
            >
              Summary
            </Link>
          </HStack>
        </Box>
        <Box p={2} ml={2}>
          <HStack>
            <Icon as={MdOutlineGridOn} color={"brand.secondary"} />
            <Link
              textDecoration={underline("compactness")}
              onClick={() => setView("compactness")}
            >
              Compactness
            </Link>
          </HStack>
        </Box>
        <AccordionItem borderColor={"transparent"}>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <HStack>
                  <Icon as={FaBalanceScale} color={"brand.secondary"} />
                  <Link>Fairness</Link>
                </HStack>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel ml={8}>
            <Stack>
              <Link textDecoration={underline("racial-fairness")}>
                Racial Fairness
              </Link>
              <Link textDecoration={underline("partisan-fairness")}>
                Political Fairness
              </Link>
            </Stack>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem borderColor={"transparent"}>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <HStack>
                  <Icon as={BsFillPersonFill} color={"brand.secondary"} />
                  <Link>Race Information</Link>
                </HStack>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel ml={8}>
            <Stack>
              <Link textDecoration={underline("af-population")}>
                African American
              </Link>
              <Link textDecoration={underline("asian-population")}>Asian</Link>
              <Link textDecoration={underline("hispanic-population")}>
                Hispanic
              </Link>
              <Link textDecoration={underline("white-population")}>White</Link>
            </Stack>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem borderColor={"transparent"}>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <HStack>
                  <Icon as={FaMoneyBillWaveAlt} color={"brand.secondary"} />
                  <Link>Socioeconomic Information</Link>
                </HStack>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel ml={8}>
            <Stack>
              <Link>African American</Link>
              <Link>Asian</Link>
              <Link>Hispanic</Link>
              <Link>White</Link>
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default StateSidebar;
