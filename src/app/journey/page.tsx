"use client";

import { Center, VStack } from "@chakra-ui/react";
import ThemeToggle from "@/components/ThemeToggle";
import JourneyMatrix from "@/components/JourneyMatrix";

export default function MermaidPage() {
  return (
    <VStack h="100vh">
      <ThemeToggle />
      <Center h="100%" w="100vw">
        <JourneyMatrix></JourneyMatrix>
      </Center>
    </VStack>
  );
}
