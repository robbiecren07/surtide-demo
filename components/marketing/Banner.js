import { Box, Flex, Text } from '@chakra-ui/react'

export default function Banner({ content, href }) {
  if (!content || !href) return null

  return (
    <Box bg='#222222' color='#fffcc6'>
      <Box maxW={1280} mx="auto" py={3} px={[3, 6, null, 8]}>
        <Flex alignItems="center" justifyContent="center">
          <Text fontSize="sm" fontWeight="normal" color="#fffcc6">
            {content}
          </Text>
        </Flex>
      </Box>
    </Box>
  )
}
