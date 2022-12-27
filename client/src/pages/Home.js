import React, { useEffect, useState, useContext } from 'react';
import { getAllMethod } from '../helpers/services';
import { UserContext } from '../context/UserContext';
import { Flex } from '@chakra-ui/react';
import RecordItem from '../components/RecordItem';

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
    <Flex pb="90px" direction="column" gap="10px">
      {records.length > 0 &&
        records.map(item => <RecordItem key={item.id} record={item} />)}
    </Flex>
  );
}

export default Home;
