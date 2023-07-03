"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Text,
  Textarea,
  useToast,
  VStack,
  IconButton,
  useBoolean,
} from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import { BiExpand, BiCollapse } from "react-icons/bi";

import { FiSun } from "react-icons/fi";
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Navbar from "@/components/Navbar";
import { Journey, JourneyFileParser } from "@/lib/JourneyFileParser";
import UserJourney from "@/components/UserJourney";
import { prodJourneyExampleData } from "@/data/prod_journey_example";
import { prodUserInputPrompt } from "@/data/prodUserInputPrompt";
import { ChatMessage } from "@/types/chat";
import { debounced } from "@/lib/debounce";
import { toPng } from "html-to-image";

const input1PlaceHolder = "Who’s to-be journey?";
const input2PlaceHolder = "Where do we expect to enhance the journey?";
const input3PlaceHolder =
  "What value does this system provide? What features does it include?";
const input4PlaceHolder =
  "Elaborate on scenarios, the role’s key steps and goal in this scenario.";
const input5PlaceHolder = "The role’s pain point in this scenario.";
const input6PlaceHolder = "The opportunities to improve this process.";

export default function ChatPage() {
  // user inputs
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [input5, setInput5] = useState("");
  const [input6, setInput6] = useState("");

  const [isLoading, setIsLoadingValue] = useState(false);
  const [buttonHoverStyle, setButtonHoverStyle] = useState({
    bg: "#7651A6",
  });
  const [isFullscreen, toggleFullscreen] = useBoolean(false);

  const screenshotRef = useRef<HTMLDivElement>(null);
  const fullscreenAreaRef = useRef<HTMLDivElement>(null);
  const scrollOutputRef: any = useRef();

  const [journeyData, setJourneyData] = useState<Journey>(
    new JourneyFileParser(prodJourneyExampleData).getJourney()
  );
  const [chatgptResponse, setChatgptResponse] = useState(
    "waiting for your operation..."
  );

  useEffect(() => {
    scrollOutputRef.current.scrollTop = scrollOutputRef.current.scrollHeight;
  }, [scrollOutputRef?.current?.scrollHeight]);

  const toast = useToast();

  const handleExpand = () => {
    console.log(isFullscreen);
    if (isFullscreen) {
      document.exitFullscreen();
    } else {
      fullscreenAreaRef.current &&
        fullscreenAreaRef.current.requestFullscreen();
    }
    toggleFullscreen.toggle();
  };

  const handleSaveImage = useCallback(() => {
    if (screenshotRef.current === null) {
      return;
    }

    toPng(screenshotRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [screenshotRef]);

  const handleGenerate = () => {
    if (
      input1.trim() === "" ||
      input2.trim() === "" ||
      input3.trim() === "" ||
      input4.trim() === "" ||
      input5.trim() === "" ||
      input6.trim() === ""
    ) {
      toast({
        title: "Please enter the all fields",
        status: "warning",
        isClosable: true,
      });
      return;
    }
    startLoading();
    scrollToBottom();
    const userInputs = generateUserInputs(
      prodUserInputPrompt,
      input1,
      input2,
      input3,
      input4,
      input5,
      input6
    );

    console.log("user inputs:");
    console.log(userInputs);

    let messages: ChatMessage[] = [];
    messages.push({ role: "user", content: userInputs });

    callChatGPT(messages);
  };
  const generateUserInputs = (
    prompt: string,
    input1: string,
    input2: string,
    input3: string,
    input4: string,
    input5: string,
    input6: string
  ) => {
    let temp = prompt;
    temp = temp.replaceAll("{Role}", input1);
    temp = temp.replaceAll("{System}", input2);
    temp = temp.replaceAll("{System_Brief}", input3);
    temp = temp.replaceAll("{Scenario}", input4);
    temp = temp.replaceAll("{Pain_Point}", input5);
    temp = temp.replaceAll("{Opportunities}", input6);
    return temp;
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

      // stream update data
      updateJourneyData(responseMessage);
    }
    console.log("generate finished");
    stopLoading();
  };

  const updateJourneyData = (chatgptResponse: string) => {
    let tempString = chatgptResponse;
    const headerIndex = tempString.indexOf("header:");
    if (headerIndex !== -1) {
      tempString = tempString.substring(headerIndex);
    }
    const lastMarkdownIndex = tempString.lastIndexOf("end");
    if (headerIndex !== -1) {
      tempString = tempString.slice(0, lastMarkdownIndex);
    }
    console.log(tempString);
    if (isJourneyDataValid(tempString)) {
      const validJourneyData = new JourneyFileParser(tempString).getJourney();
      setJourneyData(validJourneyData);
    }
  };

  const isJourneyDataValid = (payload: string) => {
    try {
      new JourneyFileParser(payload);
      return true;
    } catch (e) {
      return false;
    }
  };
  const startLoading = () => {
    setIsLoadingValue(true);
    setButtonHoverStyle({ bg: "" });
  };

  const stopLoading = () => {
    setIsLoadingValue(false);
    setButtonHoverStyle({ bg: "#9054DF" });
  };

  function scrollToBottom() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }

  const fullscreenStyle: CSSProperties = {
    padding: "32px",
  };

  return (
    <Box>
      <Navbar></Navbar>
      <Container px="0" maxW="80vw" centerContent marginBottom="50px">
        <Box px="8px" color="black">
          <VStack align="stretch">
            <Flex
              mt="24px"
              mb="12px"
              alignItems="center"
              justifyContent="center"
              direction="column"
              gap="6px"
            >
              <Icon color="#CC850A" as={FiSun} boxSize="2.2rem" />
              <Text mt="0.3rem">
                Hi, you can generate a to-be user journey map just by entering
                the prompt. Give it a try now!
              </Text>
            </Flex>
            <Text fontSize="14px" fontWeight="bold">
              Role
            </Text>
            <Textarea
              borderColor="gray.400"
              placeholder={input1PlaceHolder}
              value={input1}
              fontSize="14px"
              minH="1.5rem"
              isDisabled={isLoading}
              onChange={(e) => setInput1(e.target.value)}
            />
            <Text fontSize="14px" fontWeight="bold">
              System
            </Text>
            <Textarea
              borderColor="gray.400"
              placeholder={input2PlaceHolder}
              value={input2}
              fontSize="14px"
              minH="1.5rem"
              isDisabled={isLoading}
              onChange={(e) => setInput2(e.target.value)}
            />
            <Text fontSize="14px" fontWeight="bold">
              System Brief
            </Text>
            <Textarea
              borderColor="gray.400"
              placeholder={input3PlaceHolder}
              value={input3}
              fontSize="14px"
              minH="1.5rem"
              isDisabled={isLoading}
              onChange={(e) => setInput3(e.target.value)}
            />
            <Text fontSize="14px" fontWeight="bold">
              Scenario
            </Text>
            <Textarea
              borderColor="gray.400"
              placeholder={input4PlaceHolder}
              value={input4}
              fontSize="14px"
              minH="6rem"
              isDisabled={isLoading}
              onChange={(e) => setInput4(e.target.value)}
            />
            <Text fontSize="14px" fontWeight="bold">
              Pain Points
            </Text>
            <Textarea
              borderColor="gray.400"
              placeholder={input5PlaceHolder}
              value={input5}
              fontSize="14px"
              minH="4rem"
              isDisabled={isLoading}
              onChange={(e) => setInput5(e.target.value)}
            />
            <Text fontSize="14px" fontWeight="bold">
              Opportunities
            </Text>
            <Textarea
              borderColor="gray.400"
              placeholder={input6PlaceHolder}
              value={input6}
              fontSize="14px"
              minH="4rem"
              isDisabled={isLoading}
              onChange={(e) => setInput6(e.target.value)}
            />
            <Flex
              alignItems="center"
              justifyContent="center"
              direction="column"
            >
              <Button
                w="129px"
                h="48px"
                mt="1.125rem"
                mb="0.875rem"
                p={["10px", "24px"]}
                color="white"
                backgroundColor="#634F7D"
                fontSize="20px"
                isLoading={isLoading}
                _hover={buttonHoverStyle}
                onClick={handleGenerate}
              >
                Generate
              </Button>
            </Flex>
            <Text fontWeight="bold">AI response</Text>
            <Text
              ref={scrollOutputRef}
              background="gray.50"
              whiteSpace="pre"
              fontSize="14px"
              h="180px"
              w="80vw"
              overflow="auto"
              borderRadius="8px"
              borderColor="gray.400 !important"
              border="1px solid"
              p="8px 16px"
            >
              {chatgptResponse}
            </Text>
            <Box
              style={isFullscreen ? fullscreenStyle : undefined}
              ref={fullscreenAreaRef}
              bgColor="#FFF"
            >
              <HStack>
                <Text fontWeight="bold">User journey map</Text>
                <IconButton
                  variant="outline"
                  borderWidth="0"
                  size="sm"
                  color="#60517A"
                  aria-label="Call Sage"
                  onClick={handleSaveImage}
                  fontSize="20px"
                  icon={<DownloadIcon />}
                />
                <IconButton
                  variant="outline"
                  borderWidth="0"
                  size="sm"
                  color="#60517A"
                  aria-label="Call Sage"
                  onClick={handleExpand}
                  fontSize="20px"
                  icon={isFullscreen ? <BiCollapse /> : <BiExpand />}
                />
                {isFullscreen ? "full" : "not full"}
              </HStack>
              <Box
                minH="240px"
                w="80vw"
                py="8px"
                p="0"
                ref={screenshotRef}
                bgColor="#FFF"
              >
                <UserJourney userJourney={journeyData}></UserJourney>
              </Box>
            </Box>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}
