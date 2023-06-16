"use client";

import {
  Box,
  VStack,
  Text,
  Flex,
  Center,
  Heading,
  Button,
  Textarea,
  useToast,
  Container,
  Icon,
} from "@chakra-ui/react";
import { FiSun } from "react-icons/fi";
import { BiMapAlt } from "react-icons/bi";
import React, { useState } from "react";
import ThemeToggle from '@/components/ThemeToggle';
import { JourneyHeaderWidget } from '@/app/journey/JourneyHeader';
import JourneyMatrix from '@/components/JourneyMatrix/JourneyMatrix';

export default function ChatPage() {
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();
  const handleGenerate = () => {
    alert("generate");
    if (inputValue.trim() === "") {
      toast({
        title: "Please input something...",
        status: "warning",
        isClosable: true,
      });
      return;
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleGenerate();
    }
  };

  const journey = {
    header: {
      personal: "zushun chen",
      scenario: "The quick brown fox jumps over the lazy dog is an English language pangram a" +
        " sentence that contains all of the letters of the English alphabet. Owing to" +
        " its existence, Chakra was created.",
      goals: "The quick brown fox jumps over the lazy dog is an English language pangram a" +
        " sentence that contains all of the letters of the English alphabet. Owing to" +
        " its existence, Chakra was created."
    }
  }

  return (
    <Box>
      <ThemeToggle />
      <Flex
        w="100vw"
        h="64px"
        px="32px"
        borderBottom="1px solid"
        borderColor="gray.200"
        alignItems="center"
        gap="6px"
      >
        <Icon color="#F2617A" as={BiMapAlt} />
        <Heading size="sm" fontFamily="Bitter" fontWeight="bold">
          JourneyCrafter
        </Heading>
      </Flex>
      <Container px="0" maxW="960px" centerContent>
        <Box px="8px" color="black">
          <VStack align="stretch">
            <Flex mt="24px" mb="12px" alignItems="center" gap="6px">
              <Icon color="#CC850A" as={FiSun} />

              <Text>
                Hi, you can generate a user journey map just by entering the
                prompt. Give it a try now!
              </Text>
            </Flex>
            <Heading size="sm">Prompt</Heading>
            <Textarea
              borderColor="gray.200"
              placeholder="Here is a sample placeholder"
              value={inputValue}
              onKeyDown={handleKeyPress}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button
              w="84px"
              size="sm"
              colorScheme="purple"
              onClick={handleGenerate}
            >
              Generate
            </Button>
            <VStack
              whiteSpace="pre"
              minH="240px"
              w="100%"
              borderRadius="8px"
              borderColor="gray.200 !important"
              border="1px solid"
              p="8px 16px"
            >
              <Center h="100%" w="100%">
                <VStack>
                  <JourneyHeaderWidget header={journey.header}></JourneyHeaderWidget>
                  <JourneyMatrix></JourneyMatrix>
                </VStack>
              </Center>
            </VStack>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}
