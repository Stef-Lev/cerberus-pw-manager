import React, { useEffect, useState, useContext } from 'react';
import TopNav from '../components/TopNav';
import { getAllMethod } from '../helpers/services';
import { UserContext } from '../context/UserContext';
import { Flex, Box } from '@chakra-ui/react';
import RecordItem from '../components/RecordItem';
import Loader from '../components/Loader';
import Fuse from 'fuse.js';

function Search() {
  const [records, setRecords] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  const options = {
    includeScore: true,
    keys: ['title', 'url'],
  };
  const fuse = new Fuse(records, options);
  const results = fuse.search(query);
  const searchResults = query
    ? results.filter(rec => rec.score < 0.5).map(rec => rec.item)
    : records;

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

  const handleSearchInput = e => {
    setQuery(e.currentTarget.value);
  };

  const clearSearchInput = () => {
    setQuery('');
  };

  return (
    <Box>
      <TopNav
        type="search"
        onSearch={handleSearchInput}
        searchQuery={query}
        onClear={clearSearchInput}
      />
      <Flex pt="60px" pb="90px" direction="column" gap="10px">
        <Loader visible={loading} />
        {!loading &&
          searchResults.length > 0 &&
          searchResults.map(item => <RecordItem key={item.id} record={item} />)}
      </Flex>
    </Box>
  );
}

export default Search;
