import ScrollTopButton from "@/components/ScrollTopButton";
import { getAllMethod } from "@/helpers/services";
import { getSession } from "next-auth/react";
import { Flex, Box } from "@chakra-ui/react";
import RecordItem from "@/components/RecordItem";
import TopNav from "@/components/TopNav";

function Home({ records }) {
  return (
    <Box>
      <TopNav title="Passwords" type="basic" />
      <Flex pt="60px" pb="90px" direction="column" gap="10px">
        {records.length > 0 &&
          records.map((item) => <RecordItem key={item.id} record={item} />)}
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
