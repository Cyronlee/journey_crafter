// app/page.tsx
"use client";

import {
  Box,
  Center,
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Icon,
  IconProps,
  useColorModeValue,
} from "@chakra-ui/react";
import ThemeToggle from "@/components/ThemeToggle";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <Box h="100vh" w="100vw">
      <Navbar></Navbar>
      <Center h="calc(100vh - 64px)" alignItems="center">
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="6xl"
          fontWeight="extrabold"
        >
          Powerful User Journey AI Generator
        </Text>
      </Center>
    </Box>
  );
}
