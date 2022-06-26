import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '48em',
  lg: '64em',
  xl: '80em',
  '2xl': '96em'
})

export const theme = extendTheme({
  fonts: {
    body: `'Montserrat', sans-serif`,
    heading: `'Raleway', sans-serif`,
  },
  breakpoints,
  lineHeights: {
    tall: 1.8
  },
  colors: {
    orange: {
      600: '#EA580C'
    },
    blue: {
      50: "#E6F2FF",
      100: "#B9DAFE",
      200: "#8CC3FD",
      300: "#5EABFC",
      400: "#3194FC",
      500: "#047CFB",
      600: "#0364C9",
      700: "#024B97",
      800: "#023264",
      900: "#011932"
    },
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6b7280',
      700: '#374151',
      800: '#1F2937',
      900: '#111827'
    },
    indigo: {
      50: '#EEF2FF',
      100: '#E0E7FF',
      200: '#C7D2FE',
      300: '#A5B4FC',
      400: '#818CF8',
      500: '#6366F1',
      600: '#4F46E5',
      700: '#4338CA',
      800: '#3730A3',
      900: '#312E81'
    },
    green: {
      50: "#F4F4F0",
      100: "#E0E2D5",
      200: "#CDCFBA",
      300: "#B9BC9F",
      400: "#A5A984",
      500: "#929669",
      600: "#757854",
      700: "#575A3F",
      800: "#3A3C2A",
      900: "#1D1E15"
    }
  },
  components: {
    Container: {
      baseStyle: {
        maxW: '65ch'
      }
    },
    Button: {
      variants: {
        INDIGO: {
          bg: 'green.700',
          color: 'white',
          fontSize: ['base', null, 'md'],
          fontWeight: 'medium',
          boxShadow: 'lg',
          _hover: {
            textDecoration: 'none',
            backgroundColor: 'green.800'
          }
        },
      },
    },
    Link: {
      variants: {
        INDIGO: {
          bg: 'green.700',
          color: 'white',
          _hover: {
            textDecoration: 'none',
            backgroundColor: 'green.800'
          }
        },
        WHITE: {
          bg: 'white',
          color: 'black',
          _hover: {
            textDecoration: 'none',
            backgroundColor: 'gray.200'
          }
        }
      }
    }
  },
  styles: {
    global: {
      'html, body': {
        color: 'gray.500',
      },
      'ul, ol': {
        listStyle: 'none'
      }
    }
  }
})