import React from 'react';
import { Input as ChakraInput } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';

function Input({ ...props }) {
  const borderColor = useColorModeValue('gray.800', 'gray.700');
  const placeHolderColor = useColorModeValue('gray.400', 'gray.700');
  return (
    <ChakraInput
      errorBorderColor="red.100"
      focusBorderColor="teal.200"
      borderColor={borderColor}
      _placeholder={{ color: placeHolderColor }}
      _hover={{ borderColor: borderColor }}
      {...props}
    />
  );
}

export default Input;
