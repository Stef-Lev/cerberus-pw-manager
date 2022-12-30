import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFindUser from '../hooks/useFindUser';
import { getOneMethod } from '../helpers/services';
import { Box, Text } from '@chakra-ui/react';
import Loader from '../components/Loader';
import TopNav from '../components/TopNav';
import WebsiteIcon from '../components/WebsiteIcon';

function RecordShow() {
  const [record, setRecord] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useFindUser();

  const { recordId } = useParams();

  console.log(record);

  useEffect(() => {
    let mounted = true;
    if (user) {
      getOneMethod(`/api/user/${user._id}/records/get/${recordId}`)
        .then(record => {
          if (mounted) {
            setRecord(record);
          }
        })
        .then(() => {
          if (mounted) {
            setLoading(false);
          }
        });
    }

    return () => {
      mounted = false;
    };
  }, [user, recordId]);

  return (
    <Box>
      <TopNav title="Passwords" type="backAndDelete" />
      <Box pt="60px" pb="90px">
        <Loader visible={loading} />
        {!loading && (
          <Box>
            <WebsiteIcon logo={record.logo} />
            <Text>{record.title}</Text>
            <Text>{record.url}</Text>
            <Text>{record.username}</Text>
            <Text>{record.password}</Text>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default RecordShow;
