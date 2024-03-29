import { useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  Input,
  Flex,
  Button,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import PasswordEditor from "@/components/PasswordEditor";
import { useRouter } from "next/router";
import { postMethod, updateMethod } from "@/helpers/services";
import TopNav from "./TopNav";
import AlertModal from "./AlertModal";
import showMsg from "@/helpers/showMsg";
import isDeepEqual from "deep-equal";
import { IRecordEditingProps, IRecordEditData } from "@/types/components";
import { useNavigationObserver } from "@/hooks/useNavigationObserver";

const RecordEditing: React.FC<IRecordEditingProps> = ({
  type,
  record,
  user,
}) => {
  const [recordObj, setRecordObj] = useState<IRecordEditData>(record);
  const [password, setPassword] = useState<string>(record.password);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const defaultRecord = { ...record, password };
  const title = type === "new" ? "New Record" : "Edit Record";
  const router = useRouter();
  const { recordId } = router.query;
  const buttonBg = useColorModeValue("#dbdbdb", "#2a2c38");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigationObserver({
    shouldStopNavigation: isDirty,
    onNavigate: () => onOpen(),
  });

  const setDirtyInputs = () => {
    if (!isDeepEqual(defaultRecord, { ...recordObj, password })) {
      setIsDirty(true);
    } else {
      setIsDirty(false);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecordObj((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
    setDirtyInputs();
  };

  const handleSubmit = () => {
    setIsDirty(false);
    if (type === "new") {
      postMethod(`/api/user/${user.id}/records`, {
        ...recordObj,
        password,
      })
        .then(() => router.push("/"))
        .then(() => showMsg("Record saved", { type: "success" }))
        .catch(() => showMsg("Something went wrong", { type: "error" }));
    } else {
      updateMethod(`/api/user/${user.id}/records/${recordId}`, {
        ...recordObj,
        password,
      })
        .then(() => router.push("/"))
        .then(() => showMsg("Record updated", { type: "success" }))
        .catch(() => showMsg("Something went wrong", { type: "error" }));
    }
  };

  return (
    <Box py="60px">
      <TopNav title={title} type="backAndTitle" />
      <Box>
        <Grid gridTemplateColumns="3fr 6fr" gap="10px" py="10px">
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
      <AlertModal
        type="leave"
        onClose={onClose}
        isOpen={isOpen}
        callBackAction={navigate}
      />
    </Box>
  );
};

export default RecordEditing;
