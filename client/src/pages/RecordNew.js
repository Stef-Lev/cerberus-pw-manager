import React from 'react';
import { Box, Grid, GridItem, Input, Flex, Divider } from '@chakra-ui/react';
import PasswordEditor from '../components/PasswordEditor';
import TopNav from '../components/TopNav';

function RecordNew({ type = 'new', record = {} }) {
  const title = type === 'new' ? 'New Record' : 'Edit Record';
  return (
    <Box py="60px">
      <TopNav title={title} type="backAndTitle" />
      <Box>
        <Grid gridTemplateColumns="3fr 6fr" gap="10px" py="30px">
          <GridItem w="100%" h="10">
            <Flex align="center" h="100%">
              Name
            </Flex>
          </GridItem>
          <GridItem w="100%" h="10">
            <Input placeholder="Website or app name" />
          </GridItem>
          <GridItem w="100%" h="10">
            <Flex align="center" h="100%">
              User ID
            </Flex>
          </GridItem>
          <GridItem w="100%" h="10">
            <Input placeholder="Username or email" />
          </GridItem>
        </Grid>
      </Box>
      <Divider />
      <PasswordEditor />
    </Box>
  );
}

export default RecordNew;
