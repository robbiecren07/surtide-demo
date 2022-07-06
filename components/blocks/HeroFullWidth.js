import Image from 'next/image'
import Button from '@/components/Button'
import { Box, Heading, Stack, Text } from '@chakra-ui/react'

export default function HeroFullWidth({ heroButton, image, heroTitle, heroSubTitle, buttonLabel }) {
  if (!heroTitle) return null

  return (
    <Box pos="relative">
      <Box as="main" pos="relative">
        <Box w="100%" h="100%">
          <Box
            pos='relative'
            w="100%"
            h="0"
            paddingBottom={{ base: "100%", md: "calc((800 / 1903) * 100%)" }}
          >
            <Image
              className="hero-image"
              src={image.url}
              alt={image.title}
              title={image.title}
              layout="fill"
              priority={true}
              objectFit="cover"
            />
          </Box>
          <Box width={{ base: '90%', md: '450px' }} pos="absolute" top="50%" left="1.5rem" transform="translateY(-50%)">
            <Heading
              as="h2"
              pos="relative"
              fontSize={['xl', '2xl', '3xl', '4xl', '5xl']}
              lineHeight="1"
              fontWeight="bold"
              color="gray.900"
              mb={10}
              _after={{
                content: '""', position: 'absolute', bottom: '-1rem', left: '0', width: '40px', height: '3px', backgroundColor: 'green.700'
              }}
            >
              {heroTitle}
            </Heading>

              <Text fontWeight="semibold" color="gray.900">
                {heroSubTitle}
              </Text>

              {heroButton && (
                <Stack
                  mt={6}
                  direction={['column', 'row']}
                  display={{ sm: 'flex' }}
                  justifyContent={{ sm: 'center', lg: 'flex-start' }}
                  spacing={[3, 0]}
                >
                  {heroButton.map((btn) => (
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
      </Box>
    </Box>
  )
}
