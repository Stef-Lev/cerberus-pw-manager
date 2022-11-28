import React from 'react';
import Form from '../components/Form';
import LogoIcon from '../components/LogoIcon';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Center,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

function Auth() {
  const borderColor = useColorModeValue('gray.800', 'gray.700');
  const selectedStyle = {
    background: useColorModeValue('teal.300', 'teal.200'),
    fontWeight: 500,
    color: 'white',
  };
  const navigate = useNavigate();

  const { authPage } = useParams();

  const selectedTab = pageRoute => {
    if (pageRoute === 'register') {
      return 0;
    }
    if (pageRoute === 'login') {
      return 1;
    }
    return 0;
  };

  return (
    <Box>
      <Center display="flex" flexDirection="column" mb="20px">
        <LogoIcon
          w={140}
          h={140}
          fill={useColorModeValue('teal.300', 'teal.200')}
        />
        <Heading as="h1">Cerberus</Heading>
        <Text>A simple password manager</Text>
      </Center>

      <Box border="1px solid" borderColor={borderColor} borderRadius="10px">
        <Center>
          <Tabs
            variant="unstyled"
            colorScheme="green"
            width="98%"
            index={selectedTab(authPage)}
          >
            <TabList
              display="flex"
              gap="2"
              justifyContent="space-between"
              border="1px solid"
              borderColor={borderColor}
              borderRadius="10px"
              padding="8px"
              margin="10px"
            >
              <Tab
                borderRadius="10px"
                width="50%"
                onClick={() => navigate('/auth/register')}
                _selected={selectedStyle}
              >
                Register
              </Tab>
              <Tab
                borderRadius="10px"
                width="50%"
                onClick={() => navigate('/auth/login')}
                _selected={selectedStyle}
              >
                Login
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel p="10px">
                <Form
                  title="Create your account"
                  inputs={[
                    { placeholder: 'Full Name', type: 'text' },
                    { placeholder: 'Username', type: 'text' },
                    { placeholder: 'Password', type: 'password' },
                    { placeholder: 'Confirm Password', type: 'password' },
                  ]}
                  buttonText="Sign up"
                  onButtonClick={() => console.log('Sign up')}
                />
              </TabPanel>
              <TabPanel p="10px">
                <Form
                  title="Login your account"
                  inputs={[
                    { placeholder: 'Username', type: 'text' },
                    { placeholder: 'Password', type: 'password' },
                  ]}
                  buttonText="Sign in"
                  onButtonClick={() => console.log('Sign in')}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Center>
      </Box>
    </Box>
  );
}

export default Auth;
