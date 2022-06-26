import { serialize } from 'next-mdx-remote/serialize'
import he from 'he'

import { parseColumnsMdx } from '@/utils/parseColumnsMdx'

const parseBlocksMdx = async (blocks) =>
  await Promise.all(
    blocks.map(async ({ columns, content, simpleContent, gridSubtitle, ...block }) => ({
      ...(gridSubtitle && {
        gridSubtitle: {
          markdown: gridSubtitle,
          mdx: await serialize(he.decode(gridSubtitle))
        }
      }),
      ...(content && {
        content: {
          markdown: content,
          mdx: await serialize(he.decode(content))
        }
      }),
      ...(simpleContent && {
        simpleContent: {
          markdown: simpleContent,
          mdx: await serialize(he.decode(simpleContent))
        }
      }),
      ...block,
      ...(columns &&
        columns.length && {
          columns: await parseColumnsMdx(columns)
        })
    }))
  )

export { parseBlocksMdx }