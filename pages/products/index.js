import { graphcmsClient } from '@/lib/client'
import { pageQuery } from '@/lib/queries'
import { parsePageData } from '@/utils/parsePageData'
import { getCollection } from '@/lib/shopify'
import Layout from '@/components/Layout'
import BlockWrapper from '@/components/BlockWrapper'

export default function ProductPage({ data, page, products }) {

  return (
    <>
      <Layout {...data}>
        <BlockWrapper {...page} productsPage={products.products} />
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const client = graphcmsClient(preview)

  const data = await client.request(pageQuery, {
    slug: 'products'
  })

  const products = await getCollection('all')
  const parsedPageData = await parsePageData(data.page)

  return {
    props: {
      data,
      page: parsedPageData,
      products,
      preview
    },
    revalidate: 60
  }
}