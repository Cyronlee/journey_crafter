"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FiSun } from "react-icons/fi";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import { Journey, JourneyFileParser } from "@/lib/JourneyFileParser";
import UserJourney from "@/components/UserJourney";
import { prodJourneyExampleData } from "@/data/prod_journey_example";
import { prompt } from "@/data/prompt";
import { ChatMessage } from "@/types/chat";
import { debounced } from "@/lib/debounce";

const whoInputPlaceHolder = "I am a project manager.";
const businessDomainPlaceHolder = "MQL、CRM、Salesforce, etc.";
const wantToPlaceHolder =
  "Digitize the MQL handover process based on the existing customized CRM to improve MQL conversion rates.";
const keyBusinessPlaceHolder =
  "1.Marketers identify MQLs and label them.\n2.Sales managers review and assign MQLs daily.\n3.Sales reps follow up with MQLs.\n4.Sales reps identify opportunities or return MQLs to marketing.";
const painPointPlaceHolder =
  "There are a lot of spam (unqualified) leads in MQLs; sales reps are unsure why a lead was identified as qualified by Marketers and how to follow-up; Marketers are unaware if sales reps have followed up with MQLs and what actions were taken.";

export default function ChatPage() {
  // user inputs
  const [whoInputValue, setWhoInputValue] = useState(whoInputPlaceHolder);
  const [businessDomainInputValue, setBusinessDomainInputValue] = useState(
    businessDomainPlaceHolder
  );
  const [wantToInputValue, setWantToInputValue] = useState(wantToPlaceHolder);
  const [keyBusinessInputValue, setKeyBusinessInputValue] = useState(
    keyBusinessPlaceHolder
  );
  const [painPointInputValue, setPainPointInputValue] =
    useState(painPointPlaceHolder);

  const [isLoading, setIsLoadingValue] = useState(false);
  const [buttonHoverStyle, setButtonHoverStyle] = useState({
    bg: "#9054DF",
  });

  const scrollOutputRef: any = useRef();
  const [journeyData, setJourneyData] = useState<Journey>(
    new JourneyFileParser(prodJourneyExampleData).getJourney()
  );
  const [chatgptResponse, setChatgptResponse] = useState("");
  useEffect(() => {
    scrollOutputRef.current.scrollTop = scrollOutputRef.current.scrollHeight;
  }, [scrollOutputRef?.current?.scrollHeight]);
  const toast = useToast();
  const [lastChunkUpdateTime, setlastChunkUpdateTime] = useState(new Date());

  const handleGenerate = () => {
    if (
      whoInputValue.trim() === "" ||
      businessDomainInputValue.trim() === "" ||
      wantToInputValue.trim() === "" ||
      keyBusinessInputValue.trim() === "" ||
      painPointInputValue.trim() === ""
    ) {
      toast({
        title: "Please enter the all fields",
        status: "warning",
        isClosable: true,
      });
      return;
    }
    startLoading();
    const userInputs = generateUserInputs(
      whoInputValue,
      businessDomainInputValue,
      wantToInputValue,
      keyBusinessInputValue,
      painPointInputValue
    );

    let messages: ChatMessage[] = [];
    messages.push({ role: "user", content: userInputs });

    callChatGPT(messages);
  };
  const generateUserInputs = (
    whoInputValue: string,
    businessDomainInputValue: string,
    wantToInputValue: string,
    keyBusinessInputValue: string,
    painPointInputValue: string
  ) => {
    ``;
    prompt.replaceAll("{业务领域}", businessDomainInputValue);
    prompt.replaceAll("{角色}", whoInputValue);
    prompt.replaceAll("{目标}", wantToInputValue);
    prompt.replaceAll("{关键流程}", keyBusinessInputValue);
    prompt.replaceAll("{痛点}", painPointInputValue);
    return prompt;
  };

  const debouncedSetJourneyData = useMemo(() => debounced(setJourneyData), []);

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

      // stream update data
      updateJourneyData(responseMessage, false);
    }
    // final update
    updateJourneyData(responseMessage, true);
    stopLoading();
  };

  const updateJourneyData = (chatgptResponse: string, isFinal: boolean) => {
    let tempString = chatgptResponse;
    const headerIndex = chatgptResponse.indexOf("header:");
    if (headerIndex !== -1) {
      tempString = chatgptResponse.substring(headerIndex);
    }
    const lastMarkdownIndex = tempString.lastIndexOf("```");
    if (headerIndex !== -1) {
      tempString = tempString.slice(0, lastMarkdownIndex);
    }
    if (isJourneyDataValid(tempString)) {
      const validJourneyData = new JourneyFileParser(tempString).getJourney();
      if (isFinal) {
        setJourneyData(validJourneyData);
      } else {
        debouncedSetJourneyData(validJourneyData);
      }
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
              Who
            </Text>
            <Textarea
              borderColor="gray.400"
              placeholder={whoInputPlaceHolder}
              value={whoInputValue}
              fontSize="14px"
              minH="1.5rem"
              isDisabled={isLoading}
              onChange={(e) => setWhoInputValue(e.target.value)}
            />
            <Text fontSize="14px" fontWeight="bold">
              Business domain
            </Text>
            <Textarea
              borderColor="gray.400"
              placeholder={businessDomainPlaceHolder}
              value={businessDomainInputValue}
              fontSize="14px"
              minH="1.5rem"
              isDisabled={isLoading}
              onChange={(e) => setBusinessDomainInputValue(e.target.value)}
            />
            <Text fontSize="14px" fontWeight="bold">
              I want to
            </Text>
            <Textarea
              borderColor="gray.400"
              placeholder={wantToPlaceHolder}
              value={wantToInputValue}
              fontSize="14px"
              minH="1.5rem"
              isDisabled={isLoading}
              onChange={(e) => setWantToInputValue(e.target.value)}
            />
            <Text fontSize="14px" fontWeight="bold">
              Key business process
            </Text>
            <Textarea
              borderColor="gray.400"
              placeholder={keyBusinessPlaceHolder}
              value={keyBusinessInputValue}
              fontSize="14px"
              minH="6rem"
              isDisabled={isLoading}
              onChange={(e) => setKeyBusinessInputValue(e.target.value)}
            />
            <Text fontSize="14px" fontWeight="bold">
              Pain points
            </Text>
            <Textarea
              borderColor="gray.400"
              placeholder={painPointPlaceHolder}
              value={painPointInputValue}
              fontSize="14px"
              minH="4rem"
              isDisabled={isLoading}
              onChange={(e) => setPainPointInputValue(e.target.value)}
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
                mb="1.5rem"
                p={["10px", "24px"]}
                size="sm"
                color="white"
                backgroundColor="#634F7D"
                fontSize="20px"
                isLoading={isLoading}
                _hover={buttonHoverStyle}
                onClick={handleGenerate}
              >
                Generate
              </Button>
              <Text
                ref={scrollOutputRef}
                background="gray.50"
                whiteSpace="pre"
                h="200px"
                overflow="scroll"
                w="80vw"
                borderRadius="8px"
                borderColor="gray.400 !important"
                border="1px solid"
                p="8px 16px"
              >
                {chatgptResponse}
              </Text>
            </Flex>
            <Box overflow="scroll" minH="240px" w="80vw" py="8px">
              <UserJourney userJourney={journeyData}></UserJourney>
            </Box>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}
