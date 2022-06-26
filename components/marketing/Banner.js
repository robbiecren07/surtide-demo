import { Box, Flex, Text } from '@chakra-ui/react'
import Button from '@/components/Button'

const themeColor = {
  WARNING: 'orange.600'
}

export default function Banner({ content, href, theme = 'WARNING' }) {
  if (!content || !href) return null

  return (
    <Box
      bg={themeColor[theme] || '#222222'}
      color={themeColor[theme] || '#222222'}
    >
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
