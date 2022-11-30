import React from 'react';
import selectedNavbarItem from '../helpers/selectedNavbarItem';
import { useNavigate, useLocation } from 'react-router-dom';
import { Flex, Container, Box, useColorModeValue } from '@chakra-ui/react';
import NavButton from './NavButton';
import { FiHome, FiBox, FiSearch, FiSettings } from 'react-icons/fi';

const icons = [
  {
    id: 'home',
    title: 'Home',
    icon: <FiHome size={22} />,
    link: '/',
  },
  {
    id: 'analysis',
    title: 'Analysis',
    icon: <FiBox size={22} />,
    link: '/analysis',
  },
  {
    id: 'search',
    title: 'Search',
    icon: <FiSearch size={22} />,
    link: '/search',
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: <FiSettings size={22} />,
    link: '/settings',
  },
];

function BottomNav() {
  const barColor = useColorModeValue('gray.700', 'blue.850');
  const navigate = useNavigate();
  const location = useLocation();

  const handleButtonClick = item => {
    navigate(item.link);
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
        <Flex justifyContent="space-around" padding="12px 0px">
          {icons.map(item => (
            <NavButton
              key={item.id}
              navItem={item}
              selectedItem={selectedNavbarItem(location.pathname)}
              handleClick={handleButtonClick}
            />
          ))}
        </Flex>
      </Container>
    </Box>
  );
}

export default BottomNav;
