import React from "react";
import {
  Box,
  Center,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import Card from "../Card";

const StateBreakdown = ({ state }) => {
  return (
    state && (
      <Center>
        <Stack alignItems={"center"}>
          <Heading size={"xl"}>{state.name}</Heading>
          <Box>
            <Grid templateColumns="1fr 1fr" gap={6}>
              <GridItem>
                <TableContainer>
                  <Table variant="simple">
                    <Tbody>
                      <Tr>
                        <Td>Number of districts</Td>
                        <Td isNumeric>
                          <Text as="b">{state.districts}</Text>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Total population</Td>
                        <Td isNumeric>
                          <Text as="b">{state.population} million</Text>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Party breakup</Td>
                        <Td isNumeric>
                          <Text as="b">{state.partyBreakdown}</Text>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>District type</Td>
                        <Td isNumeric>
                          <Text as="b">{state.districtType}</Text>
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </GridItem>
              <GridItem>
                <Card image={state.icon} state={state.abrv} />
              </GridItem>
            </Grid>
          </Box>
        </Stack>
      </Center>
    )
  );
};

export default StateBreakdown;
