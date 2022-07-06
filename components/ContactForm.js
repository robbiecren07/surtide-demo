import { useState } from "react"
import { Box, Button, FormControl, FormLabel, Heading, Input, Textarea, useToast } from "@chakra-ui/react"

export default function ContactForm({ }) {
  const [input, setInput] = useState('')
  const handleInputChange = (e) => setInput(e.target.value)

  const toast = useToast()

  return (
    <>
      <Box as="section" py={[ 20, null, null, 40 ]} bg="gray.100">
        <Box pos="relative" maxW="3xl" mx="auto" px={[4, 6, null, 8]}>
          <Box w="100%" h="100%" py={10} px={[4, null, 6, 10]} bg="white" boxShadow='lg'>
            <Heading
              as="h2"
              pos="relative"
              fontSize={['lg', 'xl', '2xl', '3xl']}
              lineHeight="1"
              fontWeight="medium"
              color="gray.900"
              textAlign="left"
              mb={20}
              _after={{
                content: '""', position: 'absolute', bottom: '-1rem', left: '0', width: '40px', height: '3px', backgroundColor: 'green.700'
              }}
            >
              Contact Us
            </Heading>
            <form>
              <FormControl isRequired>
                <FormLabel htmlFor='name'>Name</FormLabel>
                <Input id='name' type='text' size='lg' />
              </FormControl>
              <FormControl isRequired mt={4}>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <Input
                  id="emailAddress"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  size='lg'
                  value={input}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl isRequired mt={4}>
                <FormLabel htmlFor='message'>Message</FormLabel>
                <Textarea id='message' name='message' size='lg' />
              </FormControl>

              <Button
                type='button'
                w="100%"
                mt={6}
                px={[8, null, 10]}
                py={[3, null, 6]}
                fontSize={['base', null, 'lg']}
                fontWeight='medium'
                borderRadius='md'
                bg="green.700"
                color="white"
                _hover={{
                  bg: 'green.800'
                }}
                onClick={() =>
                  toast({
                    title: 'Warning!',
                    description: "This is a just a demo form!",
                    status: 'warning',
                    duration: 4000,
                    isClosable: true,
                  })
                }
              >
                Send
              </Button>
            </form>
          </Box>
        </Box>
      </Box>  
    </>
  )
}