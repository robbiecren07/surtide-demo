import { graphcmsClient } from '@/lib/client'
import { pageQuery } from '@/lib/queries'
import { parsePageData } from '@/utils/parsePageData'
import { getAllCollections, getCollection } from '@/lib/shopify'
import Layout from '@/components/Layout'
import BlockWrapper from '@/components/BlockWrapper'
import * as Marketing from '@/marketing'

export default function CollectionPage({ data, page, collection }) {
  const pageNewsletter = page?.marketing?.find(
    (block) => block.__typename === 'Newsletter'
  )

  return (
    <>
      <Layout {...data}>
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
    fallback: 'blocking'
  }
}

export async function getStaticProps({ params, preview = false }) {
  const client = graphcmsClient(preview)

  const slug = 'collections/' + params.collections

  const data = await client.request(pageQuery, {
    slug: slug
  })

  const collection = await getCollection(params.collections)
  const parsedPageData = await parsePageData(data.page)

  return {
    props: {
      data,
      page: parsedPageData,
      collection,
      preview
    },
    revalidate: 60
  }
}