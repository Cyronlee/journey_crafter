import React from 'react';
import { Button, Flex, Heading, HStack, Icon, Menu, MenuButton, MenuItem, MenuList, } from '@chakra-ui/react';
import { BiMapAlt } from 'react-icons/bi';
import Link from 'next/link';
import { ChevronDownIcon } from '@chakra-ui/icons';

const Navbar = () => {
  return (
    <Flex
      w="100vw"
      h="64px"
      px="32px"
      borderBottom="2px solid"
      borderColor="gray.400"
      alignItems="center"
      gap="6px"
      justifyContent="space-between"
    >
      <Link href="/">
        <HStack>
          <Icon h="32px" w="32px" color="#F2617A" as={BiMapAlt} />
          <Heading size="md" fontFamily="Bitter" fontWeight="bold">
            JourneyCrafter
          </Heading>
        </HStack>
      </Link>

      <HStack>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Pages
          </MenuButton>
          <MenuList>
            <Link href="/">
              <MenuItem>Home</MenuItem>
            </Link>
            <Link href="/chat">
              <MenuItem>Chat Demo</MenuItem>
            </Link>
            <Link href="/mermaid">
              <MenuItem>Mermaid Demo</MenuItem>
            </Link>
            <Link href="/dashboard">
              <MenuItem>Dashboard Page</MenuItem>
            </Link>
            <Link href="/journey">
              <MenuItem>Journey Demo</MenuItem>
            </Link>
            <Link href="/debug">
              <MenuItem>Debug Page</MenuItem>
            </Link>
          </MenuList>
        </Menu>
        {/*<ThemeToggle />*/}
      </HStack>
    </Flex>
  );
};

export default Navbar;
