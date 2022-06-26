import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import { MDXRemote } from 'next-mdx-remote'

import * as Columns from '@/columns'
import { DotsSVG } from '@/svgs'
import Container from '../Container'

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
  width = 1
}) {
  if (!columns || !columns.length) return null

  const stackLayout = layout === 'STACK'
  const splitLayout = layout === 'SPLIT'

  return (
      <Container>
        <Box
          position="relative"
          display={{ lg: splitLayout && 'grid' }}
          gridColumnGap={{ lg: splitLayout && 8 }}
          gridTemplateColumns={{ lg: splitLayout && 'repeat(3, 1fr)' }}
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
