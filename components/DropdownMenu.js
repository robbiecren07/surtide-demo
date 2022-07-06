import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Box,
  Grid,
  Link as ChakraLink,
  List,
  ListItem,
  GridItem,
} from '@chakra-ui/react'

export default function DropdownMenu({ navigations, dropdownActive, setDropdownActive }) {
  const subMenuOne = navigations.find(x => x.slug === 'sub-menu-one').pages
  const subMenuTwo = navigations.find(x => x.slug === 'sub-menu-two').pages
  const subMenuTwoImage = navigations.find(x => x.slug === 'sub-menu-two' && x.subMenuImage !== null).subMenuImage

  // framer motion config
  const variants = {
    initial: {
      opacity: 0,
      height: '0'
    },
    animate: {
      opacity: 1,
      height: 'auto'
    },
    exit: {
      opacity: 0,
      height: '0'
    },
  }

  const transition = {
    ease: 'easeInOut',
    duration: 0.25
  }

  return (
    <>
      {dropdownActive &&
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transition}
          variants={variants}
          className="nav-sub__container"
          onMouseEnter={() => setDropdownActive(true)}
          onMouseLeave={() => setDropdownActive(false)}
        >
          <Box pos="relative" w="100%" h="100%" bg="white" borderTop="1px solid" borderColor="gray.200">
            <Grid templateColumns="repeat(3, 1fr)" gap={6} w="100%" h="100%" p="10px">
              <GridItem>
                <List pos="relative" pb={2} className="nav-sub__menu">
                  {subMenuOne.map((page, index) => {
                    return (
                      <ListItem key={page.slug} pos="relative" mx={4} px={2}>
                        {index === 0 ?
                          <>
                            <Link href={`/${page.slug}`} passHref>
                              <ChakraLink
                                pos="relative"
                                display="flex"
                                fontSize="xl"
                                fontWeight="normal"
                                textTransform="capitalize"
                                letterSpacing="1px"
                                lineHeight="50px"
                                color="black"
                                px={2}
                                mb={2}
                                borderBottom="1px solid" borderColor="gray.200"
                                _hover={{
                                  borderColor: 'gray.500'
                                }}
                              >
                                {page.navigationLabel ||
                                  page.slug.charAt(0).toUpperCase() + page.slug.slice(1)}
                              </ChakraLink>
                            </Link>
                          </>
                          :
                          <Link href={`/${page.slug}`} passHref>
                            <ChakraLink
                              pos="relative"
                              display="flex"
                              w="100%"
                              h="100%"
                              fontSize="sm"
                              fontWeight="normal"
                              textTransform="capitalize"
                              letterSpacing="1px"
                              lineHeight="36px"
                              px={2}
                              color="black"
                              _hover={{
                                backgroundColor: 'gray.200'
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
              </GridItem>
              <GridItem>
                <List pos="relative" pb={2} className="nav-sub__menu">
                  {subMenuTwo.map((page, index) => {
                    return (
                      <ListItem key={page.slug} pos="relative" mx={4} px={2}>
                        {index === 0 ?
                          <>
                            <Link href={`/${page.slug}`} passHref>
                              <ChakraLink
                                pos="relative"
                                display="flex"
                                fontSize="xl"
                                fontWeight="normal"
                                textTransform="capitalize"
                                letterSpacing="1px"
                                lineHeight="50px"
                                color="black"
                                px={2}
                                mb={2}
                                borderBottom="1px solid" borderColor="gray.200"
                                _hover={{
                                  borderColor: 'gray.500'
                                }}
                              >
                                {page.navigationLabel ||
                                  page.slug.charAt(0).toUpperCase() + page.slug.slice(1)}
                              </ChakraLink>
                            </Link>
                          </>
                          :
                          <Link href={`/${page.slug}`} passHref>
                            <ChakraLink
                              pos="relative"
                              display="flex"
                              w="100%"
                              h="100%"
                              fontSize="sm"
                              fontWeight="normal"
                              textTransform="capitalize"
                              letterSpacing="1px"
                              lineHeight="36px"
                              px={2}
                              color="black"
                              _hover={{
                                backgroundColor: 'gray.200'
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
              </GridItem>
              <GridItem>
                {subMenuTwoImage &&
                  <Image 
                    src={subMenuTwoImage.url}
                    alt="quality control since 1993"
                    width={subMenuTwoImage.width}
                    height={subMenuTwoImage.height}
                    layout="responsive"
                    objectFit="cover"
                  />
                }
              </GridItem>
            </Grid>
          </Box>
        </motion.div>
      }
    </>
  )
}
