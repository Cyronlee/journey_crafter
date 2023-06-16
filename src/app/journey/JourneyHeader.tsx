import { Box, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { JourneyHeader } from '@/lib/JourneyFileParser';

export const JourneyHeaderWidget = (
  props: {
      header: JourneyHeader
  }
) => {
    return (
       <HStack w="100%" border="1px solid rgba(0, 0, 0, 0.08)" >
           <Box w="50%" h="100%" padding={'20px 0px 20px 32px'} gap={'8px'} >
               <HStack w="240px" h="72px">
                   <Box>
                       <Image w="72px" h="72px" src='' alt=''></Image>
                   </Box>
                   <Box>
                       <VStack>
                           <Heading w='100%' style={{fontSize: "12px", fontFamily: "Inter", fontWeight: "700", lineHeight: "15px"}}>Tom</Heading>
                           <Text w='100%' style={{fontSize: "8px", fontFamily: "Inter", fontWeight: "400", lineHeight: "10px"}}>UX Designer</Text>
                           <Text w='100%' style={{fontSize: "8px", fontFamily: "Inter", fontWeight: "400", lineHeight: "10px"}}>Single, 32 years old</Text>
                           <Text w='100%' style={{fontSize: "8px", fontFamily: "Inter", fontWeight: "400", lineHeight: "10px"}}>Palo Alto, California</Text>
                       </VStack>
                   </Box>
               </HStack>
           </Box>
           <Box w="50%" h="100%" borderLeft="1px solid rgba(0, 0, 0, 0.08)">
               <HStack padding="20px 40px" gap="40px">
                   <Box w="200px">
                       <VStack>
                           <Heading w='100%' style={{fontSize: "12px", fontFamily: "Inter", fontWeight: "700", lineHeight: "15px"}} >Scenarios</Heading>
                           <Text w='100%' style={{fontSize: "8px", fontFamily: "Inter", fontWeight: "400", lineHeight: "10px"}}>{props.header?.scenario}</Text>
                       </VStack>
                   </Box>
                   <Box w="240px">
                       <VStack>
                           <Heading w='100%' style={{fontSize: "12px", fontFamily: "Inter", fontWeight: "700", lineHeight: "15px"}}>Goals</Heading>
                           <Text w='100%' style={{fontSize: "8px", fontFamily: "Inter", fontWeight: "400", lineHeight: "10px"}}>{props.header?.goals}</Text>
                       </VStack>
                   </Box>
               </HStack>
           </Box>
       </HStack>
    )
}
