import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import { EffectFade } from 'swiper'
import { Box, Flex } from '@chakra-ui/react'
import FeaturedSingleForm from './FeaturedSingleForm'

import 'swiper/css/bundle'

export default function FeaturedSingleProduct({ product }) {
  
  const featured = product[0].node
  const images = []

  featured.images.edges.map((image, i) => {
    images.push(
      <SwiperSlide key={`slide-${i}`} id={`slide-${i}`}>
        <Image
          src={image.node.url}
          alt={image.node.altText}
          layout="fill"
          objectFit="cover"
        />
      </SwiperSlide>
     )
   })

  return (
    <Box bg='white' py={[ null, null, 10 ]}>
      <Box pos="relative" maxW="7xl" mx="auto">
        <Flex flexDirection={[ 'column', null, null, 'row']} align="center" gap={10}>
          <Box
            w={{ base: '100%', lg: '50%' }}
            overflow="hidden"
          >
            <Box
              pos="relative"
              w="100%"
              h="50vh"
            >
              <Swiper
                modules={[Navigation, Pagination, EffectFade]}
                effect="fade"
                navigation
                pagination={{ clickable: true }}
                loop="true"
                className="home-swiper"
              >
                {images}
              </Swiper>
            </Box>
          </Box>
          <FeaturedSingleForm product={featured} />
        </Flex>
      </Box>
    </Box>
  )
}