import { Box, Heading, Text } from '@chakra-ui/react'
import Container from '../Container'

export default function FancyHeading({ fancyTitle, fancyContent }) {

  return (
    <>
      {fancyContent ?
        <>
          <Container>
            <Heading
              as="h2"
              pos="relative"
              fontSize={['lg', 'xl', '2xl', '3xl']}
              lineHeight="1"
              fontWeight="medium"
              color="gray.900"
              textAlign="center"
              mb={10}
              _after={{
                content: '""', position: 'absolute', bottom: '-1rem', left: '50%', transform: 'translateX(-50%)', width: '40px', height: '3px', backgroundColor: 'green.700'
              }}
            >
              {fancyTitle}
            </Heading>
            <Box w={['100%', null , '80%', '70%']} mx="auto">
              <Text textAlign="center">{fancyContent}</Text>
            </Box>
          </Container>
        </>
      :
        <>
          <Box w="100%">
            <Heading
              as="h2"
              pos="relative"
              fontSize={['lg', 'xl', '2xl', '3xl']}
              lineHeight="1"
              fontWeight="medium"
              color="gray.900"
              textAlign="center"
              mb={10}
              _after={{
                content: '""', position: 'absolute', bottom: '-1rem', left: '50%', transform: 'translateX(-50%)', width: '40px', height: '3px', backgroundColor: 'green.700'
              }}
            >
              {fancyTitle}
            </Heading>
          </Box>
        </>
      }
    </>
  )
}
