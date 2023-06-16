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
import { debounced } from "@/lib/debounce";

const initPrompt1 = `\`\`\`
journey
    title {string}
    section {string}
      {string}: {number 1-5}: {role}
      {string}: {number 1-5}: {role}
    section {string}
      {string}: {number 1-5}: {role}
      {string}: {number 1-5}: {role}
\`\`\`
这是一个mermaid用户旅程图的代码模板，下面是一个示例：
\`\`\`
journey
    title My working day
    section Go to work
      Make tea: 5: Me
      Go upstairs: 3: Me
      Do work: 1: Me, Cat
    section Go home
      Go downstairs: 5: Me
      Sit down: 5: Me
\`\`\`
你需要根据我的需求，生成一个用户旅程图示例，并按照上面的代码格式返回给我，只返回代码
`;

const initPrompt2 = `记住，只返回\`\`\`中的代码，不包含\`\`\``;

export default function ChatPage() {
  const [prompt1, setPrompt1] = useState(initPrompt1);
  const [prompt2, setPrompt2] = useState(initPrompt2);
  const [userInput, setUserInput] = useState("");

  const [mermaidData, setMermaidData] = useState(``);

  const [chatgptResponse, setChatgptResponse] = useState("");

  const toast = useToast();

  const handleGenerate = async () => {
    let messages: ChatMessage[] = [];
    if (prompt1 !== "") {
      messages.push({ role: "assistant", content: prompt1 });
    }
    if (prompt2 !== "") {
      messages.push({ role: "user", content: prompt2 });
    }
    if (userInput !== "") {
      messages.push({ role: "user", content: userInput });
    }
    callChatGPT(messages);
    // if (await isMermaidDataValid(userInput)) {
    //   debouncedSetMermaidData(userInput);
    // }
  };

  let debouncedSetMermaidData: (...args: any[]) => void =
    debounced(setMermaidData);
  useEffect(() => {
    console.log("useEffect");
  }, []);

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

      // stream update mermaid data
      if (await isMermaidDataValid(responseMessage)) {
        debouncedSetMermaidData(responseMessage);
      }
    }
    // final update mermaid data
    if (await isMermaidDataValid(responseMessage)) {
      setMermaidData(responseMessage);
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
      <Container px="0" w="960px" centerContent>
        <Box px="8px" color="black">
          <VStack align="stretch">
            <Flex mt="24px" mb="12px" alignItems="center" gap="6px">
              <Icon color="#CC850A" as={FiSun} />
              <Text>
                Hi, you can generate a user journey map just by entering the
                prompt. Give it a try now!
              </Text>
            </Flex>
            <Heading size="sm">Prompt 1 (role: assistant)</Heading>
            <Textarea
              h="256px"
              borderColor="gray.200"
              value={prompt1}
              onChange={(e) => setPrompt1(e.target.value)}
            />
            <Heading size="sm">Prompt 2 (role: user)</Heading>
            <Textarea
              borderColor="gray.200"
              value={prompt2}
              onChange={(e) => setPrompt2(e.target.value)}
            />
            <Heading size="sm">User Input (role: user)</Heading>
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
              w="960px"
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
