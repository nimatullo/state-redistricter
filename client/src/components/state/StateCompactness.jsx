import React from "react";
import { Box, Heading, Flex } from "@chakra-ui/react";

const StateCompactness = ({ state }) => {
  return (
    <Box p={"1em"}>
      <Heading size="xl" mb="1em">
        Compactness
      </Heading>
      <Flex justifyContent={"space-between"}>
        <Box>
          <Heading size="l">Multi-member ensemble</Heading>
        </Box>
        <Box>
          <Heading size="l">Single-member ensemble</Heading>
        </Box>
      </Flex>
    </Box>
  );
};

export default StateCompactness;
