import { useRouter } from 'next/router'
import ShopProvider from '@/context/shopifyContext'
import { ChakraProvider } from '@chakra-ui/react'
import { DefaultSeo } from 'next-seo'
import { defaultSEO } from '../next-seo.config'
import { theme } from '../styles/theme'

import '../styles/css/global.css'

export default function App({ Component, pageProps }) {
  const router = useRouter()

  return (
    <ChakraProvider theme={theme}>
      <ShopProvider>
        <DefaultSeo {...defaultSEO} />
          <Component {...pageProps} key={router.asPath} />
      </ShopProvider>
    </ChakraProvider>
  )
}