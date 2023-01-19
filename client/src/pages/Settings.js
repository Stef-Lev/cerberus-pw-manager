import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useColorMode } from '@chakra-ui/react';
import TopNav from '../components/TopNav';
import { Box } from '@chakra-ui/react';
import SettingItem from '../components/SettingItem';

function Settings() {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();

  const goToProfile = () => {
    navigate('/profile');
  };
  const toggleDarkMode = () => {
    toggleColorMode();
  };
  console.log(colorMode);

  return (
    <Box>
      <TopNav title="Settings" type="basic" />
      <Box pt="60px">
        <SettingItem title="Profile" type="route" onClick={goToProfile} />
        <SettingItem title="Dark Mode" type="switch" onClick={toggleDarkMode} />
        <SettingItem title="Version" type="text" text="3.3.7" />
      </Box>
    </Box>
  );
}

export default Settings;
