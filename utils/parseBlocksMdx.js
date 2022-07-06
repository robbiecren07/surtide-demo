import { serialize } from 'next-mdx-remote/serialize'
import he from 'he'

import { parseColumnsMdx } from '@/utils/parseColumnsMdx'

const parseBlocksMdx = async (blocks) =>
  await Promise.all(
    blocks.map(async ({ columns, content, gridSubtitle, storeAddress, storeHours, ...block }) => ({
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
      ...(storeAddress && {
        storeAddress: {
          markdown: storeAddress,
          mdx: await serialize(he.decode(storeAddress))
        }
      }),
      ...(storeHours && {
        storeHours: {
          markdown: storeHours,
          mdx: await serialize(he.decode(storeHours))
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