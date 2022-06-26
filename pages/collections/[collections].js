import { graphcmsClient } from '@/lib/client'
import { pageQuery } from '@/lib/queries'
import { parsePageData } from '@/utils/parsePageData'
import { getAllCollections, getCollection } from '@/lib/shopify'
import Layout from '@/components/Layout'
import BlockWrapper from '@/components/BlockWrapper'
import * as Marketing from '@/marketing'

export default function CollectionPage({ page, navigation, collection }) {
  const pageNewsletter = page?.marketing?.find(
    (block) => block.__typename === 'Newsletter'
  )

  return (
    <>
      <Layout page={page} navigation={navigation}>
        <BlockWrapper {...page} collectionProducts={collection.products} />

        {pageNewsletter && <Marketing.NewsletterSignup {...pageNewsletter} />}
      </Layout>
    </>
  )
}

export async function getStaticPaths() {
  const allCollections = await getAllCollections()

  const paths = allCollections.map(collection => ({
    params: { collections: String(collection.node.handle) }
  }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params, preview = false }) {
  const collection = await getCollection(params.collections)
  const client = graphcmsClient(preview)

  const slug = 'collections/' + params.collections

  const { page, navigation } = await client.request(pageQuery, {
    slug: slug
  })

  const parsedPageData = await parsePageData(page)

  return {
    props: {
      page: parsedPageData,
      navigation,
      collection,
      preview
    },
    revalidate: 60
  }
}