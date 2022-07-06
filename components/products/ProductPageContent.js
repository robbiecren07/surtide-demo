import { useEffect, useState } from "react"
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import { EffectFade } from 'swiper'
import RecommendedList from './RecommendedList'
import { Box, Flex, Heading,} from '@chakra-ui/react'
import ProductPageForm from './ProductPageForm'
import ProductAccordion from './ProductAccordion'
import Container from '../Container'
import MediaQuery from 'react-responsive'

import 'swiper/css/bundle'

export default function ProductPageContent({ product }) {
  // prevent failed hydration when using MediaQuery
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  
  // put images in empty array so we can map
  const images = []
  
  product.images.edges.map((image, i) => {
    images.push(
      <SwiperSlide key={`slide-${i}`} id={`slide-${i}`} style={{ backgroundColor: '#fff' }}>
        <Box w="100%" h="100%" pos="relative">
          <Image
            src={image.node.url}
            alt={image.node.altText}
            layout="responsive"
            objectFit="cover"
            width="390"
            height="400"
            priority={true}
          />
        </Box>
      </SwiperSlide>
     )
   })

  return (
    <>
      <Box bg='white' pt={20}>
        <Box pos="relative" maxW="8xl" mx="auto" px={[4, 6, null, 8]}>
          {mounted && (
            <MediaQuery maxWidth={1023}>
              <Heading
                as="h2"
                pos="relative"
                fontSize={['lg', 'xl', '2xl', '3xl']}
                lineHeight="1"
                fontWeight="medium"
                color="gray.900"
                mb={4}
                _after={{
                  content: '""', position: 'absolute', bottom: '-1rem', left: '0', width: '40px', height: '3px', backgroundColor: 'green.700'
                }}
              >
                {product.title}
              </Heading>
            </MediaQuery>
          )}
          <Flex flexDirection={[ 'column', null, null, 'row']} gap={10}>
            <Box
              w={{ base: '100%', lg: '50%', xl: '60%' }}
              overflow="hidden"
            >
              <Box
                pos="relative"
                w="100%"
                h="100%"
              >
                <Swiper
                  modules={[Navigation, Pagination, EffectFade]}
                  effect="fade"
                  navigation
                  pagination={{ clickable: true }}
                  loop="true"
                  className="product-swiper"
                >
                  {images}
                </Swiper>
                {mounted && (
                  <MediaQuery minWidth={1024}>
                    <ProductAccordion />
                  </MediaQuery>
                )}
              </Box>
            </Box>
            <ProductPageForm product={product} />
            {mounted && (
              <MediaQuery maxWidth={1023}>
                <ProductAccordion />
              </MediaQuery>
            )}
          </Flex>
        </Box>
      </Box>

      <Container>
        <RecommendedList current={product.id} products={product.collections.edges[0].node.products.edges} />
      </Container>
    </>
  )
}