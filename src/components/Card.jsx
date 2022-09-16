import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Link as LinkComponent,
  HStack,
} from "@chakra-ui/react";

import { BsArrowRightShort } from "react-icons/bs";

import { Link } from "react-router-dom";

export default function Card({ image, state }) {
  return (
    <Box
      role={"group"}
      p={6}
      maxW={"330px"}
      w={"full"}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"md"}
      rounded={"lg"}
      pos={"relative"}
      border="1px solid #e2e8f0"
      zIndex={1}
    >
      <Box
        rounded={"lg"}
        pos={"relative"}
        height={"230px"}
        _after={{
          transition: "all .3s ease",
          content: '""',
          w: "full",
          h: "full",
          pos: "absolute",
          top: 5,
          left: 0,
          backgroundImage: `url(${image})`,
          filter: "blur(15px)",
          zIndex: -1,
        }}
        _groupHover={{
          _after: {
            filter: "blur(20px)",
          },
        }}
      >
        <Image
          rounded={"lg"}
          height={230}
          width={282}
          objectFit={"cover"}
          as={image}
          className="state-icon"
        />
      </Box>
      <Stack pt={10} align={"center"}>
        <LinkComponent as={Link} to={`/map/${state}`}>
          <HStack>
            <Text
              color={"gray.500"}
              fontSize={"sm"}
              textTransform={"uppercase"}
            >
              District breakdown
            </Text>
            <BsArrowRightShort />
          </HStack>
        </LinkComponent>
      </Stack>
    </Box>
  );
}
