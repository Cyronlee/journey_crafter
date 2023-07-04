"use client";

import { VStack } from "@chakra-ui/react";
import JourneyMatrix from "@/components/JourneyMatrix/JourneyMatrix";
import { JourneyHeaderWidget } from "@/components/JourneyMatrix/JourneyHeader";
import { Journey, JourneyHeader, JourneyStage } from "@/lib/JourneyFileParser";

export default function UserJourney({
  userJourney,
}: {
  userJourney: Journey | undefined;
}) {
  return (
    <VStack
      overflow="auto"
      borderRadius="8px"
      borderColor="gray.400 !important"
      border="1px solid"
      boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
    >
      <JourneyHeaderWidget
        header={userJourney?.header ?? ({} as JourneyHeader)}
      ></JourneyHeaderWidget>
      <JourneyMatrix
        stages={userJourney?.stages ?? ([] as JourneyStage[])}
      ></JourneyMatrix>
    </VStack>
  );
}
