import { Box, Flex } from "@chakra-ui/react";
import ScrollTopButton from "@/components/ScrollTopButton";
import TopNav from "@/components/TopNav";
import { getAllMethod } from "../helpers/services";
import { getSession } from "next-auth/react";
import AnalysisItem from "@/components/AnalysisItem";
import RecordsSecurity from "@/components/RecordsSecurity";

function Analysis({ records }) {
  return (
    <Box>
      <TopNav title="Security" type="basic" />
      {records.length > 0 && (
        <Box pt="60px">
          <RecordsSecurity records={records} />
          <Flex pb="90px" direction="column" gap="10px">
            {records.map((item) => (
              <AnalysisItem key={item.id} record={item} />
            ))}
          </Flex>
        </Box>
      )}
      <ScrollTopButton />
    </Box>
  );
}

export default Analysis;

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
}
