import { graphcmsClient } from '@/lib/client'
import { homePageQuery } from '@/lib/queries'
import { parsePageData } from '@/utils/parsePageData'
import { getFeaturedSingle, getProductsInCollection } from "@/lib/shopify"
import BlockWrapper from '@/components/BlockWrapper'
import Layout from '@/components/Layout'
import * as Marketing from '@/marketing'

export default function IndexPage({ data, page, products, featuredProduct }) {

  const pageNewsletter = page?.marketing?.find(
    (block) => block.__typename === 'Newsletter'
  )

  const popUpCta = page?.marketing?.find(
    (block) => block.__typename === 'PopUp'
  )

  return (
    <>
      <Layout {...data}>
        <BlockWrapper {...page} products={products} featuredProduct={featuredProduct} />

        {pageNewsletter && <Marketing.NewsletterSignup {...pageNewsletter} />}
        {popUpCta && <Marketing.PopUp {...popUpCta} />}
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const client = graphcmsClient(preview)
  
  const data = await client.request(homePageQuery)

  const products = await getProductsInCollection()
  const featuredProduct = await getFeaturedSingle()
  const parsedPageData = await parsePageData(data.page)

  return {
    props: {
      data,
      page: parsedPageData,
      products,
      featuredProduct,
      preview
    },
    revalidate: 60
  }
}