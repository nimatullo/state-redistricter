import React from "react";
import L from "leaflet";
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
import NorthCarolina from "../../assets/img/NorthCarolinaIcon";
import Card from "../Card";

const NorthCarolinaBreakdown = () => {
  return (
    <Center>
      <Stack alignItems={"center"}>
        <Heading size={"xl"}>North Carolina</Heading>

        <Box>
          <Grid templateColumns="1fr 1fr" gap={6}>
            <GridItem>
              <TableContainer>
                <Table variant="simple">
                  <Tbody>
                    <Tr>
                      <Td>Number of districts</Td>
                      <Td isNumeric>
                        <Text as="b">13</Text>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Total population</Td>
                      <Td isNumeric>
                        <Text as="b">10.39 million</Text>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Party breakup</Td>
                      <Td isNumeric>
                        <Text as="b">R: 54% / D: 46%</Text>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>District type</Td>
                      <Td isNumeric>
                        <Text as="b">Single member</Text>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </GridItem>
            <GridItem>
              <Card image={NorthCarolina} state="nc" />
            </GridItem>
          </Grid>
        </Box>
      </Stack>
    </Center>
  );
};

export default NorthCarolinaBreakdown;
