import React, { useState } from "react";
import { useEffect } from "react";
import stateService from "../../services/stateService";
import {
  Table,
  TableContainer,
  Tbody,
  Thead,
  Tr,
  Th,
  Td,
  TableCaption,
  Flex,
  Text,
  Center,
} from "@chakra-ui/react";

const AllCandidatesComparison = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    stateService.getCandidatesForComparison("all").then((candidates) => {
      console.log(candidates);
      setCandidates(candidates);
    });
  }, []);

  return (
    <>
      <Center>
        <Text fontSize={"sm"} padding="1em">
          Winners are highlighted in{" "}
          <span style={{ color: "#48BB78" }}>green</span> and losers in{" "}
          <span style={{ color: "#F56565" }}>red</span>
        </Text>
      </Center>
      <Flex>
        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>District</Th>
                <Th>Name</Th>
                <Th>Party</Th>
                <Th isNumeric>Votes</Th>
              </Tr>
            </Thead>
            <Tbody>
              {candidates
                .filter((candidate) => candidate.type === "even")
                .map((candidate) => (
                  <Tr key={candidate.name}>
                    <Td>{candidate.district}</Td>
                    <Td
                      color={() => {
                        return candidate.isWinner ? "#48BB78" : "#F56565";
                      }}
                    >
                      {candidate.name}
                    </Td>
                    <Td>{candidate.party}</Td>
                    <Td isNumeric>
                      {Math.round(candidate.totalVotes).toLocaleString()}
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>District</Th>
                <Th>Name</Th>
                <Th>Party</Th>
                <Th isNumeric>Votes</Th>
              </Tr>
            </Thead>
            <Tbody>
              {candidates
                .filter((candidate) => candidate.type === "uneven")
                .map((candidate) => (
                  <Tr key={candidate.name}>
                    <Td>{candidate.district}</Td>
                    <Td
                      color={() => {
                        return candidate.isWinner ? "#48BB78" : "#F56565";
                      }}
                    >
                      {candidate.name}
                    </Td>
                    <Td>{candidate.party}</Td>
                    <Td isNumeric>
                      {Math.round(candidate.totalVotes).toLocaleString()}
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </>
  );
};

export default AllCandidatesComparison;
