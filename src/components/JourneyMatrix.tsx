import React from "react";
import {
  Text,
  VStack,
  HStack,
  Icon,
  chakra,
  Flex,
  Center,
} from "@chakra-ui/react";

interface JourneyData {
  title?: string;
  stages: JourneySection[];
}

interface JourneySection {
  title: string;
  entries: JourneyEntry[];
}

interface JourneyEntry {
  action: string;
  touchpoint: string;
  emotion: string;
}

const journeyData: JourneyData = {
  stages: [
    {
      title: "进入商店",
      entries: [
        { action: "查看商品列表", touchpoint: "新用户", emotion: "好奇" },
        { action: "点击商品", touchpoint: "新用户", emotion: "满意" },
      ],
    },
    {
      title: "添加商品到购物车",
      entries: [
        { action: "浏览商品详情", touchpoint: "新用户", emotion: "好奇" },
        { action: "加入购物车", touchpoint: "新用户", emotion: "满意" },
      ],
    },
    {
      title: "结账",
      entries: [
        { action: "填写收货地址", touchpoint: "新用户", emotion: "紧张" },
        { action: "支付订单", touchpoint: "新用户", emotion: "满意" },
      ],
    },
  ],
};

const MoodIcon = chakra(Icon);

const JourneyMatrix = () => {
  return (
    <HStack p={4}>
      <VStack align="stretch" spacing={4}>
        <Text fontSize="xl" fontWeight="bold" mb={2} textAlign="right">
          {"Stages"}
        </Text>
        <Text fontSize="xl" fontWeight="bold" mb={2} textAlign="right">
          {"Tasks"}
        </Text>
        <Text fontSize="xl" fontWeight="bold" mb={2} textAlign="right">
          {"Emotions"}
        </Text>
        <Text fontSize="xl" fontWeight="bold" mb={2} textAlign="right">
          {"Touch Points"}
        </Text>
      </VStack>
      {journeyData.stages.map((section, sectionIndex) => (
        <VStack key={sectionIndex} minW="200px">
          <Flex w="100%" color="white">
            <Center w="100%" bg="green.500" borderRadius="5px">
              <Text fontSize="xl" fontWeight="bold" mb={2} marginY="auto">
                {section.title}
              </Text>
            </Center>
          </Flex>
          <HStack p={4}>
            {section.entries.map((entry, entryIndex) => (
              <VStack p={4} key={entryIndex}>
                <Flex
                  w="100%"
                  borderWidth="1px"
                  borderRadius="5px"
                  minW="120px"
                  minH="50px"
                >
                  <Center w="100%" borderRadius="5px">
                    <Text>{entry.action}</Text>
                  </Center>
                </Flex>
                <Text>{entry.emotion}</Text>
                <Flex
                  w="100%"
                  borderWidth="1px"
                  borderRadius="5px"
                  minW="120px"
                  minH="50px"
                >
                  <Center w="100%" borderRadius="5px">
                    <Text>{entry.touchpoint}</Text>
                  </Center>
                </Flex>
              </VStack>
            ))}
          </HStack>
        </VStack>
      ))}
    </HStack>
  );
};

export default JourneyMatrix;
