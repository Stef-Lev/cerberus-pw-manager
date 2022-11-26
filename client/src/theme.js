import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const theme = extendTheme({
  styles: {
    global: props => ({
      body: {
        bg: mode('light.bg', 'dark.bg')(props),
        color: mode('light.color', 'dark.color')(props),
        WebkitTapHighlightColor: 'transparent',
      },
    }),
  },
  colors: {
    brand: {
      100: '#f7fafc',
      900: '#1a202c',
    },
    dark: { bg: '#171923', color: '#fafafa' },
    light: { bg: '#fafafa', color: '#171923' },
    gray: { 400: '#919394', 700: '#575757', 800: '#474747' },
    red: {
      100: '#ef3e36',
      200: '#d63a47',
    },
    orange: {
      100: '#e3812b',
    },
    green: {
      100: '#35f57f',
      300: '#10c455',
    },
    teal: {
      200: '#0ad6b4',
      600: '#097970',
    },
  },
  initialColorMode: 'dark',
  useSystemColorMode: true,
});

export default theme;
