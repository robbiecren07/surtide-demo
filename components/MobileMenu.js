import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import MobileDropdownMenu from './MobileDropdownMenu'
import {
  Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay,
  List, ListItem, useDisclosure, Link as ChakraLink, Button, VisuallyHidden, Box
} from "@chakra-ui/react"
import { ChevronDownIcon } from '@chakra-ui/icons'
import { MenuIcon } from './icons'

export default function MobileMenu({ navigations, primary }) {
  const [dropdownActive, setDropdownActive] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  
  return (
    <>
      <Box display={{ lg: 'none' }} pos="absolute" left="0">
        <Button
          type="button"
          bg="white"
          borderRadius="md"
          p={2}
          display="inline-flex"
          color="black"
          onClick={onOpen}
        >
          <VisuallyHidden>Open menu</VisuallyHidden>
          <Box as={MenuIcon} w={6} h={6} aria-hidden="true" />
        </Button>
        <Drawer onClose={onClose} isOpen={isOpen} placement="left" size="sm">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader></DrawerHeader>
            <DrawerBody display="flex" flexDirection="column" h="100%" p={4}>
              <List
                display='flex'   
                flexDirection="column"
                pos="relative"
              >
                {primary.map((page) => {
                  const isActive = router.asPath.startsWith(`/${page.slug}`)

                  return (
                    <ListItem key={page.slug}>
                      {page.hasSubMenu === true ?
                        <>
                          <Box display="flex"
                                alignItems="center"
                                justifyContent="space-between">
                            <Link href={`/${page.slug}`} passHref>
                              <ChakraLink
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                                pos="relative"
                                fontSize="md"
                                fontWeight="normal"
                                textTransform="uppercase"
                                letterSpacing="1px"
                                lineHeight="2.4"
                                px={6}
                                color={isActive ? 'green.600' : 'black'}
                                _hover={{
                                  color: 'green.600'
                                }}
                                className="has-dropdown"
                              >
                                {page.navigationLabel ||
                                  page.slug.charAt(0).toUpperCase() + page.slug.slice(1)}
                              </ChakraLink>
                            </Link>
                            <Box
                              display="flex"
                              alignItems="center"
                              width="24px"
                              height="24px"
                              zIndex="50"
                            >
                              <ChevronDownIcon
                                w={4}
                                h={4}
                                onClick={() => setDropdownActive(!dropdownActive)}
                              />
                            </Box>
                          </Box>
                          <MobileDropdownMenu navigations={navigations} dropdownActive={dropdownActive} />
                        </>
                        :
                        <Link href={`/${page.slug}`} passHref>
                          <ChakraLink
                            display="flex"
                            alignItems="center"
                            pos="relative"
                            fontSize="md"
                            fontWeight="normal"
                            textTransform="uppercase"
                            letterSpacing="1px"
                            lineHeight="2.4"
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
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  )
}