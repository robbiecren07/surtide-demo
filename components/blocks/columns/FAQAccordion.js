import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react'
import { MDXRemote } from 'next-mdx-remote'

export default function FAQAccordion({ content, title }) {

  return (
    <>
      <Accordion allowToggle>
        <AccordionItem my={2}>
          <h2>
            <AccordionButton py={4}>
              <Box flex='1' textAlign='left'>
                {title}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel my={2}>
            <MDXRemote {...content.mdx} />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  )
}
