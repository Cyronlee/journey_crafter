"use client";

import { Center, VStack } from "@chakra-ui/react";
import ThemeToggle from "@/components/ThemeToggle";
import JourneyMatrix from "@/components/JourneyMatrix/JourneyMatrix";
import { JourneyHeaderWidget } from "@/app/journey/JourneyHeader";
import { useEffect, useState } from "react";

export default async function MermaidPage() {
  const journeyMock = {
    header: {
      personal: {},
      scenario:
        '"The quick brown fox jumps over the lazy dog" is an English language pangram a' +
        "  sentence that contains all of the letters of the English alphabet. Owing to" +
        "  its existence, Chakra was created.",
      goals:
        '"The quick brown fox jumps over the lazy dog" is an English language pangram a' +
        "  sentence that contains all of the letters of the English alphabet. Owing to" +
        "  its existence, Chakra was created.",
    },
  };
  const [journey, setJourney] = useState(null);

  useEffect(() => {
    fetch(`/api/mock_data`).then(async (res) => {
      const data = await res.text();
      console.log(data);
    });
  }, []);

  return (
    <VStack h="100vh">
      <ThemeToggle />
      <Center h="100%" w="80vw">
        <VStack>
          <JourneyHeaderWidget
            header={journeyMock.header}
          ></JourneyHeaderWidget>
          <JourneyMatrix stages={[]}></JourneyMatrix>
        </VStack>
      </Center>
    </VStack>
  );
}
