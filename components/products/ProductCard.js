import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { formatter } from '@/utils/helpers'
import { Box, Heading, Text, Stack, Link as ChakraLink, Flex, Tag } from '@chakra-ui/react'
import ColorSwatches from './ColorSwatches'

export default function ProductCard({ product }) {
  // get height of card before hover
  const cardRef = useRef()
  const [height, setHeight] = useState()

  useEffect(() => {
    const getCardHeight = () => {
      const newHeight = cardRef.current.clientHeight
      setHeight(newHeight)
    }

    getCardHeight()
    window.addEventListener("resize", getCardHeight)

    return () => window.removeEventListener("resize", getCardHeight)
  }, [])

  const { handle, title } = product.node
  const { altText, url } = product.node.images.edges[0].node
  const price = product.node.priceRange.minVariantPrice.amount
  const colors = product.node.options[1] // colors is 2nd in the array
  const getPrice = product.node.compareAtPriceRange.maxVariantPrice.amount

  // remove all compare prices that are $0.0 aka empty
  let maxPrice
  if (getPrice !== '0.0') {
    maxPrice = getPrice
  } else {
    maxPrice = null
  }
  
  const linkDefaultStyles = {
    width: 'full',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    px: [8, null, 10],
    py: [2, null, 3],
    fontSize: ['base', null, 'md'],
    fontWeight: 'medium',
    borderRadius: 'md'
  }

  return (
    <Stack spacing={1} pos="relative" className="product-card">
      <Box ref={cardRef} pos="relative" className="product-card__top">
        {maxPrice &&
          <Box pos="absolute" top="10px" right="-5px" zIndex="1" className="product-card_badge">
            <Tag size="lg" bg="green.700" color="#fff" borderRadius="0" fontWeight="normal">On Sale</Tag>
          </Box>
        }
        <div className="product-card__image">
          <Link href={`/products/${handle}`} passHref>
            <a className="group">
              <Box pos="relative" w="100%" bg="#f5f5f5" overflow="hidden">
                <Image 
                  src={url}
                  alt={altText}
                  width="390"
                  height="400"
                  layout="responsive"
                  objectFit="cover"
                />
              </Box>
            </a>
          </Link>
        </div>

        <Box p="5px" className="product-card__details">
          <Stack spacing={1}>
            <Heading as="h3" fontSize="md" fontWeight="medium" color="black">{title}</Heading>
            <Flex gap={2}>
              {maxPrice ?
                <>
                  <Text as="span" fontSize="md" color="red.500">{formatter.format(price)}</Text>
                  <Text as="s" fontSize="md" color="gray.500">{formatter.format(maxPrice)}</Text>
                </>
                :
                <Text as="span" fontSize="md" color="black">{formatter.format(price)}</Text>
              }
            </Flex>
            {colors &&
              <Box display="inline-flex" gap={1} pt="5px">
              {
                colors.values.map((color, index) => (
                  <Link key={index} href={`/products/${handle}`} passHref>
                    <a style={{ display: 'flex', margin: '0 4px' }}>
                      <ColorSwatches color={color} />
                    </a>
                  </Link>
                ))
              }
            </Box>
            }
          </Stack>
        </Box>
      </Box>

      <Box
        display="none"
        pos="absolute"
        w={{ base: 'calc(100% + 20px)', md: 'calc(100% + 60px)' }}
        height="fit-content"
        p="30px"
        pt={height}
        bg="white"
        inset={{base: "-10px -10px 0 -10px", md: "-30px -30px 0 -30px"}}
        boxShadow="0 3px 18px 0 rgba(42, 42, 42, 0.22)"
        zIndex="10"
        className="quick-shop"
      >
        <Box pt="40px" pos="relative">
          <Box borderRadius="md" boxShadow="lg">
            <Link href={`/products/${handle}`} passHref>
              <ChakraLink {...linkDefaultStyles} variant="INDIGO">
                View Product
              </ChakraLink>
            </Link>
          </Box>
        </Box>

      </Box>
    </Stack>
  )
}