import { Box, Text, Avatar, useColorModeValue } from "@chakra-ui/react";
import moment from "moment";

function ChatMessage({ message, isMe }: { message: any; isMe: boolean }) {
  const bgColor = useColorModeValue("white", "gray.700");
  const color = useColorModeValue("gray.700", "white");

  const parseTime = (timestamp: number) => moment(timestamp).format("HH:mm:ss");

  return (
    <Box maxW="60%" p={2} mb={2} alignSelf={isMe ? "flex-end" : "flex-start"}>
      <Text fontSize="xs" textAlign={isMe ? "right" : "left"}>
        {parseTime(message.timestamp)}
      </Text>
      <Box
        bg={isMe ? "teal.500" : "gray.400"}
        color={isMe ? "white" : "black"}
        borderRadius="lg"
        p={2}
        mb={2}
      >
        <Text fontSize="sm">{message.content}</Text>
      </Box>
    </Box>
  );
}

export default ChatMessage;
