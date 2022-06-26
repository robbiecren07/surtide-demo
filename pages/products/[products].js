import { graphcmsClient } from '@/lib/client'
import { pageQuery } from '@/lib/queries'
import { parsePageData } from '@/utils/parsePageData'
import ProductPageContent from "@/components/products/ProductPageContent"
import { getAllProducts, getProduct, recursiveCatalog } from "@/lib/shopify"
import Layout from '@/components/Layout'

export default function ProductPage({ page, product, navigation }) {

  return (
    <>
      <Layout page={page} navigation={navigation}>
        <ProductPageContent product={product} />
      </Layout>
    </>
  )
}

export async function getStaticPaths() {
  const allProducts = await getAllProducts()

  const paths = allProducts.map(product => ({
    params: { products: String(product.node.handle) }
  }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params, preview = false }) {
  const product = await getProduct(params.products)
  const client = graphcmsClient(preview)

  const { page, navigation } = await client.request(pageQuery, {
    slug: 'products'
  })

  const parsedPageData = await parsePageData(page)

  return {
    props: {
      page: parsedPageData,
      navigation,
      product,
      preview
    },
    revalidate: 60
  }
}