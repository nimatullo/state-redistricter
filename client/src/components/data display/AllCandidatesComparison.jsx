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
    <TableContainer>
      <Table size="sm">
        <TableCaption placement="top">
          Winners are highlighted in green, losers in red.
        </TableCaption>
        <Thead>
          <Tr>
            <Th>District</Th>
            <Th>Name</Th>
            <Th>Party</Th>
            <Th>Simulation Type</Th>
            <Th isNumeric>Votes</Th>
          </Tr>
        </Thead>
        <Tbody>
          {candidates.map((candidate) => (
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
              <Td>{candidate.type}</Td>
              <Td isNumeric>
                {Math.round(candidate.totalVotes).toLocaleString()}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default AllCandidatesComparison;
