import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ShopProvider from '@/context/shopifyContext'
import { ChakraProvider } from '@chakra-ui/react'
import { DefaultSeo } from 'next-seo'
import { defaultSEO } from '../next-seo.config'
import { theme } from '../styles/theme'
import ProgressBar from '@/components/ProgressBar'

import '../styles/css/global.css'

export default function MyApp({ Component, pageProps }) {
  const [isAnimating, setIsAnimating] = useState(false)
  const router = useRouter()

  // handle progress bar on route change
  useEffect(() => {
    const handleStart = () => {
      setIsAnimating(true)
    }
    const handleStop = () => {
      setIsAnimating(false)
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  // handle Google Analytics
  useEffect(() => {
    const handleRouteChange = url => {
      window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
        page_path: url,
      })
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <ChakraProvider theme={theme}>
      <ShopProvider>
        <DefaultSeo {...defaultSEO} />
          <ProgressBar isAnimating={isAnimating} />
          <Component {...pageProps} key={router.asPath} />
      </ShopProvider>
    </ChakraProvider>
  )
}