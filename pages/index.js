import { graphcmsClient } from '@/lib/client'
import { pageQuery } from '@/lib/queries'
import { parsePageData } from '@/utils/parsePageData'
import { getFeaturedSingle, getProductsInCollection } from "@/lib/shopify"
import BlockWrapper from '@/components/BlockWrapper'
import Layout from '@/components/Layout'
import * as Marketing from '@/marketing'

export default function IndexPage({ page, navigation, products, featuredProduct }) {

  const pageNewsletter = page?.marketing?.find(
    (block) => block.__typename === 'Newsletter'
  )

  const popUpCta = page?.marketing?.find(
    (block) => block.__typename === 'PopUp'
  )

  return (
    <>
      <Layout page={page} navigation={navigation}>
        <BlockWrapper {...page} products={products} featuredProduct={featuredProduct} />

        {pageNewsletter && <Marketing.NewsletterSignup {...pageNewsletter} />}
        {popUpCta && <Marketing.PopUp {...popUpCta} />}
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const products = await getProductsInCollection()
  const featuredProduct = await getFeaturedSingle()
  const client = graphcmsClient(preview)

  const { page, navigation } = await client.request(pageQuery, {
    slug: 'home'
  })

  const parsedPageData = await parsePageData(page)

  return {
    props: {
      page: parsedPageData,
      products,
      navigation,
      featuredProduct,
      preview
    },
    revalidate: 60
  }
}