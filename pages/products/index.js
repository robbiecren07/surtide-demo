import { graphcmsClient } from '@/lib/client'
import { pageQuery } from '@/lib/queries'
import { parsePageData } from '@/utils/parsePageData'
import { getCollection, getProduct, recursiveCatalog } from '@/lib/shopify'
import Layout from '@/components/Layout'
import BlockWrapper from '@/components/BlockWrapper'

export default function ProductPage({ page, products, navigation }) {

  return (
    <>
      <Layout page={page} navigation={navigation}>
        <BlockWrapper {...page} productsPage={products.products} />
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const products = await getCollection('all')
  const client = graphcmsClient(preview)

  const { page, navigation } = await client.request(pageQuery, {
    slug: 'products'
  })

  const parsedPageData = await parsePageData(page)

  return {
    props: {
      page: parsedPageData,
      navigation,
      products,
      preview
    },
    revalidate: 60
  }
}