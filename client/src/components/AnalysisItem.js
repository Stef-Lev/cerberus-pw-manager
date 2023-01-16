import React from 'react';
import { useNavigate } from 'react-router-dom';
import passwordChecker from '../helpers/passwordChecker';
import { Box, Text, Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import { FiChevronRight } from 'react-icons/fi';
import WebsiteIcon from './WebsiteIcon';

function AnalysisItem({ record }) {
  const titleColor = useColorModeValue('#121212', '#f5f5f5');
  const usernameColor = useColorModeValue('#404040', '#dedede');
  const navigate = useNavigate();
  const checkedPw = passwordChecker(record.password);

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
        <Box>
          <FiChevronRight size="26px" />
        </Box>
      </Flex>
      <Flex justify="space-between" align="center" mt="5px" w="100%">
        <Flex
          gap="16px"
          align="center"
          width="100%"
          onClick={() => navigate(`/record/${record.id}`)}
        >
          <Box width="50px">
            <Text width="50px" textAlign="center" fontSize={13}>
              {checkedPw?.text}
            </Text>
          </Box>
          <Box my="10px" h="8px" w="100%" bg="gray.800" borderRadius="0.375rem">
            <Box
              h="8px"
              w={checkedPw.percent || '0%'}
              bg={checkedPw.color || 'transparent'}
              borderRadius="0.375rem"
            ></Box>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

export default AnalysisItem;
