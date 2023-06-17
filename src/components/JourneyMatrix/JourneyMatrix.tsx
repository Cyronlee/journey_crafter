import React from "react";
import { Box, Center, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import "./index.css";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { JourneyStage } from "@/lib/JourneyFileParser";

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
      display: false,
      ticks: {
        display: false,
      },
    },
    y: {
      display: false,
      ticks: {
        display: false,
      },
      min: 0,
      max: 4
    },
  },
};

const stageColors: string[] = [
  "green.500",
  "orange.500",
  "yellow.500",
  "teal.500",
  "red.500",
  "blue.500",
  "cyan.500",
  "purple.500",
  "pink.500",
];

const JourneyMatrix = (props: { stages: JourneyStage[] }) => {
  const emotions = props.stages?.flatMap((stage) =>
    stage.tasks?.map((task) => task.emotion)
  );

  const emotionData = {
    labels: emotions.map(() => ""),
    datasets: [
      {
        label: "emotion",
        data: emotions,
        fill: true,
        borderColor: "#6B9E78",
        backgroundColor: "#6B9E78",
        pointRadius: 4,
        tension: 0.1,
      },
    ],
  };
  const canvasWidth = `${
    emotions?.length * 150 + (emotions?.length - 1) * 8
  }px`;

  console.log("emotionData is ", emotionData);

  return (
    <VStack alignSelf="start" py="16px">
      <HStack alignSelf="start" gap="8px">
        <VStack w="100px" marginRight="-30px">
          <Flex w="100%" h="50px" marginBottom="5px" alignItems="center" margin="0" padding="0" justifyContent="center">
            <Text
              fontSize="16px"
              fontWeight="bold"
              transform="rotate(-90deg)"
            >
              {"Stage"}
            </Text>
          </Flex>
          <VStack>
            <Flex w="100%" h="100px" marginY="6px" alignItems="center"  margin="0" padding="0" justifyContent="center">
              <Text
                fontSize="16px"
                fontWeight="bold"
                transform="rotate(-90deg)"
              >
                {"Action"}
              </Text>
            </Flex>
            <Flex w="100%" h="100px" marginY="6px" alignItems="center" margin="0" padding="0" justifyContent="center">
              <Text
                fontSize="16px"
                fontWeight="bold"
                transform="rotate(-90deg)"
              >
                {"Touch point"}
              </Text>
            </Flex>
          </VStack>
        </VStack>
        {props.stages?.map((section, sectionIndex) => (
          <VStack key={sectionIndex}>
            <Flex w="100%" color="white" h="50px">
              <Center
                w="100%"
                bg={stageColors[sectionIndex]}
                borderRadius="4px"
              >
                <Text fontSize="16px" fontWeight="bold" mb="2px" marginY="auto">
                  {section.stage}
                </Text>
              </Center>
            </Flex>
            <HStack gap="8px">
              {section.tasks?.map((task, taskIndex) => (
                <VStack key={taskIndex}>
                  <Flex
                    borderWidth="1px"
                    borderRadius="5px"
                    borderColor="gray.400"
                    w="150px"
                    h="100px"
                    overflow="scroll"
                  >
                    <Box w="100%" minH="70px" borderRadius="5px" p="6px">
                      <Text fontSize="14px">{task?.task}</Text>
                    </Box>
                  </Flex>
                  <Flex
                    borderWidth="1px"
                    borderRadius="5px"
                    borderColor="gray.400"
                    w="150px"
                    h="100px"
                    overflow="scroll"
                  >
                    <Box w="100%" minH="70px" borderRadius="5px" p="6px">
                      <Text fontSize="14px">{task?.touchpoint}</Text>
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
      <HStack w="100%" h="140px" alignSelf="start">
        <Center w="100px" justifyContent="center" marginRight="-30px">
          <Text
            fontSize="16px"
            lineHeight="15px"
            fontWeight="bold"
            mb="2px"
            textAlign="right"
            transform="rotate(-90deg)"
          >
            {"Emotion"}
          </Text>
        </Center>
        <Box
          w={canvasWidth}
          h="100%"
          borderWidth="1px"
          borderColor="gray.400"
          borderRadius="md"
          p="4"
        >
          <Line
            data={emotionData}
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
