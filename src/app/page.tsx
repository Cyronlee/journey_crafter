// app/page.tsx
"use client";

import { Box, Center, Text } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <Box h="100vh" w="100vw">
      <Navbar></Navbar>
      <Center
        h="calc(100vh - 64px)"
        alignItems="center"
        className="gradient-card"
      >
        <Text
          bgGradient="linear(to-l, #FFF, #FFF)"
          bgClip="text"
          fontSize="84px"
          fontWeight="extrabold"
        >
          Powerful User Journey AI Generator
        </Text>
      </Center>
    </Box>
  );
}
