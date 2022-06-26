import Image from 'next/image'
import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import Button from '@/components/Button'

export default function HeroFullWidth({ heroButton, image, heroTitle, heroSubTitle, buttonLabel }) {

  return (
    <Box pos="relative">
      <Box as="main" pos="relative">
        <Box w="100%" h="100%">
          <Box
            pos='relative'
            w="100%"
            h="0"
            paddingBottom="calc((800 / 1903) * 100%)"
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
          <Box width={{ lg: '450px' }} pos="absolute" top="50%" left={{ lg: '1.5rem' }} transform="translateY(-50%)">
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
