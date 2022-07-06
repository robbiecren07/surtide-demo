import * as Columns from '@/columns'
import Container from '../Container'
import { Box, Heading } from '@chakra-ui/react'

export default function Grid({
  children,
  columnComponent,
  columns,
  gridHeadline,
  gridSubtitle,
  gridTag,
  gridTitle,
  layout = 'STACKED',
  theme = 'WHITE',
  width = 1,
  containerSize
}) {
  if (!columns || !columns.length) return null

  const stackLayout = layout === 'STACK'
  const splitLayout = layout === 'SPLIT'

  return (
    <Container size={containerSize}>
      {gridTitle &&
        <Box>
          <Heading
            as="h2"
            pos="relative"
            fontSize={['lg', 'xl', '2xl', '3xl']}
            lineHeight="1"
            fontWeight="medium"
            color="gray.900"
            textAlign="left"
            mb={10}
            _after={{
              content: '""', position: 'absolute', bottom: '-1rem', left: '0', width: '40px', height: '3px', backgroundColor: 'green.700'
            }}
          >
            {gridTitle}
          </Heading>
        </Box>
      }
      <Box
        position="relative"
        display={{ lg: splitLayout && 'grid' }}
        gridColumnGap={{ lg: splitLayout && 8 }}
        gridTemplateColumns={{ base: 'repeat(1, 1fr)', lg: splitLayout && `repeat(${width}, 1fr)` || stackLayout && 'repeat(1, 1fr)' }}
      >
        {children
          ? children()
          : columns.map((column) => {
              const Component =
                Columns[columnComponent] || Columns[column.__typename]

              if (!Component) return null

              return <Component key={column.id} {...column} />
          })
        }
      </Box>
    </Container>
  )
}
