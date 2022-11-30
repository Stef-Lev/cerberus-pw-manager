import React from 'react';
import { Flex, Container, Box, useColorModeValue } from '@chakra-ui/react';
import NavButton from './NavButton';
import { FiHome, FiBox, FiSearch, FiSettings } from 'react-icons/fi';

const icons = [
  {
    id: 'home',
    title: 'Home',
    icon: <FiHome size={30} />,
    link: '/',
  },
  {
    id: 'analysis',
    title: 'Analysis',
    icon: <FiBox size={30} />,
    link: '/analysis',
  },
  {
    id: 'search',
    title: 'Search',
    icon: <FiSearch size={30} />,
    link: '/search',
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: <FiSettings size={30} />,
    link: '/settings',
  },
];

function BottomNav() {
  const barColor = useColorModeValue('gray.700', 'blue.850');
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
            <NavButton key={item.id} navItem={item} />
          ))}
        </Flex>
      </Container>
    </Box>
  );
}

export default BottomNav;
