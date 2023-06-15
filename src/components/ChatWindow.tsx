import React, { useState, useRef, useEffect } from "react";

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
import ChatMessage from "@/components/ChatMessage";
import { IChatMessage } from "@/types/chat";

function ChatWindow() {
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");

  const scrollBoxRef: any = useRef();

  const toast = useToast();

  useEffect(() => {
    scrollBoxRef.current.scrollTop = scrollBoxRef.current.scrollHeight;
  }, [scrollBoxRef?.current?.scrollHeight]);

  const callChatGPT = async (newMessage: IChatMessage) => {
    const messageHistory = [...messages, newMessage];

    const response = await fetch("/api/chat", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(
        messageHistory.map((message: IChatMessage) => ({
          role: message.role,
          content: message.content,
        }))
      ),
    });

    const responseMessage: IChatMessage = {
      id: messages.length + 1,
      content: "",
      role: "assistant",
      timestamp: new Date().getTime(),
    };
    setMessages((prevMessages: IChatMessage[]) => [
      ...prevMessages,
      responseMessage,
    ]);

    const reader = response?.body?.getReader();
    const decoder = new TextDecoder();
    while (true) {
      const { done, value }: any = await reader?.read();
      if (done) {
        break;
      }
      const chunk = decoder.decode(value);
      responseMessage.content += chunk;
      setMessages((prevMessages) => [...prevMessages]);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (inputValue.trim() === "") {
      toast({
        title: "Please input something...",
        status: "warning",
        isClosable: true,
      });
      return;
    }

    const newMessage: IChatMessage = {
      id: messages.length + 1,
      content: inputValue,
      role: "user",
      timestamp: new Date().getTime(),
    };

    setMessages((prevMessages: IChatMessage[]) => [
      ...prevMessages,
      newMessage,
    ]);

    setInputValue("");

    await callChatGPT(newMessage);
  };

  return (
    <Box w="full" h="full" px={64} py={24}>
      <VStack spacing={2} align="stretch" h="full">
        <Text
          w="fit-content"
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="2xl"
          fontWeight="extrabold"
        >
          Chat Window
        </Text>
        <Box
          border="1px solid"
          borderColor="gray.200"
          borderRadius={8}
          overflowY="auto"
          flex="1"
          p={2}
          ref={scrollBoxRef}
          scrollBehavior="smooth"
        >
          <VStack spacing={2} align="stretch" maxH="80vh">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                isMe={message.role == "user"}
              ></ChatMessage>
            ))}
          </VStack>
        </Box>

        {/* User input area */}
        <Box>
          <InputGroup size="lg">
            <Input
              size="lg"
              pr="6rem"
              type="text"
              placeholder="Type something here..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <InputRightElement width="6rem">
              <Button
                colorScheme="teal"
                size="sm"
                onClick={handleSubmit}
                onKeyDown={handleKeyPress}
              >
                Send
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
      </VStack>
    </Box>
  );
}

export default ChatWindow;
