import React, { useState, useEffect } from 'react';
import TopNav from '../components/TopNav';
import useFindUser from '../hooks/useFindUser';
import useAuth from '../hooks/useAuth';
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

import { updateMethod } from '../helpers/services';

function Profile() {
  const { user } = useFindUser();
  const defaultProfile = {
    fullname: '',
    username: '',
    password: '',
    confirmPassword: '',
  };
  const { logoutUser } = useAuth();

  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState(defaultProfile);

  const handleInputChange = e => {
    setUserData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const toggleEdit = () => {
    if (editMode && user) {
      setUserData({
        fullname: user.fullname,
        username: user.username,
        password: '',
        confirmPassword: '',
      });
    }
    setEditMode(prev => !prev);
  };

  const saveChanges = () => {
    updateMethod(`/api/user/${user._id}/change`, userData).then(res =>
      console.log(res)
    );
  };

  useEffect(() => {
    if (user) {
      setUserData({
        fullname: user.fullname,
        username: user.username,
        password: '',
        confirmPassword: '',
      });
    }
  }, [user]);

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
                    border: '2px solid',
                    borderColor: 'teal.200',
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
                    border: '2px solid',
                    borderColor: 'teal.200',
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
                border: '2px solid',
                borderColor: 'teal.200',
              }}
            />
            <Input
              id="confirmPassword"
              value={userData.confirmPassword}
              placeholder="Confirm password"
              onChange={handleInputChange}
              _focusVisible={{
                border: '2px solid',
                borderColor: 'teal.200',
              }}
            />
            <Center>
              <Button onClick={saveChanges}>Save changes</Button>
            </Center>
          </Flex>
        ) : null}
        <Flex justifyContent="space-between" mt="20px">
          <Button>Export Records</Button>
          <Button onClick={logoutUser}>Logout</Button>
        </Flex>
      </Box>
    </Box>
  );
}

export default Profile;
