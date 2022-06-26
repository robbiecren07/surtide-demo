import { graphcmsClient } from '@/lib/client'
import { pageQuery } from '@/lib/queries'
import { parsePageData } from '@/utils/parsePageData'
import { getAllCollections, getCollection } from '@/lib/shopify'
import Layout from '@/components/Layout'
import BlockWrapper from '@/components/BlockWrapper'
import * as Marketing from '@/marketing'

export default function CollectionPage({ page, navigation, collectionCards }) {
  const pageNewsletter = page?.marketing?.find(
    (block) => block.__typename === 'Newsletter'
  )

  return (
    <>
      <Layout page={page} navigation={navigation}>
        <BlockWrapper {...page} collectionCards={collectionCards} />

        {pageNewsletter && <Marketing.NewsletterSignup {...pageNewsletter} />}
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const client = graphcmsClient(preview)
  const collectionCards = await getAllCollections()

  const { page, navigation } = await client.request(pageQuery, {
    slug: 'collections'
  })

  const parsedPageData = await parsePageData(page)

  return {
    props: {
      page: parsedPageData,
      navigation,
      collectionCards,
      preview
    },
    revalidate: 60
  }
}