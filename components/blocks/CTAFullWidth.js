import Image from 'next/image'
import Button from '@/components/Button'
import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react'

export default function CTAFullWidth({ buttons, image, ctaTitle, buttonLabel, ctaLineOne, ctaLineTwo }) {
  if (!ctaTitle) return null

  return (
    <Box as="section" pos="relative">
      <Box w="100%" h="100%" px={[ "10px", "20px", "30px"]}>
        <Flex>
          <Box
            pos='relative'
            w="100%"
            minH="620px"
            p="48px 24px"
          >

            <Image
              src={image.url}
              alt={image.title}
              title={image.title}
              layout="fill"
              priority={true}
              objectFit="cover"
            />
            <Box pos="absolute" top="0" right="0" bottom="0" left="0" w="100%" h="100%" backgroundSize="contain" backgroundPosition="center"
              _before={{
              content: '""', bg: '#54492a', opacity: '0.6', position: 'absolute', top: '0', left: '0', width: '100%', height: '100%'
              }}
            ></Box>

            <Box width={{ base: '100%', lg: '860px' }} px={{ base: '10px', lg: 0 }} pos="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
              <Heading
                as="h2"
                pos="relative"
                fontSize={['xl', '2xl', '3xl', '4xl', '5xl']}
                lineHeight="1"
                fontWeight="bold"
                color="white"
                textAlign="center"
                mb={10}
              >
                {ctaTitle}
              </Heading>

              <Text fontSize="2xl" color="white" textAlign="center" mb={6}>
                {ctaLineOne}
              </Text>
              <Text fontSize="2xl" color="white" textAlign="center">
                {ctaLineTwo}
              </Text>

              {buttons && (
                <Stack
                  mt={8}
                  direction={['column', 'row']}
                  display={{ sm: 'flex' }}
                  justifyContent={{ sm: 'center', lg: 'center' }}
                  spacing={[3, 0]}
                >
                  {buttons.map((btn) => (
                    <Box
                      key={btn.id}
                      sx={{
                        ':nth-of-type(even)': {
                          mx: [0, 3]
                        }
                      }}
                    >
                      <Button {...btn} label={buttonLabel} />
                    </Box>
                  ))}
                </Stack>
              )}
            </Box>
            
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}
