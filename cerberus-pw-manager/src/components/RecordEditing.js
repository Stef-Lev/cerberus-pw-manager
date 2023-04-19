import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  GridItem,
  Input,
  Flex,
  Divider,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import PasswordEditor from "@/components/PasswordEditor";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { postMethod, updateMethod, getOneMethod } from "@/helpers/services";
import TopNav from "./TopNav";

function RecordEditing({ type = "new" }) {
  const defaultRecordData = {
    title: "",
    url: "",
    username: "",
    password: "",
  };
  const [recordObj, setRecordObj] = useState(defaultRecordData);
  const [password, setPassword] = useState(recordObj.password);
  const title = type === "new" ? "New Record" : "Edit Record";
  const router = useRouter();
  const { recordId } = router.query;
  const { data: session, loading } = useSession();
  const buttonBg = useColorModeValue("#dbdbdb", "#2a2c38");

  useEffect(() => {
    let mounted = true;
    if (session && recordId) {
      getOneMethod(`/api/user/${session.user.id}/records/${recordId}`).then(
        (record) => {
          if (mounted) {
            const defaultRecordData = {
              title: record.title,
              url: record.url,
              username: record.username,
              password: record.password,
            };
            setRecordObj(defaultRecordData);
            setPassword(defaultRecordData.password);
          }
        }
      );
    }
    return () => {
      mounted = false;
    };
  }, [session, recordId]);

  const handleInputChange = (e) => {
    setRecordObj((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if (type === "new") {
      postMethod(`/api/user/${session.user.id}/records`, {
        ...recordObj,
        password,
      }).then(() => router.push("/"));
    } else {
      updateMethod(`/api/user/${session.user.id}/records/${recordId}`, {
        ...recordObj,
        password,
      }).then(() => router.push("/"));
    }
  };

  return (
    <Box py="60px">
      <TopNav title={title} type="backAndTitle" />
      <Box>
        <Grid gridTemplateColumns="3fr 6fr" gap="10px" py="20px">
          <GridItem w="100%" h="10">
            <Flex align="center" h="100%">
              Title
            </Flex>
          </GridItem>
          <GridItem w="100%" h="10">
            <Input
              id="title"
              value={recordObj.title}
              placeholder="Record title"
              onChange={handleInputChange}
              _focusVisible={{ border: "2px solid", borderColor: "teal.200" }}
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
              value={recordObj.url}
              placeholder="Website url (optional)"
              onChange={handleInputChange}
              _focusVisible={{ border: "2px solid", borderColor: "teal.200" }}
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
              value={recordObj.username}
              placeholder="Username or email"
              onChange={handleInputChange}
              _focusVisible={{ border: "2px solid", borderColor: "teal.200" }}
            />
          </GridItem>
        </Grid>
      </Box>
      <Divider />
      <PasswordEditor password={password} setPassword={setPassword} />
      <Box mt="20px">
        <Button
          type="submit"
          w="100%"
          background={buttonBg}
          _focus={{ background: buttonBg }}
          onClick={handleSubmit}
        >
          Save Record
        </Button>
      </Box>
    </Box>
  );
}

export default RecordEditing;
