import React from "react";
import { Box, HStack, Stack } from "@chakra-ui/react";

const Legend = () => {
  return (
    // Create a legend for the map where there is a box that is colored and next to the box is the party name
    <Stack
      p={"1em"}
      position="absolute"
      zIndex={"999"}
      bg="whiteAlpha.700"
      borderRadius={"5px"}
      right="1em"
      top="1em"
      borderColor="gray.400"
      borderWidth="1px"
    >
      <HStack>
        <Box w="20px" h="20px" bg="red.500" display="inline-block" mr="5px" />
        <Box display="inline-block">Republican</Box>
      </HStack>
      <HStack>
        <Box w="20px" h="20px" bg="blue.500" display="inline-block" mr="5px" />
        <Box display="inline-block">Democrat</Box>
      </HStack>
      <HStack>
        <Box w="20px" h="20px" bg="green.500" display="inline-block" mr="5px" />
        <Box display="inline-block">Tie</Box>
      </HStack>
    </Stack>
  );
};

export default Legend;
