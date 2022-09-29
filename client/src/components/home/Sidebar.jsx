import React from "react";
import {
  Box,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Text,
} from "@chakra-ui/react";

import OUR_STATES from "../../assets/ourStates";

export default function Sidebar({ setPage }) {
  return (
    <>
      <Box minH="100vh" bg={"brand.main"} color={"brand.white"}>
        <SidebarContent setPage={setPage} />
      </Box>
    </>
  );
}

const SidebarContent = ({ setPage }) => {
  const [active, setActive] = React.useState("Arkansas");

  return (
    <>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="bold">
          States
        </Text>
      </Flex>
      {Object.keys(OUR_STATES).map((state) => {
        const stateInfo = OUR_STATES[state];
        return (
          <NavItem
            key={stateInfo.name}
            state={stateInfo}
            setPage={setPage}
            setActive={setActive}
            active={active}
          >
            {stateInfo.name}
          </NavItem>
        );
      })}
    </>
  );
};

const NavItem = ({ state, children, setPage, setActive, active, ...rest }) => {
  const handleClick = () => {
    setPage(state.abrv);
    setActive(state.name);
  };
  return (
    <Link
      onClick={handleClick}
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "#282F3B",
          color: "white",
        }}
        style={
          active === state.name
            ? {
                backgroundColor: "var(--chakra-colors-brand-tertiary)",
                color: "white",
              }
            : null
        }
        {...rest}
      >
        {state.icon && (
          <Icon
            mr="4"
            fontSize="35"
            fill={"whiteAlpha.700"}
            _groupHover={{
              color: "brand.secondary",
            }}
            as={state.icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};
