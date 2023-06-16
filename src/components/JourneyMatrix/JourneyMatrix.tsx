import React from "react";
import { Text, VStack, HStack, Flex, Center, Box } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import "./index.css";
import {
  Chart as ChartJS,
  CategoryScale,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
ChartJS.defaults.scale.grid.display = false;

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
      title: "选择商品",
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

const canvasWidth = `${6 * 165}px`;

const data = {
  labels: ["", "", "", "", "", ""],
  datasets: [
    {
      label: "",
      data: [1, 3, 2, 4, 2, 3],
      fill: false,
      borderColor: "rgba(75,192,192,1)",
      tension: 0.1,
    },
  ],
};

const options = {
  showScale: false,
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltips: {
      enabled: false,
    },
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      ticks: {
        display: false,
      },
    },
    y: {
      ticks: {
        display: false,
      },
    },
  },
};

const JourneyMatrix = () => {
  return (
    <VStack display="flex" alignItems="flex-start">
      <HStack alignItems="flex-start">
        <VStack w="70px">
          <Center
            w="100%"
            h="50px"
            marginBottom="5px"
            alignItems="center"
          >
            <Text fontSize="16px" lineHeight="15px" fontWeight="bold" mb="2px" textAlign="right" transform="rotate(-90deg) translateY(30px)">
              {"Stage"}
            </Text>
          </Center>
          <Center
            w="100%"
            h="70px"
            marginY="6px"
            alignItems="center"
          >
            <Text fontSize="16px" lineHeight="15px" fontWeight="bold" mb="2px" textAlign="right" transform="rotate(-90deg) translateY(30px)">
              {"Action"}
            </Text>
          </Center>
          <Center
            w="100%"
            h="70px"
            marginY="6px"
            alignItems="center"
          >
            <Text fontSize="16px" lineHeight="15px" fontWeight="bold" mb="2px" textAlign="right" transform="rotate(-90deg) translateY(30px)">
              {"Touch point"}
            </Text>
          </Center>
        </VStack>
        {journeyData.stages.map((section, sectionIndex) => (
          <VStack key={sectionIndex} minW="160px">
            <Flex w="100%" color="white" h="50px">
              <Center w="100%" bg="green.500" borderRadius="5px">
                <Text fontSize="xl" fontWeight="bold" mb="2px" marginY="auto">
                  {section.title}
                </Text>
              </Center>
            </Flex>
            <HStack>
              {section.entries.map((entry, entryIndex) => (
                <VStack p="5px" key={entryIndex}>
                  <Flex
                    w="100%"
                    borderWidth="1px"
                    borderRadius="5px"
                    borderColor="gray.300"
                    minW="150px"
                    minH="70px"
                  >
                    <Box w="100%" minH="70px" m="5px" borderRadius="5px">
                      <Text>{entry.action}</Text>
                    </Box>
                  </Flex>
                  <Flex
                    w="100%"
                    borderWidth="1px"
                    borderRadius="5px"
                    borderColor="gray.300"
                    minW="120px"
                    minH="70px"
                  >
                    <Box w="100%" minH="70px" m="5px" borderRadius="5px">
                      <Text>{entry.touchpoint}</Text>
                    </Box>
                  </Flex>
                  {/*<Box w="100%" h="104px">*/}
                  {/*  <Text>{entry.emotion}</Text>*/}
                  {/*</Box>*/}
                </VStack>
              ))}
            </HStack>
          </VStack>
        ))}
      </HStack>
      <HStack
        w="100%"
        h="140px"
        alignItems="center"
        justifyContent="flex-start"
      >
        <Center w="70px" marginY="5px">
          <Text fontSize="16px" lineHeight="15px" fontWeight="bold" mb="2px" textAlign="right" transform="rotate(-90deg) translateY(30px)">
            {"Emotion"}
          </Text>
        </Center>
        <Box
          w={canvasWidth}
          h="100%"
          borderWidth="1px"
          borderColor="gray.200"
          borderRadius="md"
          p="4"
          marginLeft="5px"
        >
          <Line
            data={data}
            options={options}
            width={canvasWidth}
            style={{ margin: "0 30px" }}
          />
        </Box>
      </HStack>
    </VStack>
  );
};

export default JourneyMatrix;
