import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import stateService from "../../services/stateService";
import {
  Card,
  CardBody,
  Icon,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  Progress,
} from "@chakra-ui/react";
import { FaDemocrat, FaRepublican } from "react-icons/fa";

const Losers = () => {
  const [losers, setLosers] = useState([]);

  const params = useParams();

  useEffect(() => {
    stateService.getCandidates(params.state, "losers").then((winners) => {
      console.log(winners);
      setLosers(winners);
    });
  }, []);

  const calculateProgress = (totalVotes, threshold) => {
    return (Number(totalVotes) / threshold) * 100;
  };

  return losers.map((district) => (
    <>
      <Heading my="4" size="md" key={district[0].district}>
        District {district[0].district}
      </Heading>
      <SimpleGrid columns={3} spacing={4}>
        {district.map((loser) => (
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
  ));
};

export default Losers;
