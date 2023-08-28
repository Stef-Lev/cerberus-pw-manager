import { useState, useEffect } from "react";
import Form from "@/components/Form";
import LogoIcon from "@/components/LogoIcon";
import { useRouter } from "next/router";
import createUser from "@/helpers/createUser";
import { useSession, signIn } from "next-auth/react";
import { INewUserData } from "@/types/helpers";

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
  const defaultUser: INewUserData = {
    fullname: "",
    username: "",
    password: "",
    passwordCheck: "",
  };
  const router = useRouter();
  const { data: session } = useSession();
  const [user, setUser] = useState(defaultUser);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const authPage = router.query.authPage as string;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setUser({ ...user, [field]: e.target.value });
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleSubmit = (): void => {
    if (authPage === "login") {
      setLoading(true);
      signIn("credentials", {
        redirect: false,
        username: user.username,
        password: user.password,
      })
        .then(({ ok, error }) => {
          if (ok) {
            setLoading(false);
            setErrorMessage("");
          } else {
            setLoading(false);
            setErrorMessage(error);
          }
        })
        .catch(() => {
          setLoading(false);
          setErrorMessage("Invalid login credentials");
        });
    } else {
      setLoading(true);
      createUser(user)
        .then((response) => {
          if (typeof response === "string") {
            setLoading(false);
            setErrorMessage(response);
          } else {
            setLoading(false);
            setErrorMessage("");
            signIn("credentials", {
              redirect: false,
              username: user.username,
              password: user.password,
            });
          }
        })
        .catch(() => {
          setLoading(false);
          setErrorMessage("Error creating user");
        });
    }
  };

  const borderColor = useColorModeValue("gray.800", "gray.700");
  const selectedStyle = {
    background: useColorModeValue("teal.300", "teal.200"),
    fontWeight: 500,
    color: "white",
  };

  const selectedTab = (pageRoute: string) => {
    if (pageRoute === "login") {
      return 0;
    }
    if (pageRoute === "register") {
      return 1;
    }
    return 0;
  };

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <Box>
      <Center display="flex" flexDirection="column" mb="20px">
        <LogoIcon
          w={140}
          h={140}
          fill={useColorModeValue("teal.300", "teal.200")}
        />
        <Heading as="h1">Cerberus</Heading>
        <Text>A minimalistic password manager</Text>
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
                onClick={() => {
                  setUser(defaultUser);
                  router.push("/auth/login");
                }}
                _selected={selectedStyle}
              >
                Login
              </Tab>
              <Tab
                borderRadius="10px"
                width="50%"
                onClick={() => {
                  setUser(defaultUser);
                  router.push("/auth/register");
                }}
                _selected={selectedStyle}
              >
                Register
              </Tab>
            </TabList>
            <TabPanels>
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
                  onButtonClick={handleSubmit}
                  error={errorMessage}
                />
              </TabPanel>
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
                  error={errorMessage}
                  buttonText="Sign up"
                  state={user}
                  onChange={handleInputChange}
                  onButtonClick={handleSubmit}
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
