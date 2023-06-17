"use client";

import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Journey, JourneyFileParser, } from '@/lib/JourneyFileParser';
import UserJourney from '@/components/UserJourney';

export default function JourneyPage() {
  const [journey, setJourney] = useState<Journey>();

  useEffect(() => {
    fetch(`/api/mock_data`).then((res) => {
      res.json().then((data) => {
        let result = new JourneyFileParser(data.data).getJourney();
        setJourney(result);
      });
    });
  }, []);

  return (
    <Box h="100vh" w="100vw" p="84px">
      <UserJourney userJourney={journey}></UserJourney>
    </Box>
  );
}
