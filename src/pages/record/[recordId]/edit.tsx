import { Box } from "@chakra-ui/react";
import RecordEditing from "@/components/RecordEditing";
import { getSession } from "next-auth/react";
import { getOneMethod } from "@/helpers/services";
import { IRecord } from "@/types/schemas";

function RecordEditPage({ record, user }) {
  return (
    <Box>
      <RecordEditing type="edit" record={record} user={user} />
    </Box>
  );
}

export default RecordEditPage;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { recordId } = context.query;

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const recordData = {} as IRecord;

  const { req } = context;
  const baseUrl = req.headers.host;
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const apiUrl = `${protocol}://${baseUrl}/api/user/${session.user.id}/records/${recordId}`;

  const fetchedData = await getOneMethod(apiUrl);

  if (fetchedData) {
    recordData.title = fetchedData.title;
    recordData.url = fetchedData.url;
    recordData.username = fetchedData.username;
    recordData.password = fetchedData.password;
  }

  return {
    props: {
      user: session.user,
      record: recordData,
    },
  };
}
