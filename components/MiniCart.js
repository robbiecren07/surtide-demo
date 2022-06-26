import { Fragment, useContext, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { CartContext } from '@/context/shopifyContext'
import { formatter } from '@/utils/helpers'
import {
  Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Heading,
  List, ListItem, Text, useDisclosure, Link as ChakraLink
} from '@chakra-ui/react'


export default function MiniCart({ cart }) {
  const cancelButtonRef = useRef()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { cartOpen, setCartOpen, checkoutUrl, removeCartItem } = useContext(CartContext)

  // add onOpen to fix: Warning: React Hook useEffect has a missing dependency: 'onOpen'.
  useEffect(() => {
    if (cartOpen === true) {
      onOpen(cartOpen)
    }
  }, [cartOpen, setCartOpen, onOpen])

  function handleOnClose() {
    onClose()
    setCartOpen(false)
  }

  let cartTotal = 0
  cart.map(item => {
    cartTotal += item?.variantPrice * item?.variantQuantity
  })

  const linkDefaultStyles = {
    width: 'full',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    px: [8, null, 10],
    py: [3, null, 4],
    fontSize: ['base', null, 'lg'],
    fontWeight: 'medium',
    borderRadius: 'md'
  }

  return (
      <Drawer onClose={handleOnClose} isOpen={isOpen} size="sm">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Text
              w="90%"
              pos="relative"
              fontSize={['lg', 'lg', 'xl', 'xl']}
              lineHeight="1"
              fontWeight="medium"
              color="gray.900"
              _after={{
                content: '""', position: 'absolute', bottom: '-1rem', left: '0', width: '40px', height: '3px', backgroundColor: 'green.700'
              }}
            >
              Shopping Cart
            </Text>
          </DrawerHeader>
          <DrawerBody display="flex" flexDirection="column" h="100%" px="0">
            <Box flex="1 1 0%" overflowY="scroll">
              <Box display="inline-block" w="100%" px={4}>
                {
                  cart.length > 0 ?
                    <List spacing={3}>
                      {cart.map((product) => (
                        <ListItem key={product.id + Math.random()} display="flex" py="20px">
                          <Box pos="relative" flexShrink="0" w="94px" h="94" bg="#f5f5f5" border="1px soild gray.200" borderRadius="6px" overflow="hidden">
                            <Image
                              src={product.image}
                              alt={product.title}
                              layout="fill"
                              objectFit="cover"
                            />
                          </Box>

                          <Box ml="10px" flex="1 1 0%" display="flex" flexDirection="column">
                            <Box>
                              <Box display="flex" justifyContent="space-between" fontSize="md" color="black">
                                <Heading as="h3" fontSize="md" fontWeight="medium" fontFamily="body">
                                  <Link href={`/products/${product.handle}`} passHref>
                                    <a onClick={() => setCartOpen(false)}>{product.title}</a>
                                  </Link>
                                </Heading>
                                <Text as="p" ml="10px" fontWeight="medium">{formatter.format(product.variantPrice)}</Text>
                              </Box>
                              <Text mt="10px" fontSize="sm" color="gray.500">{product.variantTitle}</Text>
                            </Box>
                            <Box flex="1 1 0%" display="flex" justifyContent="space-between" alignItems="flex-end" fontSize="sm">
                              <Text as="p" fontSize="sm" color="gray.500">Qty {product.variantQuantity}</Text>

                              <Flex>
                                <Button
                                  colorScheme="red"
                                  variant="link"
                                  fontSize="sm"
                                  fontWeight="medium"
                                  onClick={() => removeCartItem(product.id)}
                                >
                                  Remove
                                </Button>
                              </Flex>
                            </Box>
                          </Box>
                        </ListItem>
                      ))}
                    </List> :
                    <Box>
                      <Text>Your cart is empty!</Text>
                    </Box>
                }
              </Box>
            </Box>
            {
              cart.length > 0 ?
              <Box p={6} borderTop="1px solid" borderColor="gray.300">
                <Flex justifyContent="space-between">
                  <Text fontWeight="semibold" color="black">Subtotal</Text>
                  <Text fontWeight="semibold" color="black">{formatter.format(cartTotal)}</Text>
                </Flex>
                <Text fontSize="sm" mt="2px">Shipping and taxes calculated at checkout.</Text>
                <Box mt={6}>
                  <Box borderRadius="md" boxShadow="lg">
                    <Link href={checkoutUrl} passHref>
                      <ChakraLink {...linkDefaultStyles} variant="INDIGO">
                        Checkout
                      </ChakraLink>
                    </Link>
                  </Box>
                </Box>
                <Box mt={6}>
                  <Text fontSize="sm" textAlign="center">
                    or{' '}
                    <Button
                      fontSize="sm"
                      variant='link'
                      onClick={handleOnClose}
                    >
                      Continue Shopping<span aria-hidden="true"> &rarr;</span>
                    </Button>
                  </Text>
                </Box>
              </Box> : null
            }
          </DrawerBody>
        </DrawerContent>
      </Drawer>
  )
}
