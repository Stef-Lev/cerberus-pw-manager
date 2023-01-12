import React, { useState, useContext, useEffect } from 'react';
import {
  Box,
  Grid,
  GridItem,
  Input,
  Flex,
  Divider,
  Button,
} from '@chakra-ui/react';
import PasswordEditor from '../components/PasswordEditor';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { postMethod, updateMethod, getOneMethod } from '../helpers/services';
import TopNav from '../components/TopNav';

function RecordNew({ type = 'new' }) {
  const defaultRecordData = {
    title: '',
    url: '',
    username: '',
    password: '',
  };
  const [recordObj, setRecordObj] = useState(defaultRecordData);
  const [password, setPassword] = useState(recordObj.password);
  const title = type === 'new' ? 'New Record' : 'Edit Record';
  const { user } = useContext(UserContext);
  const { recordId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    if (user && recordId) {
      getOneMethod(`/api/user/${user._id}/records/get/${recordId}`).then(
        record => {
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
  }, [user, recordId]);

  const handleInputChange = e => {
    setRecordObj(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if (type === 'new') {
      postMethod(`/api/user/${user._id}/records/add`, {
        ...recordObj,
        password,
      }).then(() => navigate('/'));
    } else {
      updateMethod(`/api/user/${user._id}/records/edit/${recordId}`, {
        ...recordObj,
        password,
      }).then(() => navigate('/'));
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
              _focusVisible={{ border: '2px solid', borderColor: 'teal.200' }}
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
              _focusVisible={{ border: '2px solid', borderColor: 'teal.200' }}
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
              _focusVisible={{ border: '2px solid', borderColor: 'teal.200' }}
            />
          </GridItem>
        </Grid>
      </Box>
      <Divider />
      <PasswordEditor password={password} setPassword={setPassword} />
      <Box mt="20px">
        <Button type="submit" w="100%" onClick={handleSubmit}>
          Save Record
        </Button>
      </Box>
    </Box>
  );
}

export default RecordNew;
