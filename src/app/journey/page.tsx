"use client";

import { Box } from "@chakra-ui/react";
import { Journey, JourneyFileParser } from "@/lib/JourneyFileParser";
import UserJourney from "@/components/UserJourney";
import { journey2 } from "@/data/journey2";

export default function JourneyPage() {
  const journeyData = new JourneyFileParser(journey2).getJourney();

  return (
    <Box h="100vh" w="100vw" p="84px">
      <UserJourney userJourney={journeyData}></UserJourney>
    </Box>
  );
}
