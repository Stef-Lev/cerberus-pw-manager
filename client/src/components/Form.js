import React from 'react';
import { Box, Flex, Heading, VStack, Text, Center } from '@chakra-ui/react';
import Button from './Button';
import Input from './Input';

function Form({ title, inputs, buttonText, subText, redirection }) {
  return (
    <Box>
      <Flex flexDirection="column">
        <Center>
          <Heading as="h3" fontSize="20px" mb="10px">
            {title}
          </Heading>
        </Center>

        <VStack mb="20px">
          {inputs.map(item => (
            <Input key={item} placeholder={item} />
          ))}
        </VStack>

        <Button type="primary">{buttonText}</Button>
        <Box>
          <Text>{subText}</Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default Form;
