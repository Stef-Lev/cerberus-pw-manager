import { useState } from "react";
import { getSession } from "next-auth/react";
import TopNav from "@/components/TopNav";
import { getAllMethod } from "@/helpers/services";
import { Flex, Box } from "@chakra-ui/react";
import RecordItem from "@/components/RecordItem";
import Fuse from "fuse.js";

function Search({ records }) {
  const [query, setQuery] = useState("");

  const options = {
    includeScore: true,
    keys: ["title", "url"],
  };
  const fuse = new Fuse(records, options);
  const results = fuse.search(query);
  const searchResults = query
    ? results.filter((rec) => rec.score < 0.5).map((rec) => rec.item)
    : records;

  const handleSearchInput = (e) => {
    setQuery(e.currentTarget.value);
  };

  const clearSearchInput = () => {
    setQuery("");
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
        {searchResults.length > 0 &&
          searchResults.map((item) => (
            <RecordItem key={item.id} record={item} />
          ))}
        {searchResults.length === 0 && (
          <Box
            py="120px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box> No records added yet</Box>
          </Box>
        )}
      </Flex>
    </Box>
  );
}

export default Search;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  try {
    let records = [];

    const { req } = context;
    const baseUrl = req.headers.host;
    const protocol = req.headers["x-forwarded-proto"] || "http";
    const apiUrl = `${protocol}://${baseUrl}/api/user/${session.user.id}/records`;

    const fetchedData = await getAllMethod(apiUrl);
    if (fetchedData) {
      records = fetchedData;
    }

    return {
      props: {
        records,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/error",
        permanent: false,
      },
    };
  }
}
