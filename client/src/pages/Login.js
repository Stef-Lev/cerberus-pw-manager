import React from 'react';
import Form from '../components/Form';
import {
  Box,
  Center,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';

function Login() {
  const borderColor = useColorModeValue('gray.800', 'gray.700');
  const selectedStyle = {
    background: 'teal.200',
    fontWeight: 500,
    color: 'white',
  };
  return (
    <Box>
      <Center>LOGO</Center>
      <Box border="1px solid" borderColor={borderColor} borderRadius="10px">
        <Center>
          <Tabs variant="unstyled" colorScheme="green" width="98%">
            <TabList
              display="flex"
              gap="2"
              justifyContent="space-between"
              border="1px solid"
              borderColor={borderColor}
              borderRadius="10px"
              padding="8px"
              margin="30px 16px"
            >
              <Tab borderRadius="10px" width="50%" _selected={selectedStyle}>
                Register
              </Tab>
              <Tab borderRadius="10px" width="50%" _selected={selectedStyle}>
                Login
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Form
                  title="Create your account"
                  inputs={[
                    { placeholder: 'Full Name', type: 'text' },
                    { placeholder: 'Email', type: 'email' },
                    { placeholder: 'Password', type: 'password' },
                    { placeholder: 'Confirm Password', type: 'password' },
                  ]}
                  buttonText="Sign up"
                />
              </TabPanel>
              <TabPanel>
                <Form
                  title="Login your account"
                  inputs={[
                    { placeholder: 'Username', type: 'text' },
                    { placeholder: 'Password', type: 'password' },
                  ]}
                  buttonText="Sign in"
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Center>
      </Box>
    </Box>
  );
}

export default Login;
