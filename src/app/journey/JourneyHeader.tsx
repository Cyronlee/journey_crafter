import { Box, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { JourneyHeader } from '@/lib/JourneyFileParser';

export const JourneyHeaderWidget = (
  props: {
      header: JourneyHeader
  }
) => {
    return (
       <HStack w="100%" borderBottom="1px solid rgba(0, 0, 0, 0.08)" >
           <Box w="50%" h="100%" padding={'20px 0px 20px 32px'} gap={'8px'} >
               <HStack w="240px" h="72px">
                   <Box>
                       <Image w="72px" h="72px" src='' alt=''></Image>
                   </Box>
                   <Box>
                       <VStack>
                           <Heading w='100%' style={{fontSize: "16px", fontFamily: "Inter", fontWeight: "700", lineHeight: "20px"}}>{props.header.personal?.name}</Heading>
                           <Text w='100%' style={{fontSize: "14px", fontFamily: "Inter", fontWeight: "400", lineHeight: "15px"}}>{props.header.personal?.role}</Text>
                           <Text w='100%' style={{fontSize: "14px", fontFamily: "Inter", fontWeight: "400", lineHeight: "15px"}}>{props.header.personal?.isSingle ? "Single" : "Married"}, {props.header.personal?.age} years old</Text>
                           <Text w='100%' style={{fontSize: "14px", fontFamily: "Inter", fontWeight: "400", lineHeight: "15px"}}>{props.header.personal?.address}</Text>
                       </VStack>
                   </Box>
               </HStack>
           </Box>
           <Box w="50%" h="100%" borderLeft="1px solid rgba(0, 0, 0, 0.08)">
               <HStack padding="20px 40px" gap="40px"  alignItems='flex-start'>
                   <Box w="200px">
                       <VStack>
                           <Heading w='100%' style={{fontSize: "16px", fontFamily: "Inter", fontWeight: "700", lineHeight: "20px"}} >Scenarios</Heading>
                           <Text w='100%' style={{fontSize: "14px", fontFamily: "Inter", fontWeight: "400", lineHeight: "15px"}} whiteSpace={'normal'}>{props.header?.scenario}</Text>
                       </VStack>
                   </Box>
                   <Box w="240px">
                       <VStack>
                           <Heading w='100%' style={{fontSize: "16px", fontFamily: "Inter", fontWeight: "700", lineHeight: "20px"}}>Goals</Heading>
                           <Text w='100%' style={{fontSize: "14px", fontFamily: "Inter", fontWeight: "400", lineHeight: "15px"}} whiteSpace={'normal'}>{props.header?.goals}</Text>
                       </VStack>
                   </Box>
               </HStack>
           </Box>
       </HStack>
    )
}
