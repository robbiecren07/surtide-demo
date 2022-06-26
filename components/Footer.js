import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  VisuallyHidden,
  Link as ChakraLink,
  Text,
  Stack,
  Box,
  Grid,
  Heading,
  FormLabel,
  Select,
  GridItem
} from '@chakra-ui/react'
import { GithubIcon, LinkedInIcon, SlackIcon, TwitterIcon } from '@/icons'

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
  const router = useRouter()

  return (
    <Box as="footer" aria-labelledby="footerHeading" borderTopWidth="1px" borderColor="gray.200">
      <Box maxW="7xl" mx="auto" bg="white" pt={{ base: 12, lg: 16 }} px={[4, 6]} pb={[ 4, 6 ]}>
        <Box
          pb={8}
          display={{ xl: 'grid' }}
          gridTemplateColumns={{ xl: 'repeat(5, 1fr)' }}
          gridGap={{xl: 10, '2xl': 14 }}
        >

          <GridColumn
            links={primaryLinks.length && primaryLinks}
            title="Browse"
          />

          <GridColumn
            links={secondaryLinks.length && secondaryLinks}
            title="Help"
          />

          <Box mt={{ base: 12, xl: 0 }}>
            <GridColumnHeading>Social</GridColumnHeading>
            <Box mt={4}>
              <SocialMediaLink
                title="GitHub"
                icon={GithubIcon}
                href="https://github.com/GraphCMS/reference-nextjs-marketing"
              />
            </Box>
          </Box>

          <GridItem gridColumn={{ xl: 'span 2' }}>
            <Box mt={{ base: 12, xl: 0 }}>
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
          <Box order={{ md: 2 }}>
            <SocialMediaLink
              title="GitHub"
              icon={GithubIcon}
              href="https://github.com/GraphCMS/reference-nextjs-marketing"
            />
          </Box>

          <Text
            fontSize="sm"
            color="gray.400"
            order={{ md: 1 }}
          >
            Demo theme created as a learning project.
          </Text>
          </Box>
        </Box>
      </Box>
  )
}
