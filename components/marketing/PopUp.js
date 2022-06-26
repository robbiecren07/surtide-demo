import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Box, Text, Button, Stack, Heading, VisuallyHidden, Input, FormLabel, CloseButton} from '@chakra-ui/react'

export default function PopUp({ popUpDescription, cta, popUpTitle }) {
  // set state for popup
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    // find better solution for popup trigger
    const handleScroll = () => {
      // detect user scroll
      const center = Math.ceil(window.innerHeight + window.scrollY) > (document.documentElement.scrollHeight / 2)
      if (center) {
        setIsActive(true)
        // remove listener once state changes to true
        window.removeEventListener('scroll', handleScroll)
      }
    }

    window.addEventListener('scroll', handleScroll, {
      passive: true
    })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // framer motion config
  const variants = {
    initial: {
      opacity: 0,
      x: '100%'
    },
    animate: {
      opacity: 1,
      x: '0'
    }
  }

  const transition = {
    ease: 'easeIn',
    duration: 0.5
  }

  // return null if no popup title
  if (!popUpTitle) return null

  return (
    <>
      {isActive &&
        <motion.div
          initial="initial"
          animate="animate"
          transition={transition}
          variants={variants}
          className="popup-box"
        >
          <Box
            w="100%"
            h="100%"
            bg="gray.100"
            borderRadius="md"
            boxShadow="xl"
          >
            <Box w="100%" h="100%" p={8} pos="relative" boxShadow="outline" borderRadius="md">
              <Box pos="absolute" top="10px" right="10px">
                <CloseButton onClick={() => setIsActive(false)} />
              </Box>
              <Stack spacing={3}>
                <Heading as="h3" fontSize={['lg', 'xl', '2xl']}>{popUpTitle}</Heading>
                <Text>{popUpDescription}</Text>
                <Box as="form" mt={8} display={{ sm: 'flex' }}>
                  <VisuallyHidden as={FormLabel} htmlFor="emailAddress">
                    Email address
                  </VisuallyHidden>
                  <Input
                    id="emailAddress"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Enter your email"
                    width="full"
                    height="full"
                    maxW={{ sm: 'xs' }}
                    px={5}
                    py={3}
                    borderColor="gray.300"
                    _placeholder={{
                      color: 'gray.400'
                    }}
                  />
                  <Box
                    mt={[3, 0]}
                    ml={{ sm: 3 }}
                    flexShrink={{ sm: 0 }}
                    borderRadius="md"
                    boxShadow="md"
                  >
                    <Button
                      type="submit"
                      width="full"
                      height="full"
                      px={5}
                      py={3}
                      bg="green.700"
                      color="white"
                      fontWeight="medium"
                      _hover={{
                        bg: 'green.800'
                      }}
                    >
                      {cta || 'Submit'}
                    </Button>
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Box>
        </motion.div>
      }
    </>
  )
}
