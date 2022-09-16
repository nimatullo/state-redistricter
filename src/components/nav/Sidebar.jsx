import React from "react";
import {
  Box,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Text,
} from "@chakra-ui/react";

import ArkansasIcon from "../../assets/img/ArkansasIcon";
import FloridaIcon from "../../assets/img/FloridaIcon";
import NorthCarolinaIcon from "../../assets/img/NorthCarolinaIcon";

const LinkItems = [
  { name: "Arkansas", icon: ArkansasIcon },
  { name: "Florida", icon: FloridaIcon },
  { name: "North Carolina", icon: NorthCarolinaIcon },
];

export default function Sidebar({ setPage }) {
  return (
    <>
      <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
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
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          link={link}
          setPage={setPage}
          setActive={setActive}
          active={active}
        >
          {link.name}
        </NavItem>
      ))}
    </>
  );
};

const NavItem = ({ link, children, setPage, setActive, active, ...rest }) => {
  const handleClick = () => {
    setPage(link.name);
    setActive(link.name);
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
          bg: "blue.300",
          color: "white",
        }}
        style={
          active === link.name
            ? {
                backgroundColor: "var(--chakra-colors-blue-400)",
                color: "white",
              }
            : null
        }
        {...rest}
      >
        {link.icon && (
          <Icon
            mr="4"
            fontSize="35"
            _groupHover={{
              color: "white",
            }}
            as={link.icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};
