import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Flex,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaUser, FaPlus } from 'react-icons/fa';

function TopNav({ title }) {
  const textColor = useColorModeValue('#171923', '#fafafa');
  const background = useColorModeValue('#fafafa', '#171923');
  const navigate = useNavigate();
  return (
    <Box
      backgroundColor="teal"
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height="50px"
      color={textColor}
      background={background}
    >
      <Container maxW="3xl" px="26px" py="10px" height="100%">
        <Flex justify="space-between" align="center" height="100%">
          <Box
            _hover={{ cursor: 'pointer' }}
            onClick={() => navigate('/profile')}
          >
            <FaUser size="20px" />
          </Box>
          <Heading as="h2" fontSize="20px">
            {title}
          </Heading>
          <Box
            _hover={{ cursor: 'pointer' }}
            onClick={() => navigate('/record/new')}
          >
            <FaPlus size="20px" />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

export default TopNav;
