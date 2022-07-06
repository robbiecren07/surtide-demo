import Link from 'next/link'
import Footer from '@/components/Footer'
import Navigation from './Navigation'
import * as Marketing from '@/marketing'
import { Flex, Box } from '@chakra-ui/layout'
import SEO from './SEO'

function PreviewBanner({ enabled = false }) {
  if (!enabled) return null

  return (
    <Box textAlign="center" p="2" backgroundColor="black" textColor="white">
      Preview Mode Enabled (Content served from DRAFT) &mdash;&nbsp;
      <Link href="/api/exit-preview">
        <a>Exit Preview Mode</a>
      </Link>
    </Box>
  )
}

export default function Layout({ children, page, navigations, preview = false, ...data }) {
  const pageBanner = page?.marketing?.find(
    (block) => block.__typename === 'Banner'
  )

  return (
    <>
      {page?.seo && <SEO {...page.seo} />}

      <Flex flexDir="column" minH="100vh">
        {/* GraphCMS Content Preview Banner */}
        <PreviewBanner enabled={preview} />

        {pageBanner && <Marketing.Banner {...pageBanner} />}
        <Navigation navigations={navigations} />

        <Box as="main" flexGrow="1">
          {children}
        </Box>

        <Footer {...data.footer} />
      </Flex>
    </>
  )
}
