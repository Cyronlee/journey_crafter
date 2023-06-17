"use client";

import { Box } from "@chakra-ui/react";
import { Journey, JourneyFileParser } from "@/lib/JourneyFileParser";
import UserJourney from "@/components/UserJourney";
import { prodJourneyExampleData } from "@/data/prod_journey_example";

export default function JourneyPage() {
  const journeyData = new JourneyFileParser(
    prodJourneyExampleData
  ).getJourney();

  return (
    <Box h="100vh" w="100vw" p="84px">
      <UserJourney userJourney={journeyData}></UserJourney>
    </Box>
  );
}
