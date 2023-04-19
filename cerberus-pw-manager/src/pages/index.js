import React, { useEffect, useState } from "react";
import ScrollTopButton from "../components/ScrollTopButton";
import { getAllMethod } from "../helpers/services";
import { useSession, getSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { Flex, Box } from "@chakra-ui/react";
import RecordItem from "../components/RecordItem";
import TopNav from "../components/TopNav";
import Loader from "../components/Loader";

function Home({ user }) {
  const [records, setRecords] = useState([]);
  const { data: session, loading } = useSession();

  useEffect(() => {
    let mounted = true;
    if (session) {
      getAllMethod(`/api/user/${session?.user.id}/records`)
        .then((result) => {
          if (mounted) {
            console.log("result", result);
            setRecords(result);
          }
        })
        .catch((err) => console.log(err));
    }

    return () => {
      mounted = false;
    };
  }, [session]);

  return (
    <Box>
      <TopNav title="Passwords" type="basic" />
      <Flex pt="60px" pb="90px" direction="column" gap="10px">
        <Loader visible={loading} />
        {!loading &&
          records.length > 0 &&
          records.map((item) => (
            <RecordItem key={item.id} record={item} userId={session?.user.id} />
          ))}
      </Flex>
      <ScrollTopButton />
    </Box>
  );
}

export default Home;

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

  return {
    props: {
      session,
    },
  };
}
