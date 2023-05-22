import { useState } from "react";
import { avatarsPositions } from "@/helpers/avatarPositions";
import Loader from "@/components/Loader";
import TopNav from "@/components/TopNav";
import { signOut } from "next-auth/react";
import { getSession } from "next-auth/react";
import showMsg from "@/helpers/showMsg";
import { CSVLink } from "react-csv";
import { getOneMethod, postMethod, getAllMethod } from "@/helpers/services";
import convertToCsv from "@/helpers/convertToCsv";
import {
  Box,
  Center,
  Text,
  Grid,
  GridItem,
  Input,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import Button from "@/components/Button";
import AvatarSelector from "@/components/AvatarSelector";
import { FaPen } from "react-icons/fa";

function Profile({ user, defaultData, records }) {
  const [editMode, setEditMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [userData, setUserData] = useState(defaultData);
  const [valid, setValid] = useState(true);
  const [saving, setSaving] = useState(false);

  const csvBg = useColorModeValue("blackAlpha.300", "whiteAlpha.200");

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
        avatar: user.avatar,
      });
    }
    setEditMode((prev) => !prev);
  };

  const exportRecords = (records) => {
    return convertToCsv(records);
  };

  const saveChanges = () => {
    if (userData.newPassword !== userData.confirmNewPassword) {
      setValid(false);
      return;
    }
    setSaving(true);
    postMethod(`/api/auth/change/${user._id}`, {
      fullname: userData.fullname,
      username: userData.username,
      oldPassword: userData.oldPassword,
      newPassword: userData.newPassword,
      avatar: userData.avatar,
    })
      .then((res) => showMsg(res.message))
      .then(() => {
        setEditMode(false);
        setSaving(false);
      })
      .catch(() => {
        showMsg("Something went wrong", { type: "error" });
        setEditMode(false);
        setSaving(false);
      });
  };

  return (
    <Box>
      <TopNav title="Profile" type="backAndTitle" />
      <Box pt="80px">
        <Center textAlign="center">
          <Flex flexDirection="column" gap="10px">
            <Box position="relative">
              <Box
                backgroundImage="url('/avatars_n.jpg')"
                backgroundPosition={avatarsPositions[userData.avatar]}
                backgroundSize="2000px"
                width="200px"
                height="200px"
                border="3px solid #171923"
                borderRadius="full"
              />
              {editMode && (
                <Center
                  borderRadius="full"
                  w="40px"
                  h="40px"
                  bg="#4AD6B4"
                  position="absolute"
                  bottom="10px"
                  right="10px"
                  border="2px solid #171923"
                  color="#171923"
                  onClick={() => setModalOpen(true)}
                >
                  <FaPen />
                </Center>
              )}
            </Box>

            <Button
              type={editMode ? "primary" : "transparent"}
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
            {saving && <Loader size="md" thickness="5px" text="Saving..." />}
            {!saving && (
              <Center>
                <Button type="primary" onClick={saveChanges}>
                  Save changes
                </Button>
              </Center>
            )}
          </Flex>
        ) : null}
        {!editMode ? (
          <Flex justifyContent="space-between" mt="20px">
            <Box
              bg={csvBg}
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="0.375rem"
            >
              <CSVLink
                style={{ padding: "7px 14px", fontWeight: "bold" }}
                data={exportRecords(records)}
              >
                Export Records
              </CSVLink>
            </Box>

            <Button type="error" onClick={signOut}>
              Logout
            </Button>
          </Flex>
        ) : null}
      </Box>
      <AvatarSelector
        index={userData.avatar}
        onSelect={setUserData}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
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
  const userUrl = `${protocol}://${baseUrl}/api/user/${session.user.id}`;
  const recordsUrl = `${protocol}://${baseUrl}/api/user/${session.user.id}/records`;

  const fetchedUser = await getOneMethod(userUrl);
  const fetchedRecords = await getAllMethod(recordsUrl);

  if (fetchedUser) {
    user = fetchedUser.user;
    userData.fullname = fetchedUser.user.fullname;
    userData.username = fetchedUser.user.username;
    userData.oldPassword = "";
    userData.newPassword = "";
    userData.confirmNewPassword = "";
    userData.avatar = fetchedUser.user.avatar;
  }

  return {
    props: {
      user,
      defaultData: userData,
      records: fetchedRecords,
    },
  };
}
