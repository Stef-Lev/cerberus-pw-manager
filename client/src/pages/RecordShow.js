import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFindUser from '../hooks/useFindUser';
import copyToClipboard from '../helpers/copyToClipboard';
import { getOneMethod } from '../helpers/services';
import {
  Box,
  Text,
  Flex,
  Heading,
  Divider,
  Grid,
  GridItem,
  Button,
  Link,
} from '@chakra-ui/react';
import Loader from '../components/Loader';
import TopNav from '../components/TopNav';
import WebsiteIcon from '../components/WebsiteIcon';

function RecordShow() {
  const [record, setRecord] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useFindUser();

  const { recordId } = useParams();

  // console.log(record);

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
            <Flex gap="20px" align="center">
              <Box>
                <WebsiteIcon logo={record.logo} />
              </Box>
              <Box>
                <Heading as="h3" fontSize="28px">
                  {record.title}
                </Heading>
                <Text>{record.username}</Text>
              </Box>
            </Flex>
            <Box py="26px">
              <Heading as="h4" fontSize="20px" pb="10px">
                Details
              </Heading>
              <Divider />
              <Grid gridTemplateColumns="3fr 6fr" gap="10px" py="20px">
                {record.url && (
                  <>
                    <GridItem w="100%" h="10">
                      Url
                    </GridItem>
                    <GridItem w="100%" h="10">
                      <Link
                        color="teal.200"
                        href={`https://${record.url}`}
                        isExternal
                      >
                        {record.url}
                      </Link>
                    </GridItem>
                  </>
                )}
                <GridItem w="100%" h="10">
                  Username
                </GridItem>
                <GridItem w="100%" h="10">
                  {record.username}
                </GridItem>
                <GridItem w="100%" h="10">
                  Password
                </GridItem>
                <GridItem w="100%" h="10">
                  {record.password}
                </GridItem>
              </Grid>
              <Flex justify="center" gap="20px">
                <Button
                  w="100%"
                  onClick={() => copyToClipboard(record.password)}
                >
                  Copy Password
                </Button>
                <Button w="100%">Edit record</Button>
              </Flex>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default RecordShow;
