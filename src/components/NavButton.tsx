import { Box, Text, Center, useColorModeValue } from "@chakra-ui/react";
import { INavButtonProps } from "@/types/components";

const NavButton: React.FC<INavButtonProps> = ({
  navItem,
  selectedItem,
  handleClick,
}) => {
  const selectedColor = useColorModeValue("teal.300", "teal.200");
  const iconColor = useColorModeValue("#a19f9f", "white");

  const highlightSelected = () => {
    return navItem.link === selectedItem;
  };

  return (
    <Center
      onClick={() => handleClick(navItem)}
      color={highlightSelected() ? selectedColor : iconColor}
    >
      <Box>
        <Center>{navItem.icon}</Center>
        <Center>
          <Text fontSize="14px">{navItem.title}</Text>
        </Center>
      </Box>
    </Center>
  );
};

export default NavButton;
