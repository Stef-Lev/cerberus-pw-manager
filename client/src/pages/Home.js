import React, { useEffect, useState, useContext } from 'react';
import { getAllMethod } from '../helpers/services';
import { UserContext } from '../context/UserContext';
import { Box, Text } from '@chakra-ui/react';

function Home() {
  const [records, setRecords] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    let mounted = true;
    getAllMethod(`/api/user/${user._id}/records/get`)
      .then(result => {
        if (mounted) {
          setRecords(result);
        }
      })
      .catch(err => console.log(err));

    return () => {
      mounted = false;
    };
  }, [user._id]);

  return (
    <div>
      <p>Home</p>
      {records.length > 0 &&
        records.map(item => (
          <Box key={item.title.toLowerCase()} border="1px solid white" p="10px">
            <Text>{item.title}</Text>
            <Text>{item.url}</Text>
            <Text>{item.username}</Text>
          </Box>
        ))}
    </div>
  );
}

export default Home;
