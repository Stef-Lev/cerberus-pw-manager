import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const theme = extendTheme({
  styles: {
    global: props => ({
      body: {
        bg: mode('white', 'black')(props),
        color: mode('black', 'white')(props),
      },
    }),
  },
  colors: {
    brand: {
      100: '#f7fafc',
      900: '#1a202c',
    },
  },
  initialColorMode: 'dark',
  useSystemColorMode: true,
});

export default theme;
