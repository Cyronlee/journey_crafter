import { JourneyHeader } from "@/lib/JourneyFileParser";
import {
  Box,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
  Flex,
  Avatar,
} from "@chakra-ui/react";

export const JourneyHeaderWidget = (props: { header: JourneyHeader }) => {
  return (
    <HStack
      position="sticky"
      left="0"
      w="100%"
      borderBottom="1px solid"
      borderColor="gray.300"
    >
      <Box w="40%" padding={"20px 0px 20px 32px"} gap={"8px"}>
        <HStack h="72px">
          <Box>
            <Avatar bg="teal.500" />
            {/*<Image*/}
            {/*  borderRadius="4px"*/}
            {/*  w="72px"*/}
            {/*  h="72px"*/}
            {/*  src="https://i.pravatar.cc/300"*/}
            {/*  alt="UX"*/}
            {/*></Image>*/}
          </Box>
          <Box>
            <VStack>
              <Heading
                w="100%"
                style={{
                  fontSize: "16px",
                  fontFamily: "Inter",
                  fontWeight: "700",
                  lineHeight: "20px",
                }}
              >
                Persona
              </Heading>
              <Text
                w="100%"
                style={{
                  fontSize: "14px",
                  fontFamily: "Inter",
                  fontWeight: "400",
                  lineHeight: "15px",
                }}
                whiteSpace={"normal"}
              >
                {props.header?.persona?.toString()}
              </Text>
              {/*<Text*/}
              {/*  w="100%"*/}
              {/*  style={{*/}
              {/*    fontSize: "14px",*/}
              {/*    fontFamily: "Inter",*/}
              {/*    fontWeight: "400",*/}
              {/*    lineHeight: "15px",*/}
              {/*  }}*/}
              {/*>*/}
              {/*  {props.header?.personal?.role}*/}
              {/*</Text>*/}
              {/*<Text*/}
              {/*  w="100%"*/}
              {/*  style={{*/}
              {/*    fontSize: "14px",*/}
              {/*    fontFamily: "Inter",*/}
              {/*    fontWeight: "400",*/}
              {/*    lineHeight: "15px",*/}
              {/*  }}*/}
              {/*>*/}
              {/*  {props.header?.personal?.isSingle ? "Single" : "Married"},{" "}*/}
              {/*  {props.header?.personal?.age} years old*/}
              {/*</Text>*/}
              {/*<Text*/}
              {/*  w="100%"*/}
              {/*  style={{*/}
              {/*    fontSize: "14px",*/}
              {/*    fontFamily: "Inter",*/}
              {/*    fontWeight: "400",*/}
              {/*    lineHeight: "15px",*/}
              {/*  }}*/}
              {/*>*/}
              {/*  {props.header?.personal?.address}*/}
              {/*</Text>*/}
            </VStack>
          </Box>
        </HStack>
      </Box>
      <Box w="60%" h="100%" borderLeft="1px solid" borderColor="gray.300">
        <HStack padding="20px 40px" gap="40px" alignItems="flex-start">
          <Box w="200px">
            <VStack>
              <Heading
                w="100%"
                style={{
                  fontSize: "16px",
                  fontFamily: "Inter",
                  fontWeight: "700",
                  lineHeight: "20px",
                }}
              >
                Scenarios
              </Heading>
              <Text
                w="100%"
                style={{
                  fontSize: "14px",
                  fontFamily: "Inter",
                  fontWeight: "400",
                  lineHeight: "15px",
                }}
                whiteSpace={"normal"}
              >
                {props.header?.scenario}
              </Text>
            </VStack>
          </Box>
          <Box w="240px">
            <VStack>
              <Heading
                w="100%"
                style={{
                  fontSize: "16px",
                  fontFamily: "Inter",
                  fontWeight: "700",
                  lineHeight: "20px",
                }}
              >
                Goals
              </Heading>
              <Text
                w="100%"
                style={{
                  fontSize: "14px",
                  fontFamily: "Inter",
                  fontWeight: "400",
                  lineHeight: "15px",
                }}
                whiteSpace={"normal"}
              >
                {props.header?.goals}
              </Text>
            </VStack>
          </Box>
        </HStack>
      </Box>
    </HStack>
  );
};
