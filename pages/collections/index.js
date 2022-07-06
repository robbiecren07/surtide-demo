import { graphcmsClient } from '@/lib/client'
import { pageQuery } from '@/lib/queries'
import { parsePageData } from '@/utils/parsePageData'
import { getAllCollections, getCollection } from '@/lib/shopify'
import Layout from '@/components/Layout'
import BlockWrapper from '@/components/BlockWrapper'
import * as Marketing from '@/marketing'

export default function CollectionPage({ data, page, collectionCards }) {
  const pageNewsletter = page?.marketing?.find(
    (block) => block.__typename === 'Newsletter'
  )

  return (
    <>
      <Layout {...data}>
        <BlockWrapper {...page} collectionCards={collectionCards} />

        {pageNewsletter && <Marketing.NewsletterSignup {...pageNewsletter} />}
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const client = graphcmsClient(preview)

  const data = await client.request(pageQuery, {
    slug: 'collections'
  })

  const collectionCards = await getAllCollections()
  const parsedPageData = await parsePageData(data.page)

  return {
    props: {
      data,
      page: parsedPageData,
      collectionCards,
      preview
    },
    revalidate: 60
  }
}