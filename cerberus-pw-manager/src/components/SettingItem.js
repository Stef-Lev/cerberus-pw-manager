import React from "react";
import {
  Text,
  Flex,
  Switch,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import { FiChevronRight } from "react-icons/fi";

function SettingItem({ title, type, text, onClick }) {
  const { colorMode } = useColorMode();
  const titleColor = useColorModeValue("#121212", "#f5f5f5");

  return (
    <Flex p="10px" justify="space-between" align="center" marginBottom="10px">
      <Text color={titleColor}>{title}</Text>
      {type === "route" && <FiChevronRight size="30px" onClick={onClick} />}
      {type === "switch" && (
        <Switch
          colorScheme="teal"
          onChange={onClick}
          size="md"
          isChecked={colorMode === "dark"}
        />
      )}
      {type === "text" && <Text>{text}</Text>}
    </Flex>
  );
}

export default SettingItem;
