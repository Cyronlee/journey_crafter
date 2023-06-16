"use client";

import { Center, VStack } from '@chakra-ui/react';
import ThemeToggle from "@/components/ThemeToggle";
import JourneyMatrix from "@/components/JourneyMatrix/JourneyMatrix";
import { JourneyHeaderWidget } from '@/app/journey/JourneyHeader';



export default async function MermaidPage() {

    const journey = {
        header: {
            personal: {},
            scenario: "\"The quick brown fox jumps over the lazy dog\" is an English language pangram a" +
              "  sentence that contains all of the letters of the English alphabet. Owing to" +
              "  its existence, Chakra was created.",
            goals: "\"The quick brown fox jumps over the lazy dog\" is an English language pangram a" +
              "  sentence that contains all of the letters of the English alphabet. Owing to" +
              "  its existence, Chakra was created."
        }
    }

    return (
    <VStack h="100vh">
        <ThemeToggle />
        <Center h="100%" w="80vw">
            <VStack>
              <JourneyHeaderWidget header={journey.header}></JourneyHeaderWidget>
              <JourneyMatrix></JourneyMatrix>
            </VStack>
        </Center>
    </VStack>
    );
}
