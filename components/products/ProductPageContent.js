import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import { EffectFade } from 'swiper'
import RecommendedList from './RecommendedList'
import { Box, Flex } from '@chakra-ui/react'
import ProductPageForm from './ProductPageForm'

export default function ProductPageContent({ product }) {
  
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
          />
        </Box>
      </SwiperSlide>
     )
   })

  return (
    <Box bg='white' py={10}>
      <Box pos="relative" maxW="8xl" mx="auto" px={[4, 6, null, 8]}>
        <Flex gap={10}>
          <Box
            w={{ sm: '100%', lg: '50%', xl: '60%' }}
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
            </Box>
          </Box>
          <ProductPageForm product={product} />
        </Flex>
      </Box>
    </Box>
  )
}