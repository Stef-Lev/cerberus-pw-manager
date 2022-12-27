import React from 'react';
import { Image, Box, Center, useColorModeValue } from '@chakra-ui/react';

function WebsiteIcon({ logo }) {
  const logoData = logo.split(':');
  const logoTextColor = useColorModeValue('#fff', '#fff');
  const logoBgColor = useColorModeValue(logoData[1], logoData[1]);

  const showLogo = () => {
    if (logoData.length > 2) {
      return (
        <Box background={logoBgColor} w="50px" h="50px" borderRadius="50%">
          <Center fontSize="32px" fontWeight="700" color={logoTextColor}>
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
          background="transparent"
        />
      );
    }
  };

  return <>{showLogo()}</>;
}

export default WebsiteIcon;
