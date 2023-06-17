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
import React, { useState } from "react";
import { JourneyHeaderWidget } from "@/components/JourneyMatrix/JourneyHeader";
import JourneyMatrix from "@/components/JourneyMatrix/JourneyMatrix";
import Navbar from "@/components/Navbar";
import { Journey, JourneyFileParser } from "@/lib/JourneyFileParser";
import UserJourney from "@/components/UserJourney";

export default function ChatPage() {
  const [whoInputValue, setWhoInputValue] = useState("");
  const [businessDomainInputValue, setBusinessDomainInputValue] = useState("");
  const [wantToInputValue, setWantToInputValue] = useState("");
  const [keyBusinessInputValue, setKeyBusinessInputValue] = useState("");
  const [painPointInputValue, setPainPointInputValue] = useState("");
  const [journey, setJourney] = useState<Journey>({
    header: {
      personal: {
        name: "Tom",
        role: "UX Designer",
        isSingle: true,
        age: 32,
        address: "Palo Alto, California",
      },
      scenario:
        "The quick brown fox jumps over the lazy dog is an English language pangram",
      goals:
        "The quick brown fox jumps over the lazy dog is an English language pangram a",
    },
    stages: [
      {
        stage: "进入商店",
        tasks: [
          {
            task: "查看商品列表查看商品列表查看商品列表查看商品列表查看商品列表查看商品列表查看商品列表查看商品列表查看商品列表查看商品列表",
            touchpoint:
              "新用户新用户新用户新用户新用户新用户新用户新用户新用户新用户新用户新用户新用户新用户新用户新用户新用户",
            emotion: 1,
          },
          { task: "点击商品", touchpoint: "新用户", emotion: 2 },
        ],
      },
      {
        stage: "选择商品",
        tasks: [
          { task: "浏览商品详情", touchpoint: "新用户", emotion: 3 },
          { task: "加入购物车", touchpoint: "新用户", emotion: 4 },
        ],
      },
      {
        stage: "结账",
        tasks: [
          { task: "填写收货地址", touchpoint: "新用户", emotion: 5 },
          { task: "支付订单", touchpoint: "新用户", emotion: 1 },
        ],
      },
    ],
  });

  const toast = useToast();

  const handleGenerate = () => {
    let value = painPointInputValue.trim();
    setJourney(new JourneyFileParser(value).getJourney());
    if (
      whoInputValue.trim() === "" ||
      businessDomainInputValue.trim() === "" ||
      wantToInputValue.trim() === "" ||
      keyBusinessInputValue.trim() === "" ||
      painPointInputValue.trim() === ""
    ) {
      toast({
        title: "Please input something...",
        status: "warning",
        isClosable: true,
      });
      return;
    }
  };

  return (
    <Box>
      <Navbar></Navbar>
      <Container px="0" maxW="960px" centerContent>
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
              <Heading size="md" mt="2rem">
                Prompt
              </Heading>
            </Flex>
            <Text>Who</Text>
            <Textarea
              borderColor="gray.400"
              placeholder="Here is a sample placeholder"
              value={whoInputValue}
              onChange={(e) => setWhoInputValue(e.target.value)}
            />
            <Text>Business domain</Text>
            <Textarea
              borderColor="gray.400"
              placeholder="Here is a sample placeholder"
              value={businessDomainInputValue}
              onChange={(e) => setBusinessDomainInputValue(e.target.value)}
            />
            <Text>I want to</Text>
            <Textarea
              borderColor="gray.400"
              placeholder="Here is a sample placeholder"
              value={wantToInputValue}
              onChange={(e) => setWantToInputValue(e.target.value)}
            />
            <Text>Key business process</Text>
            <Textarea
              borderColor="gray.400"
              placeholder="Here is a sample placeholder"
              value={keyBusinessInputValue}
              onChange={(e) => setKeyBusinessInputValue(e.target.value)}
            />
            <Text>Pain points</Text>
            <Textarea
              borderColor="gray.400"
              placeholder="Here is a sample placeholder"
              value={painPointInputValue}
              onChange={(e) => setPainPointInputValue(e.target.value)}
            />
            <Button
              w="84px"
              size="sm"
              colorScheme="purple"
              onClick={handleGenerate}
            >
              Generate
            </Button>
            <Box overflow="scroll" minH="240px" w="960px" py="8px">
              <UserJourney userJourney={journey}></UserJourney>
            </Box>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}
