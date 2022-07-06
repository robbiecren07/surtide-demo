import Image from 'next/image'
import Button from '@/components/Button'
import { Box, Heading, Stack, Text } from '@chakra-ui/react'

export default function InternalHero({ buttons, image, page, heroContent }) {
  if (!image) return null
  
  return (
    <Box as="section" pos="relative" bg="gray.50">
      <Box pos="relative" display={{ base: 'flex', lg: 'block' }} flexDirection={{ base: 'column-reverse' }}>
        <Box
          mx="auto"
          maxW="7xl"
          w="full"
          py={{ lg: 48 }}
          pt={16}
          pb={20}
          textAlign={{ base: 'center', lg: 'left' }}
        >
          <Box px={[4, 8]} pr={{ xl: 16 }} width={{ lg: '50%' }}>
            <Heading
              as="h1"
              pos="relative"
              fontSize={['lg', '2xl', '3xl', '4xl']}
              lineHeight="1"
              fontWeight="medium"
              color="gray.900"
              mb={4}
              _after={{
                content: '""', position: 'absolute', bottom: '-1rem', left: { base: '50%', lg: 0 }, transform: { base: 'translateX(-50%)', lg: 'unset' }, width: '40px', height: '3px', backgroundColor: 'green.700'
              }}
            >
              {page.title}
            </Heading>
            {heroContent && (
              <Box
                className="prose prose-lg sm:prose-xl"
                mt={10}
                w="full"
                maxW={['md', null, '3xl']}
                mx="auto"
              >
                <Text>{heroContent}</Text>
              </Box>
            )}
            {buttons && (
              <Stack
                mt={10}
                direction={['column', 'row']}
                display={{ sm: 'flex' }}
                justifyContent={{ sm: 'center', lg: 'flex-start' }}
                spacing={[3, 0]}
              >
                {buttons.map((button) => (
                  <Box
                    key={button.id}
                    sx={{
                      ':nth-of-type(even)': {
                        mx: [0, 3]
                      }
                    }}
                  >
                    <Button {...button} />
                  </Box>
                ))}
              </Stack>
            )}
          </Box>
        </Box>
        <Box
          pos={{ base: 'relative', lg: 'absolute' }}
          w={{ base: 'full', lg: '50%' }}
          h={[64, 72, 96, 'full']}
          top={{ lg: 0 }}
          bottom={{ lg: 0 }}
          right={{ lg: 0 }}
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
      </Box>
    </Box>
  )
}
