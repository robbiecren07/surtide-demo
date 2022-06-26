import { Box } from "@chakra-ui/react";

export default function Container({ children }) {
  return (
    <Box as="section" my={40}>
      <Box pos="relative" maxW="8xl" mx="auto" px={[4, 6, null, 8]}>
        {children}
      </Box>
    </Box>
  )
}
