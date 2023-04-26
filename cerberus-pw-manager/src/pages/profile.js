import React, { useState } from "react";
import TopNav from "@/components/TopNav";
import { signOut } from "next-auth/react";
import { getSession } from "next-auth/react";
import { getOneMethod, postMethod } from "@/helpers/services";
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

function Profile({ user, defaultData }) {
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState(defaultData);
  const [valid, setValid] = useState(true);

  const handleInputChange = (e) => {
    setValid(true);
    setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const toggleEdit = () => {
    if (editMode && user) {
      setUserData({
        fullname: user.fullname,
        username: user.username,
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    }
    setEditMode((prev) => !prev);
  };

  const saveChanges = () => {
    if (userData.newPassword !== userData.confirmNewPassword) {
      setValid(false);
      return;
    }
    postMethod(`/api/auth/change`, {
      oldPassword: userData.oldPassword,
      newPassword: userData.newPassword,
    }).then((res) => console.log(res));
  };

  return (
    <Box>
      <TopNav title="Profile" type="backAndTitle" />
      <Box pt="80px">
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
              id="oldPassword"
              type="password"
              value={userData.oldPassword}
              placeholder="Old password"
              onChange={handleInputChange}
              _focusVisible={{
                border: "2px solid",
                borderColor: "teal.200",
              }}
            />
            <Input
              id="newPassword"
              type="password"
              value={userData.newPassword}
              placeholder="New password"
              onChange={handleInputChange}
              _focusVisible={{
                border: "2px solid",
                borderColor: "teal.200",
              }}
              isInvalid={!valid}
              errorBorderColor="red.200"
            />
            <Input
              id="confirmNewPassword"
              type="password"
              value={userData.confirmNewPassword}
              placeholder="Confirm new password"
              onChange={handleInputChange}
              _focusVisible={{
                border: "2px solid",
                borderColor: "teal.200",
              }}
              isInvalid={!valid}
              errorBorderColor="red.200"
            />
            {!valid && <Text color="red.200">Passwords don't match</Text>}
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
    userData.oldPassword = "";
    userData.newPassword = "";
    userData.confirmNewPassword = "";
  }

  return {
    props: {
      user,
      defaultData: userData,
    },
  };
}
