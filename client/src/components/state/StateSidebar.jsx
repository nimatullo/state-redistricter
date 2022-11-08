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
import { useParams } from "react-router-dom";
import OUR_STATES from "../../assets/ourStates";
import { sidebarLinks } from "./stateSidebarLinks";

const StateSidebar = ({ currentView, setView }) => {
  const [currentState, setCurrentState] = React.useState("");
  const params = useParams();

  React.useEffect(() => {
    setCurrentState(OUR_STATES[params.state].fullName);
  });

  const setActiveClass = (view) => {
    return currentView === view ? "state-sidebar-active" : "";
  };

  return (
    <Box pt="1em" height={"100vh"} bgColor={"brand.main"} color={"brand.white"}>
      <Heading p={3} size="md">
        {currentState}
      </Heading>
      <Accordion allowToggle>
        {sidebarLinks.map((link) => {
          if (!link.children) {
            return (
              <Box p={2} ml={2} key={link.view}>
                <HStack className={setActiveClass(link.view)}>
                  <Icon as={link.icon} color={"brand.secondary"} />
                  <Link onClick={() => setView(link.view)}>{link.name}</Link>
                </HStack>
              </Box>
            );
          } else {
            return (
              <AccordionItem borderColor={"transparent"} key={link.view}>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <HStack>
                        <Icon as={link.icon} color={"brand.secondary"} />
                        <Link>{link.name}</Link>
                      </HStack>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel ml={8}>
                  <Stack>
                    {link.children.map((child) => {
                      return (
                        <Link
                          key={child.view}
                          onClick={() => setView(child.view)}
                          className={setActiveClass(child.view)}
                        >
                          {child.name}
                        </Link>
                      );
                    })}
                  </Stack>
                </AccordionPanel>
              </AccordionItem>
            );
          }
        })}
      </Accordion>
    </Box>
  );
};

export default StateSidebar;
