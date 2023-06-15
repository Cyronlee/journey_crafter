"use client";

import {
  Box,
  VStack,
  Text,
  Flex,
  Center,
  Heading,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import ChatWindow from "@/components/ChatWindow";
import ThemeToggle from "@/components/ThemeToggle";

export default function ChatPage() {
  return (
    <VStack h="100vh">
      <ThemeToggle />
      <Center h="100%" w="100vw">
        <ChatWindow></ChatWindow>
      </Center>
    </VStack>
  );
}
