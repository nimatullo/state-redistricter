import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import stateService from "../../services/stateService";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Icon,
  Image,
} from "@chakra-ui/react";

import { FaDemocrat, FaRepublican } from "react-icons/fa";
import { faker } from "@faker-js/faker";

const Winners = () => {
  const [winners, setWinners] = useState([]);

  const params = useParams();

  useEffect(() => {
    stateService.getCandidates(params.state, "winners").then((winners) => {
      setWinners(winners);
    });
  }, []);

  return winners.map((district) => (
    <>
      <Heading my="4" size="md" key={district[0].district}>
        District {district[0].district}
      </Heading>
      <SimpleGrid columns={3} spacing={4}>
        {district.map((winner) => (
          <Card>
            <CardBody>
              <Stack spacing={2}>
                <Flex justifyContent={"space-between"} alignContent="center">
                  <Heading size="md">{winner.name}</Heading>
                  {winner.party === "Democratic" ? (
                    <Icon as={FaDemocrat} color="#3182ce" boxSize={6} />
                  ) : (
                    <Icon as={FaRepublican} color="#c53030" boxSize={6} />
                  )}
                </Flex>
                <Text color="gray.700" fontSize="md">
                  {Math.round(winner.totalVotes).toLocaleString()} Votes
                </Text>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </>
  ));
};

export default Winners;
