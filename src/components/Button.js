import { Button as ChakraButton } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

function Button({ type, ...props }) {
  const buttonTypes = {
    primary: useColorModeValue("teal.300", "teal.200"),
    transparent: "whiteAlpha.200",
    disabled: "gray.400",
    success: "green.300",
    error: "red.200",
  };
  return (
    <ChakraButton
      variant="solid"
      color="white"
      bg={buttonTypes[type]}
      _hover={{ bg: buttonTypes[type] }}
      _active={{ bg: buttonTypes[type] }}
      _focus={{ bg: buttonTypes[type] }}
      {...props}
    >
      {props.children}
    </ChakraButton>
  );
}

export default Button;
