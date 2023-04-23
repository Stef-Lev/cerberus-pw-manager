import React, { useState, useEffect } from "react";
import TopNav from "@/components/TopNav";
import { signOut } from "next-auth/react";
import { getSession } from "next-auth/react";
import { getOneMethod } from "@/helpers/services";
import {
  Box,
  Center,
  Text,
  Button,
  Grid,
  GridItem,
  Input,
  Flex,
} from "@chakra-ui/react";

import { updateMethod } from "@/helpers/services";

function Profile({ user, defaultData }) {
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState(defaultData);

  const handleInputChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const toggleEdit = () => {
    if (editMode && user) {
      setUserData({
        fullname: user.fullname,
        username: user.username,
        password: "",
        confirmPassword: "",
      });
    }
    setEditMode((prev) => !prev);
  };

  const saveChanges = () => {
    updateMethod(`/api/user/${user._id}/change`, userData).then((res) =>
      console.log(res)
    );
  };

  console.log(user);

  return (
    <Box>
      <TopNav title="Profile" type="basic" />
      <Box pt="100px">
        <Center textAlign="center">
          <Flex flexDirection="column" gap="6px">
            <Box borderRadius="50%" background="teal" w="100px" h="100px"></Box>
            <Text fontSize="26px">{user?.fullname}</Text>
            <Button
              borderRadius="32px"
              fontSize="14px"
              h="30px"
              onClick={toggleEdit}
            >
              Edit Profile
            </Button>
          </Flex>
        </Center>

        <Grid gridTemplateColumns="3fr 6fr" gap="10px" py="20px">
          <GridItem w="100%" h="10">
            <Flex align="center" h="100%">
              Full name
            </Flex>
          </GridItem>
          <GridItem w="100%" h="10">
            <Flex align="center" h="100%">
              {editMode ? (
                <Input
                  id="fullname"
                  value={userData.fullname}
                  placeholder="Edit full name"
                  onChange={handleInputChange}
                  _focusVisible={{
                    border: "2px solid",
                    borderColor: "teal.200",
                  }}
                />
              ) : (
                <Text>{userData.fullname}</Text>
              )}
            </Flex>
          </GridItem>
          <GridItem w="100%" h="10">
            <Flex align="center" h="100%">
              Username
            </Flex>
          </GridItem>
          <GridItem w="100%" h="10">
            <Flex align="center" h="100%">
              {editMode ? (
                <Input
                  id="username"
                  value={userData.username}
                  placeholder="Edit username"
                  onChange={handleInputChange}
                  _focusVisible={{
                    border: "2px solid",
                    borderColor: "teal.200",
                  }}
                />
              ) : (
                <Text>{userData.username}</Text>
              )}
            </Flex>
          </GridItem>
        </Grid>
        {editMode ? (
          <Flex flexDirection="column" gap={3}>
            <Text textAlign="center">Change master password</Text>
            <Input
              id="password"
              value={userData.password}
              placeholder="Password"
              onChange={handleInputChange}
              _focusVisible={{
                border: "2px solid",
                borderColor: "teal.200",
              }}
            />
            <Input
              id="confirmPassword"
              value={userData.confirmPassword}
              placeholder="Confirm password"
              onChange={handleInputChange}
              _focusVisible={{
                border: "2px solid",
                borderColor: "teal.200",
              }}
            />
            <Center>
              <Button onClick={saveChanges}>Save changes</Button>
            </Center>
          </Flex>
        ) : null}
        <Flex justifyContent="space-between" mt="20px">
          <Button>Export Records</Button>
          <Button onClick={signOut}>Logout</Button>
        </Flex>
      </Box>
    </Box>
  );
}

export default Profile;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  let userData = {};
  let user;

  const { req } = context;
  const baseUrl = req.headers.host;
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const apiUrl = `${protocol}://${baseUrl}/api/user/${session.user.id}`;

  const fetchedData = await getOneMethod(apiUrl);

  if (fetchedData) {
    user = fetchedData.user;
    userData.fullname = fetchedData.user.fullname;
    userData.username = fetchedData.user.username;
    userData.password = "";
    userData.confirmPassword = "";
  }

  return {
    props: {
      user,
      defaultData: userData,
    },
  };
}
