import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote'
import ContactForm from '../ContactForm'
import { Box, Flex, Heading } from "@chakra-ui/react"

export default function ContactInfo({ storeName, storeAddress, storeHours, mapImage, showContactForm }) {
  if (!storeName) return null
  
  return (
    <>
      <Box my={{ lg: 40 }} p={{ base: 4, lg: 10 }} w="100%">
        <Flex flexDirection={{ base: 'column', lg: 'row' }}>
          <Box display="flex" alignItems="center" flex="1" zIndex="2">
            <Box w="100%" p={{ base: 4, lg: 10 }} bg="white">
              <Heading
                as="h2"
                pos="relative"
                fontSize={['lg', 'xl', '2xl', '3xl']}
                lineHeight="1"
                fontWeight="medium"
                color="gray.900"
                textAlign="left"
                mb={10}
                _after={{
                  content: '""', position: 'absolute', bottom: '-1rem', left: '0', width: '40px', height: '3px', backgroundColor: 'green.700'
                }}
              >
                {storeName}
              </Heading>
              <Flex>
                <Box flex="1" className="add-spacing">
                  <MDXRemote {...storeAddress.mdx} />
                </Box>
                <Box flex="1" className="add-spacing">
                  <MDXRemote {...storeHours.mdx} />
                </Box>
              </Flex>
            </Box>
          </Box>
          <Box flex="1" maxW="1000px">
            <Box ml={{ lg: "-100px" }}>
              <Image
                className="hero-image"
                src={mapImage.url}
                alt="SurTide Google map location"
                width={mapImage.width}
                height={mapImage.height}
                layout="responsive"
                objectFit="cover"
              />
            </Box>
          </Box>
        </Flex>
      </Box>

      {showContactForm &&
        <ContactForm />
      }
    </>
  )
  
}