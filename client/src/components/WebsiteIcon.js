import React from 'react';
import { Image, Box, Center } from '@chakra-ui/react';

const apps = [
  'adobe',
  'ebay',
  'facebook',
  'google',
  'hp',
  'instagram',
  'linkedin',
  'netflix',
  'slack',
  'spotify',
  'tiktok',
  'youtube',
  'zoom',
];

const colors = [
  '#E3716A',
  '#318CE7',
  '#1fc5b0',
  '#fcde41',
  '#41fca2',
  '#1ac8d1',
  '#1a88d1',
  '#c24fed',
  '#ca1937',
  '#ff8585',
  '#6fa8dc',
];

function WebsiteIcon({ url }) {
  const existingIcon = url => {
    return apps.find(app => url.includes(app));
  };

  const showIcon = () => {
    if (existingIcon(url)) {
      return (
        <Image
          src={`/famousApps/${existingIcon(url)}.png`}
          width="50px"
          borderRadius="50%"
          background="#fff"
        />
      );
    } else {
      return (
        <Box
          background={colors[Math.floor(Math.random() * colors.length)]}
          w="50px"
          h="50px"
          borderRadius="50%"
        >
          <Center fontSize="32px" fontWeight="700">
            {url.split('.')[1][0].toUpperCase()}
          </Center>
        </Box>
      );
    }
  };

  return <>{showIcon()}</>;
}

export default WebsiteIcon;
