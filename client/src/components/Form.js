import React from 'react';
import { Box, Heading, Input, VStack, Button, Text } from '@chakra-ui/react';

function Form({ title, inputs, buttonText, subText, redirection }) {
  return (
    <Box>
      <VStack>
        <Heading as="h2">{title}</Heading>
        {inputs.map(item => (
          <Input key={item} placeholder={item} />
        ))}
        <Button colorScheme="teal" color={'dark.color'}>
          {buttonText}
        </Button>
        <Box>
          <Text>{subText}</Text>
        </Box>
      </VStack>
    </Box>
  );
}

export default Form;
