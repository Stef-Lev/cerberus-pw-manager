import React from 'react';
import { Box, Text, Center } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function NavButton({ navItem }) {
  const navigate = useNavigate();
  return (
    <Center onClick={() => navigate(navItem.link)}>
      <Box>
        <Center>{navItem.icon}</Center>
        <Center>
          <Text>{navItem.title}</Text>
        </Center>
      </Box>
    </Center>
  );
}

export default NavButton;
