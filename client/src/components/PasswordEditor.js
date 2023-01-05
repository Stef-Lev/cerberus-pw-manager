import React from 'react';
import {
  Box,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputRightElement,
  Flex,
  Checkbox,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Heading,
  Button,
} from '@chakra-ui/react';
import { FiRefreshCw } from 'react-icons/fi';

function PasswordEditor() {
  return (
    <Box py="10px">
      <Heading as="h4" textAlign="center" my="10px" fontSize="22px">
        Password
      </Heading>
      <InputGroup>
        <Input
          w="100%"
          borderBottom="5px solid red"
          _focusVisible={{ borderBottom: '5px solid red', outline: 'none' }}
        />
        <InputRightElement>
          <FiRefreshCw onClick={() => console.log('clicked')} />
        </InputRightElement>
      </InputGroup>

      <Box>
        <Grid gridTemplateColumns="1fr 1fr" gap="16px" py="20px">
          <GridItem w="100%" h="10">
            <Flex align="center" h="100%" justifyContent="space-between">
              <Box>Length</Box>
              <Box>12</Box>
            </Flex>
          </GridItem>
          <GridItem w="100%" h="10">
            <Flex align="center" h="100%" justifyContent="space-between">
              <Slider aria-label="slider-ex-1" defaultValue={30}>
                <SliderTrack>
                  <SliderFilledTrack bg="teal.200" />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Flex>
          </GridItem>
          <GridItem w="100%" h="10">
            <Flex align="center" h="100%" justifyContent="space-between">
              <Box>Numbers</Box>
              <Box>
                <Checkbox colorScheme="teal" defaultChecked />
              </Box>
            </Flex>
          </GridItem>
          <GridItem w="100%" h="10">
            <Flex align="center" h="100%" justifyContent="space-between">
              <Box>Symbols</Box>
              <Box>
                <Checkbox colorScheme="teal" defaultChecked />
              </Box>
            </Flex>
          </GridItem>
          <GridItem w="100%" h="10">
            <Flex align="center" h="100%" justifyContent="space-between">
              <Box>Lowercase</Box>
              <Box>
                <Checkbox colorScheme="teal" defaultChecked />
              </Box>
            </Flex>
          </GridItem>
          <GridItem w="100%" h="10">
            <Flex align="center" h="100%" justifyContent="space-between">
              <Box>Uppercase</Box>
              <Box>
                <Checkbox colorScheme="teal" defaultChecked />
              </Box>
            </Flex>
          </GridItem>
        </Grid>
        <Flex justify="center" gap="20px" mt="30px">
          <Button w="100%">Save Record</Button>
        </Flex>
      </Box>
    </Box>
  );
}

export default PasswordEditor;
