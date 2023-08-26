import { Image, Box, Center, useColorModeValue } from "@chakra-ui/react";
import { IWebsiteIconProps } from "@/types/components";

const WebsiteIcon: React.FC<IWebsiteIconProps> = ({ logo }) => {
  const logoType = logo.split("=")[0];
  const logoData = logo.split("=")[1];
  const logoTextColor = useColorModeValue("#fff", "#fff");
  const background = useColorModeValue("icon.100", "icon.200");

  const showLogo = () => {
    if (logoType === "letter") {
      return (
        <Box background={background} w="50px" h="50px" borderRadius="50%">
          <Center fontSize="34px" fontWeight="700" color={logoTextColor}>
            {logoData}
          </Center>
        </Box>
      );
    } else {
      return (
        <Image
          src={logoData}
          width="50px"
          borderRadius="50%"
          padding="8px"
          background={background}
        />
      );
    }
  };

  return <>{showLogo()}</>;
};

export default WebsiteIcon;
