"use client";

import {
  Box,
  VStack,
  Text,
  Flex,
  Center,
  Heading,
  Input,
  Button,
  Textarea,
  InputGroup,
  InputRightElement,
  useToast,
  useColorModeValue,
  Container,
  Icon,
} from "@chakra-ui/react";
import { FiSun } from "react-icons/fi";
import { BiMapAlt } from "react-icons/bi";
import React, { useEffect, useRef, useState } from "react";
import { ChatMessage, IChatMessage } from "@/types/chat";
import MermaidWrapper from "@/components/MermairdWrapper";
import mermaid from "mermaid";
import { NodeJS } from "timers";

export default function ChatPage() {
  const [prompt1, setPrompt1] = useState("");
  const [prompt2, setPrompt2] = useState("");
  const [userInput, setUserInput] = useState("");

  const [mermaidData, setMermaidData] = useState(``);

  const [chatgptResponse, setChatgptResponse] = useState("");

  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>(null);

  const toast = useToast();

  const handleGenerate = async () => {
    let messages: ChatMessage[] = [];
    if (prompt1 !== "") {
      messages.push({ role: "user", content: prompt1 });
    }
    if (prompt2 !== "") {
      messages.push({ role: "user", content: prompt2 });
    }
    if (userInput !== "") {
      messages.push({ role: "user", content: userInput });
    }
    callChatGPT(messages);
    // if (await isMermaidDataValid(userInput)) {
    //   setMermaidData(userInput);
    // }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleGenerate();
    }
  };

  const callChatGPT = async (messages: ChatMessage[]) => {
    const response = await fetch("/api/generate", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(messages),
    });

    let responseMessage = "";
    const reader = response?.body?.getReader();
    const decoder = new TextDecoder();
    while (true) {
      // @ts-ignore
      const { done, value } = await reader?.read();
      if (done) {
        break;
      }
      const chunk = decoder.decode(value);
      responseMessage += chunk;
      setChatgptResponse(responseMessage);
      if (await isMermaidDataValid(responseMessage)) {
        // setMermaidData(responseMessage);
        updateMermaidData(responseMessage);
      }
    }
  };

  const isMermaidDataValid = async (payload: string) => {
    try {
      await mermaid.parse(payload);
      return true;
    } catch (e) {
      return false;
    }
  };

  const updateMermaidData = (newValue: string) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    let timeout = setTimeout(() => {
      console.log("triggered");
      setMermaidData(newValue);
      setTimeoutId(null);
    }, 2000);

    setTimeoutId(timeout);
  };

  return (
    <Box>
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
            <Heading size="sm">Prompt 1</Heading>
            <Textarea
              borderColor="gray.200"
              value={prompt1}
              onChange={(e) => setPrompt1(e.target.value)}
            />
            <Heading size="sm">Prompt 2</Heading>
            <Textarea
              borderColor="gray.200"
              value={prompt2}
              onChange={(e) => setPrompt2(e.target.value)}
            />
            <Heading size="sm">User Input</Heading>
            <Textarea
              borderColor="gray.200"
              placeholder="Here is a sample placeholder"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <Button
              w="84px"
              size="sm"
              colorScheme="purple"
              onClick={handleGenerate}
            >
              Generate
            </Button>
            <Text
              whiteSpace="pre"
              minH="240px"
              maxW="960px"
              borderRadius="8px"
              borderColor="gray.200 !important"
              border="1px solid"
              p="8px 16px"
            >
              {chatgptResponse}
            </Text>
            <Box
              h="700px"
              borderRadius="8px"
              borderColor="gray.200 !important"
              border="1px solid"
            >
              <MermaidWrapper graphDefinition={mermaidData}></MermaidWrapper>
            </Box>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}
