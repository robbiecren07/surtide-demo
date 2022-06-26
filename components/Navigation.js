import { useRef, useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import NextImage from 'next/image'
import { useRouter } from 'next/router'
import { CartContext } from '@/context/shopifyContext'
import MiniCart from './MiniCart'
import { Transition } from 'react-transition-group'
import { MenuIcon, XIcon } from '@/icons'
import {
  Box,
  Flex,
  VisuallyHidden,
  Grid,
  Button,
  Text,
  Link as ChakraLink,
  Stack,
  useDisclosure,
  MenuItem,
  Menu,
  MenuButton,
  MenuList,
} from '@chakra-ui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import logoImage from '../public/SurTide_Logo_V1.png'
import { ShoppingCartIcon } from '@heroicons/react/outline'

const defaultStyle = {
  transition: `all 150ms cubic-bezier(0.4, 0, 1, 1)`
}

const transitionStyles = {
  entering: { transform: 'scale(0.95)', opacity: 0, visibility: 'hidden' },
  entered: { transform: 'scale(1)', opacity: 1, visibility: 'visible' },
  exiting: { transform: 'scale(1)', opacity: 1, visibility: 'visible' },
  exited: { transform: 'scale(0.95)', opacity: 0, visibility: 'hidden' }
}

export default function Navigation({ pages }) {
  const container = useRef(null)
  const router = useRouter()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const { cart, cartOpen, setCartOpen } = useContext(CartContext)
  let cartQuantity = 0
  cart.map(item => {
    return (cartQuantity += item?.variantQuantity)
  })

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!container?.current?.contains(event.target)) {
        if (!mobileNavOpen) return

        setMobileNavOpen(false)
      }
    }

    window.addEventListener('click', handleOutsideClick)

    return () => window.removeEventListener('click', handleOutsideClick)
  }, [mobileNavOpen, container])

  useEffect(() => {
    const handleEscape = (event) => {
      if (!mobileNavOpen) return

      if (event.key === 'Escape') {
        setMobileNavOpen(false)
      }
    }

    document.addEventListener('keyup', handleEscape)

    return () => document.removeEventListener('keyup', handleEscape)
  }, [mobileNavOpen])

  useEffect(() => {
    const handleRouteChange = () => setMobileNavOpen(false)

    router.events.on('routeChangeStart', handleRouteChange)

    return () => router.events.off('routeChangeStart', handleRouteChange)
  }, [router.events])

  const primaryMenu = pages.slice(1, 5)
  const dropDownMenuItem = pages[0]
  const subMenu = pages.slice(5)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const storePageIsActive = router.asPath.startsWith(`/${dropDownMenuItem.slug}`)

  return (
    <>
      <Box as="header" pos="sticky" top="0" left="0" w="100%" minH="74px" zIndex="99">
        <Box pos="relative" w="100%" h="3px" bg="green.700" />
        <Box ref={container} pos="relative" bg="white" boxShadow="base">
          <Transition in={mobileNavOpen} timeout={150}>
            {(state) => (
              <Box
                borderRadius="lg"
                boxShadow="lg"
                bg="white"
                m={2}
                border="1px solid rgba(0, 0, 0, 0.05)"
                pos="absolute"
                top="0"
                right="0"
                left="0"
                zIndex="docked"
                transition="all 150ms cubic-bezier(0.4, 0, 0.2, 1)"
                transformOrigin="top right"
                style={{
                  ...defaultStyle,
                  ...transitionStyles[state]
                }}
              >
                <Box pt={5} pb={6} px={5}>
                  <Flex alignItems="center" justifyContent="space-between">
                    <div>
                      <Link href="/">
                        <a>
                          <NextImage
                            src={logoImage}
                            alt="SurTide Clothing Company logo"
                            width={233}
                            height={66}
                          />
                        </a>
                      </Link>
                    </div>
                    <Box mr={-2}>
                      <Button
                        type="button"
                        bg="white"
                        borderRadius="md"
                        p={2}
                        display="inline-flex"
                        color="gray.400"
                        _hover={{
                          color: 'gray.500',
                          bg: 'gray.100'
                        }}
                        onClick={() => setMobileNavOpen(false)}
                      >
                        <VisuallyHidden>Close menu</VisuallyHidden>
                        <Box as={XIcon} w={6} h={6} aria-hidden="true" />
                      </Button>
                    </Box>
                  </Flex>
                  <Box mt={6}>
                    {pages && pages.length && (
                      <Grid as="nav" gridRowGap={8}>
                        {primaryMenu.map((page) => {
                          const isActive = router.asPath.startsWith(`/${page.slug}`)

                          return (
                            <Link key={page.id} href={`/${page.slug}`} passHref>
                              <ChakraLink
                                m={-3}
                                p={3}
                                display="flex"
                                alignItems="center"
                                borderRadius="md"
                                color={isActive ? 'indigo.600' : 'inherit'}
                                _hover={{
                                  bg: 'gray.50'
                                }}
                              >
                                <Text
                                  as="span"
                                  ml={3}
                                  fontSize="md"
                                  fontWeight="medium"
                                  color="gray.900"
                                >
                                  {page.navigationLabel ||
                                    page.slug.charAt(0).toUpperCase() +
                                      page.slug.slice(1)}
                                </Text>
                              </ChakraLink>
                            </Link>
                          )
                        })}
                      </Grid>
                    )}
                  </Box>
                </Box>
              </Box>
            )}
          </Transition>

          <Box maxW="7xl" mx="auto" px={[4, 6]}>
            <Stack
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              py={4}
              direction="row"
              spacing={{ md: 10 }}
            >
              <Flex w="140px">
                <Link href="/">
                  <a style={{ display: 'flex' }}>
                    <NextImage
                      src={logoImage}
                      alt="SurTide Clothing Company logo"
                      width={233}
                      height={66}
                    />
                  </a>
                </Link>
              </Flex>
              <Box mr={-2} my={-2} display={{ md: 'none' }}>
                <Button
                  type="button"
                  bg="white"
                  borderRadius="md"
                  p={2}
                  display="inline-flex"
                  color="gray.400"
                  _hover={{
                    color: 'gray.500',
                    bg: 'gray.100'
                  }}
                  onClick={() => setMobileNavOpen(true)}
                >
                  <VisuallyHidden>Open menu</VisuallyHidden>
                  <Box as={MenuIcon} w={6} h={6} aria-hidden="true" />
                </Button>
              </Box>
              {pages && pages.length && (
                <Stack
                  as="nav"
                  display={['none', null, 'flex']}
                  direction="row"
                  spacing={10}
                  pos="relative"
                >
                  {dropDownMenuItem !== null && (
                    <Menu isOpen={isOpen}>
                      <MenuButton
                        onMouseEnter={onOpen}
                        onMouseLeave={onClose}
                        fontSize="sm"
                        fontWeight="medium"
                        textTransform="uppercase"
                        letterSpacing="1px"
                        lineHeight="1"
                        color={isOpen ? 'green.600' : 'black'}
                        _hover={{
                          color: 'green.600'
                        }}
                      >
                        {dropDownMenuItem.navigationLabel ||
                          dropDownMenuItem.slug.charAt(0).toUpperCase() + dropDownMenuItem.slug.slice(1)}
                        {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                      </MenuButton>
                      <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
                          {subMenu.map((page) => {
                            const isActive = router.asPath.startsWith(`/${page.slug}`)

                            return (
                              <MenuItem key={page.id} minH="40px">
                                <Link href={`/${page.slug}`} passHref>
                                  <ChakraLink
                                    pos="relative"
                                    fontSize="sm"
                                    fontWeight="medium"
                                    textTransform="uppercase"
                                    letterSpacing="1px"
                                    lineHeight="1"
                                    color={isActive ? 'green.600' : 'black'}
                                    _hover={{
                                      color: 'green.600'
                                    }}
                                  >
                                    {page.navigationLabel ||
                                      page.slug.charAt(0).toUpperCase() + page.slug.slice(1)}
                                  </ChakraLink>
                                </Link>
                              </MenuItem>
                            )
                          })}
                      </MenuList>
                    </Menu>
                    )
                  }
                  {primaryMenu.map((page) => {
                    const isActive = router.asPath.startsWith(`/${page.slug}`)

                    return (
                      <Link key={page.id} href={`/${page.slug}`} passHref>
                        <ChakraLink
                          pos="relative"
                          fontSize="sm"
                          fontWeight="medium"
                          textTransform="uppercase"
                          letterSpacing="1px"
                          lineHeight="1"
                          color={isActive ? 'green.600' : 'black'}
                          _hover={{
                            color: 'green.600'
                          }}
                        >
                          {page.navigationLabel ||
                            page.slug.charAt(0).toUpperCase() + page.slug.slice(1)}
                        </ChakraLink>
                      </Link>
                    )
                  })}
                </Stack>
              )}
              <Box pos="relative">
                <ChakraLink
                  fontSize="sm"
                  fontWeight="medium"
                  textTransform="uppercase"
                  letterSpacing="1px"
                  lineHeight="1"
                  cursor="pointer"
                  color="black"
                  _hover={{
                    color: 'green.600'
                  }}
                  onClick={() => setCartOpen(!cartOpen)}
                >
                  <ShoppingCartIcon className="cart_icon" />
                  {cartQuantity > 0 &&
                    <Box
                      pos="absolute"
                      top="-6px"
                      right="-5px"
                      w="10px"
                      h="10px"
                      borderRadius="50%"
                      bg="green.600"
                    />
                  }
                </ChakraLink>
              </Box>
              <MiniCart cart={cart} />
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  )
}
