import { useState } from "react";
import Form from "@/components/Form";
import LogoIcon from "@/components/LogoIcon";
import { useRouter } from "next/router";

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
} from "@chakra-ui/react";

function AuthPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    password: "",
    passwordCheck: "",
  });

  const handleInputChange = (e, field) => {
    clearError();
    setUser({ ...user, [field]: e.target.value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    dummy();
    // await loginUser(user);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    dummy();
    // await registerUser(user);
  };

  const dummy = () => {
    console.log("Test");
  };

  const borderColor = useColorModeValue("gray.800", "gray.700");
  const selectedStyle = {
    background: useColorModeValue("teal.300", "teal.200"),
    fontWeight: 500,
    color: "white",
  };

  const { authPage } = router.query;

  const selectedTab = (pageRoute) => {
    if (pageRoute === "register") {
      return 0;
    }
    if (pageRoute === "login") {
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
          fill={useColorModeValue("teal.300", "teal.200")}
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
                onClick={() => router.push("/auth/register")}
                _selected={selectedStyle}
              >
                Register
              </Tab>
              <Tab
                borderRadius="10px"
                width="50%"
                onClick={() => router.push("/auth/login")}
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
                    { placeholder: "Full Name", id: "fullname", type: "text" },
                    { placeholder: "Username", id: "username", type: "text" },
                    {
                      placeholder: "Password",
                      id: "password",
                      type: "password",
                    },
                    {
                      placeholder: "Confirm Password",
                      id: "passwordCheck",
                      type: "password",
                    },
                  ]}
                  buttonText="Sign up"
                  state={user}
                  onChange={handleInputChange}
                  onButtonClick={handleRegister}
                />
              </TabPanel>
              <TabPanel p="10px">
                <Form
                  title="Login your account"
                  inputs={[
                    { placeholder: "Username", id: "username", type: "text" },
                    {
                      placeholder: "Password",
                      id: "password",
                      type: "password",
                    },
                  ]}
                  buttonText="Sign in"
                  state={user}
                  onChange={handleInputChange}
                  onButtonClick={handleLogin}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Center>
      </Box>
    </Box>
  );
}

export default AuthPage;
