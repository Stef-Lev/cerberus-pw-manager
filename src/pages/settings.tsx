import { useRouter } from "next/router";
import { useColorMode } from "@chakra-ui/react";
import TopNav from "../components/TopNav";
import { Box } from "@chakra-ui/react";
import SettingItem from "../components/SettingItem";
import { getSession } from "next-auth/react";

function Settings() {
  const router = useRouter();
  const { toggleColorMode } = useColorMode();

  const goToProfile = () => {
    router.push("/profile");
  };
  const toggleDarkMode = () => {
    toggleColorMode();
  };

  return (
    <Box>
      <TopNav title="Settings" type="basic" />
      <Box pt="60px">
        <SettingItem title="Profile" type="route" onClick={goToProfile} />
        <SettingItem title="Dark Mode" type="switch" onClick={toggleDarkMode} />
        <SettingItem title="Version" type="text" text="9.9.0" />
      </Box>
    </Box>
  );
}

export default Settings;

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
    props: {},
  };
}
