import React from 'react';
import {
  Box,
  Grid,
  GridItem,
  Input,
  Flex,
  Checkbox,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Heading,
} from '@chakra-ui/react';

function PasswordEditor() {
  return (
    <Box py="10px">
      <Heading as="h4" textAlign="center">
        Password
      </Heading>
      <Input w="100%" my="10px" />
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
      </Box>
    </Box>
  );
}

export default PasswordEditor;
