import Link from 'next/link'
import {
  VisuallyHidden,
  Link as ChakraLink,
  Text,
  Stack,
  Box,
  Heading,
  GridItem,
  Flex,
  Icon
} from '@chakra-ui/react'
import { Amex, Discover, GithubIcon, Mastercard, Paypal, Visa } from '@/icons'

function GridColumnHeading({ children }) {
  return (
    <Heading
      as="h3"
      fontSize="md"
      fontFamily="body"
      fontWeight="medium"
      color="black"
      letterSpacing="1px"
      textTransform="uppercase"
    >
      {children}
    </Heading>
  )
}

function GridColumn({ links, title }) {
  return (
    <div>
      <GridColumnHeading>{title}</GridColumnHeading>

      <Stack as="ul" mt={4} spacing={4}>
        {links.map((link) => (
          <li key={link.id}>
            <Link href={`/${link.slug}`} passHref>
              <ChakraLink
                fontSize="sm"
                color="gray.800"
                _hover={{
                  color: 'green.600'
                }}
              >
                {link.navigationLabel ||
                  link.slug.charAt(0).toUpperCase() + link.slug.slice(1)}
              </ChakraLink>
            </Link>
          </li>
        ))}
      </Stack>
    </div>
  )
}

function SocialMediaLink({ href, title, icon }) {
  return (
    <ChakraLink
      href={href}
      isExternal
      color="gray.500"
      _hover={{
        color: 'gray.400'
      }}
    >
      <VisuallyHidden>{title}</VisuallyHidden>
      <Box as={icon} w={6} h={6} />
    </ChakraLink>
  )
}

export default function Footer({ primaryLinks, secondaryLinks, aboutText }) {

  return (
    <Box as="footer" aria-labelledby="footerHeading" borderTopWidth="1px" borderColor="gray.200">
      <Box maxW="7xl" mx="auto" bg="white" pt={{ base: 12, lg: 16 }} px={[4, 6]} pb={[ 4, 6 ]}>
        <Box
          pb={8}
          display={{ lg: 'grid' }}
          gridTemplateColumns={{ lg: 'repeat(5, 1fr)' }}
          gridGap={{lg: 10, '2xl': 14 }}
        >

          <GridColumn
            links={primaryLinks.length && primaryLinks}
            title="Browse"
          />

          <Box mt={{ base: 12, lg: 0 }}>
            <GridColumn
              links={secondaryLinks.length && secondaryLinks}
              title="Help"
            />
          </Box>

          <Box mt={{ base: 12, lg: 0 }}>
            <GridColumnHeading>Social</GridColumnHeading>
            <Box mt={4}>
              <SocialMediaLink
                title="GitHub"
                icon={GithubIcon}
                href="https://github.com/robbiecren07"
              />
            </Box>
          </Box>

          <GridItem gridColumn={{ lg: 'span 2' }}>
            <Box mt={{ base: 12, lg: 0 }}>
              <GridColumnHeading>About</GridColumnHeading>
              <Box mt={4}>
                <Text fontSize="sm" color="gray.800">
                  {aboutText}
                </Text>
              </Box>
            </Box>
          </GridItem>

        </Box>
      </Box>

      <Box w="100%" bg="gray.100">  
        <Box
          maxW="7xl"
          mx="auto"
          p={[4, 6]}
          display={{ md: 'flex' }}
          alignItems={{ md: 'center' }}
          justifyContent={{ md: 'space-between' }}
        >
          <Flex order={{ md: 2 }} gap={2}>
            <Box display="flex" border="1px solid" borderColor="gray.300" borderRadius="4px">
              <Icon as={Visa} w="36px" h="23px" />
            </Box>
            <Box display="flex" border="1px solid" borderColor="gray.300" borderRadius="4px">
              <Icon as={Mastercard} w="36px" h="23px" />
            </Box>
            <Box display="flex" border="1px solid" borderColor="gray.300" borderRadius="4px">
              <Icon as={Amex} w="36px" h="23px" />
            </Box>
            <Box display="flex" border="1px solid" borderColor="gray.300" borderRadius="4px">
              <Icon as={Discover} w="36px" h="23px" />
            </Box>
            <Box display="flex" border="1px solid" borderColor="gray.300" borderRadius="4px">
              <Icon as={Paypal} w="36px" h="23px" />
            </Box>
            |
            <SocialMediaLink
              title="GitHub"
              icon={GithubIcon}
              href="https://github.com/robbiecren07"
            />
          </Flex>

          <Text
            fontSize="sm"
            color="gray.400"
            order={{ md: 1 }}
            mt={{ base: "10px", md: 0 }}
          >
            Demo theme built as a learning project.
          </Text>
          </Box>
        </Box>
      </Box>
  )
}
