import React from 'react';
import { Image, Box, Center } from '@chakra-ui/react';

function WebsiteIcon({ logo }) {
  const showLogo = () => {
    const logoData = logo.split(':');
    if (logoData.length > 2) {
      return (
        <Box background={logoData[1]} w="50px" h="50px" borderRadius="50%">
          <Center fontSize="32px" fontWeight="700">
            {logoData[2]}
          </Center>
        </Box>
      );
    } else {
      return (
        <Image
          src={`/famousApps/${logoData[1]}.png`}
          width="50px"
          borderRadius="50%"
          background="#fff"
        />
      );
    }
  };

  return <>{showLogo()}</>;
}

export default WebsiteIcon;
