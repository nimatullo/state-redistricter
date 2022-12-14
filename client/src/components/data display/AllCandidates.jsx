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
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import stateService from "../../services/stateService";

const AllCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const params = useParams();

  useEffect(() => {
    stateService.getCandidates(params.state, "all").then((candidates) => {
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

export default AllCandidates;
