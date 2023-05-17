import selectedNavbarItem from "../helpers/selectedNavbarItem";
import { Flex, Container, Box, useColorModeValue } from "@chakra-ui/react";
import NavButton from "./NavButton";
import { FiHome, FiBox, FiSearch, FiSettings } from "react-icons/fi";
import { useRouter } from "next/router";

const icons = [
  {
    id: "home",
    title: "Home",
    icon: <FiHome size={22} />,
    link: "/",
  },
  {
    id: "analysis",
    title: "Analysis",
    icon: <FiBox size={22} />,
    link: "/analysis",
  },
  {
    id: "search",
    title: "Search",
    icon: <FiSearch size={22} />,
    link: "/search",
  },
  {
    id: "settings",
    title: "Settings",
    icon: <FiSettings size={22} />,
    link: "/settings",
  },
];

function BottomNav() {
  const barColor = useColorModeValue("#dbdbdb", "blue.850");
  const router = useRouter();

  const handleButtonClick = (item) => {
    router.push(item.link);
  };

  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      width="100%"
      background={barColor}
      color="dark.color"
    >
      <Container maxW="xl" padding={0}>
        <Flex justifyContent="space-around" padding="8px 0px">
          {icons.map((item) => (
            <NavButton
              key={item.id}
              navItem={item}
              selectedItem={selectedNavbarItem(router.pathname)}
              handleClick={handleButtonClick}
            />
          ))}
        </Flex>
      </Container>
    </Box>
  );
}

export default BottomNav;
