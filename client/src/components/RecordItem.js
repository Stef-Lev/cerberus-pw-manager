import React from 'react';
import { useNavigate } from 'react-router-dom';
import copyToClipboard from '../helpers/copyToClipboard';
import { Box, Heading, Text, Flex, useColorModeValue } from '@chakra-ui/react';
import WebsiteIcon from '../components/WebsiteIcon';
import { FiCopy } from 'react-icons/fi';

function RecordItem({ record }) {
  const titleColor = useColorModeValue('#121212', '#f5f5f5');
  const usernameColor = useColorModeValue('#404040', '#dedede');
  const navigate = useNavigate();

  return (
    <Box p="10px">
      <Flex justify="space-between" align="center">
        <Flex
          gap="16px"
          align="center"
          width="90%"
          onClick={() => navigate(`/record/${record.id}`)}
        >
          <Box>
            <WebsiteIcon logo={record.logo} />
          </Box>
          <Box>
            <Heading as="h5" fontSize="18px" color={titleColor}>
              {record.title}
            </Heading>
            <Text color={usernameColor}>{record.username}</Text>
          </Box>
        </Flex>
        <Box onClick={() => copyToClipboard(record.password)}>
          <FiCopy size="26px" />
        </Box>
      </Flex>
    </Box>
  );
}

export default RecordItem;
