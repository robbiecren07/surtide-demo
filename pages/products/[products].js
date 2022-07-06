import { graphcmsClient } from '@/lib/client'
import { pageQuery } from '@/lib/queries'
import { parsePageData } from '@/utils/parsePageData'
import ProductPageContent from "@/components/products/ProductPageContent"
import { getProduct, recursiveCatalog } from "@/lib/shopify"
import Layout from '@/components/Layout'

export default function ProductPage({ data, product }) {

  return (
    <>
      <Layout {...data}>
        <ProductPageContent product={product} />
      </Layout>
    </>
  )
}

export async function getStaticPaths() {
  //const allProducts = await getAllProducts()
  const allProducts = await recursiveCatalog()

  const paths = allProducts.map(product => ({
    params: { products: String(product.node.handle) }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export async function getStaticProps({ params, preview = false }) {
  const client = graphcmsClient(preview)

  const data = await client.request(pageQuery, {
    slug: 'products'
  })

  const product = await getProduct(params.products)
  const parsedPageData = await parsePageData(data.page)

  return {
    props: {
      data,
      page: parsedPageData,
      product,
      preview
    },
    revalidate: 60
  }
}