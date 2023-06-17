import { Box } from "@chakra-ui/react";
import RecordEditing from "@/components/RecordEditing";
import { IRecordNewPageProps } from "@/types/pages";
import { getSession } from "next-auth/react";
import { defaultRecordData } from "@/types/components";

const RecordNewPage: React.FC<IRecordNewPageProps> = ({ record, user }) => {
  return (
    <Box>
      <RecordEditing type="new" record={record} user={user} />
    </Box>
  );
};

export default RecordNewPage;

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
    return {
      props: {
        user: session.user,
        record: defaultRecordData,
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
