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
import FloridaIcon from "../../assets/img/FloridaIcon";
import Card from "../Card";

const FloridaBreakdown = () => {
  return (
    <Center>
      <Stack alignItems={"center"}>
        <Heading size={"xl"}>Florida</Heading>

        <Box>
          <Grid templateColumns="1fr 1fr" gap={6}>
            <GridItem>
              <TableContainer>
                <Table variant="simple">
                  <Tbody>
                    <Tr>
                      <Td>Number of districts</Td>
                      <Td isNumeric>
                        <Text as="b">27</Text>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Total population</Td>
                      <Td isNumeric>
                        <Text as="b">12.22 million</Text>
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
              <Card image={FloridaIcon} state="fl" />
            </GridItem>
          </Grid>
        </Box>
      </Stack>
    </Center>
  );
};

export default FloridaBreakdown;
