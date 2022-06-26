import Image from 'next/image'
import Link from 'next/link'
import { Box, Grid, GridItem, Heading, Text } from "@chakra-ui/react"
import FancyHeading from './FancyHeading'

export default function ShowCollections({ showAllCollections, collections, collectionTitle }) {
  if (!showAllCollections) {
    return null
  }
  
  return (
    <>
      <Box display="flex" mt={40}>
        <FancyHeading fancyTitle={collectionTitle} />
      </Box>
      <Box as="section" my={10}>
        <Box pos="relative" p={[4, 6, 6, 8]}>
          <Grid templateColumns={['1fr', '1fr', '1fr 1fr']} gap={[6, 8, 10]}>
            {collections.map(({ node }) => (
              <GridItem key={node.handle} minH="320px" w="100%" overflow="hidden">
                <Link href={`/collections/${node.handle}`} passHref>
                  <a className="collection-card">
                    <Box
                      w="100%"
                      h="100%"
                      pos="relative"
                      className="collection-card__box"
                      _after={{
                        content: '""', width: '100%', height: '100%', pos: 'absolute', top: '0', left: '0',
                        backgroundColor: 'rgba(0,0,0,0.35)', transition: 'background-color 0.3s ease-in-out'
                      }}
                    >
                      <Image
                        src={node.image.url}
                        alt={node.image.altText}
                        layout="fill"
                        objectFit="cover"
                        className="collection-card__image"
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
                        {node.title}
                      </Heading>
                    </Box>
                  </a>
                </Link>
              </GridItem>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  )
}
