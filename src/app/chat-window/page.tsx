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

export default function chat_window() {
  return (
    <Center h="100vh" w="100vw">
      <ChatWindow></ChatWindow>
    </Center>
  );
}
