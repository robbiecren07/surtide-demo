import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote'
import { SlashIcon } from '@/icons'
import { Box, Flex } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'

export default function Testimonial({ content, name, role, photo }) {
  if (!content) return null

  return (
    <Box as="section" my={[ 20, 20, 32, null, 40 ]} py={[12, null, 20, 24]} bg="gray.100" overflow="hidden">
      <Box pos="relative" maxW="7xl" mx="auto" px={[4, 6, null, 8]}>
        <Box pos="relative">
          <Flex pos="relative" justifyContent="center">
            <StarIcon w={5} h={5} color="yellow.500" />
            <StarIcon w={5} h={5} color="yellow.500" />
            <StarIcon w={5} h={5} color="yellow.500" />
            <StarIcon w={5} h={5} color="yellow.500" />
            <StarIcon w={5} h={5} color="yellow.500" />
          </Flex>
          <Box as="blockquote" mt={10}>
            <Box
              maxW="3xl"
              mx="auto"
              textAlign="center"
              fontSize="2xl"
              lineHeight="9"
              fontWeight="medium"
              color="gray.900"
            >
              <MDXRemote {...content.mdx} />
            </Box>
            <Box as="footer" mt={8}>
              <Box
                display={{ md: 'flex' }}
                alignItems={{ md: 'center' }}
                justifyContent={{ md: 'center' }}
              >
                <Box flexShrink={{ md: 0 }}>
                  <Box mx="auto" h={10} w={10} position="relative">
                    <Image
                      className="avatar"
                      alt={`${name} photo`}
                      src={photo.url}
                      layout="fill"
                    />
                  </Box>
                </Box>
                <Box
                  mt={[3, null, 0]}
                  ml={{ md: 4 }}
                  textAlign="center"
                  display={{ md: 'flex' }}
                  alignItems={{ md: 'center' }}
                >
                  <Box fontWeight="medium" color="gray.900">
                    {name}
                  </Box>

                  {role && (
                    <>
                      <Box
                        as={SlashIcon}
                        display={['none', null, 'block']}
                        mx={1}
                        h={5}
                        w={5}
                        color="green.700"
                      />
                      <Box fontWeight="medium" color="gray.500">
                        {role}
                      </Box>
                    </>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
