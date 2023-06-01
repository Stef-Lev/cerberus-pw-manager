import RecordEditing from "@/components/RecordEditing";
import { IRecordNewPageProps } from "@/types/pages";
import { getSession } from "next-auth/react";

const RecordNewPage: React.FC<IRecordNewPageProps> = ({ record, user }) => {
  return (
    <div>
      <RecordEditing type="new" record={record} user={user} />
    </div>
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

  let recordData = {
    title: "",
    url: "",
    username: "",
    password: "",
  };

  return {
    props: {
      user: session.user,
      record: recordData,
    },
  };
}
