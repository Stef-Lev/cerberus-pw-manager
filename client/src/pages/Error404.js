import React from 'react';
import Error404Icon from '../components/Error404Icon';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Center,
  Heading,
  VStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

function Error404() {
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');
  };
  return (
    <Box p="40px 20px">
      <Center>
        <VStack>
          <Error404Icon
            w={300}
            h={300}
            fill={useColorModeValue('teal.300', 'teal.200')}
            marginBottom="16px"
          />
          <Heading as="h3" fontSize="40px">
            Page not found
          </Heading>
          <Text>This page doesn't exist or is unavailable</Text>
          <Button type="primary" onClick={goHome} size="lg">
            Go home
          </Button>
        </VStack>
      </Center>
    </Box>
  );
}

export default Error404;
