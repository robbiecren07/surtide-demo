import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import NextImage from 'next/image'
import { useRouter } from 'next/router'
import { CartContext } from '@/context/shopifyContext'
import MiniCart from './MiniCart'
import DropdownMenu from './DropdownMenu'
import MobileMenu from './MobileMenu'
import MediaQuery from 'react-responsive'
import {
  Box,
  Flex,
  Link as ChakraLink,
  List,
  ListItem,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import logoImage from '../public/SurTide_Logo_V2.png'
import { ShoppingCartIcon, UserCircleIcon } from '@heroicons/react/outline'

export default function Navigation({ navigations }) {
  const [dropdownActive, setDropdownActive] = useState(false)
  const router = useRouter()
  const primary = navigations.find(x => x.slug === 'primary').pages
 
  const { cart, cartOpen, setCartOpen } = useContext(CartContext)
  let cartQuantity = 0
  cart.map(item => {
    return (cartQuantity += item?.variantQuantity)
  })

  // prevent failed hydration when using MediaQuery
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  
  return (
    <>
      <Box as="header" pos="sticky" top="0" left="0" w="100%" h="74px" zIndex="99">
        <Box pos="relative" w="100%" h="3px" bg="green.700" />
        <Box pos="relative" w="100%" h="100%" bg="white" boxShadow="base">
          <Box maxW="7xl" h="100%" mx="auto" px={[4, 6]}>
            <Flex
              pos="relative"
              h="100%"
              justifyContent="center"
              alignItems="center"
            >
              {mounted && (
                <MediaQuery maxWidth={1023}>
                  <MobileMenu navigations={navigations} primary={primary} />
                </MediaQuery>
              )}
              <Flex w="140px" pos={{ lg: "absolute" }} left={{ lg: "0" }} zIndex="99">
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
              {mounted && (
                <MediaQuery minWidth={1024}>
                  <Box
                    as="nav"
                    display={['none', null, 'flex']}
                    pos="relative"
                    justifyContent="center"
                    alignItems="center"
                    w="100%"
                    height="100%"
                  >
                    <List
                      display={['none', null, 'flex']}   
                      direction="row"
                      alignItems="center"
                      pos="static"
                      h="100%"
                    >
                      {primary.map((page) => {
                        const isActive = router.asPath.startsWith(`/${page.slug}`)

                        return (
                          <ListItem key={page.slug} pos="static" h="100%">
                            {page.hasSubMenu === true ?
                              <>
                                <Link href={`/${page.slug}`} passHref>
                                  <ChakraLink
                                    display="flex"
                                    alignItems="center"
                                    pos="relative"
                                    h="100%"
                                    fontSize="sm"
                                    fontWeight="normal"
                                    textTransform="uppercase"
                                    letterSpacing="1px"
                                    lineHeight="2"
                                    px={6}
                                    color={isActive ? 'green.600' : 'black'}
                                    _hover={{
                                      color: 'green.600'
                                    }}
                                    className="has-dropdown"
                                    onMouseEnter={() => setDropdownActive(true)}
                                    onMouseLeave={() => setDropdownActive(false)}
                                  >
                                    {page.navigationLabel ||
                                      page.slug.charAt(0).toUpperCase() + page.slug.slice(1)}
                                    <ChevronDownIcon w={4} h={4} />
                                  </ChakraLink>
                                </Link>
                                <DropdownMenu navigations={navigations} dropdownActive={dropdownActive} setDropdownActive={setDropdownActive} />
                              </>
                              :
                              <Link href={`/${page.slug}`} passHref>
                                <ChakraLink
                                  display="flex"
                                  alignItems="center"
                                  pos="relative"
                                  h="100%"
                                  fontSize="sm"
                                  fontWeight="normal"
                                  textTransform="uppercase"
                                  letterSpacing="1px"
                                  lineHeight="1"
                                  px={6}
                                  color={isActive ? 'green.600' : 'black'}
                                  _hover={{
                                    color: 'green.600'
                                  }}
                                >
                                  {page.navigationLabel ||
                                    page.slug.charAt(0).toUpperCase() + page.slug.slice(1)}
                                </ChakraLink>
                              </Link>
                            }
                          </ListItem>
                        )
                      })}
                    </List>
                  </Box>
                </MediaQuery>
              )}

              <Box display="inline-flex" pos="absolute" right="0" zIndex="99">
                <ChakraLink
                  cursor="pointer"
                  color="black"
                  mr={4}
                  _hover={{
                    color: 'green.600'
                  }}
                  href="https://surtide-clothing.myshopify.com/account/login"
                >
                  <UserCircleIcon className="account_icon" />
                </ChakraLink>
                <ChakraLink
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
            </Flex>
          </Box>
        </Box>
      </Box>
    </>
  )
}
