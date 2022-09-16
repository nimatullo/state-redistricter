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
import Arkansas from "../../assets/img/ArkansasIcon";
import Card from "../Card";
import ArkansasIcon from "../../assets/img/ArkansasIcon";

const ArkansasBreakdown = () => {
  return (
    <Center>
      <Stack alignItems={"center"}>
        <Heading size={"xl"}>Arkansas</Heading>

        <Box>
          <Grid templateColumns="1fr 1fr" gap={6}>
            <GridItem>
              <TableContainer>
                <Table variant="simple">
                  <Tbody>
                    <Tr>
                      <Td>Number of districts</Td>
                      <Td isNumeric>
                        <Text as="b">4</Text>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Total population</Td>
                      <Td isNumeric>
                        <Text as="b">3.012 million</Text>
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
              <Card image={ArkansasIcon} state="ak" />
            </GridItem>
          </Grid>
        </Box>
      </Stack>
    </Center>
  );
};

export default ArkansasBreakdown;
