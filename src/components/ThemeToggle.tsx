import { IconButton, useColorMode } from "@chakra-ui/react";
import { RiMoonFill, RiSunLine } from "react-icons/ri";

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="theme toggle"
      position="absolute"
      top="10px"
      right="10px"
      icon={colorMode === "light" ? <RiMoonFill /> : <RiSunLine />}
      onClick={toggleColorMode}
    />
  );
};

export default ThemeToggle;
