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
  Progress,
} from "@chakra-ui/react";

import { FaDemocrat, FaRepublican } from "react-icons/fa";
import { faker } from "@faker-js/faker";

const LosersComparison = () => {
  const [losers, setLosers] = useState([]);

  const params = useParams();

  useEffect(() => {
    stateService.getCandidatesForComparison("losers").then((losers) => {
      console.log(losers);
      setLosers(losers);
    });
  }, []);
  const calculateProgress = (totalVotes, threshold) => {
    return (Number(totalVotes) / threshold) * 100;
  };

  return (
    <>
      <Heading my="4" size="md">
        Even
      </Heading>
      <SimpleGrid columns={3} spacing={4}>
        {losers
          .filter((d) => d.type === "even")
          .map((loser) => (
            <Card>
              <CardBody>
                <Stack spacing={2}>
                  <Flex justifyContent={"space-between"} alignContent="center">
                    <Heading size="md">{loser.name}</Heading>
                    {loser.party === "Democratic" ? (
                      <Icon as={FaDemocrat} color="#3182ce" boxSize={6} />
                    ) : (
                      <Icon as={FaRepublican} color="#c53030" boxSize={6} />
                    )}
                  </Flex>
                  <Text color="gray.700" fontSize="sm">
                    District {loser.district}
                  </Text>
                  <Progress
                    size="xs"
                    value={calculateProgress(loser.totalVotes, loser.threshold)}
                  />
                  <Text fontSize="xs" color={"gray.600"}>
                    {Math.round(
                      loser.threshold - loser.totalVotes
                    ).toLocaleString()}{" "}
                    Votes Needed To Avoid Elimination
                  </Text>
                  <Text color="gray.700" fontSize="md">
                    {Math.round(loser.totalVotes).toLocaleString()} Votes
                  </Text>
                </Stack>
              </CardBody>
            </Card>
          ))}
      </SimpleGrid>

      <Heading my="4" size="md">
        Uneven
      </Heading>
      <SimpleGrid columns={3} spacing={4}>
        {losers
          .filter((d) => d.type === "uneven")
          .map((loser) => (
            <Card>
              <CardBody>
                <Stack spacing={2}>
                  <Flex justifyContent={"space-between"} alignContent="center">
                    <Heading size="md">{loser.name}</Heading>
                    {loser.party === "Democratic" ? (
                      <Icon as={FaDemocrat} color="#3182ce" boxSize={6} />
                    ) : (
                      <Icon as={FaRepublican} color="#c53030" boxSize={6} />
                    )}
                  </Flex>
                  <Text color="gray.700" fontSize="sm">
                    District {loser.district}
                  </Text>
                  <Progress
                    size="xs"
                    value={calculateProgress(loser.totalVotes, loser.threshold)}
                  />
                  <Text fontSize="xs" color={"gray.600"}>
                    {Math.round(
                      loser.threshold - loser.totalVotes
                    ).toLocaleString()}{" "}
                    Votes Needed To Avoid Elimination
                  </Text>
                  <Text color="gray.700" fontSize="md">
                    {Math.round(loser.totalVotes).toLocaleString()} Votes
                  </Text>
                </Stack>
              </CardBody>
            </Card>
          ))}
      </SimpleGrid>
    </>
  );
};

export default LosersComparison;
