import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  HStack,
  Icon,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import { useLocation, useParams } from "react-router-dom";
import OUR_STATES from "../../assets/ourStates";
import { sidebarLinks } from "./stateSidebarLinks";

import { Link as ReactRouterLink } from "react-router-dom";
import { useEffect } from "react";

const StateSidebar = () => {
  const [currentState, setCurrentState] = React.useState("");
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    setCurrentState(OUR_STATES[params.state].fullName);
  }, []);

  const setActiveClass = (view) => {
    const currentLocation = location.pathname.split("/").pop();
    return currentLocation === view ? "state-sidebar-active" : "";
  };

  return (
    <Box pt="1em" height={"100vh"} bgColor={"brand.main"} color={"brand.white"}>
      <Breadcrumb px={3} color="gray.400" fontSize={"12px"}>
        <BreadcrumbItem>
          <BreadcrumbLink as={ReactRouterLink} to="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink
            as={ReactRouterLink}
            to={`/map/${params.state}/overview`}
          >
            <Text as="strong">{currentState}</Text>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
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
                  <Link
                    as={ReactRouterLink}
                    to={link.view}
                    className={setActiveClass(link.view)}
                  >
                    {link.name}
                  </Link>
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
                          as={ReactRouterLink}
                          key={child.view}
                          className={setActiveClass(child.view)}
                          to={child.view}
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
