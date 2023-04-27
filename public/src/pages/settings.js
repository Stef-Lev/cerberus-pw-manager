import { useRouter } from "next/router";
import { useColorMode } from "@chakra-ui/react";
import TopNav from "../components/TopNav";
import { Box } from "@chakra-ui/react";
import SettingItem from "../components/SettingItem";

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
        <SettingItem title="Version" type="text" text="3.4.1" />
      </Box>
    </Box>
  );
}

export default Settings;
