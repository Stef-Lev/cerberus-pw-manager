import React, { useState, useEffect } from 'react';
import TopNav from '../components/TopNav';
import SettingItem from '../components/SettingItem';
import {
  Box,
  Center,
  Text,
  Button,
  Grid,
  GridItem,
  Input,
  Flex,
} from '@chakra-ui/react';

function Profile() {
  const handleInputChange = e => {
    console.log(e.target.value);
  };

  return (
    <Box>
      <TopNav title="Profile" type="basic" />
      <Box pt="100px">
        <Center textAlign="center">
          <Flex flexDirection="column" gap="6px">
            <Box
              borderRadius="50%"
              background="#ff55ee"
              w="100px"
              h="100px"
            ></Box>
            <Text fontSize="26px">Name</Text>
            <Text fontSize="14px">Username</Text>
          </Flex>
        </Center>

        <Grid gridTemplateColumns="3fr 6fr" gap="10px" py="20px">
          <GridItem w="100%" h="10">
            <Flex align="center" h="100%">
              Title
            </Flex>
          </GridItem>
          <GridItem w="100%" h="10">
            <Input
              id="title"
              placeholder="Record title"
              onChange={handleInputChange}
              _focusVisible={{ border: '2px solid', borderColor: 'teal.200' }}
            />
          </GridItem>
          <GridItem w="100%" h="10">
            <Flex align="center" h="100%">
              Url
            </Flex>
          </GridItem>
          <GridItem w="100%" h="10">
            <Input
              id="url"
              placeholder="Website url (optional)"
              onChange={handleInputChange}
              _focusVisible={{ border: '2px solid', borderColor: 'teal.200' }}
            />
          </GridItem>
          <GridItem w="100%" h="10">
            <Flex align="center" h="100%">
              Username
            </Flex>
          </GridItem>
          <GridItem w="100%" h="10">
            <Input
              id="username"
              placeholder="Username or email"
              onChange={handleInputChange}
              _focusVisible={{ border: '2px solid', borderColor: 'teal.200' }}
            />
          </GridItem>
        </Grid>
        <Button>Export Records</Button>
        <Button>Logout</Button>
      </Box>
    </Box>
  );
}

export default Profile;
