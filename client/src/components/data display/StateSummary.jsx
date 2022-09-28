import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";

const StateSummary = ({ state }) => {
  return (
    <Box p={"1em"}>
      <Heading size="xl" mb="1em">
        Summary
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

export default StateSummary;
