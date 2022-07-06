import {
  Box, Stack, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Text, Link,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'

export default function ProductAccordion() {

  return (
    <Box w="100%" mt={{ lg: 10 }}>
      <Accordion allowToggle>
        <AccordionItem my={2}>
          <h2>
            <AccordionButton py={4}>
              <Box flex='1' textAlign='left'>
                Triple Guarantee
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel my={2}>
            <Stack spacing={4}>
              <Text fontWeight="medium">1. Free &#38; easy returns</Text>
              <Text>If you are not 100% satisfied with your purchase for any reason, you can return it within 30 days and the return shipping is FREE. Excludes International Orders and items marked Final Sale.</Text>
              <Text fontWeight="medium">2. Safe with us</Text>
              <Text>Our website is 100% verified and all transaction and customer info is securely encrypted with the latest technology.</Text>
              <Text fontWeight="medium">3. Have a question?</Text>
              <Text>We have an awesome customer service team who lives and breathes this stuff. Email: <Link href="mailto:store@email.com">store@email.com</Link> or Call: <Link href="tel:555-555-5555">555-555-5555</Link></Text>
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Accordion allowToggle>
        <AccordionItem my={2}>
          <h2>
            <AccordionButton py={4}>
              <Box flex='1' textAlign='left'>
                Size Guide
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel my={2}>
          <TableContainer p={4} border="1px solid" borderColor="gray.300" borderRadius="10px">
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>SIZE</Th>
                  <Th>CHEST &#40;INCH&#41;</Th>
                  <Th>CHEST &#40;CM&#41;</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>XS</Td>
                  <Td>34-26</Td>
                  <Td>86-91</Td>
                </Tr>
                <Tr>
                  <Td>S</Td>
                  <Td>36-38</Td>
                  <Td>91-96</Td>
                </Tr>
                <Tr>
                  <Td>M</Td>
                  <Td>38-40</Td>
                  <Td>96-101</Td>
                </Tr>
                <Tr>
                  <Td>L</Td>
                  <Td>40-42</Td>
                  <Td>101-106</Td>
                </Tr>
                <Tr>
                  <Td>XL</Td>
                  <Td>42-44</Td>
                  <Td>106-111</Td>
                </Tr>
                <Tr>
                  <Td>2XL</Td>
                  <Td>44-46</Td>
                  <Td>111-116</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  )
}