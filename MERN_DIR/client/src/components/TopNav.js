import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteMethod } from '../helpers/services';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  useColorModeValue,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
} from '@chakra-ui/react';
import {
  FaUser,
  FaPlus,
  FaArrowLeft,
  FaTrashAlt,
  FaSearch,
} from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

function TopNav({ title, type, onSearch, searchQuery, onClear }) {
  const { user } = useContext(UserContext);
  const { recordId } = useParams();
  const textColor = useColorModeValue('#171923', '#fafafa');
  const background = useColorModeValue('#fafafa', '#171923');
  const navigate = useNavigate();

  const deleteRecord = () => {
    deleteMethod(`/api/user/${user._id}/records/delete/${recordId}`).then(() =>
      navigate('/')
    );
  };

  return (
    <Box
      backgroundColor="teal"
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height="60px"
      color={textColor}
      background={background}
      zIndex={100}
    >
      <Container maxW="3xl" px="16px" py="10px" height="100%">
        {type === 'basic' && (
          <Flex justify="space-between" align="center" height="100%">
            <Box
              _hover={{ cursor: 'pointer' }}
              onClick={() => navigate('/profile')}
            >
              <FaUser size="20px" />
            </Box>
            <Heading as="h2" fontSize="20px">
              {title}
            </Heading>
            <Box
              _hover={{ cursor: 'pointer' }}
              onClick={() => navigate('/record/new')}
            >
              <FaPlus size="20px" />
            </Box>
          </Flex>
        )}
        {type === 'backAndDelete' && (
          <Flex justify="space-between" align="center" height="100%">
            <Flex
              gap={2}
              align="center"
              _hover={{ cursor: 'pointer' }}
              onClick={() => navigate(-1)}
            >
              <FaArrowLeft size="20px" />
              <Text>back</Text>
            </Flex>
            <Box color="red.400" onClick={deleteRecord}>
              <FaTrashAlt size="20px" />
            </Box>
          </Flex>
        )}
        {type === 'backAndTitle' && (
          <Flex justify="space-between" align="center" height="100%">
            <Box _hover={{ cursor: 'pointer' }} onClick={() => navigate(-1)}>
              <FaArrowLeft size="20px" />
            </Box>
            <Heading as="h2" fontSize="20px">
              {title}
            </Heading>
            <Box />
          </Flex>
        )}
        {type === 'search' && (
          <Flex justify="space-between" align="center" height="100%">
            <InputGroup>
              <Input
                w="100%"
                value={searchQuery}
                onChange={onSearch}
                placeholder="Search for record"
                _focusVisible={{ border: '2px solid', borderColor: 'teal.200' }}
              />
              <InputLeftElement>
                <FaSearch />
              </InputLeftElement>
              <InputRightElement>
                <FiX onClick={onClear} />
              </InputRightElement>
            </InputGroup>
          </Flex>
        )}
      </Container>
    </Box>
  );
}

export default TopNav;
