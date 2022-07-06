import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/Button'
import { Box, Heading, Stack, Text } from '@chakra-ui/react'

function NoImageCard({ content, title, button }) {

  return (
    <Box h={{ base: "300px", lg: "480px" }} w="100%" pos="relative" bg="rgb(84, 73, 42)">
      <Stack spacing={4} h="100%" justifyContent="center" alignItems="center" p={6}>
        <Heading
          as="h2"
          pos="relative"
          fontSize={['lg', 'xl', '2xl']}
          lineHeight="1"
          fontWeight="normal"
          color="white"
          textAlign="center"
          mb={4}
          _after={{
            content: '""', position: 'absolute', bottom: '-1rem', left: '50%', transform: 'translateX(-50%)', width: '40px', height: '3px', backgroundColor: 'white'
          }}
        >
          {title}
        </Heading>
        <Text fontSize="sm" color="white" lineHeight="1.7" textAlign="center">
          {content}
        </Text>

        <Button href={button.href} label={button.label} theme="WHITE" />

      </Stack>
    </Box>
  )
}

export default function FeatureCard({ featureContent, title, image, button }) {
  if (image === null) {
    return <NoImageCard content={featureContent} title={title} button={button} />
  }

  return (
    <Box h={{ base: "300px", lg: "480px" }} w="100%" pos="relative" bg="rgb(84, 73, 42)" overflow="hidden">
      <Link href={button.href} passHref>
        <a className="feature-card">
          <Box
            w="100%"
            h="100%"
            pos="relative"
            className="feature-card__box"
            _after={{
              content: '""', width: '100%', height: '100%', pos: 'absolute', top: '0', left: '0',
              backgroundColor: 'rgba(0,0,0,0.35)', transition: 'background-color 0.3s ease-in-out'
            }}
          >
            <Image
              src={image.url}
              alt={image.altText}
              layout="fill"
              objectFit="cover"
              className="feature-card__image"
            />
          </Box>
          <Box w="100%" h="100%" pos="absolute" top="0" left="0" px={4} py={8} display="flex" alignItems="flex-end">
            <Heading
              as="h2"
              pos="relative"
              fontSize={['lg', 'xl', '2xl']}
              lineHeight="1"
              fontWeight="normal"
              color="white"
              mb={4}
              _after={{
                content: '""', pos: 'absolute', bottom: '-1rem', left: '0', width: '40px', height: '3px', backgroundColor: 'green.700'
              }}
            >
              {title}
            </Heading>
          </Box>
        </a>
      </Link>
    </Box>
  )
}
