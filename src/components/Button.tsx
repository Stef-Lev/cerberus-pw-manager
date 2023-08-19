import { Button as ChakraButton } from "@chakra-ui/react";
import { IButtonProps } from "@/types/components";
import { useColorModeValue } from "@chakra-ui/react";
import { useRef } from "react";

const Button: React.FC<IButtonProps> = ({ buttonType, ...props }) => {
  const buttonRef = useRef(null);
  const buttonTypes = {
    primary: useColorModeValue("teal.300", "teal.200"),
    transparent: useColorModeValue("blackAlpha.300", "whiteAlpha.200"),
    disabled: "gray.400",
    success: "green.300",
    error: "red.200",
  };
  return (
    <ChakraButton
      ref={buttonRef}
      variant="solid"
      color="white"
      bg={buttonTypes[buttonType]}
      _hover={{ bg: buttonTypes[buttonType] }}
      _active={{ bg: buttonTypes[buttonType] }}
      _focus={{ bg: buttonTypes[buttonType] }}
      {...props}
    >
      {props.children}
    </ChakraButton>
  );
};

export default Button;
