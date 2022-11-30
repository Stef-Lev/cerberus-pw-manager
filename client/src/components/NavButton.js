import React from 'react';
import { Box, Text, Center, useColorModeValue } from '@chakra-ui/react';

function NavButton({ navItem, selectedItem, handleClick }) {
  const selectedColor = useColorModeValue('teal.300', 'teal.200');

  const highlightSelected = () => {
    return navItem.link === selectedItem;
  };

  return (
    <Center
      onClick={() => handleClick(navItem)}
      color={highlightSelected() ? selectedColor : 'white'}
    >
      <Box>
        <Center>{navItem.icon}</Center>
        <Center>
          <Text fontSize="14px">{navItem.title}</Text>
        </Center>
      </Box>
    </Center>
  );
}

export default NavButton;
