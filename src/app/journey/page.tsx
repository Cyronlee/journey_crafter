"use client";

import { Center, VStack } from "@chakra-ui/react";
import JourneyMatrix from "@/components/JourneyMatrix/JourneyMatrix";
import { JourneyHeaderWidget } from "@/components/JourneyMatrix/JourneyHeader";
import { useEffect, useState } from "react";
import {
  Journey,
  JourneyFileParser,
  JourneyHeader,
  JourneyStage,
} from "@/lib/JourneyFileParser";

export default function JourneyPage() {
  const [journey, setJourney] = useState<Journey>();

  useEffect(() => {
    fetch(`/api/mock_data`).then((res) => {
      res.json().then((data) => {
        let result = new JourneyFileParser(data.data).getJourney();
        setJourney(result);
      });
    });
  }, []);

  return (
    <VStack h="100vh">
      <Center h="100%" w="80vw">
        <VStack>
          <JourneyHeaderWidget
            header={journey?.header ?? ({} as JourneyHeader)}
          ></JourneyHeaderWidget>
          <JourneyMatrix
            stages={journey?.stages ?? ([] as JourneyStage[])}
          ></JourneyMatrix>
        </VStack>
      </Center>
    </VStack>
  );
}
