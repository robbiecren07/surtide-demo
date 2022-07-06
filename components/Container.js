import { Box } from "@chakra-ui/react";

export default function Container({ children, size }) {
  return (
    <>
      {size === 'small' ? 
        <Box as="section" my={20}>
          <Box pos="relative" maxW="6xl" mx="auto" px={[4, 6, null, 8]}>
            {children}
          </Box>
        </Box>
      :
        <Box as="section" my={[ 20, 30, 40 ]}>
          <Box pos="relative" maxW="8xl" mx="auto" px={[4, 6, null, 8]}>
            {children}
          </Box>
        </Box>      
      }
    </>
  )
}
