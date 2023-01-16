import React, { useEffect, useState, useContext } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import TopNav from '../components/TopNav';
import { getAllMethod } from '../helpers/services';
import { UserContext } from '../context/UserContext';
import AnalysisItem from '../components/AnalysisItem';
import RecordsSecurity from '../components/RecordsSecurity';
import Loader from '../components/Loader';

function Analysis() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    let mounted = true;
    getAllMethod(`/api/user/${user._id}/records/get`)
      .then(result => {
        if (mounted) {
          setRecords(result);
        }
      })
      .then(() => setLoading(false))
      .catch(err => console.log(err));
    return () => {
      mounted = false;
    };
  }, [user._id]);

  return (
    <Box>
      <TopNav title="Security" type="basic" />
      <Loader visible={loading} />
      {!loading && records.length > 0 && (
        <Box pt="60px">
          <RecordsSecurity records={records} />
          <Flex pb="90px" direction="column" gap="10px">
            {records.map(item => (
              <AnalysisItem key={item.id} record={item} />
            ))}
          </Flex>
        </Box>
      )}
    </Box>
  );
}

export default Analysis;
