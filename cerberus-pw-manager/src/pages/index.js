import React, { useEffect, useState, useContext } from "react";
import ScrollTopButton from "../components/ScrollTopButton";
import { getAllMethod } from "../helpers/services";
import { useSession } from "next-auth/react";
// import { UserContext } from "../context/UserContext";
import { Flex, Box } from "@chakra-ui/react";
import RecordItem from "../components/RecordItem";
import TopNav from "../components/TopNav";
import Loader from "../components/Loader";

function Home() {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, loading } = useSession();
  // const { user } = useContext(UserContext);

  useEffect(() => {
    let mounted = true;
    getAllMethod(`/api/user/${session?.user.id}/records`)
      .then((result) => {
        if (mounted) {
          console.log("result", result);
          setRecords(result);
        }
      })
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
    return () => {
      mounted = false;
    };
  }, [session]);

  console.log("session", session);

  return (
    <Box>
      <TopNav title="Passwords" type="basic" />
      <Flex pt="60px" pb="90px" direction="column" gap="10px">
        <Loader visible={loading} />
        {!loading &&
          records.length > 0 &&
          records.map((item) => <RecordItem key={item.id} record={item} />)}
      </Flex>
      <ScrollTopButton />
    </Box>
  );
}

export default Home;
