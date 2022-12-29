import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFindUser from '../hooks/useFindUser';
import { Box, Text } from '@chakra-ui/react';
import TopNav from '../components/TopNav';

function RecordShow() {
  const [record, setRecord] = useState({});
  const { user } = useFindUser();

  const { recordId } = useParams();

  console.log(record);

  useEffect(() => {
    if (user) {
      fetch(`/api/user/${user._id}/records/get/${recordId}`)
        .then(res => res.json())
        .then(data => setRecord(data));
    }
  }, [user, recordId]);

  return (
    <Box>
      <TopNav title="Passwords" type="backAndDelete" />
      <Box pt="60px" pb="90px">
        <Text>{record.title}</Text>
        <Text>{record.url}</Text>
        <Text>{record.username}</Text>
        <Text>{record.password}</Text>
      </Box>
    </Box>
  );
}

export default RecordShow;
